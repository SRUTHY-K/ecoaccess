# 🌐 EcoAccess Command Center — Project Overview & Architecture

## 💡 Brief About the Idea & Solution

* **Our Approach**: We engineered a unified operational control center that transforms fragmented, siloed venue metrics into real-time sustainability directives. The platform pairs a fast, global-state-driven React (Vite) UI with a high-performance asynchronous FastAPI backend.
* **Core Architecture**: The system ingests environmental telemetry, utilizes predictive (BigQuery ML) and visual AI (Gemini Vision) to detect bottlenecks, and leverages generative AI to instantly cross-reference venue guidelines for rapid remediation.
* **Data Transformation**: **Gemini 2.5 Flash** acts as the core reasoning engine, seamlessly synthesizing predictions, visual triggers, and vector-retrieved compliance guidelines into human-readable operational briefs and 1-click automated mitigations.

---

## 🌍 United Nations Sustainable Development Goals (SDGs) Alignment

### ⚡ SDG 7: Affordable & Clean Energy
* **Action:** BigQuery ML (ARIMA model) forecasts hourly power grid demand and optimizes renewable energy routing.
* **Impact:** Maximizes grid efficiency, buffers solar battery output, and prevents fossil backup strains.

### ♿ SDG 10: Reduced Inequalities *(Accessibility & Inclusion)*
* **Action:** AlloyDB pgvector RAG indexes ADA compliance rules, while Gemini 2.5 Flash guides physical & sensory accessibility routes.
* **Impact:** Eliminates venue accessibility barriers and ensures inclusive mobility for all spectators.

### 🏙️ SDG 11: Sustainable Cities & Communities
* **Action:** Unified SaaS decision platform transforming massive crowds (75,000+ spectators) into zero-pollution operations.
* **Impact:** Shields urban environments and host communities from acute, event-driven pollution and traffic congestion spikes.

### ♻️ SDG 12: Responsible Consumption & Production
* **Action:** Vertex AI Gemini Vision analyzes live CCTV streams to detect overflowing bins and plastic contamination in organic streams.
* **Impact:** Maximizes recycling efficiency and enforces automated waste segregation on the ground.

### 🌿 SDG 13: Climate Action
* **Action:** BigQuery ML Linear Regression predicts Scope 2 & 3 carbon footprints, triggering Gemini AI load mitigation strategies.
* **Impact:** Minimizes the greenhouse gas footprint of massive global gatherings.
