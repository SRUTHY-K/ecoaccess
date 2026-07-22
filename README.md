# EcoAccess Command Center

> **AI-powered decision intelligence for zero-pollution, fully accessible large-scale public events.**  
> Built with React + FastAPI · Google Vertex AI (Gemini 2.5 Flash) · BigQuery ML · AlloyDB pgvector

<div align="center">

[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-ecoaccess-6366f1?style=for-the-badge)](https://ecoaccess-457619638562.us-central1.run.app/)
[![Cloud Run](https://img.shields.io/badge/Cloud%20Run-Deployed-4285F4?style=for-the-badge&logo=google-cloud)](https://ecoaccess-457619638562.us-central1.run.app/)
[![Vertex AI](https://img.shields.io/badge/Vertex%20AI-Gemini%202.5%20Flash-34A853?style=for-the-badge&logo=google-cloud)](https://cloud.google.com/vertex-ai)

**🎥 Demo Video:** [Watch the full walkthrough](https://ecoaccess-457619638562.us-central1.run.app/)

</div>

---

## 🏏 Why EcoAccess — and Why APAC?

APAC hosts some of the world's largest and most carbon-intensive public events. A single IPL match at Narendra Modi Stadium (capacity: 132,000) generates:

- **≈ 450 tonnes CO₂** from energy consumption alone
- **60–80 tonnes of mixed waste** per event day, with recycling contamination rates above 45%
- **Persistent accessibility failures** — broken elevators, missing ramps, audio dead zones — affecting tens of thousands of fans with disabilities

Event operators across India, Southeast Asia, and the Pacific currently manage these crises through **disconnected spreadsheets, manual radio calls, and reactive incident reports** — hours after the damage is done.

**EcoAccess changes that.** It puts real-time AI decision intelligence directly in the hands of the operations team: predictive energy forecasts, live waste contamination detection, and an AI copilot that synthesises every sensor, incident, and compliance guideline into a single actionable brief — in seconds.

---

## 🖥️ Live Demo

🌐 **[https://ecoaccess-457619638562.us-central1.run.app/](https://ecoaccess-457619638562.us-central1.run.app/)**

> The app works fully in **offline/demo mode** — no GCP credentials required to explore the UI and demo workflow.

### Judge Quick-Start (90 seconds)

1. **Open** the live URL above
2. Click **"Decision Intelligence Demo"** in the left sidebar
3. Hit **▶ Start Demo** and step through the 6-step AI workflow:
   - Crowd surge → BigQuery ML energy + carbon forecast → Vision AI waste scan → Gemini AI brief → RAG compliance search → automated mitigation
4. Switch to **"AI Copilot"** tab and ask: *"What actions reduce our Scope 2 emissions right now?"*
5. Upload a waste bin image in **"CCTV Audit"** to see Gemini Vision classify recycling contamination live

---

## 📸 Screenshots

![Dashboard](docs/screenshots/dashboard.png)
![Energy Forecast](docs/screenshots/forecast.png)
![AI Copilot](docs/screenshots/copilot.png)

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                   React Frontend                    │
│  (Vite · Vanilla CSS · EcoAccessContext)            │
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
│   │   ├── database.py         # AlloyDB / local vector store connection
│   │   └── logger.py           # Structured JSON Lines logger
│   ├── services/
│   │   ├── ai_service.py       # Gemini chat, translation, vision detection
│   │   ├── bq_service.py       # BigQuery ML predictions & ARIMA forecast
│   │   └── rag_service.py      # Embedding generation & cosine similarity search
│   ├── schemas/models.py       # Pydantic request/response models
│   ├── seed_bigquery.py        # One-time BQ dataset + ML model training script
│   └── tests/                  # Unit + integration test suite
├── docs/screenshots/           # Dashboard & UI screenshots
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
GOOGLE_GENAI_USE_VERTEXAI=False
GEMINI_API_KEY=your-gemini-api-key-here
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
| `GET` | `/api/logs` | Fetch system action and error logs |

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

## GCP Credentials & API Modes

EcoAccess supports two modes for running Gemini AI models:

### Option A: Google AI Studio Mode (Recommended for local dev)
* **Configuration**: Set `GOOGLE_GENAI_USE_VERTEXAI=False` and supply `GEMINI_API_KEY` in `.env`.
* **Authentication**: Authenticates using the simple API key. No GCP account login is required for Gemini (but `gcloud auth` is still required locally to access BigQuery).

### Option B: Google Cloud Vertex AI Mode (Enterprise Security)
* **Configuration**: Set `GOOGLE_GENAI_USE_VERTEXAI=True` in `.env`.
* **Authentication**: Uses Application Default Credentials (ADC) from your local computer (`gcloud auth application-default login`) or the attached Service Account on Cloud Run.

Credentials and billing are resolved in this order:
1. **API Key (`GEMINI_API_KEY`)**: Prioritized if AI Studio mode is active.
2. **Application Default Credentials (ADC)**: Used automatically for BigQuery access, or for Vertex AI if Vertex mode is active.
3. **Cloud Run Service Account**: Automatically resolves permissions when running in the cloud.

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

### Environment Variables on Cloud Run

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

## License
MIT
