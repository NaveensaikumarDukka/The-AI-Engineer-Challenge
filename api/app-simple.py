# Import required FastAPI components for building the API
from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import os
import shutil
import uuid
from typing import Optional, List
import json
from datetime import datetime

# Import Pydantic for data validation and settings management
from pydantic import BaseModel

# Import OpenAI client for interacting with OpenAI's API
from openai import OpenAI

# Initialize FastAPI application with a title
app = FastAPI(title="Legal Document Analysis API - Simple Version")

# Configure CORS (Cross-Origin Resource Sharing) middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create uploads directory if it doesn't exist
UPLOAD_DIR = "uploads"
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

# Global storage for document collections (simplified)
document_collections = {}

# Define the data model for chat requests using Pydantic
class ChatRequest(BaseModel):
    developer_message: str
    user_message: str
    model: Optional[str] = "gpt-4.1-mini"
    api_key: str

# Define the data model for RAG chat requests
class RAGChatRequest(BaseModel):
    user_message: str
    model: Optional[str] = "gpt-4.1-mini"
    api_key: str
    collection_id: str
    use_rag: bool = True

@app.post("/api/upload-document")
async def upload_document(
    file: UploadFile = File(...),
    api_key: str = Form(...),
    collection_name: str = Form("Default Collection")
):
    """Upload and process a document for RAG functionality (simplified)"""
    try:
        # Validate file type
        allowed_extensions = {'.pdf', '.txt', '.docx', '.doc', '.csv', '.xlsx', '.xls'}
        file_extension = os.path.splitext(file.filename)[1].lower()
        
        if file_extension not in allowed_extensions:
            raise HTTPException(status_code=400, detail=f"File type {file_extension} not supported")
        
        # Generate unique collection ID
        collection_id = str(uuid.uuid4())
        
        # Save uploaded file
        file_path = os.path.join(UPLOAD_DIR, f"{collection_id}_{file.filename}")
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # For now, just store basic info without processing
        document_collections[collection_id] = {
            "id": collection_id,
            "name": collection_name,
            "file_path": file_path,
            "file_name": file.filename,
            "file_count": 1,
            "total_chunks": 1,  # Simplified
            "created_at": datetime.utcnow().isoformat(),
            "content": f"Document: {file.filename} - Content processing will be added later"
        }
        
        return {
            "collection_id": collection_id,
            "collection_name": collection_name,
            "file_name": file.filename,
            "chunks_processed": 1,
            "message": "Document uploaded successfully (simplified processing)"
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/collections")
async def get_collections():
    """Get list of all document collections"""
    collections = []
    for collection_id, collection_data in document_collections.items():
        collections.append({
            "id": collection_id,
            "name": collection_data["name"],
            "file_count": collection_data["file_count"],
            "total_chunks": collection_data["total_chunks"],
            "created_at": collection_data["created_at"]
        })
    return collections

@app.delete("/api/collections/{collection_id}")
async def delete_collection(collection_id: str):
    """Delete a document collection"""
    if collection_id not in document_collections:
        raise HTTPException(status_code=404, detail="Collection not found")
    
    collection = document_collections[collection_id]
    
    # Remove file
    if os.path.exists(collection["file_path"]):
        os.remove(collection["file_path"])
    
    # Remove from memory
    del document_collections[collection_id]
    
    return {"message": "Collection deleted successfully"}

@app.post("/api/rag-chat")
async def rag_chat(request: RAGChatRequest):
    """Chat with RAG functionality using indexed documents (simplified)"""
    try:
        if request.collection_id not in document_collections:
            raise HTTPException(status_code=404, detail="Collection not found")
        
        collection = document_collections[request.collection_id]
        
        # Initialize OpenAI client
        client = OpenAI(api_key=request.api_key)
        
        # Simplified RAG - just use the document content
        if request.use_rag:
            context = collection["content"]
            system_message = f"""You are a legal document analysis assistant. You have access to the following document context:

{context}

Please answer the user's question based on this context. If the information is not available in the context, say so clearly. Always provide accurate, helpful responses for legal professionals."""
        else:
            system_message = "You are a helpful legal assistant."
        
        # Create streaming response
        async def generate():
            stream = client.chat.completions.create(
                model=request.model,
                messages=[
                    {"role": "system", "content": system_message},
                    {"role": "user", "content": request.user_message}
                ],
                stream=True
            )
            
            for chunk in stream:
                if chunk.choices[0].delta.content is not None:
                    yield chunk.choices[0].delta.content

        return StreamingResponse(generate(), media_type="text/plain")
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Define the main chat endpoint that handles POST requests
@app.post("/api/chat")
async def chat(request: ChatRequest):
    try:
        # Initialize OpenAI client with the provided API key
        client = OpenAI(api_key=request.api_key)
        
        # Create an async generator function for streaming responses
        async def generate():
            # Create a streaming chat completion request
            stream = client.chat.completions.create(
                model=request.model,
                messages=[
                    {"role": "developer", "content": request.developer_message},
                    {"role": "user", "content": request.user_message}
                ],
                stream=True  # Enable streaming response
            )
            
            # Yield each chunk of the response as it becomes available
            for chunk in stream:
                if chunk.choices[0].delta.content is not None:
                    yield chunk.choices[0].delta.content

        # Return a streaming response to the client
        return StreamingResponse(generate(), media_type="text/plain")
    
    except Exception as e:
        # Handle any errors that occur during processing
        raise HTTPException(status_code=500, detail=str(e))

# Define a health check endpoint to verify API status
@app.get("/api/health")
async def health_check():
    return {"status": "ok"}

# Entry point for running the application directly
if __name__ == "__main__":
    import uvicorn
    # Start the server on all network interfaces (0.0.0.0) on port 8000
    uvicorn.run(app, host="0.0.0.0", port=8000) 