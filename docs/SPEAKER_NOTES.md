# 🎬 EcoAccess Command Center — Presentation Script & Top Features Guide

**Project Name:** EcoAccess Command Center  
**Target Duration:** 3:00 Video Pitch  

---

## 🎙️ 3-Minute Presentation Script (Aligned with Current UI)

### Section 1: Intro & Portal Role Switcher (0:00 – 0:30)
* **[Screen Action]:** Start on **Command Center** tab. Point to the **Portal Role Switcher** in the sidebar top (`Attendee` vs `Manager`). Switch role to show how EcoAccess serves both operators and spectators. Point to the **APAC Cricket Stadium Map** showing live GIS nodes (`☀️ Solar Charging Station`, `🟢 Main Entrance Gate`, `♿ Restrooms`, `🚌 Shuttle Pick-up`).
* **Speaker Script:**
> "Hello everyone! Today we are presenting **EcoAccess.ai**—an AI-powered command center built to help operators run large public events with zero pollution and maximum accessibility.
>
> In the sidebar, our **Portal Role Switcher** allows the app to serve two audiences: the **Manager Role** for venue operators, and the **Attendee Role** for spectators to access interactive maps and track personal carbon savings.
>
> Managing a major event means handling energy grid spikes, waste streams, and crowd accessibility across disconnected systems. **EcoAccess brings them together into one decision hub.** Let's see how our top features work in action."

---

### Section 2: AlloyDB RAG Ingestion Pipeline & Vertex AI Embeddings (0:30 – 1:15)
* **[Screen Action]:** Scroll down to **3. AlloyDB pgvector RAG Ingestion Pipeline (Upload Manuals)**. Paste a custom mobility rule into **Document Content** and click **Embed & Index into AlloyDB**.
* **Speaker Script:**
> "Our first top feature is our **AlloyDB pgvector RAG Pipeline**.
>
> Under our Knowledge Assistant, we can teach our AI local rules on the fly. Let's upload a custom mobility regulation for resolving venue accessibility issues. When we click **'Embed & Index into AlloyDB'**, our backend uses **Vertex AI `text-embedding-004`** to convert this rule into 768-dimension vectors and store it directly in pgvector.
>
> Now, the AI knows the exact standard operating procedure instantly—without requiring any manual code updates or system reports."

---

### Section 3: BigQuery ML Predictions & Gemini Vision CCTV Audit (1:15 – 2:05)
* **[Screen Action]:** Scroll up to show the **BigQuery ML** cards (`Predict Carbon Footprint` & `Forecast Energy Demand`) and **Vertex AI Vision: Live Stream Analyzers** (click **Analyze Bin** on Feed 2).
* **Speaker Script:**
> "Our second top feature is **Predictive Analytics with BigQuery ML**. Our Linear Regression model predicts Scope 3 spectator carbon emissions, while our ARIMA model forecasts hourly energy load curves so operators can trigger peak-shaving before grid overloads occur.
>
> Third, our **Vertex AI Vision** streams live CCTV analysis to inspect venue waste bins in real time—detecting plastic contamination in organic streams with over 95% accuracy to dispatch cleanup crews instantly."

---

### Section 4: Gemini 2.5 Flash Copilot & Multilingual Sentiment Analyzer (2:05 – 3:00)
* **[Screen Action]:** Click **Sustainability Chat** in the sidebar navigation. Type a stadium logistics question and show the **AlloyDB RAG citation**. Scroll down to **Multilingual Spectator Feedback & Sentiment Analyzer** and click **Translate & Analyze**.
* **Speaker Script:**
> "Our fourth top feature is our **Gemini 2.5 Flash Decision Copilot**. When queried about stadium rules or accessible transit, Gemini retrieves the exact RAG context from our vectorized handbook: 'Dispatch emergency response crews and guide attendees instantly.'
>
> Fifth, we have our **Multilingual Feedback & Sentiment Analyzer**. Comments submitted by attendees in Spanish, Japanese, Chinese, or German are analyzed for sentiment urgency and translated into English in real time.
>
> By combining BigQuery ML, Gemini Vision, AlloyDB RAG, and Multilingual Intelligence, EcoAccess moves event management from reactive to **predictive, inclusive, and zero-pollution.** Thank you!"

---

## 🌟 Top 5 Core Feature Deep Dive

If judges ask you to elaborate, here are the **Top 5 Hero Features** to highlight:

1. **📚 AlloyDB pgvector RAG Pipeline (`text-embedding-004`)**:
   * Instant vector embedding and indexing of venue handbooks, evacuation policies, and ADA accessibility rules.

2. **📈 BigQuery ML Predictive Engine (Linear Regression & ARIMA)**:
   * Real-time carbon emission forecasting + hourly power grid demand curve prediction for proactive load balancing.

3. **📷 Vertex AI Gemini 2.5 Flash Vision CCTV Auditor**:
   * Automated multimodal image analysis of stadium waste bins to catch recycling contamination instantly.

4. **🤖 Multilingual Gemini 2.5 Flash Decision Copilot**:
   * Contextual RAG Q&A with citation links + automated sentiment classification & 5-language translation.

5. **🗺️ Dual Portal Roles & Interactive GIS Sensor Grid**:
   * **Manager Portal**: Operator command center, GIS map monitoring (`☀️ Solar Charging Station`, `🟢 Gates`, `♿ Restrooms`), ML predictions.
   * **Attendee Portal**: Interactive spectator navigation guide, individual carbon savings tracker, and 5-Star Eco Warrior ratings.
