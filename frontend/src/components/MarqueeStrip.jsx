import React from 'react'

const MarqueeStrip = () => {
  const text = "LEGAL JARGON ✦ SIMPLIFIED ✦ PLAIN ENGLISH ✦ AI-POWERED ✦ INSTANT RESULTS ✦ FREE TO USE ✦ "
  
  return (
    <div className="bg-ink overflow-hidden py-4 border-y-2 border-ink">
      <div className="marquee-animate whitespace-nowrap">
        <span className="font-display text-acid text-xl inline-block">
          {text}{text}
        </span>
      </div>
    </div>
  )
}

export default MarqueeStrip