import React, { useState } from 'react'
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx'
import { saveAs } from 'file-saver'
import ComplexityBadge from './ComplexityBadge'
import KeywordTooltip from './KeywordTooltip'

const OutputPanel = ({ result, loading, streamingText, originalText, progress }) => {
  const [showOriginal, setShowOriginal] = useState(false)
  const [copied, setCopied] = useState(false)

  const displayText = result?.simplified || streamingText || ''

  // ── Copy ──────────────────────────────────────────────────────────────────
  const handleCopy = () => {
    if (displayText) {
      navigator.clipboard.writeText(displayText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // ── Download TXT ──────────────────────────────────────────────────────────
  const handleDownloadTxt = () => {
    if (!displayText) return
    const blob = new Blob([displayText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'simplified-document.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  // ── Download DOCX ─────────────────────────────────────────────────────────
  const handleDownloadDocx = async () => {
    if (!displayText) return

    // Parse lines into DOCX paragraphs
    const lines = displayText.split('\n')
    const docParagraphs = lines.map((line) => {
      const trimmed = line.trim()
      // Markdown-style headings
      if (trimmed.startsWith('### ')) {
        return new Paragraph({
          text: trimmed.slice(4),
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 200, after: 120 },
        })
      }
      if (trimmed.startsWith('## ')) {
        return new Paragraph({
          text: trimmed.slice(3),
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 280, after: 120 },
        })
      }
      if (trimmed.startsWith('# ')) {
        return new Paragraph({
          text: trimmed.slice(2),
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 320, after: 160 },
        })
      }
      // Bullet points
      if (trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
        return new Paragraph({
          bullet: { level: 0 },
          children: [new TextRun({ text: trimmed.slice(2), size: 24 })],
          spacing: { after: 80 },
        })
      }
      // Bold (**text**)
      const boldRegex = /\*\*(.+?)\*\*/g
      const parts = []
      let last = 0
      let match
      while ((match = boldRegex.exec(trimmed)) !== null) {
        if (match.index > last) parts.push(new TextRun({ text: trimmed.slice(last, match.index), size: 24 }))
        parts.push(new TextRun({ text: match[1], bold: true, size: 24 }))
        last = match.index + match[0].length
      }
      if (last < trimmed.length) parts.push(new TextRun({ text: trimmed.slice(last), size: 24 }))

      return new Paragraph({
        children: parts.length ? parts : [new TextRun({ text: trimmed || '', size: 24 })],
        spacing: { after: 120 },
        alignment: AlignmentType.LEFT,
      })
    })

    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            text: 'Simplified Document',
            heading: HeadingLevel.TITLE,
            spacing: { after: 400 },
          }),
          ...docParagraphs,
        ],
      }],
    })

    const blob = await Packer.toBlob(doc)
    saveAs(blob, 'simplified-document.docx')
  }

  // ── Keyword highlight ─────────────────────────────────────────────────────
  const highlightKeywords = (text, keywords) => {
    if (!keywords || keywords.length === 0) return text
    let highlighted = text
    keywords.forEach((kw) => {
      const regex = new RegExp(`\\b(${kw.term})\\b`, 'gi')
      highlighted = highlighted.replace(
        regex,
        `<span class="relative inline-block keyword-highlight" data-term="${kw.term}" data-definition="${kw.definition}">$1</span>`
      )
    })
    return highlighted
  }

  // ── Streaming / loading state ─────────────────────────────────────────────
  if (loading || streamingText) {
    return (
      <div className="bg-paper border-2 border-ink rounded-brutal-lg shadow-hard p-6 h-full flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl uppercase">Output</h2>
          {loading && !streamingText && (
            <span className="font-mono text-xs uppercase text-ink/50 animate-pulse">Connecting...</span>
          )}
          {progress && (
            <span className="font-mono text-xs uppercase text-acid bg-ink px-2 py-1 rounded">
              Chunk {progress.current}/{progress.total}
            </span>
          )}
        </div>

        {streamingText ? (
          <div className="flex-1 overflow-y-auto">
            <p className="font-body text-base leading-relaxed whitespace-pre-wrap text-ink">
              {streamingText}
              <span className="inline-block w-2 h-4 bg-acid ml-0.5 animate-pulse align-middle" />
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-80">
            <div className="font-display text-2xl uppercase mb-4 glitch-hover">SIMPLIFYING...</div>
            <div className="space-y-2">
              <div className="w-64 h-4 bg-ink/10 rounded skeleton" />
              <div className="w-48 h-4 bg-ink/10 rounded skeleton" />
              <div className="w-56 h-4 bg-ink/10 rounded skeleton" />
            </div>
          </div>
        )}
      </div>
    )
  }

  // ── Empty state ───────────────────────────────────────────────────────────
  if (!result) {
    return (
      <div className="bg-paper border-2 border-ink rounded-brutal-lg shadow-hard p-6 h-full">
        <h2 className="font-display text-xl uppercase mb-4">Output</h2>
        <div className="flex flex-col items-center justify-center h-96 border-2 border-dashed border-ink/30 rounded-brutal">
          <svg className="w-16 h-16 text-ink/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="font-body text-ink/50 text-center">Your simplified document will appear here.</p>
        </div>
      </div>
    )
  }

  // ── Result state ──────────────────────────────────────────────────────────
  return (
    <div className="bg-paper border-2 border-ink rounded-brutal-lg shadow-hard p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-xl uppercase">Output</h2>
        <ComplexityBadge score={result.complexity_score} label={result.complexity_label} />
      </div>

      {/* Simplified text */}
      <div className="prose max-w-none mb-6">
        <p
          className="font-body text-base leading-relaxed whitespace-pre-wrap"
          dangerouslySetInnerHTML={{
            __html: highlightKeywords(result.simplified, result.keywords),
          }}
        />
      </div>

      {/* Keyword glossary */}
      {result.keywords && result.keywords.length > 0 && (
        <div className="mb-6">
          <h4 className="font-display text-sm uppercase mb-3">Glossary</h4>
          <div className="flex flex-wrap gap-2">
            {result.keywords.map((kw, i) => (
              <KeywordTooltip key={i} term={kw.term} definition={kw.definition} />
            ))}
          </div>
        </div>
      )}

      {/* Original text toggle */}
      {originalText && (
        <div className="mb-6">
          <button
            onClick={() => setShowOriginal(!showOriginal)}
            className="font-body text-sm uppercase tracking-wider text-ink/60 hover:text-ink flex items-center gap-2"
          >
            {showOriginal ? '▲' : '▼'} View Original
          </button>
          {showOriginal && (
            <div className="mt-3 p-4 bg-ink/5 border-2 border-ink/20 rounded-brutal">
              <p className="font-body text-sm text-ink/70 whitespace-pre-wrap">{originalText}</p>
            </div>
          )}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-3 flex-wrap">
        <button
          id="copy-btn"
          onClick={handleCopy}
          className="flex-1 min-w-[120px] px-4 py-3 font-body text-sm uppercase tracking-wider bg-transparent text-ink border-2 border-ink rounded-brutal shadow-hard-sm btn-press hover:bg-acid transition-colors"
        >
          {copied ? '✓ Copied!' : 'Copy Text'}
        </button>
        <button
          id="download-txt-btn"
          onClick={handleDownloadTxt}
          className="flex-1 min-w-[120px] px-4 py-3 font-body text-sm uppercase tracking-wider bg-transparent text-ink border-2 border-ink rounded-brutal shadow-hard-sm btn-press hover:bg-acid transition-colors"
        >
          ↓ TXT
        </button>
        <button
          id="download-docx-btn"
          onClick={handleDownloadDocx}
          className="flex-1 min-w-[120px] px-4 py-3 font-body text-sm uppercase tracking-wider bg-ink text-acid border-2 border-ink rounded-brutal shadow-hard-sm btn-press hover:bg-acid hover:text-ink transition-colors"
        >
          ↓ DOCX
        </button>
      </div>
    </div>
  )
}

export default OutputPanel