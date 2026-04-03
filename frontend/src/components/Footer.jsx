import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-ink text-paper py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-display text-2xl mb-2">EASYTERMS<span className="text-acid">.</span></h3>
            <p className="font-body text-sm text-paper/70">
              AI-powered document simplifier that converts complex legal, financial, and government documents into plain, easy-to-understand language.
            </p>
          </div>
          
          <div>
            <h4 className="font-body text-sm uppercase tracking-wider mb-4 text-acid">Links</h4>
            <div className="flex flex-col gap-2">
              <Link to="/" className="font-body text-sm uppercase tracking-wider hover:text-acid transition-colors">Home</Link>
              <Link to="/app" className="font-body text-sm uppercase tracking-wider hover:text-acid transition-colors">App</Link>
              <Link to="/about" className="font-body text-sm uppercase tracking-wider hover:text-acid transition-colors">About</Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-body text-sm uppercase tracking-wider mb-4 text-acid">Newsletter</h4>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email" 
                className="flex-1 px-4 py-2 bg-transparent border-2 border-paper text-paper font-body text-sm placeholder:text-paper/50 focus:outline-none focus:border-acid"
              />
              <button 
                type="submit" 
                className="px-4 py-2 bg-acid text-ink font-body text-sm uppercase tracking-wider border-2 border-acid hover:bg-transparent hover:text-acid transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-paper/20 text-center">
          <p className="font-mono text-xs text-paper/50">
            © 2024 EasyTerms. Built with AI.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer