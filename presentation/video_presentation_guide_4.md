# 3-Minute Video Presentation Script (Sidebar Tabs Order)

*Use this version to record a punchy, 3-minute video. It is written in first-person ("I") statements and divided exactly by the three tabs on your sidebar menu.*

---

## 🎙️ Introduction (0:00 - 0:15)
*Start with a close-up of yourself or showing the dashboard home screen.*

> *"Hello judges, I am representing team **ByteSustain**, and this is **EcoAccess**.*
> 
> *My task was handling the UI/UX component of this application, transforming the prototype into a high-fidelity, production-ready operational command center. My team and I designed EcoAccess as an intelligent agentic system that enables operators to conduct large-scale public events with significantly less pollution and absolute social inclusivity. By connecting real-time telemetry to predictive AI, my team and I bridge the gap between environmental sustainability and physical accessibility.*
> 
> *Let me walk you through the structural layouts, interactive designs, and database integrations I built."*

---

## 🎙️ Tab 1: Command Center (0:25 - 1:35)
*Click on **"Command Center"** in your sidebar. Show the full-screen map and interact with the elements.*

> *"Here in the **Command Center**, I made several key layout and visual upgrades:*
> 
> * **First, I prevented chart clipping and engineered SVG charts:** I mathematically resized the summary card SVG sparklines and the BigQuery ML forecasting SVG chart to prevent their neon glows from clipping, helping get this platform production-ready.
> * **Second, I rescaled the layout and map:** I removed the cramped default cards, rescaled the grid to a full-screen view in `App.jsx`, and expanded the **GIS Interactive Map** to a full 100% width and 500px height.
> * **Third, I integrated the Indigo Node:** I added the **Accessibility Transport Hub (Indigo Node)** to point out exactly where the accessible transport hub is located on the map grid.
> * **Fourth, I added a persistent labels toggle:** The original map only worked with desktop mouse-hovers. To make it compatible with touch screens and tablets, I built a 'Labels Toggle' button in the header so tablet users can lock names on.
> * **Fifth, I built the node details drawer:** Tapping any node slides up a drawer at the bottom, allowing me to view incidents and dispatch repair crews instantly.
> * **Sixth, I integrated CCTV scanlines for Vertex AI Vision:** To visualize live AI analysis, I engineered custom camera viewport shells in `LiveCCTV.jsx`, overlaying scrolling green scanline animations using CSS gradients, paired with pulsing red recording tags and neon targeting brackets."*

---

## 🎙️ Tab 2: Sustainability Chat (1:35 - 2:15)
*Click on **"Sustainability Chat"** in your sidebar. Click on one of the quick question cards or type an operational keyword.*

> *"Next, in the **Sustainability Chat** tab:*
> 
> * **I Programmed the AI Copilot:** I upgraded the underlying engine to use the active **Gemini 2.5 Flash** model. 
> * **I Locked the Chat to Event Context:** Rather than allowing open-ended conversation, I designed this chat to respond specifically to operational keywords like *elevator, waste, ramp,* or *shuttle*, instantly fetching the exact guidelines for stadium staff.
> * **Multimodal Vision Audit:** As I mentioned, instead of manual file uploads, the system automatically audits active camera feeds like **Plaza Food Court Bin #4** in the background. Gemini uses its vision engine to audit container capacity and detect contaminants in real-time, triggering alerts."*

---

## 🎙️ Tab 3: Knowledge Assistant (2:10 - 2:45)
*Click on **"Knowledge Assistant"** in your sidebar. Show the configurations panel.*

> *"Finally, in the **Knowledge Assistant** tab:*
> 
> * **I Built the Credentials Panel:** I added an interface that lets operators configure and test API connections (switching between Google AI Studio and Vertex AI) with a live 'Save & Verify' backend check.
> * **I Built a Dual-Fallback Database System:** If the live database connection or Google Cloud APIs go offline, my code automatically catches the error and triggers a client-side mock RAG lookup. This local Mock Mode retrieves compliance rules (like *Accessibility Rule 4.2.1* and *Sustainability Code 6.1.2*) directly from memory, guaranteeing **100% uptime for the judges** under any network condition."*

---

## 🎙️ Conclusion (2:45 - 3:00)
*Look back at the camera.*

> *"By combining full-width GIS map controls, custom sensor tracking, and a resilient fallback database, I have built a complete, production-ready sustainability command center.*
> 
> *Thank you for your time."*
