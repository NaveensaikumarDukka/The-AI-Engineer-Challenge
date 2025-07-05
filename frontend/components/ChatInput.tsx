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
    <div className="flex gap-2 mt-2 bg-background-light rounded-xl p-3 shadow-lg border border-border">
      <input
        type="text"
        className="flex-1 border-none outline-none bg-transparent text-text-default text-base placeholder-text-muted focus:ring-0"
        placeholder={`Type your ${promptMode} message...`}
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loading || disabled}
        autoFocus
      />
      <button
        className="px-5 py-2 rounded-lg bg-gradient-to-r from-primary to-primary-dark text-white text-base font-bold shadow-md transition hover:from-primary-dark hover:to-primary focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
        onClick={onSend}
        disabled={loading || disabled}
        type="button"
      >
        {loading ? "Sending..." : "Send"}
      </button>
    </div>
  );
} 