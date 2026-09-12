import os
import requests
import streamlit as st
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

from langchain_groq import ChatGroq
from langchain_core.tools import tool
from langchain_core.messages import HumanMessage, AIMessage, ToolMessage, SystemMessage
from tavily import TavilyClient

# ==============================================================================
# Page Configuration & Custom CSS
# ==============================================================================
st.set_page_config(
    page_title="City Intelligence Agent",
    page_icon="🛰️",
    layout="wide",
    initial_sidebar_state="expanded"
)

st.markdown("""
<style>
    /* Main container styling */
    .main .block-container {
        padding-top: 2rem;
        padding-bottom: 2rem;
        max-width: 1000px;
    }

    /* Header styling */
    .agent-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 1.5rem;
        padding: 1.2rem;
        background: linear-gradient(135deg, rgba(30, 41, 59, 0.7), rgba(15, 23, 42, 0.8));
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    }
    .agent-header h1 {
        margin: 0;
        font-size: 1.8rem;
        font-weight: 700;
        background: linear-gradient(90deg, #38bdf8, #818cf8);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    .agent-header p {
        margin: 0;
        font-size: 0.95rem;
        color: #94a3b8;
    }

    /* Tool confirmation box */
    .tool-approval-card {
        background-color: rgba(245, 158, 11, 0.1);
        border: 1px solid rgba(245, 158, 11, 0.4);
        border-radius: 10px;
        padding: 1rem;
        margin: 0.8rem 0;
    }

    /* Status badge */
    .badge-ok {
        color: #10b981;
        font-weight: 600;
    }
    .badge-missing {
        color: #ef4444;
        font-weight: 600;
    }
</style>
""", unsafe_allow_html=True)

# ==============================================================================
# Sidebar & Configuration
# ==============================================================================
with st.sidebar:
    st.title("🛰️ Agent Settings")
    st.caption("City Intelligence Control Center")

    groq_key = os.getenv("GROQ_API_KEY", "")
    weather_key = os.getenv("OPENWEATHER_API_KEY", "")
    tavily_key = os.getenv("TAVILY_API_KEY", "")

    # Status Section
    st.subheader("🔑 API Key Status")
    col1, col2 = st.columns([3, 2])
    with col1:
        st.write("Groq:")
        st.write("OpenWeather:")
        st.write("Tavily:")
    with col2:
        st.markdown('<span class="badge-ok">✓ Active</span>' if groq_key else '<span class="badge-missing">✗ Missing</span>', unsafe_allow_html=True)
        st.markdown('<span class="badge-ok">✓ Active</span>' if weather_key else '<span class="badge-missing">✗ Missing</span>', unsafe_allow_html=True)
        st.markdown('<span class="badge-ok">✓ Active</span>' if tavily_key else '<span class="badge-missing">✗ Missing</span>', unsafe_allow_html=True)

    if not groq_key or not weather_key or not tavily_key:
        st.warning("Ensure all API keys are set in `.env` to enable full functionality.")

    st.divider()

    # Agent Controls
    st.subheader("⚙️ Behavior")
    model_choice = st.selectbox(
        "LLM Model",
        ["openai/gpt-oss-120b", "llama-3.3-70b-versatile", "mixtral-8x7b-32768"],
        index=0
    )
    require_approval = st.toggle("Human-in-the-Loop Approval", value=True, help="Prompt before executing any tool call")

    st.divider()

    # Quick Prompts
    st.subheader("💡 Quick Examples")
    sample_queries = [
        "What is the weather in Barcelona?",
        "Top news in Delhi right now",
        "Weather and news in Tokyo",
        "How is the weather in Paris?"
    ]
    for sq in sample_queries:
        if st.button(sq, use_container_width=True):
            st.session_state["queued_query"] = sq

    st.divider()
    if st.button("🗑️ Clear Conversation", use_container_width=True):
        st.session_state.messages = []
        st.session_state.pending_tool_calls = None
        st.session_state.current_ai_message = None
        st.rerun()

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
        return f"Weather in {city}: {desc}, {temp}°C"
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
            return f"No news found in {city}"

        news_list = []
        for r in results:
            title = r.get("title", "No title")
            url = r.get("url", "")
            snippet = r.get("content", "")
            news_list.append(f"- **{title}**\n  🔗 [Read more]({url})\n  📝 {snippet[:120]}...")

        return f"Latest news in {city}:\n\n" + "\n\n".join(news_list)
    except Exception as e:
        return f"Error fetching news: {str(e)}"

tools = [get_weather, get_news]
tools_by_name = {t.name: t for t in tools}

# LLM Setup
llm = ChatGroq(model=model_choice)
llm_with_tools = llm.bind_tools(tools)

SYSTEM_PROMPT = SystemMessage(content=(
    "You are a helpful city assistant. Always use the exact city name provided by the user "
    "when calling tools. Do not modify or guess alternate spellings of city names. "
    "Call each tool at most once per requested topic. Synthesize the tool results into a friendly, clear answer."
))

# ==============================================================================
# Session State Initialization
# ==============================================================================
if "messages" not in st.session_state:
    st.session_state.messages = []

if "pending_tool_calls" not in st.session_state:
    st.session_state.pending_tool_calls = None

if "current_ai_message" not in st.session_state:
    st.session_state.current_ai_message = None

# ==============================================================================
# UI Header
# ==============================================================================
st.markdown("""
<div class="agent-header">
    <div style="font-size: 2.2rem;">🛰️</div>
    <div>
        <h1>City Intelligence Agent</h1>
        <p>Real-time Weather & News Assistant with Human-in-the-Loop Tool Calling</p>
    </div>
</div>
""", unsafe_allow_html=True)

# ==============================================================================
# Render Conversation History
# ==============================================================================
for msg in st.session_state.messages:
    if isinstance(msg, HumanMessage):
        with st.chat_message("user"):
            st.markdown(msg.content)
    elif isinstance(msg, AIMessage):
        if msg.content:
            with st.chat_message("assistant"):
                st.markdown(msg.content)
    elif isinstance(msg, ToolMessage):
        with st.chat_message("assistant", avatar="🛠️"):
            with st.expander(f"Tool Result ({msg.name if hasattr(msg, 'name') else 'Tool'})", expanded=False):
                st.markdown(msg.content)

# ==============================================================================
# Tool Execution Helper
# ==============================================================================
def execute_tools_and_continue(approved: bool):
    """Executes or denies pending tool calls and calls the LLM with the results."""
    ai_msg = st.session_state.current_ai_message
    pending_calls = st.session_state.pending_tool_calls

    tool_messages = []
    for tc in pending_calls:
        tool_name = tc["name"]
        tool_args = tc.get("args", {})

        if approved:
            selected_tool = tools_by_name.get(tool_name)
            if selected_tool:
                with st.spinner(f"Executing `{tool_name}` with {tool_args}..."):
                    res = selected_tool.invoke(tool_args)
                tool_messages.append(ToolMessage(content=str(res), tool_call_id=tc["id"], name=tool_name))
            else:
                tool_messages.append(ToolMessage(content=f"Tool {tool_name} not found", tool_call_id=tc["id"], name=tool_name))
        else:
            tool_messages.append(ToolMessage(content="Tool call was denied by the user.", tool_call_id=tc["id"], name=tool_name))

    st.session_state.messages.extend(tool_messages)

    # Call LLM to synthesize final response
    with st.spinner("Synthesizing final response..."):
        llm_history = [SYSTEM_PROMPT] + st.session_state.messages
        final_ai_msg = llm_with_tools.invoke(llm_history)
        st.session_state.messages.append(final_ai_msg)

    # Reset pending states
    st.session_state.pending_tool_calls = None
    st.session_state.current_ai_message = None
    st.rerun()

# ==============================================================================
# Pending Tool Approval Card (Human in the Loop)
# ==============================================================================
if st.session_state.pending_tool_calls:
    with st.chat_message("assistant", avatar="⚠️"):
        st.markdown("### ⚠️ Human Approval Required")
        st.write("The Agent wants to execute the following tool call(s):")

        for idx, tc in enumerate(st.session_state.pending_tool_calls):
            t_name = tc.get("name")
            t_args = tc.get("args", {})
            st.info(f"**Tool:** `{t_name}`  \n**Arguments:** `{t_args}`")

        col_app, col_deny, _ = st.columns([1.5, 1.5, 5])
        with col_app:
            if st.button("✅ Approve & Run", type="primary", use_container_width=True):
                execute_tools_and_continue(approved=True)
        with col_deny:
            if st.button("❌ Deny Call", use_container_width=True):
                execute_tools_and_continue(approved=False)

# ==============================================================================
# Chat Input & Invocation Flow
# ==============================================================================
user_prompt = st.chat_input("Ask about weather or latest news for any city (e.g. 'Weather in Paris and news')...")

# Handle quick prompt selection from sidebar
if "queued_query" in st.session_state and st.session_state["queued_query"]:
    user_prompt = st.session_state.pop("queued_query")

if user_prompt and not st.session_state.pending_tool_calls:
    # 1. Add user message
    user_msg = HumanMessage(content=user_prompt)
    st.session_state.messages.append(user_msg)

    with st.chat_message("user"):
        st.markdown(user_prompt)

    # 2. Invoke Model
    with st.spinner("Agent is thinking..."):
        llm_history = [SYSTEM_PROMPT] + st.session_state.messages
        ai_response = llm_with_tools.invoke(llm_history)

    # 3. Check for Tool Calls
    if getattr(ai_response, "tool_calls", None):
        st.session_state.messages.append(ai_response)
        st.session_state.current_ai_message = ai_response
        st.session_state.pending_tool_calls = ai_response.tool_calls

        if require_approval:
            # Re-run so the approval UI renders immediately
            st.rerun()
        else:
            # Auto-approve if toggle is turned off
            execute_tools_and_continue(approved=True)
    else:
        # Direct response without tools
        st.session_state.messages.append(ai_response)
        with st.chat_message("assistant"):
            st.markdown(ai_response.content)
