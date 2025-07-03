import React from "react";

type Props = {
  mode: "developer" | "user";
  setMode: (mode: "developer" | "user") => void;
};

export default function PromptModeToggle({ mode, setMode }: Props) {
  return (
    <div className="flex flex-col items-start w-full max-w-xs">
      <label className="text-xs text-gray-400 mb-1 flex items-center gap-1">
        <span className="text-purple-400">🛠️</span> Prompt Mode
      </label>
      <div className="flex gap-0.5">
        <button
          className={`px-3 py-2 rounded-l-lg border border-gray-700 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-purple-500 ${mode === "developer" ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-purple-900"}`}
          onClick={() => setMode("developer")}
          type="button"
        >
          <span className="mr-1">💻</span> Developer
        </button>
        <button
          className={`px-3 py-2 rounded-r-lg border border-gray-700 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${mode === "user" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-blue-900"}`}
          onClick={() => setMode("user")}
          type="button"
        >
          <span className="mr-1">👤</span> User
        </button>
      </div>
    </div>
  );
} 