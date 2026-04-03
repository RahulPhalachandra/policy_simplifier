import React from 'react'

const ComplexityBadge = ({ score, label }) => {
  const colors = {
    LOW: 'bg-green-200',
    MEDIUM: 'bg-yellow-200',
    HIGH: 'bg-acid',
  }

  const getComplexityLabel = () => {
    if (!label) return `Score: ${score}`
    return `${label} COMPLEXITY → SIMPLIFIED`
  }

  return (
    <div className={`px-4 py-2 border-2 border-ink rounded-full shadow-hard-sm ${colors[label] || colors.HIGH}`}>
      <span className="font-mono text-xs uppercase tracking-wider text-ink">
        {getComplexityLabel()}
      </span>
    </div>
  )
}

export default ComplexityBadge