from langchain_core.tools import tool


@tool  # decorator for creating tool
def get_greeting(name: str) -> str:
    """Generate a greeting messsage for the user """
    return f"Hello {name}, Welcone to the AI world"


result = get_greeting.invoke({"name": "Aryan"})
print(result)

print(get_greeting.name)
print(get_greeting.description)
print(get_greeting.args)
