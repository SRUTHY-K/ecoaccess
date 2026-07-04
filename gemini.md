# EcoAccess Command Center - Project Context & Documentation

This file stores project-wide context, architecture details, environment settings, and API routes for AI assistance context maintenance.

---

## 🚀 Project Vision & Overview
**EcoAccess Command Center** is a real-time decision intelligence dashboard designed to help event organizers conduct large public events with the lowest possible environmental impact and maximum accessibility.
- **Tagline**: *EcoAccess Command – AI-Powered Decision Intelligence for Zero-Pollution Events*
- **Problem Solved**: Event operators struggle to manage energy demand, carbon emissions, waste segregation, and accessibility barriers due to fragmented data across disconnected systems.

---

## 🛠️ Architecture & Tech Stack

```
┌─────────────────────────────────────────────────────┐
│                   React Frontend                    │
│  (Vite · Vanilla Tailwind-free CSS · Context)       │
└────────────────────┬────────────────────────────────┘
                     │ REST API (port 8000)
┌────────────────────▼────────────────────────────────┐
│              FastAPI Backend (Python)               │
│  api/routes.py  ·  services/  ·  core/config.py    │
└──┬──────────────┬──────────────┬────────────────────┘
   │              │              │
   ▼              ▼              ▼
BigQuery ML    Vertex AI      AlloyDB / Local
Carbon Model   Gemini 2.5     pgvector RAG
ARIMA Forecast Flash Vision   (text-embedding-004)
```

- **Frontend**: React (Vite, vanilla CSS for high performance and styling flexibility, state managed via [EcoAccessContext.jsx](file:///e:/PROJECTS/EcoAccess%20GenAI%20APAC%20Hack2Skill/ecoaccess/src/context/EcoAccessContext.jsx)).
- **Backend**: FastAPI (Python 3.11+) serving API routes and static frontend build (when built).
- **Google Cloud AI Integration**:
  - **Vertex AI (Gemini 2.5 Flash)**: Explains anomalies, acts as an AI Decision Copilot, and performs vision analysis for waste contamination.
  - **Vertex AI (text-embedding-004)**: Generates 768-dimension vectors for RAG.
  - **BigQuery ML**:
    - **Linear Regression**: Predicts carbon emissions footprint.
    - **ARIMA**: Hourly energy demand forecasts.
  - **AlloyDB + pgvector**: Vector store for document indexing and semantic retrieval (with local in-memory fallback).

---

## 📂 Key File Map

- **Frontend**:
  - [App.jsx](file:///e:/PROJECTS/EcoAccess%20GenAI%20APAC%20Hack2Skill/ecoaccess/src/App.jsx): Entry point of the React layout.
  - [EcoAccessContext.jsx](file:///e:/PROJECTS/EcoAccess%20GenAI%20APAC%20Hack2Skill/ecoaccess/src/context/EcoAccessContext.jsx): Stores state (incidents, metrics, scenario logs, chat history, sliders, showLogViewer) and coordinates API calls or offline fallbacks.
  - [index.css](file:///e:/PROJECTS/EcoAccess%20GenAI%20APAC%20Hack2Skill/ecoaccess/src/index.css): Core design system, tokens, layout, themes, accessibility options (high contrast, large font sizes), and interactive elements.
  - **Components**:
    - [InteractiveMap.jsx](file:///e:/PROJECTS/EcoAccess%20GenAI%20APAC%20Hack2Skill/ecoaccess/src/components/InteractiveMap.jsx): GIS Venue sensor grid showing active overlays.
    - [DemoController.jsx](file:///e:/PROJECTS/EcoAccess%20GenAI%20APAC%20Hack2Skill/ecoaccess/src/components/DemoController.jsx): Coordinates the 6-step demo workflow.
    - [LiveCCTV.jsx](file:///e:/PROJECTS/EcoAccess%20GenAI%20APAC%20Hack2Skill/ecoaccess/src/components/LiveCCTV.jsx): Interface for waste auditing (multimodal image analysis upload).
    - [BigQueryML.jsx](file:///e:/PROJECTS/EcoAccess%20GenAI%20APAC%20Hack2Skill/ecoaccess/src/components/BigQueryML.jsx): Displays carbon footprint predictions and ARIMA load charts.
    - [SustainabilityChat.jsx](file:///e:/PROJECTS/EcoAccess%20GenAI%20APAC%20Hack2Skill/ecoaccess/src/components/SustainabilityChat.jsx): Interface to interact with the Gemini AI Copilot.
    - [ProductConfigurator.jsx](file:///e:/PROJECTS/EcoAccess%20GenAI%20APAC%20Hack2Skill/ecoaccess/src/components/ProductConfigurator.jsx): Controls venue settings, titles, budgets, RAG document ingestion, and log viewer display toggle.
    - [StrategicBlueprint.jsx](file:///e:/PROJECTS/EcoAccess%20GenAI%20APAC%20Hack2Skill/ecoaccess/src/components/StrategicBlueprint.jsx): Sliders and dynamic dials for metrics (Renewables, circular economy, audio coverage).
    - [LogViewer.jsx](file:///e:/PROJECTS/EcoAccess%20GenAI%20APAC%20Hack2Skill/ecoaccess/src/components/LogViewer.jsx): Cyberpunk terminal-themed viewer for real-time action and error logs.
- **Backend**:
  - [main.py](file:///e:/PROJECTS/EcoAccess%20GenAI%20APAC%20Hack2Skill/ecoaccess/backend/main.py): Entry point, mounts API router, registers request-logging middleware, and sets up static routes.
  - [routes.py](file:///e:/PROJECTS/EcoAccess%20GenAI%20APAC%20Hack2Skill/ecoaccess/backend/api/routes.py): Configures API endpoints for chat, translate, waste detection, config persistence, logs query, and ML predictions.
  - [core/config.py](file:///e:/PROJECTS/EcoAccess%20GenAI%20APAC%20Hack2Skill/ecoaccess/backend/core/config.py): Automatically loads env variables and initializes the Google Gen AI SDK client.
  - [core/database.py](file:///e:/PROJECTS/EcoAccess%20GenAI%20APAC%20Hack2Skill/ecoaccess/backend/core/database.py): Handles psycopg2 AlloyDB connections and creates vector schema.
  - [core/logger.py](file:///e:/PROJECTS/EcoAccess%20GenAI%20APAC%20Hack2Skill/ecoaccess/backend/core/logger.py): Structured JSON Lines logger configuration with automated rotation.
  - [services/ai_service.py](file:///e:/PROJECTS/EcoAccess%20GenAI%20APAC%20Hack2Skill/ecoaccess/backend/services/ai_service.py): Integrates Gemini-2.5-Flash for chat briefs, feedback translation, and waste CCTV analysis.
  - [services/bq_service.py](file:///e:/PROJECTS/EcoAccess%20GenAI%20APAC%20Hack2Skill/ecoaccess/backend/services/bq_service.py): Connects to BigQuery ML for predictions (with local fallback formulas).
  - [services/rag_service.py](file:///e:/PROJECTS/EcoAccess%20GenAI%20APAC%20Hack2Skill/ecoaccess/backend/services/rag_service.py): Generates embeddings via Vertex AI (`text-embedding-004`) and executes vector searches.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/predictions/carbon` | BigQuery ML carbon footprint prediction |
| `GET` | `/api/predictions/energy` | BigQuery ARIMA energy demand forecast |
| `POST` | `/api/chat` | Gemini 2.5 Flash copilot with RAG context |
| `POST` | `/api/detect-waste` | Gemini Vision waste bin analysis (image upload) |
| `POST` | `/api/translate` | Multilingual feedback translation & sentiment |
| `POST` | `/api/upload-manual` | Embed & index a document into the RAG store |
| `GET` | `/api/config` | Load event configuration |
| `POST` | `/api/config` | Save/persist event configuration |
| `GET` | `/api/logs` | Fetch system action and error logs with pagination/filters |
| `POST` | `/api/logs` | Record client-side action or error log into file |

---

## 🔄 Demo Workflow Steps (with Online & Offline modes)
1. **Surge Event Trigger**: Set spectator count to 75,000 (raises energy demand/incidents).
2. **BigQuery ML Predictions**: Run Carbon Regression & ARIMA load forecast.
3. **Vision AI Analysis**: Evaluate waste bin images for recycling contamination (using Gemini Vision).
4. **AI Decision Copilot Brief**: Gemini generates a unified briefing from active incident telemetry.
5. **RAG Search**: Query compliance standards from AlloyDB or local vector db for resolution procedures (e.g., Elevator breakdown ramp rule).
6. **Execution/Mitigation**: Dispatch resolution crews and apply green load adjustments.
