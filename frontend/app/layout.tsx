import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Matrix Terminal - The AI Engineer Challenge',
  description: 'A Matrix-style terminal interface for The AI Engineer Challenge with AI integration and cyberpunk aesthetics.',
  keywords: 'matrix, terminal, ai, challenge, cyberpunk, frontend',
  authors: [{ name: 'AI Engineer Challenge' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-matrix-black text-matrix-green">
          {children}
        </div>
      </body>
    </html>
  )
} 