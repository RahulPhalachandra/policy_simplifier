import React from 'react'
import { Link } from 'react-router-dom'
import MarqueeStrip from '../components/MarqueeStrip'
import HardButton from '../components/HardButton'

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="min-h-[80vh] grid grid-cols-1 lg:grid-cols-12 gap-8 px-6 py-12">
        <div className="lg:col-span-7 flex flex-col justify-center">
          <h1 className="font-display text-6xl lg:text-8xl leading-[0.85] uppercase mb-6 glitch-hover cursor-default">
            MAKE ANY<br/>DOCUMENT<br/><span className="text-acid">HUMAN.</span>
          </h1>
          <p className="font-body text-lg text-ink/80 max-w-xl mb-8">
            Paste or upload complex legal, financial, or government text — EasyTerms turns it into plain language instantly.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/app">
              <HardButton variant="primary">
                Simplify Now →
              </HardButton>
            </Link>
            <div className="floating px-4 py-2 bg-acid border-2 border-ink rounded-full shadow-hard-sm -rotate-2">
              <span className="font-body text-sm font-bold uppercase">AI-Powered ✦</span>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-5 flex items-center justify-center">
          <div className="relative">
            <div className="w-full max-w-md aspect-[4/5] bg-paper border-2 border-ink rounded-brutal-lg shadow-hard-lg p-6">
              <div className="space-y-2">
                <div className="h-3 bg-ink/20 rounded w-3/4"></div>
                <div className="h-3 bg-ink/20 rounded w-full"></div>
                <div className="h-3 bg-ink/20 rounded w-5/6"></div>
                <div className="h-3 bg-ink/20 rounded w-2/3"></div>
                <div className="h-3 bg-ink/20 rounded w-full"></div>
                <div className="h-3 bg-ink/20 rounded w-4/5"></div>
              </div>
              <div className="mt-6 pt-6 border-t-2 border-ink">
                <div className="h-3 bg-acid/30 rounded w-full"></div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-acid border-2 border-ink rounded-brutal px-4 py-3 shadow-hard floating">
              <div className="flex items-center gap-2">
                <span className="font-body text-xs uppercase tracking-wider text-ink">Complexity:</span>
                <span className="font-display text-sm text-ink">HIGH → SIMPLE</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Strip */}
      <MarqueeStrip />

      {/* Bento Feature Grid */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Large Card */}
            <div className="md:col-span-2 md:row-span-2 bg-ink text-paper border-2 border-ink rounded-brutal-lg shadow-hard-lg p-8 relative overflow-hidden card-hover">
              <div className="absolute top-0 right-0 w-64 h-64 bg-paper/5 rounded-full mix-blend-overlay translate-x-20 -translate-y-20"></div>
              <h3 className="font-display text-3xl uppercase mb-4 relative z-10">UNDERSTAND EVERY WORD</h3>
              <p className="font-body text-paper/80 max-w-md relative z-10">
                Our AI analyzes complex legal jargon, financial terms, and government speak, breaking them down into simple, everyday language that anyone can understand.
              </p>
            </div>
            
            {/* Small Card 1 - Complexity Score */}
            <div className="bg-acid dot-pattern border-2 border-ink rounded-brutal-lg shadow-hard p-6 card-hover">
              <h4 className="font-display text-lg uppercase mb-4">Complexity Score</h4>
              <div className="flex items-center justify-center">
                <div className="relative w-32 h-16">
                  <div className="absolute bottom-0 left-0 right-0 h-4 bg-ink rounded"></div>
                  <div className="absolute bottom-4 left-1/2 w-1 h-12 bg-ink -translate-x-1/2"></div>
                  <div className="absolute bottom-12 left-1/2 w-6 h-6 bg-ink rounded-full -translate-x-1/2"></div>
                  <span className="absolute bottom-16 left-1/2 font-mono text-xs text-ink -translate-x-1/2">87</span>
                </div>
              </div>
              <p className="font-body text-xs uppercase text-center mt-2 text-ink/60">HIGH COMPLEXITY</p>
            </div>
            
            {/* Small Card 2 - Keywords */}
            <div className="bg-paper border-2 border-ink rounded-brutal-lg shadow-hard p-6 card-hover">
              <h4 className="font-display text-lg uppercase mb-4">Key Terms</h4>
              <div className="flex flex-wrap gap-2">
                {['Indemnify', 'Liability', 'Statute', 'Jurisdiction'].map((term, i) => (
                  <span key={i} className="px-3 py-1 bg-acid border-2 border-ink rounded-full font-mono text-xs">
                    {term}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-16 bg-paper">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-4xl uppercase mb-12 text-center glitch-hover">How It Works</h2>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {[
              { num: '01', title: 'Upload', desc: 'Paste or upload your document' },
              { num: '02', title: 'Analyze', desc: 'AI scores complexity instantly' },
              { num: '03', title: 'Simplify', desc: 'Transforms into plain English' },
              { num: '04', title: 'Read', desc: 'Understand every word' },
            ].map((step, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div className="w-24 h-24 bg-acid border-2 border-ink rounded-brutal-lg shadow-hard flex items-center justify-center mb-4 card-hover">
                  <span className="font-display text-3xl text-ink">{step.num}</span>
                </div>
                <h3 className="font-display text-xl uppercase mb-2">{step.title}</h3>
                <p className="font-body text-sm text-ink/60 text-center">{step.desc}</p>
                {i < 3 && (
                  <div className="hidden md:block absolute right-0 top-1/2 w-16 h-0.5 bg-ink" style={{ left: 'calc(25% * ' + i + ' + 6rem)' }}></div>
                )}
              </div>
            ))}
          </div>
          
          {/* Dashed line connector */}
          <div className="hidden md:block relative mt-8">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 border-t-2 border-dashed border-ink -translate-y-1/2"></div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl lg:text-5xl uppercase mb-6 glitch-hover">
            Ready to simplify?
          </h2>
          <p className="font-body text-lg text-ink/70 mb-8">
            Transform any complex document into plain, understandable language in seconds.
          </p>
          <Link to="/app">
            <HardButton variant="primary" className="text-lg px-8 py-4">
              Start Simplifying →
            </HardButton>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home