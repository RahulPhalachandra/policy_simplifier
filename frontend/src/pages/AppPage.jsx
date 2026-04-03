import React, { useState, useRef } from 'react'
import UploadZone from '../components/UploadZone'
import OutputPanel from '../components/OutputPanel'

const LEVELS = [
  { id: 'simple',  label: '👦 Simple',  desc: 'Grade 6 level' },
  { id: 'general', label: '🧑 General', desc: 'Plain English' },
  { id: 'expert',  label: '📚 Expert',  desc: 'Keep terminology' },
]

const AppPage = () => {
  const [inputMode, setInputMode] = useState('paste')
  const [text, setText] = useState('')
  const [file, setFile] = useState(null)
  const [level, setLevel] = useState('general')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [streamingText, setStreamingText] = useState('')
  const [progress, setProgress] = useState(null) // { current, total }
  const [error, setError] = useState(null)
  const abortRef = useRef(null)

  const handleSimplify = async () => {
    const inputText = text
    if (!inputText.trim()) {
      setError(inputMode === 'upload' ? 'Please upload a file first' : 'Please enter some text')
      return
    }

    // Cancel any previous stream
    if (abortRef.current) abortRef.current.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setLoading(true)
    setError(null)
    setResult(null)
    setStreamingText('')
    setProgress(null)

    try {
      const response = await fetch('/api/simplify/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText, level }),
        signal: controller.signal,
      })

      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.detail || 'Simplification failed')
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let meta = null
      let accumulated = ''
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() // keep incomplete last line

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          try {
            const evt = JSON.parse(line.slice(6))
            if (evt.type === 'meta') {
              meta = evt
            } else if (evt.type === 'progress') {
              setProgress({ current: evt.current, total: evt.total })
            } else if (evt.type === 'token') {
              accumulated += evt.content
              setStreamingText(accumulated)
            } else if (evt.type === 'done') {
              // Finalize result
              if (meta) {
                setResult({
                  original: meta.original,
                  simplified: accumulated,
                  complexity_score: meta.complexity_score,
                  complexity_label: meta.complexity_label,
                  keywords: meta.keywords,
                })
              }
              setLoading(false)
              setProgress(null)
            }
          } catch (_) { /* skip malformed lines */ }
        }
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message || 'Failed to simplify. Please try again.')
        setLoading(false)
      }
    }
  }

  const handleFileUpload = async (uploadedFile) => {
    setFile(uploadedFile)
    if (uploadedFile.type.startsWith('text/') || uploadedFile.name.endsWith('.txt')) {
      const reader = new FileReader()
      reader.onload = (e) => setText(e.target.result)
      reader.readAsText(uploadedFile)
    } else {
      try {
        const formData = new FormData()
        formData.append('file', uploadedFile)
        const res = await fetch('/api/upload', { method: 'POST', body: formData })
        const data = await res.json()
        if (!res.ok) throw new Error(data.detail || 'Extraction failed')
        setText(data.text)
      } catch (err) {
        setError('Failed to extract text from file: ' + err.message)
      }
    }
  }

  const wordCount = text.trim().split(/\s+/).filter(w => w).length
  const charCount = text.length

  return (
    <div className="min-h-screen px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-display text-4xl lg:text-5xl uppercase mb-8 glitch-hover">
          Simplify Your Document
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ── Left Panel ── */}
          <div className="bg-paper border-2 border-ink rounded-brutal-lg shadow-hard p-6">
            <h2 className="font-display text-xl uppercase mb-4">Input</h2>

            {/* Input mode toggle */}
            <div className="flex gap-2 mb-5">
              {['paste', 'upload'].map(mode => (
                <button
                  key={mode}
                  onClick={() => setInputMode(mode)}
                  className={`px-4 py-2 font-body text-sm uppercase tracking-wider border-2 border-ink rounded-brutal transition-colors ${
                    inputMode === mode ? 'bg-acid text-ink' : 'bg-transparent text-ink hover:bg-acid/20'
                  }`}
                >
                  {mode === 'paste' ? 'Paste Text' : 'Upload File'}
                </button>
              ))}
            </div>

            {/* Reading level selector */}
            <div className="mb-5">
              <p className="font-mono text-xs uppercase tracking-wider text-ink/50 mb-2">Reading Level</p>
              <div className="flex gap-2">
                {LEVELS.map(lvl => (
                  <button
                    key={lvl.id}
                    onClick={() => setLevel(lvl.id)}
                    title={lvl.desc}
                    className={`flex-1 px-3 py-2 font-body text-sm border-2 border-ink rounded-brutal transition-all ${
                      level === lvl.id
                        ? 'bg-ink text-acid shadow-hard-sm'
                        : 'bg-transparent text-ink hover:bg-acid/20'
                    }`}
                  >
                    {lvl.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input area */}
            {inputMode === 'paste' ? (
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your legal, financial, or government document here..."
                className="w-full h-72 p-4 font-body text-sm border-2 border-ink rounded-brutal focus:outline-none focus:border-acid resize-none"
              />
            ) : (
              <UploadZone onFileUpload={handleFileUpload} />
            )}

            {/* Stats + button */}
            <div className="mt-4 flex items-center justify-between">
              <div className="font-mono text-xs text-ink/60 uppercase">
                {wordCount} words · {charCount} chars
              </div>
              <button
                id="simplify-btn"
                onClick={handleSimplify}
                disabled={loading || !text.trim()}
                className="px-8 py-3 font-display text-sm uppercase tracking-wider bg-ink text-acid border-2 border-ink rounded-brutal shadow-hard btn-press hover:bg-acid hover:text-ink transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Simplifying...' : 'Simplify Now'}
              </button>
            </div>

            {/* Progress indicator */}
            {progress && (
              <div className="mt-4">
                <div className="flex justify-between font-mono text-xs uppercase text-ink/60 mb-1">
                  <span>Processing chunk {progress.current} of {progress.total}</span>
                  <span>{Math.round((progress.current / progress.total) * 100)}%</span>
                </div>
                <div className="w-full h-2 bg-ink/10 border border-ink/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-acid transition-all duration-300"
                    style={{ width: `${(progress.current / progress.total) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {error && (
              <div className="mt-4 p-3 bg-red-100 border-2 border-red-500 rounded-brutal font-body text-sm text-red-700">
                {error}
              </div>
            )}
          </div>

          {/* ── Right Panel ── */}
          <OutputPanel
            result={result}
            loading={loading}
            streamingText={streamingText}
            originalText={text}
            progress={progress}
          />
        </div>
      </div>
    </div>
  )
}

export default AppPage