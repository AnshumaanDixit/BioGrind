import re
from sentence_transformers import SentenceTransformer
from sklearn.cluster import AgglomerativeClustering
from collections import defaultdict
from extractor import extractQuestions as eC
questions = eC("2020.pdf")
lm = SentenceTransformer('all-MiniLM-L6-v2')
template = [
    r"Name the following:",
    r"Explain the following terms:",
    r"Give appropriate biological/? technical terms for the following:",
    r"Choose the correct answer from the four options given below:",
    r"Differentiate between the following pairs.*?\):",
    r"Given below are certain groups of terms.*?:",
    r"Given below are sets of five terms each.*?:",
    r"Identify the ODD term in each set.*?:",
    r"Match the items given in column A.*?:",
    r"Give the biological reasons for the following statements:",
    r"State two functions of:",
    r"Complete the table.*?:",
    r"Example:.*?\."
]
pattern = re.compile('|'.join(template), re.IGNORECASE | re.DOTALL)
cleaned = []
for i in questions:
    clean = re.sub(pattern,"",i).strip()
    if len(clean)<5:
        clean = i
    cleaned.append(clean)
embeddings = lm.encode(cleaned)
model = AgglomerativeClustering(
    n_clusters=None, 
    distance_threshold=1.3, 
    metric='euclidean', 
    linkage='ward'
)
model.fit(embeddings)
group = defaultdict(list)
for question, id in zip(questions,model.labels_):
    group[id].append(question)
for id,question in group.items():
    print(id,end="\n")
    for i in question:
        print(i,end="\n")
    print("====================================")