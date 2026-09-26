import fitz
import re
def extractQuestions(fl):
    content = ""
    with fitz.open(fl) as file:
        for pg in file:
            content += pg.get_text()
    content = re.sub(r'T20 523|Turn Over|\[5\]|© Copyright reserved.*?(?=\n)', ' ', content)
    content = re.findall(r"\([a-hj-uw-z]\)\s*(.*?)(?=\([a-hj-uw-z]\)\s*|Question\s+\d+|\Z)",content,re.DOTALL | re.IGNORECASE)
    questions = []
    for i in content:
        i = re.sub(r'\s+',' ',i).strip()
        if len(i)>5 :
            questions.append(i)
    microQ = []
    for i in questions:
        subq = re.split(r'\s*\([ivx]+\)\s*',i)
        title = subq[0].strip()
        if(len(subq)>1):
            for j in subq[1:]:
                if len(j.strip())>5 and "diagram" not in title.lower():
                    microQ.append(f"{title} {j.strip()}")
        else:
            if(len(title)>5):
                microQ.append(title)
    return microQ