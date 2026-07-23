import os
import sys

# Ensure backend directory is in the PYTHONPATH so we can import from core, services, schemas
backend_dir = os.path.dirname(os.path.abspath(__file__))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from core.config import CONFIG_FILE
from services.rag_service import add_document_to_rag
from api.routes import router as api_router

app = FastAPI(title="EcoAccess SaaS Backend")

# Setup CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register our modular API Router
app.include_router(api_router, prefix="/api")

# Pre-populate RAG vector store with standard compliance policies
def pre_populate_rag():
    add_document_to_rag(
        "doc-1", 
        "Accessibility Rule 4.2.1", 
        "In the event of primary elevator failure at gates serving mobility zones, operators must reroute passengers to auxiliary ramp structures within 10 minutes and dispatch repairs immediately."
    )
    add_document_to_rag(
        "doc-2",
        "Translation Policy 1.8.4",
        "All fan feedback submitted in non-English formats must be translated semantically using embedding vector matching via pgvector to verify urgency level and route to proper emergency dispatches within 5 minutes."
    )
    add_document_to_rag(
        "doc-3",
        "Inclusion Standard 3.4",
        "Venues hosting audiences over 10,000 must maintain a minimum of 20% audio-descriptor headset availability. If audience reports indicate depletion, mobile reserve stores must be deployed."
    )
    add_document_to_rag(
        "doc-4",
        "Sustainability Code 6.1.2",
        "Scope 3 travel emissions must be offset by allocating zero-emission public transport. A 10% increase in shuttle capacity corresponds to an estimated 4,200 metric tonnes CO2e reduction."
    )

pre_populate_rag()

# Serve frontend build static files if present
if os.path.exists("dist"):
    app.mount("/", StaticFiles(directory="dist", html=True), name="static")

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=False)
