import React, { useState, useRef } from "react";
import toast from "react-hot-toast";

type Props = {
  apiKey: string;
  onUploadSuccess: () => void;
};

const ALLOWED_FILE_TYPES = [
  '.pdf', '.txt', '.docx', '.doc', '.csv', '.xlsx', '.xls'
];

export default function FileUpload({ apiKey, onUploadSuccess }: Props) {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [collectionName, setCollectionName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file: File) => {
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
    
    if (!ALLOWED_FILE_TYPES.includes(fileExtension)) {
      toast.error(`File type ${fileExtension} is not supported. Please upload: ${ALLOWED_FILE_TYPES.join(', ')}`);
      return;
    }
    
    setSelectedFile(file);
    if (!collectionName) {
      setCollectionName(file.name.replace(fileExtension, ''));
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !apiKey || !collectionName.trim()) {
      toast.error("Please select a file, enter a collection name, and ensure API key is set.");
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('api_key', apiKey);
      formData.append('collection_name', collectionName.trim());

      const response = await fetch('/api/upload-document', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        toast.success(`Document uploaded successfully! ${result.chunks_processed} chunks processed.`);
        setSelectedFile(null);
        setCollectionName("");
        setUploadProgress(0);
        onUploadSuccess();
      } else {
        const error = await response.json();
        toast.error(error.detail || 'Upload failed');
      }
    } catch (error: any) {
      toast.error(`Upload failed: ${error.message}`);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-200 mb-4 text-center">
          Upload Legal Document
        </h2>
        
        {/* Collection Name Input */}
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">Collection Name</label>
          <input
            type="text"
            value={collectionName}
            onChange={(e) => setCollectionName(e.target.value)}
            placeholder="Enter collection name (e.g., Contract Analysis)"
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={uploading}
          />
        </div>

        {/* File Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition ${
            dragActive
              ? "border-blue-400 bg-blue-900/20"
              : "border-gray-600 hover:border-gray-500"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={ALLOWED_FILE_TYPES.join(',')}
            onChange={handleFileInput}
            className="hidden"
            disabled={uploading}
          />
          
          {!selectedFile ? (
            <div>
              <div className="text-4xl mb-4">📄</div>
              <p className="text-gray-300 mb-2">
                Drag and drop your document here, or{" "}
                <button
                  onClick={openFileDialog}
                  className="text-blue-400 hover:text-blue-300 underline"
                  disabled={uploading}
                >
                  browse files
                </button>
              </p>
              <p className="text-xs text-gray-500">
                Supported: {ALLOWED_FILE_TYPES.join(', ')}
              </p>
            </div>
          ) : (
            <div>
              <div className="text-4xl mb-4">✅</div>
              <p className="text-gray-300 mb-2">Selected: {selectedFile.name}</p>
              <p className="text-xs text-gray-500 mb-4">
                Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
              <button
                onClick={() => setSelectedFile(null)}
                className="text-red-400 hover:text-red-300 text-sm"
                disabled={uploading}
              >
                Remove file
              </button>
            </div>
          )}
        </div>

        {/* Upload Progress */}
        {uploading && (
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-400 mb-1">
              <span>Processing document...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Upload Button */}
        {selectedFile && (
          <button
            onClick={handleUpload}
            disabled={uploading || !apiKey || !collectionName.trim()}
            className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {uploading ? "Processing..." : "Upload & Index Document"}
          </button>
        )}

        {/* Instructions */}
        <div className="mt-6 p-4 bg-gray-800 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-300 mb-2">How it works:</h3>
          <ul className="text-xs text-gray-400 space-y-1">
            <li>• Upload legal documents (PDF, Word, Excel, etc.)</li>
            <li>• Documents are automatically processed and indexed</li>
            <li>• Use the chat to ask questions about your documents</li>
            <li>• AI will provide context-aware responses</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 