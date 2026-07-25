# 🎬 EcoAccess Command Center — 3-Minute Video Presentation Script

**Project Name:** EcoAccess Command Center  
**Target Duration:** 3:00  

---

## ⏱️ Section 1: Intro & Portal Role Setup (0:00 – 0:33)

* **[Screen Action]:** Start on the **Command Center** tab in **Manager** portal role. Show the **APAC Cricket Stadium Map** with active GIS nodes (`☀️ Solar Charging Station`, `🚪 Main Entrance Gate`, `♿ Restrooms`). Hover over spectator telemetry (75,000 capacity).

* **Speaker Script:**
> "Hello everyone! Today we are presenting **EcoAccess.ai**—an AI-powered command center built to help operators run large public events with zero pollution and maximum accessibility.
>
> Managing a major event means handling energy grid spikes, waste streams, and crowd accessibility. Traditionally, these operate in separate, disconnected systems. **EcoAccess brings them together.**
>
> By combining Google Cloud GenAI with live venue telemetry, we turn fragmented data into one real-time decision hub. Let's see it in action before the gates even open."

---

## ⏱️ Section 2: Knowledge Assistant & AlloyDB RAG Ingestion (0:33 – 1:37)

* **[Screen Action]:** Scroll down to the **3. AlloyDB pgvector RAG Ingestion Pipeline (Upload Manuals)** panel inside the Knowledge Assistant. Paste an elevator repair rule into **Document Content** and click **Embed & Index into AlloyDB**.

* **Speaker Script:**
> "First, under our **Knowledge Assistant / Admin Settings Panel**, we set our venue title, base budget, and teach our AI the local rules.
>
> Let's upload a custom mobility regulation for fixing an elevator issue. When we click **'Embed & Index into AlloyDB'**, our backend uses **Vertex AI embeddings (`text-embedding-004`)** to store this rule directly into our pgvector database.
>
> Now, the AI knows the exact standard operating procedure instantly—without requiring any code updates or manual reports."

---

## ⏱️ Section 3: GIS Sensor Grid, Vision AI & BigQuery ML (1:37 – 2:19)

* **[Screen Action]:** Scroll up to the **GIS Venue Map**. Click an offline incident node (Elevator E4 red alert) and click **Dispatch Crew** (turning it green). Scroll down to **Vertex AI Vision: Live Stream Analyzers** and **BigQuery ML** cards.

* **Speaker Script:**
> "Next, back on our **Command Center Dashboard**, we monitor our GIS Sensor Grid.
>
> Here, an active alert shows Elevator E4 is offline. We click **'Dispatch Crew'** to send a technician, resolving the incident and updating the node status to green.
>
> Below, **Vertex AI Vision** streams live CCTV analysis to detect waste contamination, while **BigQuery ML** leverages Linear Regression and ARIMA models for predictive carbon footprint and energy load forecasting."

---

## ⏱️ Section 4: Sustainability Chat, Gemini RAG & Feedback Translation (2:19 – 3:00)

* **[Screen Action]:** Click **Sustainability Chat** in the sidebar navigation. Type *"What is the procedure to fix the broken elevator at Gate 6?"*. Show the **AlloyDB RAG citation**. Scroll down to **Multilingual Spectator Feedback & Sentiment Analyzer** and click **Translate & Analyze**.

* **Speaker Script:**
> "Inside **Sustainability Chat**, let's test our AI on the Gate 6 elevator issue. **Gemini 2.5 Flash** retrieves the exact RAG context: 'Block elevator access and dispatch technician immediately.'
>
> Under our **Multilingual Feedback Analyzer**, attendee comments in Spanish, Japanese, or German are analyzed for sentiment and translated into English in real time.
>
> By combining Google Machine Learning, Gemini Vision, and smart RAG search, EcoAccess transforms event management from reactive to **predictive, inclusive, and zero-pollution.** Thank you!"
