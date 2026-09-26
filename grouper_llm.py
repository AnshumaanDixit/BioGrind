import os
from dotenv import load_dotenv as ldenv
from extractor import extractQuestions as eC
from google import genai as ai
ldenv()
questions = eC("2020.pdf")
user = ai.Client()
topics = []
prompt = f"""
    You are a brilliant class 10th ICSE biology teacher, 
    I will give you a list of extracted questions,
    you job is to read them, and ignore the exam instructions and group them by standard ICSE Class 10 Biology syllabus topics.
    you may decide the name of the based on the list given : {topics} (if there exist a question that does not belong to any of the topic in this list, then you may decide on the topic name for that question, ENSURE THE TOPIC NAME IS A VALID TOPIC IN THE CLASS 10th BIOLOGY ICSE syllabus!).
    you may give the grouped output in the form of:
    a dictionary, where the key is the topic name in string, and the value is a list consisting of the questions that are related to it

    here are the questions you need to categorize:
    {questions}

    Do not include any markdown formatting, greetings, or explanations.

    make sure there are no errors in grouping, keep it strictly to the format, nothing more nothing less.
"""
output = user.interactions.create(model="gemini-3.8-flash",input=prompt)
print(output.output_text.strip())