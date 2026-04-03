import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="sticky top-4 z-50 mx-4">
      <div className="flex items-center justify-between px-6 py-3 bg-paper/90 backdrop-blur-2xl border-2 border-ink rounded-brutal">
        <Link to="/" className="flex items-center gap-1 font-display text-xl tracking-tight text-ink hover:text-acid transition-colors">
          EASYTERMS<span className="text-acid">.</span>
        </Link>
        
        <div className="flex items-center gap-6">
          <Link to="/" className="font-body text-sm uppercase tracking-wider text-ink hover:text-acid transition-colors">
            Home
          </Link>
          <Link to="/app" className="font-body text-sm uppercase tracking-wider text-ink hover:text-acid transition-colors">
            App
          </Link>
          <Link to="/about" className="font-body text-sm uppercase tracking-wider text-ink hover:text-acid transition-colors">
            About
          </Link>
          <Link 
            to="/app" 
            className="px-4 py-2 font-body text-sm uppercase tracking-wider bg-ink text-acid border-2 border-ink rounded-brutal shadow-hard-sm hover:bg-acid hover:text-ink transition-colors btn-press"
          >
            Try It
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar