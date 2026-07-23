# Video Presentation Guide (Final Version)

This guide acts as your complete script and checklist for the hackathon submission video. It contains every detail, layout change, and database optimization you implemented in the EcoAccess project.

---

## 🎙️ Section 0: Introduction Speech (Start Video Here)

*Start with a close-up of yourself or showing the dashboard home screen.*

**Script:**
> *"Hello judges, we are team **ByteSustain**, and this is **EcoAccess**. *
> 
> *EcoAccess is an intelligent, agentic decision system designed to help operators conduct large-scale public events with significantly less pollution and absolute social inclusivity. By connecting real-time venue telemetry to predictive AI, we bridge the gap between environmental sustainability and physical accessibility.*
> 
> *One of the key features of the platform is the **Vision AI Waste Audit**. In the application, operators can upload or stream a test photo of stadium recycling dumpsters for computer analysis. Under the hood, this uses **Gemini 2.5 Flash's multimodal vision engine** to audit the photo, estimate bin capacity relative to the rim, and flag compost contaminants like plastic wraps in real-time. If the API is offline, the system seamlessly triggers a highly realistic mock fallback simulation to ensure the dashboard alerts and budget metrics remain fully operational. *
> 
> *Let's walk you through the structural changes, UI/UX optimizations, and AI integrations we built to make this platform production-ready."*

---

## 📺 Section 1: Dashboard UI/UX & GIS Map Overhaul (Visual Demo)

*Show the running dashboard in your web browser. Start by demonstrating the layout.*

### 1. Grid Rescaling & Full-Screen GIS Map Grid
* **The Problem:** The original template was cramped, containing a 6-step guided `<DemoController />` card that pushed the main map and charts into tiny widgets.
* **What You Fixed:** 
  * You removed the `<DemoController />` layout card entirely.
  * In `App.jsx`, you rescaled the layout grid to `.section-grid-full`.
  * In `index.css`, you extended the **Global Event Venue GIS Sensor Grid** (Interactive Map) to a full **100% viewport width** and increased its height from `380px` to `500px`. 
  * This gave the app a premium, high-tech command center viewport.

### 2. Persistent Labels Toggle (Tablet/Mobile Adaptation)
* **The Problem:** The app was originally built for desktop computers where hovering with a mouse revealed node names. This made it completely unusable on touch screens (tablets/phones).
* **What You Fixed:** 
  * In `InteractiveMap.jsx`, you added a touch-friendly **Persistent Labels Toggle** button in the map panel header.
  * Tapping this button forces all sensor name tags to remain visible at all times, making the dashboard fully compatible with mobile and tablet users.

### 3. The Accessibility Transport Hub (Indigo Node) & Custom GIS Sensor Nodes
* **What You Fixed:** You integrated custom live telemetry sensor tracking points directly into `EcoAccessContext.jsx` and `InteractiveMap.jsx`:
  * **Indigo Node (Accessibility Transport Hub):** Tracks the status of low-floor shuttle integrations and transit capacity.
  * **CCTV Node:** Monitors wheelchair-accessible elevators (detecting breakdowns like elevator E-4).
  * **Waste Detection Node:** Monitors compost dumpsters for non-recyclable trash contamination in real-time.

### 4. Active Node Details Drawer
* **What You Fixed:** You built an interactive slide-up drawer at the bottom of the map panel. When you click/tap a node:
  * It displays the current incident status (unresolved, dispatching, resolved).
  * It enables dispatching optimized repair crews directly from the drawer, which clears the alert and turns the node green!

### 5. Sparkline Glow & Chart Clipping Fixes (`StatsGrid.jsx` & `BigQueryML.jsx`)
* **The Problem:** The neon-glow filter on the card graphs was clipping at the borders of the SVG boxes, and the BigQuery ML forecasting chart got cut off on window resize.
* **What You Fixed:**
  * You resized the Y-axis coordinates of the sparkline paths in `StatsGrid.jsx` and added `viewBox="0 0 200 30" preserveAspectRatio="none"` to allow fluid scaling.
  * Connected the spectator satisfaction card to the live `metrics.fanSat` telemetry stream.
  * Resized the BigQuery ML forecasting chart in `BigQueryML.jsx` to leave a 25px safety margin and converted the floating HTML tooltip into a native SVG `<g>` group to ensure 100% responsiveness.

### 6. Vision AI Waste Detection & HUD overlays (`LiveCCTV.jsx`)
* **What You Fixed:**
  * You upgraded the standard camera grids into a high-tech **Vision AI Waste Auditing Monitor**.
  * **CCTV Scanner HUD:** Added vertical-scrolling green laser scanlines, glowing target brackets, and HUD text overlays to the `CAM_12_FANZONE` stream.
  * **Visual Feedback:** Toggling a "Contaminated" state displays real-time warning boxes and targets, illustrating how Vertex AI audits compost and recycling bins on-site.
  * **The AI Logic:** The model identifies compost contaminants (like plastic wraps, bags, or utensils) and calculates bin fullness relative to the rim (e.g. `95% capacity / contaminated`).

### 7. Accordion pgvector Cards (`SustainabilityChat.jsx`)
* **What You Fixed:**
  * **Semantic Accordion Cards:** Styled the AlloyDB pgvector database matches as clean cards with toggleable `[Expand Details]` accordion buttons. This keeps the chat console clean and lets users view exact handbook rules on demand.

---

## 📺 Section 2: The Command Center (The Developer Workspace)

*Show your IDE terminal window.*

### What You Configured:
1. **Local Developer Environment Setup:**
   * Configured Python 3.11 and created a local virtual environment (`.venv`).
   * Resolved library conflicts by upgrading `protobuf` and `httpx` so the backend could communicate securely.
2. **Git for Windows:**
   * Installed **Git for Windows** using `winget` directly from the IDE terminal and integrated it with the Source Control panel.
3. **Antigravity TUI/CLI (`agy`):**
   * Configured and ran the global CLI `agy`, demonstrating how it reads local project folders to help developers build outside of the IDE.

---

## 📺 Section 3: The Sustainability & Knowledge Assistant (The AI Agent)

*Open the `my_agent.py` code in the editor and run it in the terminal.*

### What We Implemented:
1. **Gemini 2.5 Flash Upgrade:**
   * **The Fix:** Upgraded `my_agent.py` to use the active **`gemini-2.5-flash`** model (bypassing the decommissioned `1.5` models).
2. **Unified Multimodal Chat Loop (`my_agent.py`):**
   * Programmed an asynchronous Python loop using the SDK.
   * Handles text questions and automatically reads local image files (`test_image.jpg`) using the SDK's **`from_file`** helper for live visual analysis.
3. **AI Credentials Configuration Panel (`ProductConfigurator.jsx`):**
   * Added an API credentials setup panel in the UI to switch between Offline Mock Mode, Google AI Studio, and Vertex AI. Includes a **"Save & Verify"** backend ping to verify connections.
4. **Dual-Fallback RAG Database Architecture (Mock Mode):**
   * **The Problem:** If the live AlloyDB database pgvector connection or Google Cloud APIs failed, the chat system would crash.
   * **The Fix:** Created a robust **Mock Mode / Offline Fallback**. If the API fails, the Knowledge Assistant automatically catches the error and pulls compliance regulations (like *Accessibility Rule 4.2.1* and *Sustainability Code 6.1.2*) directly from local context memory. This guarantees **100% uptime for the judges** even if GCP is completely offline!

---

## 🏆 Final Message to the Judges:
*"By combining full-width GIS map controls, custom sensor tracking, and a resilient dual-fallback RAG database, we have built a complete, production-ready sustainability command center that is fully optimized for both desktop and tablet deployment."*
