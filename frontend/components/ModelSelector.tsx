import React from "react";

type Props = {
  model: string;
  setModel: (model: string) => void;
  models: string[];
};

export default function ModelSelector({ model, setModel, models }: Props) {
  return (
    <div className="flex flex-col items-start w-full max-w-xs">
      <label className="text-xs text-gray-400 mb-1 flex items-center gap-1" htmlFor="model-selector">
        <span className="text-green-400">🤖</span> Model
      </label>
      <select
        id="model-selector"
        className="border border-gray-700 rounded-lg px-3 py-2 text-sm bg-gray-800 text-gray-100 w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        value={model}
        onChange={e => setModel(e.target.value)}
      >
        {models.map(m => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>
    </div>
  );
} 