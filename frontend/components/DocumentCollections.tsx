import React from "react";

type DocumentCollection = {
  id: string;
  name: string;
  file_count: number;
  total_chunks: number;
  created_at: string;
};

type Props = {
  collections: DocumentCollection[];
  onSelectCollection: (collectionId: string) => void;
  onDeleteCollection: (collectionId: string) => void;
  onRefresh: () => void;
};

export default function DocumentCollections({ 
  collections, 
  onSelectCollection, 
  onDeleteCollection, 
  onRefresh 
}: Props) {
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return "Unknown";
    }
  };

  if (collections.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-xl font-semibold text-gray-200 mb-2">
            No Document Collections
          </h2>
          <p className="text-gray-400 mb-4">
            Upload your first legal document to get started with AI-powered analysis.
          </p>
          <button
            onClick={onRefresh}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-200">
          Document Collections ({collections.length})
        </h2>
        <button
          onClick={onRefresh}
          className="px-3 py-1 text-sm bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition"
        >
          🔄 Refresh
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {collections.map((collection) => (
          <div
            key={collection.id}
            className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-gray-200 truncate">
                {collection.name}
              </h3>
              <button
                onClick={() => onDeleteCollection(collection.id)}
                className="text-red-400 hover:text-red-300 text-sm p-1"
                title="Delete collection"
              >
                🗑️
              </button>
            </div>

            <div className="space-y-2 text-sm text-gray-400 mb-4">
              <div className="flex justify-between">
                <span>Files:</span>
                <span className="text-gray-300">{collection.file_count}</span>
              </div>
              <div className="flex justify-between">
                <span>Chunks:</span>
                <span className="text-gray-300">{collection.total_chunks}</span>
              </div>
              <div className="flex justify-between">
                <span>Created:</span>
                <span className="text-gray-300">{formatDate(collection.created_at)}</span>
              </div>
            </div>

            <button
              onClick={() => onSelectCollection(collection.id)}
              className="w-full px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-sm font-semibold rounded hover:from-blue-600 hover:to-blue-800 transition"
            >
              💬 Chat with this Document
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-800 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-300 mb-2">How to use:</h3>
        <ul className="text-xs text-gray-400 space-y-1">
          <li>• Click "Chat with this Document" to start a RAG-powered conversation</li>
          <li>• Ask questions about specific clauses, terms, or legal concepts</li>
          <li>• The AI will search through your document and provide relevant answers</li>
          <li>• Use the delete button (🗑️) to remove collections you no longer need</li>
        </ul>
      </div>
    </div>
  );
} 