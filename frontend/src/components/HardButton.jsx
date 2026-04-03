import React from 'react'

const HardButton = ({ children, onClick, variant = 'primary', className = '', disabled = false }) => {
  const baseClasses = "px-6 py-3 font-display text-sm uppercase tracking-wider border-2 border-ink rounded-brutal shadow-hard btn-press transition-all"
  
  const variants = {
    primary: "bg-ink text-acid hover:bg-acid hover:text-ink",
    secondary: "bg-acid text-ink hover:bg-ink hover:text-acid",
    outline: "bg-transparent text-ink hover:bg-acid",
  }
  
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  )
}

export default HardButton