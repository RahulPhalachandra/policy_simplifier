import os
import asyncio
import json
from concurrent.futures import ThreadPoolExecutor
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
if not GROQ_API_KEY or GROQ_API_KEY == "your_groq_api_key_here":
    raise RuntimeError("❌ GROQ_API_KEY not set. Add it to backend/.env")

client = Groq(api_key=GROQ_API_KEY)

SYSTEM_PROMPTS = {
    "expert": (
        "You are a legal analyst summarizing a document for a professional audience. "
        "Retain technical terminology but restructure the document for clarity. "
        "Use headings and bullet points. Be concise but complete."
    ),
    "general": (
        "You are a plain-language expert who simplifies complex legal, financial, and government documents for everyday people. "
        "Rewrite in simple, clear English. Use short sentences and bullet points where helpful. "
        "Replace legal jargon with everyday words (e.g. 'indemnify' → 'protect from blame'). "
        "Keep all important meaning — do not omit key obligations or rights. "
        "Use headings if the document has multiple sections. "
        "Do NOT add disclaimers or preamble — just give the simplified text directly."
    ),
    "simple": (
        "You are explaining a legal document to a 12-year-old. "
        "Use very simple words and very short sentences. "
        "Avoid ALL legal terms — if you must use one, immediately explain it in brackets. "
        "Use bullet points. Use a friendly, clear tone. "
        "Do NOT add disclaimers or preamble — just give the simplified text directly."
    ),
}

CHUNK_SIZE = 3000  # characters per chunk
executor = ThreadPoolExecutor(max_workers=4)


def chunk_text(text: str) -> list:
    """Split text by paragraphs, grouping into chunks of ~CHUNK_SIZE chars."""
    paragraphs = [p.strip() for p in text.split("\n") if p.strip()]
    chunks = []
    current = []
    current_len = 0

    for para in paragraphs:
        if current_len + len(para) > CHUNK_SIZE and current:
            chunks.append("\n\n".join(current))
            current = [para]
            current_len = len(para)
        else:
            current.append(para)
            current_len += len(para)

    if current:
        chunks.append("\n\n".join(current))

    return chunks if chunks else [text]


def _stream_chunk(text: str, level: str):
    """Stream tokens from Groq for a single chunk."""
    system_prompt = SYSTEM_PROMPTS.get(level, SYSTEM_PROMPTS["general"])
    stream = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": text},
        ],
        temperature=0.3,
        max_tokens=2048,
        stream=True,
    )
    for part in stream:
        token = part.choices[0].delta.content
        if token:
            yield token


def stream_simplify(text: str, level: str = "general"):
    """Yields (type, value) tuples: ('progress', int) or ('token', str)."""
    chunks = chunk_text(text)
    total = len(chunks)

    for i, chunk in enumerate(chunks):
        yield ("progress", i + 1)
        for token in _stream_chunk(chunk, level):
            yield ("token", token)


async def simplify_text(text: str, level: str = "general") -> str:
    """Non-streaming fallback — simplifies all chunks and joins."""
    chunks = chunk_text(text)
    results = []
    loop = asyncio.get_running_loop()
    for chunk in chunks:
        result = await loop.run_in_executor(executor, _sync_simplify_chunk, chunk, level)
        results.append(result)
    return "\n\n".join(results)


def _sync_simplify_chunk(text: str, level: str) -> str:
    return "".join(v for _, v in stream_simplify(text, level) if _ == "token")