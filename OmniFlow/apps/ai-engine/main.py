import os
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import redis.asyncio as redis

# Optional: read from .env if needed
# from dotenv import load_dotenv
# load_dotenv('../../.env')

# Redis connection for rate limiting / cache (optional)
redis_client = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global redis_client
    redis_url = f"redis://{os.getenv('REDIS_HOST', 'localhost')}:{os.getenv('REDIS_PORT', 6379)}/0"
    redis_client = redis.from_url(redis_url, encoding="utf-8", decode_responses=True)
    yield
    await redis_client.close()

app = FastAPI(title="OmniFlow AI Engine", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QueryRequest(BaseModel):
    workspaceId: str
    query: str
    context: dict = {}

@app.get("/health")
async def health_check():
    return {"status": "ok", "service": "ai-engine"}

@app.post("/api/v1/ai/completions")
async def generate_completion(req: QueryRequest):
    """
    Placeholder endpoint for AI interactions (LangChain / LLM processing)
    """
    # TODO: Implement LangChain LLM or external API call (OpenAI, Anthropic)
    return {
        "text": f"Simulated AI response for query: '{req.query}' in workspace {req.workspaceId}",
        "confidence": 0.95
    }

@app.post("/api/v1/ai/categorize-ticket")
async def categorize_ticket(req: QueryRequest):
    """
    Placeholder endpoint to categorize incoming support tickets via NLP
    """
    return {
        "category": "technical_support",
        "priority": "HIGH",
        "confidence": 0.88
    }

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
