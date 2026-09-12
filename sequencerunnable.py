from dotenv import load_dotenv

load_dotenv()

from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser  # When you invoke the llm you might the answer not in proper structure to overcome this we are using  the parsers

#1 Prompt template
prompt = ChatPromptTemplate.from_template("Explain {topic} in simple words")

#2. Model

model = ChatGroq(model_name="openai/gpt-oss-120b")

#3. Output Parser

parser = StrOutputParser()

# step by step manual flow

# format the prompt

#formatted_prompt = prompt.format_messages(topic="Machine learning")

# call the model manually
#response = model.invoke(formatted_prompt)

#call the model manually

#response = model.invoke(formatted_prompt)

# parse the output manually
#final_output = parser.parse(response.content)

chain = prompt | model | parser

result = chain.invoke("Machine learning")
print(result)

#print(final_output)
