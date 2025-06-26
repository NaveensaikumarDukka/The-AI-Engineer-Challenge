'use client'

import { useState, useEffect, useRef } from 'react'

interface TerminalOutput {
  id: string
  input?: string
  output: string
  timestamp: Date
}

interface Command {
  name: string
  description: string
  execute: (args: string) => Promise<string> | string
}

export default function Terminal() {
  const [output, setOutput] = useState<TerminalOutput[]>([])
  const [input, setInput] = useState('')
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isConnected, setIsConnected] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showPasswordInput, setShowPasswordInput] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [pendingCommand, setPendingCommand] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)
  const [apiKey, setApiKey] = useState<string>('')
  const [model, setModel] = useState<string>('gpt-4-turbo')

  // Available commands
  const commands: Record<string, Command> = {
    help: {
      name: 'help',
      description: 'Shows available commands',
      execute: () => `
╔══════════════════════════════════════════════════════════════╗
║                        AVAILABLE COMMANDS                    ║
╠══════════════════════════════════════════════════════════════╣
║  help           - Shows available commands                   ║
║  clear          - Clears the terminal                        ║
║  about          - Shows information about the challenge      ║
║  status         - Shows system status                        ║
║  matrix         - Displays Matrix-style information          ║
║  echo [message] - Echoes back your input                     ║
║  date           - Shows current date and time                ║
║  ls             - Lists available files (simulated)          ║
║  cat [filename] - Reads file contents (simulated)            ║
║  connect        - Connect to FastAPI backend                 ║
║  health         - Check backend health status                ║
║  chat [message] - Start AI chat session                      ║
║  set-api-key    - Set OpenAI API key (secure)                ║
║  reboot         - Reboot the terminal                        ║
║  exit           - Exits the terminal                          ║
║  model          - Set the AI model (e.g., gpt-4-turbo, gpt-3.5-turbo)║
╚══════════════════════════════════════════════════════════════╝
      `
    },
    clear: {
      name: 'clear',
      description: 'Clears the terminal',
      execute: () => {
        setOutput([])
        return 'Terminal cleared.'
      }
    },
    about: {
      name: 'about',
      description: 'Shows information about the challenge',
      execute: () => `
╔══════════════════════════════════════════════════════════════╗
║                    THE AI ENGINEER CHALLENGE                 ║
╠══════════════════════════════════════════════════════════════╣
║  A comprehensive challenge designed to test and improve     ║
║  AI engineering skills across multiple domains.             ║
║                                                              ║
║  This Matrix terminal interface provides a unique way       ║
║  to interact with the challenge system and FastAPI backend. ║
║                                                              ║
║  Features:                                                   ║
║  • Backend API development (FastAPI)                        ║
║  • Frontend interface design (Matrix Terminal)              ║
║  • AI integration with OpenAI                               ║
║  • Real-time streaming responses                            ║
║  • Cyberpunk aesthetic design                               ║
║  • Secure password input for sensitive data                 ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
      `
    },
    status: {
      name: 'status',
      description: 'Shows system status',
      execute: () => {
        const backendStatus = isConnected ? 'ONLINE' : 'OFFLINE'
        return `
╔══════════════════════════════════════════════════════════════╗
║                        SYSTEM STATUS                         ║
╠══════════════════════════════════════════════════════════════╣
║  Terminal Interface:     ONLINE                              ║
║  Matrix Rain Effect:     ACTIVE                              ║
║  FastAPI Backend:        ${backendStatus.padEnd(30)} ║
║  AI Engine:              ${backendStatus === 'ONLINE' ? 'OPERATIONAL' : 'OFFLINE'}`.padEnd(30) + ` ║
║  Challenge System:       READY                               ║
║  User Interface:         RESPONSIVE                          ║
║  Memory Usage:           OPTIMAL                             ║
║  Network Status:         STABLE                              ║
║  Security:               ENABLED                             ║
╚══════════════════════════════════════════════════════════════╝

${backendStatus === 'OFFLINE' ? 'Backend connection required. Use "connect" command.' : 'All systems operational. Ready for commands.'}
        `
      }
    },
    matrix: {
      name: 'matrix',
      description: 'Displays Matrix-style information',
      execute: () => `
01001001 01101110 01110011 01101001 01100100 01100101 00100000 01110100 01101000 01100101 00100000 01001101 01100001 01110100 01110010 01101001 01111000

╔══════════════════════════════════════════════════════════════╗
║                        MATRIX WISDOM                         ║
╠══════════════════════════════════════════════════════════════╣
║  "The Matrix has you. Follow the white rabbit."             ║
║                                                              ║
║  "Unfortunately, no one can be told what the Matrix is.     ║
║   You have to see it for yourself."                         ║
║                                                              ║
║  "There is no spoon."                                        ║
║                                                              ║
║  "I'm trying to free your mind, Neo. But I can only show    ║
║   you the door. You're the one that has to walk through it."║
╚══════════════════════════════════════════════════════════════╝

Choose your path wisely, Neo...
      `
    },
    echo: {
      name: 'echo',
      description: 'Echoes back your input',
      execute: (args: string) => args || 'Usage: echo [message]'
    },
    date: {
      name: 'date',
      description: 'Shows current date and time',
      execute: () => {
        const now = new Date()
        return `
╔══════════════════════════════════════════════════════════════╗
║                        SYSTEM TIME                           ║
╠══════════════════════════════════════════════════════════════╣
║  Date: ${now.toLocaleDateString().padEnd(47)} ║
║  Time: ${now.toLocaleTimeString().padEnd(47)} ║
║  UTC:  ${now.toUTCString().padEnd(47)} ║
║  Timestamp: ${now.getTime().toString().padEnd(41)} ║
╚══════════════════════════════════════════════════════════════╝
        `
      }
    },
    ls: {
      name: 'ls',
      description: 'Lists available files (simulated)',
      execute: () => `
╔══════════════════════════════════════════════════════════════╗
║                        FILE SYSTEM                           ║
╠══════════════════════════════════════════════════════════════╣
║  📁 The-AI-Engineer-Challenge/                              ║
║  ├── 📁 api/                                                ║
║  │   ├── 📄 app.py                                         ║
║  │   ├── 📄 requirements.txt                               ║
║  │   └── 📄 README.md                                      ║
║  ├── 📁 frontend/                                          ║
║  │   ├── 📁 src/                                           ║
║  │   ├── 📄 package.json                                   ║
║  │   └── 📄 README.md                                      ║
║  ├── 📁 docs/                                              ║
║  │   └── 📄 README.md                                      ║
║  └── 📄 challenge.md                                       ║
╚══════════════════════════════════════════════════════════════╝
      `
    },
    cat: {
      name: 'cat',
      description: 'Reads file contents (simulated)',
      execute: (args: string) => {
        if (!args) return 'Usage: cat [filename]'
        if (args === 'challenge.md') {
          return `
╔══════════════════════════════════════════════════════════════╗
║                        challenge.md                          ║
╠══════════════════════════════════════════════════════════════╣
║  # The AI Engineer Challenge                                ║
║                                                              ║
║  Welcome to the ultimate test of AI engineering skills.     ║
║  This challenge spans multiple domains and technologies.    ║
║                                                              ║
║  ## Features:                                               ║
║  - Backend API development (FastAPI)                        ║
║  - Frontend interface design (Matrix Terminal)              ║
║  - AI integration with OpenAI                               ║
║  - Real-time streaming responses                            ║
║  - Comprehensive documentation                              ║
║  - Secure password handling                                 ║
║                                                              ║
║  Choose your path wisely...                                 ║
╚══════════════════════════════════════════════════════════════╝
          `
        }
        return `File '${args}' not found or access denied.`
      }
    },
    'set-api-key': {
      name: 'set-api-key',
      description: 'Set OpenAI API key (secure)',
      execute: (args: string) => {
        if (!args) {
          setShowPasswordInput(true)
          setPendingCommand('set-api-key')
          return 'Please enter your OpenAI API key (input will be hidden):'
        }
        setApiKey(args)
        // In a real app, you'd store this securely
        return 'API key set successfully. (Note: In production, use secure storage)'
      }
    },
    connect: {
      name: 'connect',
      description: 'Connect to FastAPI backend',
      execute: async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL 
        try {
          const response = await fetch(`${apiUrl}/api/health`)
          if (response.ok) {
            const data = await response.json()
            setIsConnected(true)
            return `
╔══════════════════════════════════════════════════════════════╗
║                    CONNECTION ESTABLISHED                    ║
╠══════════════════════════════════════════════════════════════╣
║  ✅ Backend connection successful!                          ║
║  📡 FastAPI server: ${apiUrl}                              ║
║  🏥 Health status: ${data.status}                          ║
║  🤖 AI Engine: OPERATIONAL                                  ║
║  ⚡ Ready for AI interactions                               ║
╚══════════════════════════════════════════════════════════════╝

Ready for commands. Type 'help' for available options.
            `
          } else {
            return `
╔══════════════════════════════════════════════════════════════╗
║                    CONNECTION FAILED                         ║
╠══════════════════════════════════════════════════════════════╣
║  ❌ Failed to connect to backend!                           ║
║  📡 Expected: ${apiUrl}                                     ║
║  🔧 Status: ${response.status} ${response.statusText}      ║
║                                                              ║
║  Backend may be offline or unreachable.                     ║
║  Check the deployment status.                               ║
╚══════════════════════════════════════════════════════════════╝
            `
          }
        } catch (error) {
          return `
╔══════════════════════════════════════════════════════════════╗
║                    CONNECTION FAILED                         ║
╠══════════════════════════════════════════════════════════════╣
║  ❌ Failed to connect to backend!                           ║
║  📡 Expected: ${apiUrl}                                     ║
║  🔧 Error: ${error instanceof Error ? error.message : 'Unknown error'}                                ║
║                                                              ║
║  Backend may be offline or unreachable.                     ║
║  Check the deployment status.                               ║
╚══════════════════════════════════════════════════════════════╝
          `
        }
      }
    },
    health: {
      name: 'health',
      description: 'Check backend health status',
      execute: async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL 
        try {
          const response = await fetch(`${apiUrl}/api/health`)
          if (response.ok) {
            const data = await response.json()
            return `
╔══════════════════════════════════════════════════════════════╗
║                        HEALTH CHECK                          ║
╠══════════════════════════════════════════════════════════════╣
║  🏥 Status: ${data.status}                                 ║
║  📡 Endpoint: ${apiUrl}/api/health                         ║
║  ⏱️  Response Time: ${Date.now()}                          ║
║  🔧 HTTP Status: ${response.status}                        ║
║  ✅ Backend is healthy and ready!                          ║
╚══════════════════════════════════════════════════════════════╝
            `
          } else {
            return `❌ Health check failed: ${response.status} ${response.statusText}`
          }
        } catch (error) {
          return `❌ Health check failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        }
      }
    },
    chat: {
      name: 'chat',
      description: 'Start AI chat session',
      execute: async (args: string) => {
        if (!isConnected) {
          return '❌ Backend not connected. Use "connect" command first.'
        }
        
        if (!args) {
          return 'Usage: chat [your message]'
        }
        
        const apiUrl = process.env.NEXT_PUBLIC_API_URL 
        try {
          const response = await fetch(`${apiUrl}/api/chat`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              developer_message: `You are a concise, knowledgeable, and friendly AI assistant operating in a Matrix-style terminal.\n- Always provide clear, actionable, and accurate answers.\n- Use markdown for code, lists, and tables.\n- If you don't know something, say so honestly.\n- Ask clarifying questions if the user's request is ambiguous.\n- Offer suggestions for next steps when appropriate.`,
              user_message: args,
              api_key: apiKey
            }),
          })
          
          if (response.ok) {
            const text = await response.text()
            return `
╔══════════════════════════════════════════════════════════════╗
║                        AI RESPONSE                           ║
╠══════════════════════════════════════════════════════════════╣
║  ${text.replace(/\n/g, '\n║  ')}                            ║
╚══════════════════════════════════════════════════════════════╝
            `
          } else {
            return `❌ Chat failed: ${response.status} ${response.statusText}`
          }
        } catch (error) {
          return `❌ Chat failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        }
      }
    },
    reboot: {
      name: 'reboot',
      description: 'Reboot the terminal',
      execute: () => {
        setTimeout(() => {
          window.location.reload()
        }, 2000)
        return `
╔══════════════════════════════════════════════════════════════╗
║                        SYSTEM REBOOT                         ║
╠══════════════════════════════════════════════════════════════╣
║  🔄 Rebooting terminal in 2 seconds...                     ║
║  💾 Saving current session...                               ║
║  ⚡ Clearing memory...                                       ║
║  🔄 Restarting Matrix interface...                          ║
╚══════════════════════════════════════════════════════════════╝
        `
      }
    },
    exit: {
      name: 'exit',
      description: 'Exits the terminal',
      execute: () => {
        setTimeout(() => {
          window.close()
        }, 1000)
        return `
╔══════════════════════════════════════════════════════════════╗
║                        SYSTEM EXIT                           ║
╠══════════════════════════════════════════════════════════════╣
║  👋 Goodbye, Neo...                                         ║
║  🔒 Closing terminal...                                     ║
║  💾 Session saved...                                        ║
║  ⚡ Shutting down...                                         ║
╚══════════════════════════════════════════════════════════════╝
        `
      }
    },
    model: {
      name: 'model',
      description: 'Set the AI model (e.g., gpt-4-turbo, gpt-3.5-turbo)',
      execute: (args: string) => {
        setModel(args);
        return `Model set to ${args}`;
      }
    }
  }

  // Execute command
  const executeCommand = async (commandInput: string) => {
    const trimmedInput = commandInput.trim()
    if (!trimmedInput) return ''

    const [cmd, ...args] = trimmedInput.split(' ')
    const command = commands[cmd.toLowerCase()]
    
    if (command) {
      try {
        const result = await command.execute(args.join(' '))
        return result
      } catch (error) {
        return `Error executing command: ${error instanceof Error ? error.message : 'Unknown error'}`
      }
    } else {
      return `Command '${cmd}' not found. Type 'help' for available commands.`
    }
  }

  // Handle password input submission
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (passwordInput.trim()) {
      // Process the pending command with the password
      const result = await executeCommand(`${pendingCommand} ${passwordInput}`)
      setPasswordInput('')
      setShowPasswordInput(false)
      setPendingCommand('')
      
      // Add to output
      const newOutput: TerminalOutput = {
        id: Date.now().toString(),
        input: `${pendingCommand} [HIDDEN]`,
        output: result,
        timestamp: new Date()
      }
      setOutput((prev: TerminalOutput[]) => [...prev, newOutput])
    }
  }

  // Handle input submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const commandInput = input
    setInput('')
    
    // Add to history
    const newHistory = [...commandHistory, commandInput]
    setCommandHistory(newHistory)
    setHistoryIndex(-1)

    // Execute command
    const result = await executeCommand(commandInput)
    
    // Add output
    const newOutput: TerminalOutput = {
      id: Date.now().toString(),
      input: commandInput,
      output: result,
      timestamp: new Date()
    }
    
    setOutput((prev: TerminalOutput[]) => [...prev, newOutput])
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput('')
      }
    }
  }

  // Update time
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Auto-scroll to bottom
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [output])

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current && !showPasswordInput) {
      inputRef.current.focus()
    }
  }, [showPasswordInput])

  // Focus password input when shown
  useEffect(() => {
    if (passwordRef.current && showPasswordInput) {
      passwordRef.current.focus()
    }
  }, [showPasswordInput])

  return (
    <div className="h-full flex flex-col">
      {/* Terminal Output */}
      <div ref={outputRef} className="flex-1 overflow-y-auto mb-4">
        {output.length === 0 && (
          <div className="command-output">
            <div className="mb-4">
              ╔══════════════════════════════════════════════════════════════╗<br />
              ║                    MATRIX TERMINAL v2.0                      ║<br />
              ║                                                              ║<br />
              ║  Welcome to The AI Engineer Challenge Terminal              ║<br />
              ║  Type 'help' for available commands                         ║<br />
              ║  Type 'connect' to connect to the FastAPI backend           ║<br />
              ║  Type 'set-api-key' to configure AI access                  ║<br />
              ║                                                              ║<br />
              ╚══════════════════════════════════════════════════════════════╝
            </div>
            <div className="mb-2">
              <span className="command-input">$ </span>
              <span className="command-success">Initializing system...</span>
            </div>
            <div className="mb-2">
              <span className="command-input">$ </span>
              <span className="command-success">Matrix rain effect: ACTIVE</span>
            </div>
            <div className="mb-2">
              <span className="command-input">$ </span>
              <span className="command-success">Terminal interface: READY</span>
            </div>
            <div className="mb-4">
              <span className="command-input">$ </span>
              <span className="command-success">System boot complete. Ready for commands.</span>
            </div>
          </div>
        )}
        
        {output.map((item: TerminalOutput) => (
          <div key={item.id} className="command-output">
            {item.input && (
              <div className="mb-1">
                <span className="command-input">$ </span>
                {item.input}
              </div>
            )}
            {item.output && (
              <div className="whitespace-pre-wrap">
                {item.output}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Password Input (when needed) */}
      {showPasswordInput && (
        <form onSubmit={handlePasswordSubmit} className="flex items-center border-t border-matrix-green pt-4 mb-4">
          <span className="command-input mr-3">🔐 </span>
          <input
            ref={passwordRef}
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            className="password-input flex-1"
            placeholder="Enter password..."
          />
        </form>
      )}
      
      {/* Command Input */}
      <form onSubmit={handleSubmit} className="flex items-center border-t border-matrix-green pt-4">
        <span className="command-input mr-3">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="terminal-input flex-1"
          placeholder="Enter command..."
          disabled={showPasswordInput}
        />
        <span className="ml-2 text-matrix-green animate-pulse">█</span>
      </form>
    </div>
  )
} 