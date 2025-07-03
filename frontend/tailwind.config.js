/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        matrix: {
          green: '#00ff00',
          'green-dark': '#00cc00',
          'green-darker': '#009900',
          'green-light': '#33ff33',
          'green-glow': '#00ff00',
          black: '#000000',
          'dark-gray': '#001100',
          'medium-gray': '#003300',
          'light-gray': '#006600',
        },
      },
      fontFamily: {
        'matrix': ['Courier Prime', 'Courier', 'monospace'],
        'terminal': ['Courier New', 'Courier', 'monospace'],
      },
      animation: {
        'matrix-rain': 'matrix-rain 2s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'fade-in': 'fade-in 0.5s ease-in-out',
        'typewriter': 'typewriter 3s steps(40) 1s 1 normal both',
      },
      keyframes: {
        'matrix-rain': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'glow': {
          '0%': { textShadow: '0 0 5px #00ff00, 0 0 10px #00ff00, 0 0 15px #00ff00' },
          '100%': { textShadow: '0 0 10px #00ff00, 0 0 20px #00ff00, 0 0 30px #00ff00' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'typewriter': {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
      },
      backgroundImage: {
        'matrix-pattern': "url('data:image/svg+xml,%3Csvg width=\"20\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"%2300ff00\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"10\" cy=\"10\" r=\"1\"/%3E%3C/g%3E%3C/svg%3E')",
      },
    },
  },
  plugins: [],
} 