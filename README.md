# EasyTerms - AI Document Simplifier

An AI-powered web application that converts complex legal, financial, and government documents into plain, easy-to-understand language.

## 🎨 Design System

This project uses a strict **Neo-Brutalist "Acid"** aesthetic:
- **Colors**: Paper (#F8F4E8), Ink (#09090B), Acid (#D2E823)
- **Typography**: Dela Gothic One (headings), Space Grotesk (body), JetBrains Mono (code)
- **Shadows**: Hard block shadows (no blur)
- **Borders**: 2px solid ink on everything
- **Animations**: Glitch effect, floating badges, marquee ticker, custom cursor

## 🛠️ Tech Stack

### Frontend
- React + Vite
- Tailwind CSS
- Axios (API calls)

### Backend
- FastAPI (Python)
- T5-base (Hugging Face) for text simplification
- PyMuPDF (PDF extraction)
- python-docx (DOCX extraction)
- textstat (complexity scoring)

## 📁 Project Structure

```
easyterms/
├── frontend/
│   ├── public/
│   │   └── vite.svg
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── AppPage.jsx
│   │   │   └── About.jsx
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── MarqueeStrip.jsx
│   │   │   ├── HardButton.jsx
│   │   │   ├── CustomCursor.jsx
│   │   │   ├── UploadZone.jsx
│   │   │   ├── OutputPanel.jsx
│   │   │   ├── ComplexityBadge.jsx
│   │   │   └── KeywordTooltip.jsx
│   │   ├── styles/
│   │   │   └── globals.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── vite.config.js
├── backend/
│   ├── main.py
│   ├── simplifier.py
│   ├── extractor.py
│   ├── complexity.py
│   └── requirements.txt
└── README.md
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js 18+
- Python 3.11+

### Backend Setup

```bash
cd easyterms/backend
pip install -r requirements.txt

# Start the backend server
python main.py
```

The API will be available at `http://localhost:8000`

### Frontend Setup

```bash
cd easyterms/frontend
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`

## 📡 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check |
| `/upload` | POST | Upload PDF/DOCX/TXT file |
| `/simplify` | POST | Simplify text |

### Simplify Request
```json
{
  "text": "Your complex legal document here..."
}
```

### Simplify Response
```json
{
  "original": "Original text...",
  "simplified": "Simplified text...",
  "complexity_score": 87,
  "complexity_label": "HIGH",
  "keywords": [
    {"term": "indemnify", "definition": "to protect from responsibility"}
  ]
}
```

## 🎯 Features

- **Paste or Upload**: Enter text directly or upload PDF/DOCX/TXT files
- **AI Simplification**: Uses T5-base model to rewrite complex text
- **Complexity Score**: Shows readability metrics (Flesch-Kincaid)
- **Keyword Glossary**: Highlights and explains difficult terms
- **Copy & Download**: Export simplified text as TXT
- **View Original**: Compare simplified vs original text

## 📝 License

MIT