import React, { useState, useEffect, useRef } from 'react'
import Header from './components/layout/Header'
import Hero from './sections/Hero'
import About from './sections/About'
import Experience from './sections/Experience'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Contact from './sections/Contact'
import Footer from './components/layout/Footer'
import ScrollIndicator from './components/ui/ScrollIndicator'
import LoadingScreen from './components/ui/LoadingScreen'
import { pageTransition, prefersReducedMotion } from './utils/animations'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const appRef = useRef<HTMLDivElement>(null)

  // Handle loading completion
  const handleLoadingComplete = () => {
    setIsLoading(false)
    
    // Animate main content entrance
    setTimeout(() => {
      setShowContent(true)
      if (appRef.current) {
        pageTransition.enter(appRef.current)
      }
    }, 100)
  }

  useEffect(() => {
    // Skip loading animation if user prefers reduced motion
    if (prefersReducedMotion()) {
      setIsLoading(false)
      setShowContent(true)
      return
    }

    // Auto-complete loading after maximum time (fallback)
    const maxLoadingTime = setTimeout(handleLoadingComplete, 5000)

    return () => clearTimeout(maxLoadingTime)
  }, [])

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />
  }

  return (
    <div
      ref={appRef}
      className={`min-h-screen bg-gray-50 ${showContent ? 'opacity-100' : 'opacity-0'}`}
      style={{ willChange: 'opacity, transform' }}
    >
      {/* Scroll Progress Indicator */}
      <ScrollIndicator />
      
      {/* Navigation Header */}
      <Header />
      
      {/* Main Content */}
      <main className="relative">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App