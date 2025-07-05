# Wealth Management Assistant Frontend

A modern web interface for The AI Engineer Challenge, built with Next.js and TypeScript, designed for financial advisors and wealth management professionals.

## Features

- 💬 **AI-Powered Chat**: Interactive chat interface with OpenAI integration
- 📄 **Document Upload**: Upload and process financial documents (PDF, TXT, CSV, Excel)
- 🔍 **RAG Analysis**: Retrieve and analyze document content using vector search
- 📊 **Document Collections**: Organize and manage uploaded financial documents
- 🎨 **Modern UI**: Clean, professional interface optimized for financial workflows
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices

## Prerequisites

- Node.js 18+ 
- npm or yarn
- FastAPI backend running (for AI features)

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
├── app/
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout component
│   └── page.tsx         # Main page component
├── components/
│   ├── ChatInterface.tsx    # Main chat interface
│   ├── ChatWindow.tsx       # Chat message display
│   ├── ChatInput.tsx        # Message input component
│   ├── FileUpload.tsx       # Document upload interface
│   ├── DocumentCollections.tsx # Document management
│   ├── ApiKeyInput.tsx      # OpenAI API key input
│   ├── ModelSelector.tsx    # AI model selection
│   └── PromptModeToggle.tsx # Developer/User mode toggle
├── package.json
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── next.config.js          # Next.js configuration
```

### Key Components

#### ChatInterface.tsx
- Main application interface with tab navigation
- Integrates all components for seamless user experience
- Handles API communication and state management

#### FileUpload.tsx
- Drag-and-drop file upload interface
- Supports multiple document formats
- Real-time upload progress tracking

#### DocumentCollections.tsx
- Document collection management
- RAG-enabled chat functionality
- Collection deletion and organization

### Styling

The application uses a clean, professional design with:
- Modern color scheme optimized for readability
- Responsive Tailwind CSS framework
- Smooth animations and transitions
- Professional typography and spacing

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

### Adding New Components

To add new functionality, create components in the `components/` directory:

```typescript
// components/NewFeature.tsx
export default function NewFeature() {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      {/* Component content */}
    </div>
  )
}
```

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

2. **File Upload Issues**
   - Check file format compatibility
   - Verify API key is set correctly
   - Ensure backend is running

3. **Chat Not Working**
   - Verify OpenAI API key is valid
   - Check browser console for errors
   - Ensure all dependencies are installed

## Contributing

1. Follow the existing code style
2. Add TypeScript types for new features
3. Test functionality thoroughly
4. Update documentation for new features