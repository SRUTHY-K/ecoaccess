export const VENUE_PRESETS = [
  {
    id: 'apac-stadium',
    name: '🏟️ APAC Cricket Stadium (Ahmedabad / Global)',
    title: 'APAC Cricket Stadium Navigator',
    subtitle: 'Smart Venue Telemetry, Sustainable Operations & Inclusive Decision Hub',
    nodes: [
      { id: "node-main-venue", name: "Main Venue Zone", x: 50, y: 50, type: "venue", color: "#059669", details: "Main Venue Zone: The primary stadium field hosting cricket match play and main athletics." },
      { id: "node-entry", name: "🟢 Main Entrance Gate", x: 10, y: 85, type: "entry", color: "#2dd4bf", details: "Gate 1 Main Entrance: Contextual ticketing, security screening checkpoints, level-grade access corridors." },
      { id: "node-exit", name: "🔴 Main Exit Gate", x: 90, y: 15, type: "exit", color: "#f43f5e", details: "Gate 8 Main Exit Gate: High-capacity pedestrian outflow corridor with clear directional lighting." },
      { id: "node-solar", name: "☀️ Solar Charging Station", x: 24, y: 75, type: "charging", color: "var(--color-accent-yellow)", details: "Clean Solar Energy Charging Station: Dynamic on-grid cleanliness monitoring active." },
      { id: "node-shuttle", name: "🚌 Shuttle Pick-up", x: 88, y: 78, type: "shuttle", color: "var(--color-accent-pink)", details: "Shuttle Transit Hub: Low-emission shuttle vehicles depart to main transit links." },
      { id: "node-headset", name: "🎧 Audio Headset Pick Up", x: 12, y: 48, type: "audio", color: "var(--color-accent-white)", details: "Assistive Hearing Desk: Collect dynamic audio commentary headsets. Loop services active." },
      { id: "node-toilet", name: "♿ Restrooms", x: 62, y: 22, type: "toilet", color: "var(--color-accent-cyan)", details: "Universal Restroom Facility: Level grade ramped access, auto sliding doors, sensor taps." },
      { id: "node-help", name: "ℹ️ Information & Help Desk", x: 32, y: 15, type: "helpdesk", color: "var(--color-accent-purple)", details: "Venue Support Center: Live team support for physical routing, translation assistance." },
      { id: "node-food", name: "🍎 Food Kiosk", x: 78, y: 38, type: "food", color: "#15803d", details: "Plaza Food Kiosk: Organic and vegan concessions, plastic-free reusable cup drop points." },
      { id: "node-elevator", name: "🛗 Wheelchair Elevator & Ramp Shaft", x: 42, y: 65, type: "elevator", color: "#3b82f6", details: "Section 104 Elevator & Ramp: Wheelchair vertical lift shaft and step-free incline corridor." },
      { id: "node-waste", name: "♻️ Smart Waste CCTV Hub", x: 70, y: 62, type: "waste", color: "#10b981", details: "Food Court Bin Station #4: Live Gemini CCTV bin fill-level and contamination monitoring." },
      { id: "node-water", name: "💧 Water Refill Station", x: 35, y: 35, type: "water", color: "#06b6d4", details: "H2O Refill Bar: Municipal water conservation sensor taps and plastic bottle refill point." },
      { id: "node-medical", name: "🚑 First Aid & Medical Hub", x: 58, y: 80, type: "medical", color: "#ef4444", details: "Main Concourse Medical Station: Heat-stress triage and rapid response emergency crew dispatch." },
      { id: "node-bess", name: "🔋 Solar Battery Storage BESS", x: 20, y: 20, type: "bess", color: "#8b5cf6", details: "Grid Substation BESS: 500kWh battery energy storage system for peak power load shaving." }
    ]
  },
  {
    id: 'wembley-arena',
    name: '⚽ Wembley Stadium & Olympic Hub (London)',
    title: 'Wembley Olympic Sustainability Command',
    subtitle: 'London Olympic Park Grid Load Shedding & Zero-Landfill Control',
    nodes: [
      { id: "node-main-venue", name: "Wembley Pitch Arena", x: 50, y: 45, type: "venue", color: "#059669", details: "Wembley Central Pitch: 90,000-seat bowl with automated LED smart lighting." },
      { id: "node-entry", name: "🟢 Bobby Moore Entrance", x: 15, y: 80, type: "entry", color: "#2dd4bf", details: "Bobby Moore Gate: Turnstiles with step-free wheelchair entry lanes." },
      { id: "node-exit", name: "🔴 Olympic Way Exit", x: 85, y: 20, type: "exit", color: "#f43f5e", details: "Olympic Way Outflow: Direct crowd routing to Wembley Park Tube Station." },
      { id: "node-solar", name: "☀️ Arch Solar Canopy", x: 30, y: 70, type: "charging", color: "var(--color-accent-yellow)", details: "Solar Arch Generator: 450kW rooftop solar grid feeding battery storage." },
      { id: "node-shuttle", name: "🚌 Green Line Bus Link", x: 82, y: 82, type: "shuttle", color: "var(--color-accent-pink)", details: "Zero-emission hydrogen bus pickup terminal." },
      { id: "node-headset", name: "🎧 Audio Assistance Desk", x: 18, y: 40, type: "audio", color: "var(--color-accent-white)", details: "RNIB Audio Description Desk for visually impaired football fans." },
      { id: "node-toilet", name: "♿ Universal Restrooms", x: 68, y: 25, type: "toilet", color: "var(--color-accent-cyan)", details: "Changing Places ADA Restroom with hoist and height-adjustable table." },
      { id: "node-help", name: "ℹ️ Guest Services Hub", x: 38, y: 18, type: "helpdesk", color: "var(--color-accent-purple)", details: "London Event Information Desk & Multilingual Support." },
      { id: "node-food", name: "🍎 Green Concourse Food", x: 72, y: 42, type: "food", color: "#15803d", details: "Zero-Single-Use Food Court: 100% compostable packaging only." },
      { id: "node-elevator", name: "🛗 Bobby Moore Elevator", x: 42, y: 65, type: "elevator", color: "#3b82f6", details: "Upper Concourse Elevator: Wheelchair accessible lift connecting Level 1 to Level 5." },
      { id: "node-waste", name: "♻️ Olympic Waste Audit Hub", x: 70, y: 62, type: "waste", color: "#10b981", details: "Plaza Recycling Station: Gemini Vision automated waste segregation audit point." },
      { id: "node-water", name: "💧 Thames Water Bar", x: 35, y: 35, type: "water", color: "#06b6d4", details: "Clean Hydration Hub: Free filtered drinking water stations." },
      { id: "node-medical", name: "🚑 St. John Ambulance Post", x: 58, y: 80, type: "medical", color: "#ef4444", details: "First Aid Command Post: On-site paramedic squad and heat-relief station." },
      { id: "node-bess", name: "🔋 National Grid Battery Reserve", x: 20, y: 20, type: "bess", color: "#8b5cf6", details: "Substation BESS: 1MW battery bank for smoothing stadium floodlight surges." }
    ]
  },
  {
    id: 'ariake-arena',
    name: '🎾 Ariake Arena & Paralympic Plaza (Tokyo)',
    title: 'Tokyo Ariake Eco-Arena Command',
    subtitle: 'Zero-Carbon Power Microgrid & Barrier-Free Mobility Operations',
    nodes: [
      { id: "node-main-venue", name: "Ariake Court 1", x: 50, y: 50, type: "venue", color: "#059669", details: "Ariake Main Court: Heat-shield roof with automated ventilation system." },
      { id: "node-entry", name: "🟢 North Gate Entry", x: 20, y: 85, type: "entry", color: "#2dd4bf", details: "North Barrier-Free Entrance: Universal tactile paving and smart ticketing." },
      { id: "node-exit", name: "🔴 Yurikamome Transit Exit", x: 80, y: 15, type: "exit", color: "#f43f5e", details: "Yurikamome Station Connector: High-speed automated train link." },
      { id: "node-solar", name: "☀️ Bay Area Solar Array", x: 28, y: 65, type: "charging", color: "var(--color-accent-yellow)", details: "Tokyo Bay Solar Pavilion: Microgrid solar array with battery backup." },
      { id: "node-shuttle", name: "🚌 EV Autonomous Shuttle", x: 85, y: 75, type: "shuttle", color: "var(--color-accent-pink)", details: "Autonomous Electric Shuttle Stop connecting to Odaiba District." },
      { id: "node-headset", name: "🎧 Sensory & Hearing Center", x: 15, y: 55, type: "audio", color: "var(--color-accent-white)", details: "Hearing loop headsets & quiet sensory decompression room." },
      { id: "node-toilet", name: "♿ Multi-Purpose Toilet", x: 60, y: 30, type: "toilet", color: "var(--color-accent-cyan)", details: "Barrier-Free Restroom: Voice-guided facilities & automated sanitizers." },
      { id: "node-help", name: "ℹ️ Omotenashi Help Desk", x: 35, y: 22, type: "helpdesk", color: "var(--color-accent-purple)", details: "Multilingual Hospitality & Accessibility Desk." },
      { id: "node-food", name: "🍎 Organic Bento Hub", x: 75, y: 50, type: "food", color: "#15803d", details: "Local Organic Bento Stall: Zero-waste sorting & compost drop-off." },
      { id: "node-elevator", name: "🛗 Ariake Tower Elevator", x: 42, y: 65, type: "elevator", color: "#3b82f6", details: "Paralympic Universal Lift: High-speed glass elevator with braille controls." },
      { id: "node-waste", name: "♻️ Tokyo Eco Waste Station", x: 70, y: 62, type: "waste", color: "#10b981", details: "Multi-Category Bin Station: 4-stream waste segregation with AI vision." },
      { id: "node-water", name: "💧 Tokyo Water Hydration Station", x: 35, y: 35, type: "water", color: "#06b6d4", details: "Purified Water Stand: Touchless sensor taps conserving municipal water." },
      { id: "node-medical", name: "🚑 Tokyo Emergency Medical Hub", x: 58, y: 80, type: "medical", color: "#ef4444", details: "Japanese Red Cross First Aid Station: Rapid AED ambulance squad." },
      { id: "node-bess", name: "🔋 Bay Microgrid BESS Hub", x: 20, y: 20, type: "bess", color: "#8b5cf6", details: "Lithium BESS Microgrid: Solar battery buffer preventing Tokyo power grid strain." }
    ]
  },
  {
    id: 'sofi-stadium',
    name: '🏟️ SoFi Stadium & Eco Pavilion (Los Angeles)',
    title: 'SoFi Stadium Zero-Pollution Hub',
    subtitle: 'LA Mega-Venue Carbon Telemetry & Accessible Crowd Analytics',
    nodes: [
      { id: "node-main-venue", name: "SoFi Stadium Bowl", x: 50, y: 50, type: "venue", color: "#059669", details: "SoFi Main Field: 70,000-seat canopy covered stadium with clear ETFE roof." },
      { id: "node-entry", name: "🟢 American Airlines Gate", x: 12, y: 82, type: "entry", color: "#2dd4bf", details: "American Airlines Entry Plaza: Express ADA screening lanes." },
      { id: "node-exit", name: "🔴 Century Boulevard Exit", x: 88, y: 18, type: "exit", color: "#f43f5e", details: "Century Blvd Exit Corridor: Direct shuttle access to LAX light rail." },
      { id: "node-solar", name: "☀️ Lake Park Solar Canopy", x: 26, y: 72, type: "charging", color: "var(--color-accent-yellow)", details: "Riverside Solar Grid: Dynamic battery storage powering stadium HVAC." },
      { id: "node-shuttle", name: "🚌 Metro Express Shuttle", x: 86, y: 80, type: "shuttle", color: "var(--color-accent-pink)", details: "LA Metro Electric Bus Terminal with real-time arrival boards." },
      { id: "node-headset", name: "🎧 Assistive Audio Kiosk", x: 14, y: 50, type: "audio", color: "var(--color-accent-white)", details: "LA Event Assistive Listening Device Distribution Desk." },
      { id: "node-toilet", name: "♿ ADA Family Restrooms", x: 65, y: 24, type: "toilet", color: "var(--color-accent-cyan)", details: "All-Gender ADA Restroom with automatic touchless fixtures." },
      { id: "node-help", name: "ℹ️ Fan Experience Desk", x: 34, y: 16, type: "helpdesk", color: "var(--color-accent-purple)", details: "Concierge & ADA Route Guidance Support." },
      { id: "node-food", name: "🍎 Sustainable Concessions", x: 76, y: 40, type: "food", color: "#15803d", details: "Farm-to-Table Food Stand: Locally sourced organic catering." },
      { id: "node-elevator", name: "🛗 Canyon Level Elevator E-4", x: 42, y: 65, type: "elevator", color: "#3b82f6", details: "Canyon Elevator Shaft E-4: Direct lift connecting Level 1 to VIP Concourse." },
      { id: "node-waste", name: "♻️ SoFi Eco Waste Station #2", x: 70, y: 62, type: "waste", color: "#10b981", details: "Concourse Recycling Hub: AI CCTV camera monitoring bin capacity." },
      { id: "node-water", name: "💧 California Hydration Bar", x: 35, y: 35, type: "water", color: "#06b6d4", details: "Eco Refill Bar: Touchless water station saving single-use plastic." },
      { id: "node-medical", name: "🚑 Inglewood Emergency Medical", x: 58, y: 80, type: "medical", color: "#ef4444", details: "First Aid Center: Emergency triage and mobility response team." },
      { id: "node-bess", name: "🔋 Tesla Megapack BESS", x: 20, y: 20, type: "bess", color: "#8b5cf6", details: "Tesla Megapack Energy Storage: Peak shaving 2MWh battery system." }
    ]
  }
];
