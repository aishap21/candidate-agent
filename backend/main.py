from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from rag import load_rag_chain
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

rag_chain = load_rag_chain()

class QuestionRequest(BaseModel):
    question: str

class LoginRequest(BaseModel):
    email: str
    password: str

@app.get("/")
def root():
    return {"message": "Candidate Agent API is running"}

@app.post("/ask")
def ask_question(request: QuestionRequest):
    try:
        response = rag_chain.invoke(request.question)
        return {"answer": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/login")
def login(request: LoginRequest):
    if request.email == "rahul@email.com" and request.password == "rahul123":
        return {"message": "Login successful", "user": request.email}
    else:
        raise HTTPException(status_code=401, detail="Invalid credentials")