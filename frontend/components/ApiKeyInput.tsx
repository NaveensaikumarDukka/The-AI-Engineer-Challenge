import React from "react";

type Props = {
  apiKey: string;
  setApiKey: (key: string) => void;
};

export default function ApiKeyInput({ apiKey, setApiKey }: Props) {
  return (
    <div className="flex flex-col items-start w-full max-w-xs">
      <label className="text-xs text-gray-400 mb-1 flex items-center gap-1" htmlFor="api-key-input">
        <span className="text-blue-400">🔑</span> OpenAI API Key
      </label>
      <input
        id="api-key-input"
        type="password"
        className="border border-gray-700 rounded-lg px-3 py-2 text-sm bg-gray-800 text-gray-100 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        placeholder="Enter your OpenAI API Key"
        value={apiKey}
        onChange={e => setApiKey(e.target.value)}
        autoComplete="off"
      />
    </div>
  );
} 