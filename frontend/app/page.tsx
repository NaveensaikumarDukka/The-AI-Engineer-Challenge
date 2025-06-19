'use client'

import { useState, useEffect } from 'react'
import MatrixRain from '../components/MatrixRain'
import Terminal from '../components/Terminal'

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)

  useEffect(() => {
    // Simulate loading time for dramatic effect
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 1000)

    // Hide welcome message after 3 seconds
    const welcomeTimer = setTimeout(() => {
      setShowWelcome(false)
    }, 3000)

    return () => {
      clearTimeout(timer)
      clearTimeout(welcomeTimer)
    }
  }, [])

  return (
    <main className="min-h-screen bg-matrix-black relative overflow-hidden">
      {/* Matrix Rain Background */}
      <MatrixRain />
      
      {/* Welcome Message */}
      {showWelcome && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-matrix-black">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-matrix text-matrix-green mb-4 animate-glow">
              MATRIX TERMINAL
            </h1>
            <p className="text-lg md:text-xl text-matrix-green-dark mb-8 animate-fade-in">
              Welcome to The AI Engineer Challenge
            </p>
            <div className="loading-dots text-matrix-green text-xl">
              Initializing system
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      {isLoaded && (
        <div className="relative z-10 min-h-screen flex flex-col">
          {/* Header */}
          <header className="p-4 md:p-6">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-4 md:mb-0">
                  <h1 className="text-2xl md:text-3xl font-matrix text-matrix-green animate-glow">
                    MATRIX TERMINAL
                  </h1>
                  <p className="text-sm md:text-base text-matrix-green-dark">
                    The AI Engineer Challenge Interface
                  </p>
                </div>
                
                {/* Status Bar */}
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-matrix-green rounded-full animate-pulse"></span>
                    <span className="text-matrix-green">SYSTEM ONLINE</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-matrix-green-dark">TIME:</span>
                    <span className="text-matrix-green font-matrix">
                      {new Date().toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Terminal Section */}
          <main className="flex-1 p-4 md:p-6">
            <div className="max-w-6xl mx-auto h-full">
              <div className="terminal grow-box h-full">
                <div className="terminal-header">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-matrix-green">●</span>
                      <span className="text-matrix-green font-matrix">matrix-terminal</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-matrix-green-dark">AI ENGINE:</span>
                      <span className="text-matrix-green">READY</span>
                    </div>
                  </div>
                </div>
                
                <div className="terminal-content">
                  <Terminal />
                </div>
              </div>
            </div>
          </main>

          {/* Footer */}
          <footer className="p-4 md:p-6 border-t border-matrix-green/20">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between text-sm">
                <div className="mb-2 md:mb-0">
                  <span className="text-matrix-green-dark">
                    © 2024 The AI Engineer Challenge
                  </span>
                </div>
                <div className="flex flex-wrap gap-4">
                  <span className="text-matrix-green-dark">VERSION:</span>
                  <span className="text-matrix-green">1.0.0</span>
                  <span className="text-matrix-green-dark">BUILD:</span>
                  <span className="text-matrix-green">MATRIX-2024</span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      )}
    </main>
  )
} 