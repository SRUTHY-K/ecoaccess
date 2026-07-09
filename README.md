# EcoAccess Command Center

> **AI-powered sustainability and accessibility operations platform for large-scale public events.**  
> Built with React + FastAPI, powered by Google Cloud AI, BigQuery ML, and Vertex AI.

---

## Overview

EcoAccess is a real-time decision intelligence dashboard that helps event operators manage **carbon footprints**, **energy grid loads**, **waste contamination**, and **accessibility barriers** — all from a single command center.

It uses a suite of Google Cloud AI services to go beyond static dashboards: ML models predict future energy demand, Gemini Vision detects recycling contamination from live camera feeds, and a RAG-powered AI copilot synthesises all live signals into actionable operational briefs.

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                   React Frontend                    │
│  (Vite · Tailwind-free CSS · EcoAccessContext)      │
└────────────────────┬────────────────────────────────┘
                     │ REST (localhost:8000)
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

---

## GCP Services Used

| Service | Purpose |
|---|---|
| **Vertex AI — Gemini 2.5 Flash** | AI Decision Copilot chat + waste bin image analysis |
| **Vertex AI — text-embedding-004** | Generates 768-dim vectors for the RAG knowledge index |
| **BigQuery ML — Linear Regression** | Predicts Scope 2 & 3 carbon footprint from event parameters |
| **BigQuery ML — ARIMA_PLUS** | Forecasts venue substation energy demand (kW) per hour |
| **AlloyDB (pgvector)** | Production vector store for semantic RAG search *(optional — falls back to in-memory)* |
| **Cloud Run** | Serverless deployment target for the FastAPI backend |

---

## Project Structure

```
ecoaccess/
├── src/                        # React frontend
│   ├── components/
│   │   ├── DemoController.jsx  # 6-step guided demo workflow
│   │   ├── InteractiveMap.jsx  # GIS venue sensor grid
│   │   ├── BigQueryML.jsx      # Carbon & energy forecast display
│   │   ├── LiveCCTV.jsx        # Waste bin vision audit
│   │   ├── SustainabilityChat.jsx  # Gemini AI copilot chat
│   │   ├── ProductConfigurator.jsx # Event config + RAG ingestion
│   │   └── StrategicBlueprint.jsx  # Sliders & sustainability KPIs
│   └── context/
│       └── EcoAccessContext.jsx    # Global state + API calls
├── backend/
│   ├── main.py                 # FastAPI app entry point
│   ├── api/routes.py           # API endpoint definitions
│   ├── core/
│   │   ├── config.py           # GCP project config, GenAI client init
│   │   └── database.py         # AlloyDB / local vector store connection
│   ├── services/
│   │   ├── ai_service.py       # Gemini chat, translation, vision detection
│   │   ├── bq_service.py       # BigQuery ML predictions & ARIMA forecast
│   │   └── rag_service.py      # Embedding generation & cosine similarity search
│   ├── schemas/models.py       # Pydantic request/response models
│   ├── seed_bigquery.py        # One-time BQ dataset + ML model training script
│   ├── sql/bigquery_ml_models.sql  # Reference SQL for both ML models
│   ├── requirements.txt        # Python dependencies
│   └── tests/                  # Unit + integration test suite
├── .env.template               # Environment variable template
├── Dockerfile                  # Cloud Run container definition
└── index.html                  # App entry point
```

---

## Local Development Setup

### Prerequisites

- Node.js 18+
- Python 3.11+
- [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) (`gcloud`)
- A GCP project with **BigQuery API** and **Vertex AI API** enabled

### 1. Clone and install frontend

```bash
git clone https://github.com/SRUTHY-K/ecoaccess.git
cd ecoaccess
npm install
```

### 2. Configure environment

```bash
cp .env.template .env
```

Edit `.env`:

```env
GOOGLE_CLOUD_PROJECT=your-gcp-project-id
GOOGLE_CLOUD_LOCATION=us-central1
GOOGLE_GENAI_USE_VERTEXAI=True
```

### 3. Authenticate with GCP

```bash
gcloud auth login
gcloud auth application-default login
```

### 4. Install backend dependencies

```bash
pip install -r backend/requirements.txt
```

### 5. Enable GCP APIs

```bash
gcloud services enable bigquery.googleapis.com aiplatform.googleapis.com \
  --project=your-gcp-project-id
```

### 6. Seed BigQuery (one-time, ~3–5 min)

Creates the `ecoaccess_data` dataset, loads 1,344 historical venue power readings, and trains both ML models:

```bash
cd backend
python seed_bigquery.py
```

### 7. Start backend

```bash
cd backend
uvicorn main:app --reload --port 8000
```

### 8. Start frontend

```bash
# In a separate terminal from the project root
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/predictions/carbon` | BigQuery ML carbon footprint prediction |
| `GET` | `/api/predictions/energy` | BigQuery ARIMA energy demand forecast |
| `POST` | `/api/chat` | Gemini 2.5 Flash copilot with RAG context |
| `POST` | `/api/detect-waste` | Gemini Vision waste bin analysis (image upload) |
| `POST` | `/api/translate` | Multilingual feedback translation & sentiment |
| `POST` | `/api/upload-manual` | Embed & index a document into the RAG store |
| `GET/POST` | `/api/config` | Load / save event configuration |

---

## Demo Workflow

The **Decision Intelligence Demo** in the dashboard walks through a full end-to-end scenario:

| Step | Action | GCP Service |
|---|---|---|
| 1 | Trigger spectator crowd surge (75,000) | Local state |
| 2 | Run BigQuery ML energy + carbon forecast | BigQuery ML |
| 3 | Trigger Vision AI waste contamination audit | Gemini 2.5 Flash Vision |
| 4 | Generate AI Decision Copilot brief | Gemini 2.5 Flash |
| 5 | Retrieve RAG sustainability guidelines | text-embedding-004 + pgvector |
| 6 | Execute automated mitigations | Local state |

All steps include **offline fallbacks** so the demo works without a running backend.

---

## GCP Credentials

Credentials are resolved in this order:

1. **Application Default Credentials** — set via `gcloud auth application-default login`, stored in `%APPDATA%\gcloud\application_default_credentials.json` (Windows) or `~/.config/gcloud/` (Linux/Mac). Used by all GCP SDKs automatically.
2. **`.env` file** — sets `GOOGLE_CLOUD_PROJECT` (which project to bill) and `GOOGLE_GENAI_USE_VERTEXAI=True` (routes Gemini through Vertex AI instead of AI Studio).
3. **Cloud Run** — on deployed instances, ADC is replaced by the service account attached to the Cloud Run service. `.env` values are set as Cloud Run environment variables.

---

## Deployment (Cloud Run)

The app is packaged as a single container using a multi-stage Dockerfile:
- **Stage 1** — builds the React frontend (`npm run build` → `/dist`)
- **Stage 2** — serves the built frontend as FastAPI static files on port 8080

### Deploy to Cloud Run

```bash
gcloud run deploy ecoaccess \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars GOOGLE_CLOUD_PROJECT=your-project-id,GOOGLE_GENAI_USE_VERTEXAI=True
```

This produces a public URL in the format:
```
https://ecoaccess-<hash>-uc.a.run.app
```

### Custom Domain — ecoaccess.ai *(planned)*

The production deployment will be served at **ecoaccess.ai** once the domain is registered and mapped.

To connect a custom domain to Cloud Run:

```bash
# 1. Verify domain ownership in Google Search Console
# 2. Map the domain to the Cloud Run service
gcloud beta run domain-mappings create \
  --service ecoaccess \
  --domain ecoaccess.ai \
  --region us-central1
```

Then add the CNAME/A records provided by Google to your DNS registrar. TLS is automatically provisioned by Cloud Run.

### Environment Variables on Cloud Run

Set these in the Cloud Run console or via `--set-env-vars`:

| Variable | Value |
|---|---|
| `GOOGLE_CLOUD_PROJECT` | Your GCP project ID |
| `GOOGLE_CLOUD_LOCATION` | `us-central1` |
| `GOOGLE_GENAI_USE_VERTEXAI` | `True` |
| `DB_HOST` | AlloyDB private IP *(optional — enables pgvector RAG)* |
| `DB_USER` | AlloyDB username *(optional)* |
| `DB_PASSWORD` | AlloyDB password *(optional)* |
| `DB_NAME` | Database name, default `postgres` *(optional)* |

> [!NOTE]
> On Cloud Run, Application Default Credentials are provided automatically via the attached service account — no `gcloud auth` command needed. Ensure the service account has the **BigQuery Data Editor**, **Vertex AI User**, and optionally **Cloud AlloyDB Client** IAM roles.

---
## 👥 Hackathon Team & Contributions
* **[@SRUTHY-K](https://github.com)** - Lead Developer / Core Logic
* **[@lawthermegan](https://github.com)** - Developer / UI /UX and backend API configuration
* **[@OmkarTanajiPatil](https://github.com)** - Developer / Integration, logging
## License

MIT


