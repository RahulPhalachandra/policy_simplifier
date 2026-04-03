from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
import json

from simplifier import simplify_text, stream_simplify, chunk_text
from extractor import extract_text_from_file
from complexity import calculate_complexity

app = FastAPI(title="EasyTerms API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class SimplifyRequest(BaseModel):
    text: str
    level: str = "general"  # "expert" | "general" | "simple"


@app.get("/health")
async def health_check():
    return {"status": "ok"}


@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    try:
        text = await extract_text_from_file(file)
        return {"text": text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/simplify")
async def simplify(request: SimplifyRequest):
    try:
        original_text = request.text
        complexity_score, complexity_label = calculate_complexity(original_text)
        simplified_text = await simplify_text(original_text, request.level)
        keywords = extract_keywords(original_text)
        return {
            "original": original_text,
            "simplified": simplified_text,
            "complexity_score": complexity_score,
            "complexity_label": complexity_label,
            "keywords": keywords,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/simplify/stream")
async def simplify_stream(request: SimplifyRequest):
    """SSE streaming endpoint using a simple sync generator."""
    original_text = request.text
    level = request.level
    complexity_score, complexity_label = calculate_complexity(original_text)
    keywords = extract_keywords(original_text)
    chunks = chunk_text(original_text)
    total_chunks = len(chunks)

    def events():
        # 1. Send metadata immediately
        meta = {
            "type": "meta",
            "complexity_score": complexity_score,
            "complexity_label": complexity_label,
            "keywords": keywords,
            "original": original_text,
            "total_chunks": total_chunks,
        }
        yield f"data: {json.dumps(meta)}\n\n"

        # 2. Stream each chunk
        try:
            current_chunk = 0
            for item_type, item_value in stream_simplify(original_text, level):
                if item_type == "progress":
                    current_chunk = item_value
                    payload = {"type": "progress", "current": current_chunk, "total": total_chunks}
                    yield f"data: {json.dumps(payload)}\n\n"
                elif item_type == "token":
                    yield f"data: {json.dumps({'type': 'token', 'content': item_value})}\n\n"
        except Exception as e:
            yield f"data: {json.dumps({'type': 'error', 'message': str(e)})}\n\n"
            return

        # 3. Done
        yield f"data: {json.dumps({'type': 'done'})}\n\n"

    return StreamingResponse(
        events(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )


def extract_keywords(original: str) -> list:
    keyword_pairs = {
        "indemnify": "to protect someone from being responsible for something bad",
        "liability": "legal responsibility for something",
        "jurisdiction": "the authority to make legal decisions",
        "statute": "a law passed by a government",
        "whereas": "given the fact that",
        "hereby": "by this action",
        "thereof": "of the thing just mentioned",
        "pursuant": "according to",
        "notwithstanding": "despite",
        "herein": "in this document",
        "wherein": "in which",
        "aforementioned": "mentioned before",
        "disseminate": "spread widely",
        "terminate": "end or stop",
        "commence": "begin",
        "obligation": "something you must do",
        "provision": "a rule or condition",
        "covenant": "a formal agreement",
        "consideration": "something of value exchanged",
        "incorporate": "include or contain",
        "arbitration": "settling a dispute without court",
        "litigation": "the process of taking legal action",
        "plaintiff": "the person who starts a lawsuit",
        "defendant": "the person being sued",
        "deposition": "written testimony under oath",
    }
    found = []
    original_lower = original.lower()
    for term, definition in keyword_pairs.items():
        if term in original_lower:
            found.append({"term": term, "definition": definition})
    return found[:10]


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)