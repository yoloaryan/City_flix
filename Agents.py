#first step - loading all the libraries
from dotenv import load_dotenv

load_dotenv()

import os
import requests

from langchain_groq import ChatGroq
from langchain_core.tools import tool
from langchain_core.messages import HumanMessage, ToolMessage, SystemMessage
from langchain_core.runnables import RunnableLambda
from tavily import TavilyClient
from rich import print

#now lets create some tools

API_KEY = os.getenv("OPENWEATHER_API_KEY")


@tool
def get_weather(city: str) -> str:
    """
    Get current weather of a city
    """
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"

    response = requests.get(url)
    data = response.json()

    if str(data.get("cod")) != "200":
        return f"Error: {data.get('message', 'Could not fetch weather')}"
    temp = data["main"]["temp"]
    desc = data["weather"][0]["description"]

    return f"Weather in {city}: {desc}, {temp}°C"


#tavily news tool
tavily_client = TavilyClient(api_key=os.getenv("TAVILY_API_KEY"))


@tool
def get_news(city: str) -> str:
    """
    Get latest news of a city using tavily search
    """
    response = tavily_client.search(query=f"latest news in {city}",
                                    search_depth="basic",
                                    max_results=3)

    results = response.get("results", [])

    if not results:
        return f"No news found in {city}"

    news_list = []
    for r in results:
        title = r.get("title", "No title")
        url = r.get("url", "")
        snippet = r.get("content", "")
        news_list.append(f"- {title}\n  🔗 {url}\n  📝 {snippet[:100]}...")

    return f"Latest news in {city}:\n\n" + "\n\n".join(news_list)


tools = [get_weather, get_news]
tools_by_name = {t.name: t for t in tools}

llm = ChatGroq(model="openai/gpt-oss-120b")
llm_with_tools = llm.bind_tools(tools)

SYSTEM_PROMPT = SystemMessage(content=(
    "You are a helpful city assistant. Always use the exact city name provided by the user "
    "when calling tools. Do not modify or guess alternate spellings of city names. "
    "Call each tool at most once per requested topic."))


# ---- Runnable #1: the model call ----
def _call_model(messages):
    return llm_with_tools.invoke([SYSTEM_PROMPT] + messages)


model_runnable = RunnableLambda(_call_model)


# ---- human-approval step, applied per tool call (replaces wrap_tool_call middleware) ----
def _run_tools_with_approval(ai_message):
    tool_messages = []
    for tool_call in ai_message.tool_calls:
        tool_name = tool_call["name"]
        tool_args = tool_call.get("args", {})
        confirm = input(
            f"Agent wants to call '{tool_name}' with {tool_args}, approve (yes/no): "
        )

        if confirm.lower() != "yes":
            tool_messages.append(
                ToolMessage(content="Tool call was denied by the user.",
                            tool_call_id=tool_call["id"]))
            continue

        selected_tool = tools_by_name[tool_name]
        result = selected_tool.invoke(tool_args)
        tool_messages.append(
            ToolMessage(content=str(result), tool_call_id=tool_call["id"]))

    return tool_messages


tool_runnable = RunnableLambda(_run_tools_with_approval)


# ---- Runnable #2: the full agent loop (model -> tools -> model ... until no more tool calls) ----
def _agent_loop(messages):
    messages = list(messages)
    while True:
        ai_message = model_runnable.invoke(messages)
        messages.append(ai_message)

        if not getattr(ai_message, "tool_calls", None):
            return messages

        tool_messages = tool_runnable.invoke(ai_message)
        messages.extend(tool_messages)


agent = RunnableLambda(_agent_loop)

if __name__ == "__main__":
    print("City Agent (Runnable-based) | type exit to quit")

    while True:
        user_input = input("You : ")
        if user_input.lower() == "exit":
            break

        result_messages = agent.invoke([HumanMessage(content=user_input)])
        print("\n Bot:", result_messages[-1].content)

#first step - loading all the libraries
# from dotenv import load_dotenv

# load_dotenv()

# import os
# import requests

# from langchain_groq import ChatGroq
# from langchain_core.tools import tool
# from langchain_core.messages import HumanMessage, ToolMessage
# from tavily import TavilyClient
# from rich import print
# from langchain.agents import create_agent
# from langchain.agents.middleware import wrap_tool_call
# #now lets create some tools

# API_KEY = os.getenv("OPENWEATHER_API_KEY")

# @tool
# def get_weather(city: str) -> str:
#     """
#     Get current weather of a city
#     """
#     url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"

#     response = requests.get(url)
#     data = response.json()

#     # print("DEBUG:", data)

#     if str(data.get("cod")) != "200":
#         return f"Error: {data.get('message', 'Could not fetch weather')}"
#     temp = data["main"]["temp"]
#     desc = data["weather"][0]["description"]

#     return f"Weather in {city}: {desc}, {temp}°C"

# # print(get_weather.invoke("Ghaziabad"))

# #tavily news tool
# tavily_client = TavilyClient(api_key=os.getenv("TAVILY_API_KEY"))

# @tool
# def get_news(city: str) -> str:
#     """
#     Get latest news of a city using tavily search
#     """

#     response = tavily_client.search(query=f"latest news in {city}",
#                                     search_depth="basic",
#                                     max_results=3)

#     results = response.get("results", [])

#     if not results:
#         return f"No news found in {city}"

#     news_list = []

#     for r in results:
#         title = r.get("title", "No title")
#         url = r.get("url", "")
#         snippet = r.get("content", "")

#         news_list.append(f"- {title}\n  🔗 {url}\n  📝 {snippet[:100]}...")

#     return f"Latest news in {city}:\n\n" + "\n\n".join(news_list)

# #print(get_news.invoke("New Delhi"))

# llm = ChatGroq(model="openai/gpt-oss-120b")

# @wrap_tool_call
# def human_approval(request, handler):
#     """Ask for human approval before every tool call"""
#     tool_name = request.tool_call['name']
#     tool_args = request.tool_call.get('args', {})
#     confirm = input(f"Agent wants to call '{tool_name}' with {tool_args}, approve (yes/no): ")

#     if confirm.lower() != "yes":
#         return ToolMessage(content="Tool call was denied by the user. ",
#                            tool_call_id=request.tool_call["id"])

#     return handler(request)

# agent = create_agent(
#     llm,
#     tools=[get_weather, get_news],
#     system_prompt=(
#         "You are a helpful city assistant. Always use the exact city name provided by the user "
#         "when calling tools. Do not modify or guess alternate spellings of city names. "
#         "Call each tool at most once per requested topic."
#     ),
#     middleware=[human_approval]
# )

# if __name__ == "__main__":
#     print("City Agent | type exit to quit")

#     while True:
#         user_input = input("You : ")
#         if user_input.lower() == "exit":
#             break
#         result = agent.invoke(
#             {"messages": [{
#                 "role": "user",
#                 "content": user_input
#             }]})
#         print("\n Bot:", result['messages'][-1].content)

# tools = {"get_weather": get_weather, "get_news": get_news}

# llm_with_tool = llm.bind_tools([get_weather, get_news])

#MANUAL hard coded
# #Agent LOOP

# messages = []
# print("🛰️. City intelligence System")
# print("Type Exit to quit")

# while True:
#     user_input = input("You : ")
#     if user_input.lower() == "exit":
#         break
#     messages.append(HumanMessage(content=user_input))

#     while True:
#         result = llm_with_tool.invoke(messages)
#         messages.append(result)

#         #if tool is required
#         if result.tool_calls:
#             for tool_call in result.tool_calls:
#                 tool_name = tool_call["name"]

#                 #HUMAN IN THE LOOP

#                 confirm = input(
#                     f"Agent wants to call  {tool_name} Approve (yes/no)")

#                 if confirm.lower() == "no":
#                     print(
#                         "tool call denied and I cannot get the latest information "
#                     )
#                     break

#                 #executable tool
#                 tool_result = tools[tool_name].invoke(tool_call['args'])
#                 messages.append(
#                     ToolMessage(content=str(tool_result),
#                                 tool_call_id=tool_call['id']))

#             continue

#         else:
#             print("\n 🗿 Final Answer: \n")
#             print(result.content)
#             print("\n" + "=" * 50 + "\n")
#             break

#     #User Input
#     # ⬇

#     #LLM (decides tool)
# #       ⬇

# #tool execute
# #          ⬇

# #oolMessage added
# #           ⬇
# #loop again
# #             ⬇
# #llm(final answer)🗿
