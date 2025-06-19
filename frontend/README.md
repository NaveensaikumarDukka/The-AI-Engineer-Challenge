# Matrix Terminal Frontend

A Matrix-style terminal interface for The AI Engineer Challenge, built with Next.js and TypeScript.

## Features

- 🎨 **Matrix Rain Effect**: Animated background with falling Matrix characters
- 💻 **Interactive Terminal**: Full command-line interface with history navigation
- 🤖 **AI Integration**: Connect to FastAPI backend for AI chat functionality
- 🎯 **Cyberpunk Aesthetic**: Authentic Matrix-style visual design
- ⚡ **Real-time Updates**: Live system status and time display
- 📱 **Responsive Design**: Works on desktop and mobile devices

## Available Commands

| Command | Description |
|---------|-------------|
| `help` | Shows available commands |
| `clear` | Clears the terminal |
| `about` | Shows information about the challenge |
| `status` | Shows system status |
| `matrix` | Displays Matrix-style information |
| `echo [message]` | Echoes back your input |
| `date` | Shows current date and time |
| `ls` | Lists available files (simulated) |
| `cat [filename]` | Reads file contents (simulated) |
| `connect` | Connect to FastAPI backend |
| `health` | Check backend health status |
| `chat [message]` | Start AI chat session |
| `reboot` | Reboot the terminal |
| `exit` | Exits the terminal |

## Prerequisites

- Node.js 18+ 
- npm or yarn
- FastAPI backend running (optional, for AI features)

## Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

### Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── globals.css      # Global styles and Matrix theme
│   │   ├── layout.tsx       # Root layout component
│   │   └── page.tsx         # Main page component
│   └── components/
│       ├── MatrixRain.tsx   # Matrix rain animation
│       └── Terminal.tsx     # Terminal interface
├── package.json
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── next.config.js          # Next.js configuration
```

### Key Components

#### MatrixRain.tsx
- Canvas-based Matrix rain animation
- Responsive to window resizing
- Optimized performance with requestAnimationFrame

#### Terminal.tsx
- Command execution and history management
- Real-time system status updates
- Backend integration for AI features
- Keyboard navigation (arrow keys for history)

### Styling

The application uses a custom Matrix theme with:
- Green color scheme (#00ff00, #00cc00, #001100)
- Courier Prime font for authentic terminal look
- CSS animations for glow effects and transitions
- Custom scrollbars matching the theme

## Backend Integration

To use AI features, ensure the FastAPI backend is running:

1. Navigate to the api directory:
```bash
cd ../api
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Start the FastAPI server:
```bash
python app.py
```

4. In the terminal, use the `connect` command to establish connection.

## Deployment

### Vercel Deployment

This application is optimized for Vercel deployment:

1. Push your code to a Git repository
2. Connect your repository to Vercel
3. Deploy automatically

### Environment Variables

Create a `.env.local` file for local development:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Customization

### Adding New Commands

To add a new command, modify the `commands` object in `Terminal.tsx`:

```typescript
newCommand: {
  name: 'newcommand',
  description: 'Description of the new command',
  execute: async (args: string) => {
    // Command logic here
    return 'Command output'
  }
}
```

### Modifying the Matrix Rain

Adjust the Matrix rain effect in `MatrixRain.tsx`:
- Change `fontSize` for different character sizes
- Modify `matrixChars` for different characters
- Adjust animation speed by changing the interval

### Theme Customization

Modify colors and styles in:
- `tailwind.config.js` for Tailwind classes
- `globals.css` for custom CSS
- Component files for specific styling

## Troubleshooting

### Common Issues

1. **Backend Connection Failed**
   - Ensure FastAPI server is running on port 8000
   - Check CORS settings in backend
   - Verify network connectivity

2. **Matrix Rain Not Visible**
   - Check browser console for errors
   - Ensure canvas is supported
   - Verify CSS is loading correctly

3. **Commands Not Working**
   - Check browser console for JavaScript errors
   - Verify TypeScript compilation
   - Ensure all dependencies are installed

### Performance Optimization

- Matrix rain uses canvas for better performance
- Terminal output is virtualized for large histories
- Animations are optimized with CSS transforms

## Contributing

1. Follow the existing code style
2. Add TypeScript types for new features
3. Test commands thoroughly
4. Update documentation for new features

## License

This project is part of The AI Engineer Challenge.

---

**Welcome to the Matrix, Neo...**