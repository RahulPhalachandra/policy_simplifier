from fastapi import UploadFile
import fitz  # PyMuPDF
import docx
import io
import os

async def extract_text_from_file(file: UploadFile) -> str:
    filename = file.filename.lower()
    content = await file.read()
    
    if filename.endswith('.pdf'):
        return extract_from_pdf(content)
    elif filename.endswith('.docx'):
        return extract_from_docx(content)
    elif filename.endswith('.txt'):
        return content.decode('utf-8', errors='ignore')
    else:
        raise ValueError(f"Unsupported file type: {filename}")

def extract_from_pdf(content: bytes) -> str:
    doc = fitz.open(stream=content, filetype="pdf")
    text = ""
    
    for page in doc:
        text += page.get_text()
    
    return text.strip()

def extract_from_docx(content: bytes) -> str:
    doc = docx.Document(io.BytesIO(content))
    text = ""
    
    for para in doc.paragraphs:
        text += para.text + "\n"
    
    return text.strip()

def extract_from_txt(content: bytes) -> str:
    return content.decode('utf-8', errors='ignore').strip()

if __name__ == "__main__":
    # Test PDF extraction
    pass