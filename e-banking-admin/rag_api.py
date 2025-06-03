# rag_api.py
import fitz  # PyMuPDF
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict
from langchain_community.vectorstores import FAISS
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_ollama.llms import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.documents import Document
from langchain_huggingface import HuggingFaceEmbeddings

# Configs
PDF_PATH = "data/simo.pdf"
EMBEDDING_MODEL = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
LLM = OllamaLLM(model="mistral:latest")
PROMPT_TEMPLATE = """
Tu es un assistant intelligent. Utilise uniquement le contexte fourni pour répondre à la question.
Ne fais aucune supposition. Si tu ne sais pas, dis-le.
Si la question est en français, réponds en français. Sinon, réponds en anglais ou la langue de la question.

Contexte : {context}
Question : {question}
Réponse :
"""

app = FastAPI()

# Autorise le frontend Angular
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class RAGRequest(BaseModel):
    query: str
    history: List[Dict[str, str]]


# Charger PDF, splitter, indexer FAISS (exécuté une fois)
def load_and_index_pdf(pdf_path: str):
    doc = fitz.open(pdf_path)
    all_text = "\n".join([page.get_text() for page in doc])
    document = Document(page_content=all_text)

    splitter = RecursiveCharacterTextSplitter(chunk_size=512, chunk_overlap=100)
    chunks = splitter.split_documents([document])

    db = FAISS.from_documents(chunks, EMBEDDING_MODEL)
    return db

VECTOR_DB = load_and_index_pdf(PDF_PATH)

@app.post("/ask")
async def ask_rag(request: RAGRequest):
    query = request.query
    docs = VECTOR_DB.similarity_search(query, k=5)
    context = "\n\n".join([doc.page_content for doc in docs])

    prompt = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
    chain = prompt | LLM

    response = chain.invoke({"question": query, "context": context})
    return {"response": response}


#uvicorn rag_api:app --reload --port 8000