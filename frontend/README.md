# RAG-Based Candidate Profile AI Agent

An AI-powered interview agent that answers questions about a candidate's profile using Retrieval-Augmented Generation (RAG).

## Live Demo
🔗 [Deployed App URL here]

## Tech Stack
- **Frontend:** React.js, Firebase Auth
- **Backend:** FastAPI (Python)
- **LLM:** Groq (Llama 3.1)
- **RAG:** LangChain + FAISS + HuggingFace Embeddings
- **Authentication:** Firebase (Google + Email/Password)
- **Deployment:** Render (Backend), Vercel (Frontend)

## Architecture

User → React Frontend → FastAPI Backend → LangChain RAG Pipeline → Groq LLM
↓                               ↓
Firebase Auth              FAISS Vector Store
(profile.txt embeddings)

## RAG Implementation
1. Profile data stored in `data/profile.txt`
2. Text split into chunks using `RecursiveCharacterTextSplitter`
3. Chunks embedded using HuggingFace `all-MiniLM-L6-v2` model
4. Embeddings stored in FAISS vector store
5. On each question, top 3 relevant chunks retrieved
6. Retrieved context + question sent to Groq LLM
7. LLM answers in first person as the candidate

## Features
- 🤖 AI agent answers interview questions in first person
- 🔐 Authentication via Google and Email/Password
- 💬 Real-time chat interface
- 📄 RAG-based contextual answers from profile data

## Setup Instructions

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

Create `.env` file:
GROQ_API_KEY=your_groq_api_key

Run backend:
```bash
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## API Endpoints
- `GET /` — Health check
- `POST /ask` — Ask a question to the agent
- `POST /login` — Username/password login

## Sample Questions to Ask
- "Tell me about yourself"
- "What are your skills?"
- "Describe your projects"
- "What is your educational background?"
- "Tell me about your experience"