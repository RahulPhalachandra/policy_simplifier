import React, { useState } from 'react'

const KeywordTooltip = ({ term, definition }) => {
  const [show, setShow] = useState(false)

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <span 
        className="px-3 py-1 bg-paper border-b-2 border-acid font-mono text-xs cursor-help hover:bg-acid/20 transition-colors"
      >
        {term}
      </span>
      
      {show && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-paper border-2 border-ink rounded-brutal shadow-hard z-50">
          <p className="font-body text-xs text-ink">{definition}</p>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-3 h-3 bg-paper border-r-2 border-b-2 border-ink"></div>
        </div>
      )}
    </div>
  )
}

export default KeywordTooltip