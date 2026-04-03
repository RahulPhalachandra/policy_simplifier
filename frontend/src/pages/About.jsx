import React from 'react'

const About = () => {
  return (
    <div className="min-h-screen px-6 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero */}
        <section className="py-16">
          <h1 className="font-display text-5xl lg:text-7xl uppercase text-center glitch-hover">
            WHY <span className="text-acid">EASYTERMS</span>?
          </h1>
        </section>

        {/* Mission Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-12">
          <div>
            <h2 className="font-display text-3xl uppercase mb-6">Our Mission</h2>
            <p className="font-body text-lg text-ink/80 leading-relaxed mb-4">
              EasyTerms was born from a simple observation: legal, financial, and government documents are written to exclude people, not to inform them.
            </p>
            <p className="font-body text-lg text-ink/80 leading-relaxed mb-4">
              We believe that access to understanding is a fundamental right. Our AI-powered platform transforms complex documents into plain, accessible language—empowering everyone to understand what they're signing, agreeing to, or entitled to.
            </p>
            <p className="font-body text-lg text-ink/80 leading-relaxed">
              Whether you're a homeowner reviewing a mortgage contract, a small business owner parsing regulatory documents, or a citizen navigating government forms—EasyTerms is here to translate the impossible into the understandable.
            </p>
          </div>
          
          <div className="flex items-center justify-center">
            <div className="p-8 bg-acid border-2 border-ink rounded-brutal-lg shadow-hard-lg floating">
              <h3 className="font-display text-xl uppercase mb-6 text-center">Tech Stack</h3>
              <div className="flex flex-wrap gap-3 justify-center">
                {[
                  { name: 'T5-Base', desc: 'Text Simplification' },
                  { name: 'FastAPI', desc: 'Backend' },
                  { name: 'React', desc: 'Frontend' },
                  { name: 'Tailwind', desc: 'Styling' },
                  { name: 'textstat', desc: 'Readability' },
                  { name: 'PyMuPDF', desc: 'PDF Parsing' },
                ].map((tech, i) => (
                  <div key={i} className="px-4 py-2 bg-paper border-2 border-ink rounded-full shadow-hard-sm">
                    <span className="font-mono text-xs uppercase">{tech.name}</span>
                    <span className="font-mono text-xs text-ink/50 ml-2">— {tech.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Problem/Solution Bento */}
        <section className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* The Problem */}
            <div className="bg-ink text-paper border-2 border-ink rounded-brutal-lg shadow-hard-lg p-8 card-hover">
              <h3 className="font-display text-3xl uppercase mb-4 text-paper">THE PROBLEM</h3>
              <ul className="font-body text-paper/80 space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-acid">✦</span>
                  <span>Complex legal jargon excludes everyday people</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-acid">✦</span>
                  <span>Financial documents are intentionally difficult to understand</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-acid">✦</span>
                  <span>Government forms require professional translation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-acid">✦</span>
                  <span>Misunderstanding contracts leads to costly mistakes</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-acid">✦</span>
                  <span>Only lawyers and experts can navigate these documents</span>
                </li>
              </ul>
            </div>
            
            {/* The Solution */}
            <div className="bg-acid text-ink border-2 border-ink rounded-brutal-lg shadow-hard-lg p-8 card-hover">
              <h3 className="font-display text-3xl uppercase mb-4">THE SOLUTION</h3>
              <ul className="font-body text-ink/80 space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-ink">✦</span>
                  <span>AI-powered text simplification in seconds</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-ink">✦</span>
                  <span>Preserves all original meaning—no information loss</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-ink">✦</span>
                  <span>Keyword glossary explains technical terms</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-ink">✦</span>
                  <span>Complexity score shows how much we simplified</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-ink">✦</span>
                  <span>100% free and open to everyone</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 text-center">
          <h2 className="font-display text-4xl uppercase mb-6">Ready to understand?</h2>
          <p className="font-body text-lg text-ink/70 mb-8">
            Start simplifying your documents today. No sign-up required.
          </p>
          <a 
            href="/app"
            className="inline-block px-8 py-4 font-display text-lg uppercase tracking-wider bg-ink text-acid border-2 border-ink rounded-brutal shadow-hard btn-press hover:bg-acid hover:text-ink transition-colors"
          >
            Try It Now →
          </a>
        </section>
      </div>
    </div>
  )
}

export default About