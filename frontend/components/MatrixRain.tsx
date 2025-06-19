'use client'

import { useEffect, useRef } from 'react'

interface MatrixCharacter {
  char: string
  x: number
  y: number
  speed: number
  opacity: number
}

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Matrix characters (Japanese katakana, numbers, and symbols)
    const matrixChars = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

    // Character properties
    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = []

    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = 1
    }

    // Animation function
    const draw = () => {
      // Semi-transparent background to create fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Set text properties
      ctx.fillStyle = '#00ff00'
      ctx.font = `${fontSize}px 'Courier Prime', monospace`

      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = matrixChars[Math.floor(Math.random() * matrixChars.length)]
        
        // Calculate position
        const x = i * fontSize
        const y = drops[i] * fontSize

        // Draw character with varying opacity
        const opacity = Math.random() * 0.5 + 0.5
        ctx.globalAlpha = opacity
        ctx.fillText(char, x, y)

        // Reset drop when it reaches bottom
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }

        drops[i]++
      }

      // Reset global alpha
      ctx.globalAlpha = 1

      // Continue animation
      requestAnimationFrame(draw)
    }

    // Start animation
    draw()

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="matrix-rain"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: -1,
        opacity: 0.3,
      }}
    />
  )
} 