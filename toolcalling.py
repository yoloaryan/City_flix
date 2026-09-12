from dotenv import load_dotenv

load_dotenv()
from langchain_groq import ChatGroq
from langchain_core.tools import tool
from rich import print
from langchain_core.messages import HumanMessage


# creating a tool
@tool
def get_text_length(text: str) -> int:
    """Returns the number of character in a given text string"""
    return len(text)


tools = {"get_text_length": get_text_length}

#llm
llm = ChatGroq(model_name="openai/gpt-oss-120b")

# # tool binding (tool_choice="required" ensures the model always invokes the tool)
# llm_with_tool = llm.bind_tools([get_text_length])

# #step 1:LLM decide tool
# result = llm_with_tool.invoke(
#     "Returns the number of character in a given text : 'Hello how are you'")

#tool binding
llm_with_tool = llm.bind_tools([get_text_length])

message = []
prompt = input("You: ")

query = HumanMessage(prompt)
message.append(query)

result = llm_with_tool.invoke(message)
message.append(result)

#print(message)

if result.tool_calls:
    tool_name = result.tool_calls[0]['name']
    tool_message = tools[tool_name].invoke(result.tool_calls[0])
    message.append(tool_message)

#now you willl print the final output of the result it will print that this message is created by the human , tool or by ai

result = llm_with_tool.invoke(message)
print(result.content)

# result = llm_with_tool.invoke(
#     "Return the number of character in a given text : 'hello how are you' ")
# print(result.tool_calls[0])

# print(
#     get_text_length.invoke({
#         'name': 'get_text_length',
#         'args': {
#             'text': 'hello how are you'
#         },
#         'id': 'fc_7aeacc9a-6214-4e6b-9acb-f6245dc2d2ec',
#         'type': 'tool_call'
#     }))

# #step 2 -4:Execute tool
# if result.tool_calls:
#     tool_call = result.tool_calls[0]
#     tool_result = get_text_length.invoke(tool_call["args"])

#     #step 5:Send Back to llm
#     final_response = llm.invoke(f"the length of text is {tool_result}")

#     print(final_response.content)
