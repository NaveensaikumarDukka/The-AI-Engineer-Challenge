import React from "react";

type Props = {
  input: string;
  setInput: (val: string) => void;
  onSend: () => void;
  loading: boolean;
  disabled: boolean;
  promptMode: "developer" | "user";
};

export default function ChatInput({ input, setInput, onSend, loading, disabled, promptMode }: Props) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !loading && !disabled) {
      onSend();
    }
  };
  return (
    <div className="flex gap-2 mt-2 bg-gray-800 rounded-xl p-3 shadow-lg border border-gray-700">
      <input
        type="text"
        className="flex-1 border-none outline-none bg-transparent text-gray-100 text-base placeholder-gray-400 focus:ring-0"
        placeholder={`Type your ${promptMode} message...`}
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loading || disabled}
        autoFocus
      />
      <button
        className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white text-base font-bold shadow-md transition hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
        onClick={onSend}
        disabled={loading || disabled}
        type="button"
      >
        {loading ? "Sending..." : "Send"}
      </button>
    </div>
  );
} 