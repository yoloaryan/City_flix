import os
import json
import requests
from urllib.parse import urlparse, parse_qs
from http.server import BaseHTTPRequestHandler
from dotenv import load_dotenv

load_dotenv()

def clean_key(val, key_name=""):
    if not val:
        return ""
    val = val.strip()
    if "=" in val:
        val = val.split("=", 1)[1]
    val = val.strip("\"' \t\r\n")
    if key_name == "TAVILY_API_KEY" and val.startswith("vly-"):
        val = "t" + val
    return val

for k in ["GROQ_API_KEY", "OPENWEATHER_API_KEY", "TAVILY_API_KEY"]:
    raw = os.getenv(k)
    if raw:
        os.environ[k] = clean_key(raw, k)


from langchain_groq import ChatGroq
from langchain_core.tools import tool
from langchain_core.messages import HumanMessage, AIMessage, ToolMessage, SystemMessage
from tavily import TavilyClient

# ==============================================================================
# Agent Tools Definition
# ==============================================================================
@tool
def get_weather(city: str) -> str:
    """Get current weather of a city"""
    api_key = os.getenv("OPENWEATHER_API_KEY")
    if not api_key:
        return "Error: OPENWEATHER_API_KEY is not configured."

    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"
    try:
        response = requests.get(url, timeout=10)
        data = response.json()
        if str(data.get("cod")) != "200":
            return f"Error: {data.get('message', 'Could not fetch weather')}"
        temp = data["main"]["temp"]
        desc = data["weather"][0]["description"]
        humidity = data["main"]["humidity"]
        wind = data["wind"]["speed"]
        return f"Weather in {city}: {desc}, {temp}°C (Humidity: {humidity}%, Wind: {wind} m/s)"
    except Exception as e:
        return f"Error fetching weather: {str(e)}"

@tool
def get_news(city: str) -> str:
    """Get latest news of a city using tavily search"""
    api_key = os.getenv("TAVILY_API_KEY")
    if not api_key:
        return "Error: TAVILY_API_KEY is not configured."

    try:
        tavily_client = TavilyClient(api_key=api_key)
        response = tavily_client.search(
            query=f"latest news in {city}",
            search_depth="basic",
            max_results=3
        )
        results = response.get("results", [])
        if not results:
            return f"No news found for {city}."

        news_list = []
        for r in results:
            title = r.get("title", "No title")
            url = r.get("url", "")
            snippet = r.get("content", "")
            news_list.append(f"- {title}\n  URL: {url}\n  Snippet: {snippet[:120]}...")

        return f"Latest news in {city}:\n\n" + "\n\n".join(news_list)
    except Exception as e:
        return f"Error fetching news: {str(e)}"

tools = [get_weather, get_news]
tools_by_name = {t.name: t for t in tools}

# Lazy initialization of ChatGroq to ensure environment variables are read
def get_llm():
    llm = ChatGroq(model="openai/gpt-oss-120b")
    return llm.bind_tools(tools)

SYSTEM_PROMPT = SystemMessage(content=(
    "You are Cityflix Intelligence Agent, a smart and helpful city assistant with real-time tools. "
    "Always use the exact city name provided by the user when calling tools. "
    "Do not modify or guess alternate spellings of city names. "
    "Call each tool at most once per requested topic. "
    "Synthesize the tool results into a structured, engaging answer."
))

# ==============================================================================
# Serialization Helpers
# ==============================================================================
def serialize_message(msg):
    if isinstance(msg, HumanMessage):
        return {"role": "user", "content": msg.content}
    elif isinstance(msg, AIMessage):
        res = {"role": "assistant", "content": msg.content}
        if getattr(msg, "tool_calls", None):
            res["tool_calls"] = msg.tool_calls
        return res
    elif isinstance(msg, ToolMessage):
        return {"role": "tool", "content": msg.content, "tool_call_id": msg.tool_call_id, "name": getattr(msg, "name", "")}
    return {"role": "unknown", "content": str(msg)}

def deserialize_messages(raw_msgs):
    deserialized = []
    for m in raw_msgs:
        role = m.get("role")
        content = m.get("content", "")
        if role == "user":
            deserialized.append(HumanMessage(content=content))
        elif role == "assistant":
            tool_calls = m.get("tool_calls")
            deserialized.append(AIMessage(content=content, tool_calls=tool_calls or []))
        elif role == "tool":
            deserialized.append(ToolMessage(content=content, tool_call_id=m.get("tool_call_id", ""), name=m.get("name", "")))
    return deserialized

# ==============================================================================
# Vercel Serverless Handler
# ==============================================================================
class handler(BaseHTTPRequestHandler):
    def _send_json(self, data, status=200):
        body = json.dumps(data).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self._send_json({"status": "ok"}, status=200)

    def _serve_file(self, filename, content_type):
        base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        filepath = os.path.join(base_dir, filename)
        if not os.path.exists(filepath):
            filepath = os.path.join(base_dir, "public", filename)
        if os.path.exists(filepath):
            with open(filepath, "rb") as f:
                content = f.read()
            self.send_response(200)
            self.send_header("Content-Type", content_type)
            self.send_header("Content-Length", str(len(content)))
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(content)
        else:
            self._send_json({"error": f"File {filename} not found"}, status=404)

    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path

        # Serve static assets if Vercel routes root requests to the serverless function
        if path in ["", "/", "/index.html"]:
            self._serve_file("index.html", "text/html; charset=utf-8")
            return
        elif path == "/style.css":
            self._serve_file("style.css", "text/css; charset=utf-8")
            return
        elif path == "/app.js":
            self._serve_file("app.js", "application/javascript; charset=utf-8")
            return

        # Handle /api/status or /status
        if path.endswith("/status"):
            groq_k = bool(os.getenv("GROQ_API_KEY"))
            weather_k = bool(os.getenv("OPENWEATHER_API_KEY"))
            tavily_k = bool(os.getenv("TAVILY_API_KEY"))
            self._send_json({
                "groq": groq_k,
                "openweather": weather_k,
                "tavily": tavily_k,
                "ready": groq_k and weather_k and tavily_k
            })
            return

        # Handle /api/city-overview or /city-overview
        if "city-overview" in path:
            qs = parse_qs(parsed.query)
            city = qs.get("city", ["Barcelona"])[0]
            weather_raw = get_weather.invoke({"city": city})
            news_raw = get_news.invoke({"city": city})
            self._send_json({
                "city": city,
                "weather": weather_raw,
                "news": news_raw
            })
            return

        self._send_json({"error": "API route not found"}, status=404)


    def do_POST(self):
        parsed = urlparse(self.path)
        content_length = int(self.headers.get("Content-Length", 0))
        body_data = self.rfile.read(content_length).decode("utf-8") if content_length > 0 else "{}"
        
        try:
            payload = json.loads(body_data)
        except Exception:
            self._send_json({"error": "Invalid JSON"}, status=400)
            return

        # Handle /api/chat
        if parsed.path.endswith("/chat"):
            user_msg = payload.get("message", "").strip()
            raw_history = payload.get("history", [])

            if not user_msg:
                self._send_json({"error": "Message cannot be empty"}, status=400)
                return

            history = deserialize_messages(raw_history)
            user_message_obj = HumanMessage(content=user_msg)
            full_msgs = [SYSTEM_PROMPT] + history + [user_message_obj]

            try:
                llm_with_tools = get_llm()
                ai_response = llm_with_tools.invoke(full_msgs)
            except Exception as e:
                self._send_json({"error": f"LLM error: {str(e)}"}, status=500)
                return

            updated_history = raw_history + [serialize_message(user_message_obj)]

            if getattr(ai_response, "tool_calls", None):
                updated_history.append(serialize_message(ai_response))
                self._send_json({
                    "status": "approval_required",
                    "tool_calls": ai_response.tool_calls,
                    "history": updated_history
                })
            else:
                updated_history.append(serialize_message(ai_response))
                self._send_json({
                    "status": "complete",
                    "content": ai_response.content,
                    "history": updated_history
                })
            return

        # Handle /api/approve
        if parsed.path.endswith("/approve"):
            approved = payload.get("approved", True)
            tool_call = payload.get("tool_call", {})
            raw_history = payload.get("history", [])

            tool_name = tool_call.get("name")
            tool_args = tool_call.get("args", {})
            call_id = tool_call.get("id")

            if approved:
                selected_tool = tools_by_name.get(tool_name)
                if selected_tool:
                    try:
                        tool_result = selected_tool.invoke(tool_args)
                    except Exception as e:
                        tool_result = f"Error executing {tool_name}: {str(e)}"
                else:
                    tool_result = f"Tool {tool_name} not recognized."
            else:
                tool_result = "Tool call was denied by the user."

            tool_msg = ToolMessage(content=str(tool_result), tool_call_id=call_id, name=tool_name)
            updated_history = raw_history + [serialize_message(tool_msg)]

            history = deserialize_messages(updated_history)
            try:
                llm_with_tools = get_llm()
                final_ai = llm_with_tools.invoke([SYSTEM_PROMPT] + history)
            except Exception as e:
                self._send_json({"error": f"LLM synthesis error: {str(e)}"}, status=500)
                return

            if getattr(final_ai, "tool_calls", None):
                updated_history.append(serialize_message(final_ai))
                self._send_json({
                    "status": "approval_required",
                    "tool_calls": final_ai.tool_calls,
                    "tool_result": str(tool_result),
                    "history": updated_history
                })
            else:
                updated_history.append(serialize_message(final_ai))
                self._send_json({
                    "status": "complete",
                    "content": final_ai.content,
                    "tool_result": str(tool_result),
                    "history": updated_history
                })
            return

        self._send_json({"error": "Endpoint not found"}, status=404)
