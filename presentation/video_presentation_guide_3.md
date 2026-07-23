# Video Presentation Script (First-Person Version)

*Use this script to read directly during your recording. It is written entirely in first-person ("I") statements to make your presentation flow naturally.*

---

## 🎙️ Section 0: Introduction Speech (Start Video Here)

*Show a close-up of yourself or display the dashboard home screen.*

> *"Hello judges, I am representing team **ByteSustain**, and this is **EcoAccess**.*
> 
> *I designed EcoAccess as an intelligent, agentic decision system that enables operators to conduct large-scale public events with significantly less pollution and absolute social inclusivity. By connecting real-time venue telemetry to predictive AI, my goal was to bridge the gap between environmental sustainability and physical accessibility.*
> 
> *One of the key features I built is the **Vision AI Waste Audit**. In this application, I wanted operators to be able to upload or stream a test photo of stadium recycling dumpsters for computer analysis. Under the hood, this uses **Gemini 2.5 Flash's multimodal vision engine** to audit the photo, estimate bin capacity relative to the rim, and flag compost contaminants like plastic wraps in real-time. If the API goes offline, the system I built seamlessly triggers a highly realistic mock fallback simulation to ensure the dashboard alerts and budget metrics remain fully operational.*
> 
> *Let me walk you through the structural changes, UI/UX optimizations, and AI integrations I built to make this platform production-ready."*

---

## 🎙️ Section 1: Dashboard UI/UX & GIS Map Overhaul (Visual Demo)

*Show the dashboard in your web browser. Interact with the map and cards as you speak.*

> *"First, I want to show you the overall layout and visual changes I made to the dashboard:*
> 
> 1. **I rescaled the layout grid & expanded the map:**
>    * *Originally, the dashboard was cramped, containing a 6-step guided demo card that pushed the main map into a tiny widget. I removed that card entirely, rescaled the layout grid in `App.jsx` to a full-screen view, and extended the **Global Event Venue GIS Sensor Grid** to a full **100% width** with a height of **500px** in `index.css`. This gives the app a premium, high-tech command center feel.*
> 
> 2. **I added a Persistent Labels Toggle for touch screens:**
>    * *The original app was built for desktop computers where hovering with a mouse revealed node names. This made it completely unusable on touch screens like tablets. To fix this, I added a touch-friendly **Labels Toggle** button in the map header. Tapping this forces all sensor name tags to remain visible at all times, making the dashboard fully tablet-compatible.*
> 
> 3. **I integrated custom GIS Sensor Nodes:**
>    * *I customized and integrated key sensor nodes directly into the context and map. For instance, I added the **Accessibility Transport Hub (the Indigo Node)** to track low-floor shuttle integrations and transit capacity. I also added the **CCTV Node** to monitor wheelchair-accessible elevators and the **Waste Detection Node** to monitor compost dumpster recycling rates.*
> 
> 4. **I built the Active Node Details Drawer:**
>    * *I built an interactive slide-up drawer at the bottom of the map panel. When I tap a node, it displays the current incident status and allows me to dispatch optimized repair crews directly from the drawer to clear alerts in real-time.*
> 
> 5. **I prevented Sparkline Graph Clipping:**
>    * *I noticed the neon-glow filter on the summary card graphs was getting cut off. I resized the Y-axis coordinates of the sparkline paths in `StatsGrid.jsx` to create a safety margin, added scaling viewboxes, and connected the spectator satisfaction card to the live telemetry stream so the line curves dynamically.*
> 
> 6. **I calibrated the BigQuery ML Energy Chart:**
>    * *The predictive energy forecast chart was getting cut off on browser resizing. I adjusted the coordinates to leave a 25px safety margin and converted the floating HTML tooltip into a native SVG group so the chart is 100% responsive.*
> 
> 7. **I designed the Vision AI Waste CCTV overlay:**
>    * *I upgraded the standard camera feeds into a high-tech waste monitoring screen, adding vertical green laser scanlines, glowing target brackets, and HUD text overlays to the `CAM_12_FANZONE` stream. When I toggle the 'Contaminated' state, it displays real-time warning boxes and capacity metrics.*
> 
> 8. **I styled the pgvector Database Matches:**
>    * *I styled the database matches as clean reference cards with toggleable accordion buttons. Tapping `[Expand Details]` reveals the exact policy documents cleanly without cluttering the screen."*

---

## 🎙️ Section 2: The Command Center (The Developer Workspace)

*Show your IDE, folders, and terminal window.*

> *"Next, I'll show you the developer environment and command tools I configured:*
> 
> 1. **I configured the Local Python Environment:**
>    * *I set up a Python 3.11 environment, created a local virtual environment, and resolved library conflicts by upgrading `protobuf` and `httpx` so the backend could communicate securely.*
> 
> 2. **I integrated Git version control:**
>    * *I installed **Git for Windows** using `winget` directly from the IDE terminal and integrated it with the editor's Source Control panel so I can manage code versioning and push directly to GitHub.*
> 
> 3. **I verified the global Antigravity TUI:**
>    * *I configured and tested the global CLI tool `agy`. I ran it from my terminal, authenticated it via Google OAuth, and used it to query and inspect files directly outside of the graphical IDE."*

---

## 🎙️ Section 3: The Sustainability & Knowledge Assistant (The AI Agent)

*Show the `my_agent.py` code and run it in the terminal.*

> *"Finally, here are the custom AI Agent and database logic systems I implemented:*
> 
> 1. **I upgraded the Agent to Gemini 2.5 Flash:**
>    * *The default SDK settings were pointing to the deprecated `gemini-1.5-flash` model, which returned `404` errors. I successfully upgraded the script to target the active **`gemini-2.5-flash`** model.*
> 
> 2. **I programmed a Unified Multimodal Chat Loop:**
>    * *I wrote a custom asynchronous Python loop using the SDK. This allows the terminal agent to handle text questions, and automatically read local images using the SDK's **`from_file`** helper for live visual analysis.*
> 
> 3. **I built the AI Credentials Configuration Panel:**
>    * *I added an API credentials setup panel in the UI allowing users to switch API modes on-the-fly, and built a **'Save & Verify'** backend ping to verify credentials in real-time.*
> 
> 4. **I implemented a Dual-Fallback RAG Database Architecture:**
>    * *If the live AlloyDB database connection or Google Cloud APIs failed to respond, the chat system would crash. To prevent this, I implemented a robust **Mock Mode / Offline Fallback** handler. If the API fails, the Knowledge Assistant automatically catches the error and pulls compliance regulations directly from local context memory. This guarantees **100% uptime for the judges** even if GCP is completely offline.*
> 
> *By combining full-width GIS map controls, custom sensor tracking, and a resilient dual-fallback RAG database, I have successfully built a complete, production-ready sustainability command center that is fully optimized for both desktop and tablet deployment.*
> 
> *Thank you for your time."*
