# 3-Minute Presentation Script (Super-Short Edition)

*This version is compressed to under 250 words. Read these short, punchy sentences slowly while clicking the dashboard so you can finish in under 3 minutes.*

---

## 🎙️ Intro (0:00 - 0:20)
*Show home screen.*

> *"Hello judges, I am representing team **ByteSustain**, and this is **EcoAccess**.*
> 
> *My task was handling the UI/UX component of this application, transforming the prototype into a high-fidelity operational command center. My team and I designed EcoAccess to bridge the gap between environmental sustainability and physical accessibility."*

---

## 🎙️ Tab 1: Command Center (0:20 - 1:20)
*Click **"Command Center"**. Click around the map and trigger incidents.*

> *"Here in the **Command Center**, I made several major visual and layout upgrades:*
> 
> * **First, I prevented chart clipping:** I resized the SVG sparklines and the BigQuery ML forecast coordinates so their neon glows scale without cutting off.
> * **Second, I expanded the layout:** I removed the cramped cards, scaling the GIS map to a full 100% width and 500px height.
> * **Third, I added the Indigo Node:** This marker points out the location of the Accessible Transport Hub on our grid.
> * **Fourth, I added the Labels Toggle:** Tapping this locks label text on for touch-screen and tablet users.
> * **Fifth, I built the details drawer:** Clicking any node slides up a drawer to dispatch repair crews in real-time.
> * **Sixth, I integrated CCTV scanlines:** I styled custom video cells with scrolling green scanlines and targeting brackets to show Vertex AI Vision monitoring waste bins."*

---

## 🎙️ Tab 2: Sustainability Chat (1:20 - 2:05)
*Click **"Sustainability Chat"**. Click one of the quick questions.*

> *"Next, in the **Sustainability Chat** tab:*
> 
> * **I Programmed the AI Copilot:** I upgraded the core query handler to use the active **Gemini 2.5 Flash** model.
> * **I Locked the Chat to Context:** The assistant is locked to operational keywords like *elevator, waste, or shuttle* to instantly pull up stadium compliance rules.
> * **Vision AI Bin Audit:** While this prototype uses simulated streams, the backend is architected to sample static frames from RTSP camera feeds once a minute, caching them in Google Cloud Storage to trigger Gemini's Vision API in the background."*

---

## 🎙️ Tab 3: Knowledge Assistant (2:00 - 2:45)
*Click **"Knowledge Assistant"**. Show credentials panel.*

> *"Finally, in the **Knowledge Assistant** tab:*
> 
> * **I Built the Credentials Panel:** Operators can configure API keys and test connections with a live backend verification check.
> * **I Built a Dual-Fallback Database System:** If Google Cloud or AlloyDB goes offline, the chatbot catches the error and pulls rules directly from local memory. This Mock Mode guarantees **100% uptime for the judges**."*

---

## 🎙️ Conclusion (2:45 - 3:15)
*Look at camera.*

> *"Ultimately, we designed the Sustainability Chat as the public-facing portal for event attendees to navigate guidelines, while the Command Center and Knowledge Assistant equip event managers to run the venue sustainably and inclusively.*
> 
> *By combining full-width GIS map controls, custom sensor tracking, and a resilient fallback database, my team and I have built a complete, production-ready platform.*
> 
> *Thank you."*
