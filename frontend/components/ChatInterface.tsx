'use client';
import React, { useState, useEffect, useRef } from "react";
import ApiKeyInput from "./ApiKeyInput";
import ModelSelector from "./ModelSelector";
import PromptModeToggle from "./PromptModeToggle";
import ChatWindow from "./ChatWindow";
import ChatInput from "./ChatInput";
import FileUpload from "./FileUpload";
import DocumentCollections from "./DocumentCollections";

const DEFAULT_MODEL = "gpt-4.1-mini";
const AVAILABLE_MODELS = [
  "gpt-4.1-mini",
  "gpt-3.5-turbo",
  "gpt-4",
  // Add more if needed
];

type Message = {
  role: "developer" | "user" | "assistant";
  content: string;
};

type DocumentCollection = {
  id: string;
  name: string;
  file_count: number;
  total_chunks: number;
  created_at: string;
};

type TabType = "chat" | "documents" | "collections";

export default function ChatInterface() {
  const [apiKey, setApiKey] = useState<string>("");
  const [model, setModel] = useState<string>(DEFAULT_MODEL);
  const [promptMode, setPromptMode] = useState<"developer" | "user">("user");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("chat");
  const [collections, setCollections] = useState<DocumentCollection[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<string>("");
  const [useRAG, setUseRAG] = useState<boolean>(false);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  // Load API key from localStorage on mount
  useEffect(() => {
    const storedKey = localStorage.getItem("openai_api_key");
    if (storedKey) setApiKey(storedKey);
    fetchCollections();
  }, []);

  // Scroll to bottom on new message
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const fetchCollections = async () => {
    try {
      const response = await fetch("/api/collections");
      if (response.ok) {
        const data = await response.json();
        setCollections(data);
      }
    } catch (error) {
      console.error("Error fetching collections:", error);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || !apiKey) return;
    setLoading(true);
    
    const developerMsg = promptMode === "developer" ? input : "";
    const userMsg = promptMode === "user" ? input : "";
    
    setMessages((prev) => [
      ...prev,
      { role: promptMode, content: input },
      { role: "assistant", content: "..." },
    ]);
    setInput("");

    try {
      let response;
      
      if (useRAG && selectedCollection) {
        // Use RAG chat endpoint
        response = await fetch("/api/rag-chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_message: userMsg,
            model,
            api_key: apiKey,
            collection_id: selectedCollection,
            use_rag: true,
          }),
        });
      } else {
        // Use regular chat endpoint
        response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            developer_message: developerMsg,
            user_message: userMsg,
            model,
            api_key: apiKey,
          }),
        });
      }

      if (!response.body) throw new Error("No response body");
      const reader = response.body.getReader();
      let result = "";
      let done = false;
      
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          const chunk = new TextDecoder().decode(value);
          result += chunk;
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = { role: "assistant", content: result };
            return updated;
          });
        }
      }
    } catch (err: any) {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: "assistant", content: `Error: ${err.message}` };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApiKeyChange = (key: string) => {
    setApiKey(key);
    localStorage.setItem("openai_api_key", key);
  };

  const handleFileUploadSuccess = () => {
    fetchCollections();
    setActiveTab("collections");
  };

  const handleCollectionSelect = (collectionId: string) => {
    setSelectedCollection(collectionId);
    setUseRAG(true);
    setActiveTab("chat");
  };

  const handleCollectionDelete = async (collectionId: string) => {
    try {
      const response = await fetch(`/api/collections/${collectionId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchCollections();
        if (selectedCollection === collectionId) {
          setSelectedCollection("");
          setUseRAG(false);
        }
      }
    } catch (error) {
      console.error("Error deleting collection:", error);
    }
  };

  const getSelectedCollectionName = () => {
    const collection = collections.find(c => c.id === selectedCollection);
    return collection ? collection.name : "";
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background-light via-background to-background-dark py-8 px-2">
      <div className="w-full max-w-4xl bg-surface rounded-2xl shadow-2xl border border-border p-0 md:p-8 flex flex-col min-h-[800px]">
        <header className="flex flex-col items-center gap-2 py-6 border-b border-border mb-4">
          <h1 className="text-3xl font-extrabold tracking-tight text-primary drop-shadow">Wealth Management Assistant</h1>
          <p className="text-text-muted text-sm">AI-powered document analysis for financial advisors</p>
        </header>

        {/* Tab Navigation */}
        <div className="flex border-b border-border mb-4">
          <button
            onClick={() => setActiveTab("chat")}
            className={`px-4 py-2 text-sm font-medium transition ${
              activeTab === "chat"
                ? "text-primary border-b-2 border-primary"
                : "text-text-muted hover:text-primary"
            }`}
          >
            💬 Financial Analysis
          </button>
          <button
            onClick={() => setActiveTab("documents")}
            className={`px-4 py-2 text-sm font-medium transition ${
              activeTab === "documents"
                ? "text-primary border-b-2 border-primary"
                : "text-text-muted hover:text-primary"
            }`}
          >
            📄 Upload Documents
          </button>
          <button
            onClick={() => setActiveTab("collections")}
            className={`px-4 py-2 text-sm font-medium transition ${
              activeTab === "collections"
                ? "text-primary border-b-2 border-primary"
                : "text-text-muted hover:text-primary"
            }`}
          >
            📚 Document Collections
          </button>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-2 items-center justify-between mb-4 px-2">
          <ApiKeyInput apiKey={apiKey} setApiKey={handleApiKeyChange} />
          <ModelSelector model={model} setModel={setModel} models={AVAILABLE_MODELS} />
          <PromptModeToggle mode={promptMode} setMode={setPromptMode} />
        </div>

        {/* RAG Controls - Only show in chat tab */}
        {activeTab === "chat" && (
          <div className="flex items-center gap-4 mb-4 px-2 p-3 bg-surface-dark rounded-lg">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={useRAG}
                onChange={(e) => setUseRAG(e.target.checked)}
                className="rounded"
              />
              <span className="text-text">Use Document Context (RAG)</span>
            </label>
            {useRAG && (
              <select
                value={selectedCollection}
                onChange={(e) => setSelectedCollection(e.target.value)}
                className="px-3 py-1 text-sm bg-surface border border-border rounded text-text"
              >
                <option value="">Select a document collection</option>
                {collections.map((collection) => (
                  <option key={collection.id} value={collection.id}>
                    {collection.name} ({collection.file_count} files)
                  </option>
                ))}
              </select>
            )}
            {selectedCollection && (
              <span className="text-xs text-success">
                Using: {getSelectedCollectionName()}
              </span>
            )}
          </div>
        )}

        {/* Tab Content */}
        <div className="flex-1 flex flex-col">
          {activeTab === "chat" && (
            <>
              <ChatWindow messages={messages} chatWindowRef={chatWindowRef} />
              <ChatInput
                input={input}
                setInput={setInput}
                onSend={handleSend}
                loading={loading}
                disabled={!apiKey || (useRAG && !selectedCollection)}
                promptMode={promptMode}
              />
            </>
          )}

          {activeTab === "documents" && (
            <FileUpload
              apiKey={apiKey}
              onUploadSuccess={handleFileUploadSuccess}
            />
          )}

          {activeTab === "collections" && (
            <DocumentCollections
              collections={collections}
              onSelectCollection={handleCollectionSelect}
              onDeleteCollection={handleCollectionDelete}
              onRefresh={fetchCollections}
            />
          )}
        </div>

        <footer className="text-xs text-text-muted text-center mt-6 py-2 border-t border-border">
          &copy; {new Date().getFullYear()} Wealth Management Assistant &mdash; <span className="text-accent">The AI Engineer Challenge</span>
        </footer>
      </div>
    </div>
  );
} 