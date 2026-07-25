# 🏆 EcoAccess Command Center — Hackathon Submission Breakdown

---

## 1️⃣ Approach & Translation into a Working Google Cloud Solution

### **Problem Statement Translation**
Large public events (stadium concerts, sporting events, festivals) generate immense environmental strain—massive carbon emissions, sudden grid energy spikes, tons of unsegregated waste, and severe accessibility bottlenecks for attendees with disabilities. Operators struggle to manage these because data is fragmented across disconnected legacy systems.

### **Working Solution Architecture**
We created **EcoAccess Command Center**—a real-time decision intelligence hub built with Google Cloud AI:
* **BigQuery ML**: 
  * *Linear Regression* predicts total carbon emissions based on crowd density and energy mix.
  * *ARIMA Model* forecasts hourly power demand to prevent grid blackouts and switch load to solar storage.
* **Vertex AI (Gemini 2.5 Flash)**: Acts as an **AI Decision Copilot**, explaining operational anomalies and recommending 1-click mitigation actions.
* **Vertex AI (Gemini 2.5 Flash Vision)**: Audits live CCTV camera feeds to detect waste bin overflow and recycling contamination (e.g., plastic in organic bins).
* **AlloyDB + pgvector (with `text-embedding-004`)**: Powers **RAG (Retrieval-Augmented Generation)** to index ADA compliance manuals, emergency evacuation protocols, and venue guidelines for instant semantic search.

---

## 2️⃣ Real-World Problem Addressed & Practical Impact

### **Real-World Problem**
Mass gatherings cause temporary environmental crises in host cities:
1. **Grid Overloads & Emissions**: Unplanned power surges force diesel generator backup usage, spiking Scope 1 & 2 carbon emissions.
2. **Waste Segregation Breakdown**: Thousands of attendees toss plastic and food waste into wrong bins, contaminating entire recycling streams.
3. **Accessibility Barriers**: Broken elevators, unmanaged crowds, and lack of audio guidance exclude attendees with disabilities.

### **Practical Impact**
* **For Venue Operators**: Replaces reactive firefighting with 1-click automated response crews and predictive load shedding.
* **For Host Cities & Communities**: Eliminates acute event-driven grid spikes and shields urban environments from landfill waste.
* **For Attendees**: Guarantees dignified, barrier-free access with real-time accessibility telemetry and 5-language translation.

---

## 3️⃣ Core Architecture & Data-to-Decision Workflow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      GIS Sensor Grid & Telemetry                         │
│   (Energy Demand · Carbon Load · Waste CCTV · ADA Ramp Telemetry)       │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │ Real-time Stream
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                           FastAPI Backend                               │
└──────────────┬─────────────────────┼──────────────────────┬─────────────┘
               │                     │                      │
               ▼                     ▼                      ▼
      ┌─────────────────┐   ┌─────────────────┐   ┌───────────────────┐
      │   BigQuery ML   │   │    Vertex AI    │   │ AlloyDB pgvector  │
      │  Carbon Predict │   │ Gemini 2.5 Flash│   │ text-embedding-04 │
      │  ARIMA Forecast │   │ CCTV Waste Vision│   │ RAG Manual Index  │
      └────────┬────────┘   └────────┬────────┘   └─────────┬─────────┘
               │                     │                      │
               └─────────────────────┼──────────────────────┘
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      EcoAccess Command Dashboard                        │
│            (Interactive GIS Map · AI Copilot · 1-Click Action)          │
└─────────────────────────────────────────────────────────────────────────┘
```

### **Data Transformation Workflow (Telemetry ➔ Insights ➔ Decision)**
1. **Data Ingestion**: Streaming telemetry (spectator count, energy usage, CCTV frames, ADA incident alerts) feeds into the FastAPI engine.
2. **Predictive Intelligence**: BigQuery ML computes hourly energy load spikes and carbon footprints 4 hours ahead.
3. **Multimodal Analysis**: Gemini Vision analyzes waste bin photos to identify contamination types.
4. **Context-Aware RAG**: When an elevator or ramp incident occurs, AlloyDB pgvector retrieves exact venue compliance protocols.
5. **Actionable Decisions**: Gemini 2.5 Flash synthesizes the data into an executive briefing and presents **1-Click Dispatch** buttons to instantly deploy resolution crews and adjust green loads.
