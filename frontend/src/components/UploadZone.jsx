import React, { useState, useRef } from 'react'

const UploadZone = ({ onFileUpload }) => {
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState(null)
  const fileInputRef = useRef(null)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      handleFile(droppedFile)
    }
  }

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      handleFile(selectedFile)
    }
  }

  const handleFile = (file) => {
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']
    const validExtensions = ['.pdf', '.docx', '.txt']
    const extension = '.' + file.name.split('.').pop().toLowerCase()
    
    if (validTypes.includes(file.type) || validExtensions.includes(extension)) {
      setFile(file)
      onFileUpload(file)
    } else {
      alert('Please upload a PDF, DOCX, or TXT file')
    }
  }

  return (
    <div className="relative">
      {!file ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`h-96 border-2 border-dashed border-ink rounded-brutal-lg flex flex-col items-center justify-center cursor-pointer transition-colors ${
            isDragging ? 'bg-acid/20' : 'hover:bg-acid/10'
          }`}
        >
          <svg 
            className="w-16 h-16 mb-4 text-ink/50" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
            />
          </svg>
          <p className="font-body text-sm text-ink/70 mb-2">
            Drag and drop your file here
          </p>
          <p className="font-mono text-xs text-ink/50 uppercase">
            PDF, DOCX, TXT
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,.txt"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      ) : (
        <div className="h-96 border-2 border-ink rounded-brutal-lg p-4 flex items-center justify-center">
          <div className="flex items-center gap-4 px-6 py-4 bg-acid border-2 border-ink rounded-brutal shadow-hard-sm">
            <svg className="w-8 h-8 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="font-body text-sm font-medium text-ink">{file.name}</span>
            <button 
              onClick={(e) => {
                e.stopPropagation()
                setFile(null)
              }}
              className="ml-4 px-2 py-1 bg-ink text-paper font-mono text-xs rounded hover:bg-red-600 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UploadZone