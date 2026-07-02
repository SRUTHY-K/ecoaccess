import React, { createContext, useContext, useState, useEffect } from 'react';

const EcoAccessContext = createContext();

export const EcoAccessProvider = ({ children }) => {
  // Navigation
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Dynamic Product Settings
  const [eventTitle, setEventTitle] = useState('EcoAccess Command Center');
  const [eventSubtitle, setEventSubtitle] = useState('Smart Venue Telemetry, Sustainable Operations & Inclusive Decision Hub');
  const [baseBudget, setBaseBudget] = useState(30.0);
  
  // Custom Dynamic Venue GIS Nodes
  const [mapNodes, setMapNodes] = useState([
    { id: 'node-1', name: 'Venue A: Stadium Arena', x: 50, y: 50, type: 'stadium', alert: 'elevator' },
    { id: 'node-2', name: 'Venue C: Mega Fan Zone', x: 80, y: 35, type: 'fanzone', alert: 'grid' },
    { id: 'node-3', name: "Venue B: Athletes' Village", x: 30, y: 25, type: 'village', alert: 'none' },
    { id: 'node-4', name: 'Venue D: Accessible Transport Hub', x: 75, y: 75, type: 'transporthub', alert: 'none' }
  ]);

  // Accessibility Controls
  const [highContrast, setHighContrast] = useState(false);
  const [fontSizeClass, setFontSizeClass] = useState('font-normal'); // font-normal, font-large
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Map Visualization Mode
  const [mapOverlayMode, setMapOverlayMode] = useState('carbon'); // carbon, accessibility

  // Custom Weather / Event Stress Scenarios
  const [activeScenario, setActiveScenario] = useState('normal');
  const [scenarioLogs, setScenarioLogs] = useState([]);
  const [isSimulatingEvent, setIsSimulatingEvent] = useState(false);

  // Active Environmental & Accessibility Anomalies
  const [incidents, setIncidents] = useState([
    {
      id: 'inc-301',
      title: 'Elevator E-4 Breakdown (Access Barrier)',
      sector: 'Venue A: Stadium Arena (Gate 6)',
      location: 'Section 104 Elevator Shaft',
      severity: 'high',
      time: '6 mins ago',
      status: 'unresolved', // unresolved, dispatching, resolved
      description: 'Wheelchair access elevator E-4 is offline. 24 spectators with mobility impairments are blocked from accessing Upper Deck seats.',
      dispatcherLog: ''
    },
    {
      id: 'inc-302',
      title: 'Grid Overload (Scope 2 Concessions)',
      sector: 'Venue C: Mega Fan Zone',
      location: 'Plaza Grid B2, Power Substation',
      severity: 'medium',
      time: '14 mins ago',
      status: 'unresolved',
      description: 'Scope 2 carbon draw spiked to 880 kW due to screen displays. Risk of fossil-fuel backup startup.',
      dispatcherLog: ''
    },
    {
      id: 'inc-303',
      title: 'Recycling Contamination (CCTV-12)',
      sector: 'Venue C: Mega Fan Zone',
      location: 'Plaza Food Court, Bin #4',
      severity: 'medium',
      time: '18 mins ago',
      status: 'unresolved',
      description: 'Vertex AI Vision CCTV-12 detected non-compostable plastics in the organic compost recycling bin. Contamination probability: 89%.',
      dispatcherLog: ''
    },
    {
      id: 'inc-304',
      title: 'Wheelchair Ramp Egress Block (CCTV-04)',
      sector: 'Venue A: Stadium Arena (Main Gate)',
      location: 'Gate 2 Entrance Pathway',
      severity: 'high',
      time: '24 mins ago',
      status: 'unresolved',
      description: 'Vertex AI Vision CCTV-04 detected a merchandise stand and crowd pileup blocking the primary wheelchair egress ramp.',
      dispatcherLog: ''
    }
  ]);
  const [selectedIncident, setSelectedIncident] = useState(incidents[0]);
  const [dispatchProgress, setDispatchProgress] = useState({});

  // Smart Stadium Grid Indicators
  const [solarPeakShavingActive, setSolarPeakShavingActive] = useState(false);
  const [utilityAlerts, setUtilityAlerts] = useState([
    { id: 'ut-1', msg: 'Venue C: Grid drawing from heavy carbon-intensity supply', severity: 'warning' },
    { id: 'ut-2', msg: 'Venue A: Elevator E-4 offline (Elevated Inclusivity Risk)', severity: 'danger' }
  ]);

  // Multilingual Spectator Feeds
  const [spectatorFeedbacks, setSpectatorFeedbacks] = useState([
    { id: 'spec-1', category: 'Accessibility', language: 'Spanish', text: 'No hay rampas cerca del estacionamiento norte, tuve que dar una vuelta enorme en mi silla de ruedas.', translation: 'There are no ramps near the north parking lot, I had to take a huge detour in my wheelchair.', date: 'Today', sentiment: 'negative', urgency: 'high' },
    { id: 'spec-2', category: 'Energy', language: 'English', text: 'The stadium floodlights are running in broad daylight. Total waste of solar energy.', translation: '', date: 'Today', sentiment: 'negative', urgency: 'medium' },
    { id: 'spec-3', category: 'Inclusivity', language: 'Japanese', text: '音声ガイド機器のバッテリーが切れています。視覚障害者向けのサポートが不十分です。', translation: 'The audio guide device batteries are dead. Support for visually impaired fans is insufficient.', date: 'Yesterday', sentiment: 'negative', urgency: 'high' },
    { id: 'spec-4', category: 'Waste', language: 'German', text: 'Warum gibt es Plastikbecher? Ich dachte, dieses Turnier ist eine Null-Abfall-Zone.', translation: 'Why are there plastic cups? I thought this tournament was a zero-waste zone.', date: 'Today', sentiment: 'negative', urgency: 'medium' }
  ]);

  // AI Chat Co-Pilot
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'ai',
      text: "Hello! I am Gemini, your EcoAccess Global Event Co-pilot. I analyze on-site energy, waste streams, and accessibility infrastructure. I translate multilingual fan feedback (Spanish, Japanese, German) and suggest automated dispatches for mobility barriers or carbon spikes. How can I assist you in hosting a sustainable and inclusive event?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      citations: []
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Accessibility & Sustainability Sliders
  const [renewablesShare, setRenewablesShare] = useState(30);
  const [transitInclusivity, setTransitInclusivity] = useState(40);
  const [circularEconomyRate, setCircularEconomyRate] = useState(30);
  const [audioAssistCoverage, setAudioAssistCoverage] = useState(25);

  // BQ & Gemini Vision States
  const [carbonFootprint, setCarbonFootprint] = useState(86000);
  const [energyForecast, setEnergyForecast] = useState([
    {"time": "18:00", "value": 680.0},
    {"time": "19:00", "value": 880.0},
    {"time": "20:00", "value": 750.0},
    {"time": "21:00", "value": 520.0}
  ]);
  const [spectatorCount, setSpectatorCount] = useState(50000);
  const [isVisionAnalyzing, setIsVisionAnalyzing] = useState(false);
  const [demoStep, setDemoStep] = useState(1);
  const [geminiBrief, setGeminiBrief] = useState("");

  // Load configuration on startup
  useEffect(() => {
    fetch('http://localhost:8000/api/config')
      .then(res => res.json())
      .then(data => {
        if (data.eventTitle) {
          setEventTitle(data.eventTitle);
          setEventSubtitle(data.eventSubtitle);
          setBaseBudget(data.baseBudget);
          setMapNodes(data.mapNodes);
        }
      })
      .catch(err => console.log("Using local mock configurations (Backend offline)."));
  }, []);

  // Update carbon footprint from BigQuery ML when parameters change
  useEffect(() => {
    fetch(`http://localhost:8000/api/predictions/carbon?renewables=${renewablesShare}&transit=${transitInclusivity}&recycling=${circularEconomyRate}&attendance=${spectatorCount}`)
      .then(res => res.json())
      .then(data => {
        if (data.carbonFootprint !== undefined) {
          setCarbonFootprint(data.carbonFootprint);
        }
      })
      .catch(err => {
        let base = 86000 - (renewablesShare / 100) * 20000 - (transitInclusivity / 100) * 35000 - (circularEconomyRate / 100) * 8000;
        let adj = (spectatorCount - 50000) * 0.4;
        setCarbonFootprint(Math.max(10000, Math.round(base + adj)));
      });
  }, [renewablesShare, transitInclusivity, circularEconomyRate, spectatorCount]);

  // Load energy forecast
  const loadEnergyForecast = () => {
    fetch('http://localhost:8000/api/predictions/energy')
      .then(res => res.json())
      .then(data => {
        if (data.forecast) {
          setEnergyForecast(data.forecast);
        }
      })
      .catch(err => {
        // Backend offline: use realistic mock ARIMA forecast
        setEnergyForecast([
          {"time": "18:00", "value": 680.0},
          {"time": "19:00", "value": 880.0},
          {"time": "20:00", "value": 750.0},
          {"time": "21:00", "value": 520.0}
        ]);
      });
  };

  useEffect(() => {
    loadEnergyForecast();
  }, [activeScenario]);

  // Persist configuration
  const persistConfig = (title, subtitle, budget, nodes) => {
    fetch('http://localhost:8000/api/config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventTitle: title,
        eventSubtitle: subtitle,
        baseBudget: budget,
        mapNodes: nodes
      })
    })
      .then(res => res.json())
      .then(data => console.log("Event config persisted to Google Cloud database."))
      .catch(err => console.log("Using local session variables (Backend offline)."));
  };

  // Demo step simulation triggers
  const triggerSpectatorSurge = () => {
    setIsSimulatingEvent(true);
    setSpectatorCount(75000);
    setRenewablesShare(30);
    setTransitInclusivity(40);
    setCircularEconomyRate(30);
    setAudioAssistCoverage(25);
    
    setIncidents(prev => prev.map(inc => {
      if (inc.id === 'inc-301' || inc.id === 'inc-302' || inc.id === 'inc-303') {
        return { ...inc, status: 'unresolved', dispatcherLog: '' };
      }
      return inc;
    }));

    setUtilityAlerts([
      { id: 'ut-1', msg: 'Venue C: Grid drawing from heavy carbon-intensity supply', severity: 'warning' },
      { id: 'ut-2', msg: 'Venue A: Elevator E-4 offline (Elevated Inclusivity Risk)', severity: 'danger' }
    ]);

    setScenarioLogs(prev => [
      { time: new Date().toLocaleTimeString(), title: "Spectator Surge Active (75,000)", details: "Crowd density spiked at Gate 2 and Gate 6. Grid load rising at Venue C." },
      ...prev
    ]);

    setDemoStep(2);
    setTimeout(() => setIsSimulatingEvent(false), 800);
  };

  const runBigQueryMLForecast = () => {
    setIsSimulatingEvent(true);
    loadEnergyForecast();
    
    setScenarioLogs(prev => [
      { time: new Date().toLocaleTimeString(), title: "BigQuery ML ARIMA Evaluated", details: "Projected peak power load of 880 kW at Venue C concessions." },
      ...prev
    ]);
    
    setDemoStep(3);
    setTimeout(() => setIsSimulatingEvent(false), 800);
  };

  const triggerPresetVisionAudit = (type) => {
    if (type === 'contaminated') {
      setIncidents(prev => prev.map(inc => {
        if (inc.id === 'inc-303') {
          return {
            ...inc,
            status: 'unresolved',
            description: "Vertex AI Vision CCTV-12 detected plastic bottles and aluminum cans in compost bin. Contamination: 89%. Fill: 68%.",
            dispatcherLog: ""
          };
        }
        return inc;
      }));
    } else {
      setIncidents(prev => prev.map(inc => {
        if (inc.id === 'inc-303') {
          return {
            ...inc,
            status: 'resolved',
            description: "Vertex AI Vision CCTV-12 check: Compost bin is clean. Fill level at 42%.",
            dispatcherLog: "Checked: Clean."
          };
        }
        return inc;
      }));
    }
    setDemoStep(4);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsVisionAnalyzing(true);
    const formData = new FormData();
    formData.append("file", file);

    fetch("http://localhost:8000/api/detect-waste", {
      method: "POST",
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        setIsVisionAnalyzing(false);
        if (data.contaminationDetected) {
          setIncidents(prev => prev.map(inc => {
            if (inc.id === 'inc-303') {
              return {
                ...inc,
                status: 'unresolved',
                description: `Gemini Vision audited upload: Contamination detected! Details: ${data.contaminationDetail}. Fill Level: ${data.fillLevel}%.`,
                severity: data.status === 'overflowing' ? 'high' : 'medium'
              };
            }
            return inc;
          }));
          alert(`AI Vision Alert: Recycling contamination detected! Details: ${data.contaminationDetail}`);
        } else {
          setIncidents(prev => prev.map(inc => {
            if (inc.id === 'inc-303') {
              return {
                ...inc,
                status: 'resolved',
                description: `Gemini Vision audited upload: Bin is normal. Fill level at ${data.fillLevel}%. No contamination detected.`,
                dispatcherLog: `Success: Checked via Gemini Vision. No action required.`
              };
            }
            return inc;
          }));
          alert(`AI Vision Result: No contamination detected. Bin is at ${data.fillLevel}% capacity.`);
        }
        setDemoStep(4);
      })
      .catch(err => {
        setIsVisionAnalyzing(false);
        alert("Error calling Gemini Vision API. Backend might be offline.");
      });
  };

  const generateAICopilotBrief = () => {
    setIsTyping(true);
    const eventContext = `Event: ${eventTitle}, Spectators: ${spectatorCount}, Renewables: ${renewablesShare}%, Accessibility: ${transitInclusivity}%, Audio Assist: ${audioAssistCoverage}%, Incidents: Elevator E-4 offline, Venue C grid spike, bin contamination.`;
    
    fetch('http://localhost:8000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: "Provide a unified tactical operations brief regarding the active spectator surge, the energy overload grid warning, and accessibility/waste issues.",
        context: eventContext
      })
    })
      .then(res => res.json())
      .then(data => {
        setGeminiBrief(data.text);
        setChatMessages(prev => [...prev, {
          sender: 'ai',
          text: data.text,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          citations: data.citations,
          ragSnippet: data.ragSnippet
        }]);
        setIsTyping(false);
        setDemoStep(5);
      })
      .catch(err => {
        setIsTyping(false);
        const fallbackText = `COPILOT EXECUTIVE SUMMARY:\n1. Carbon Footprint projected at ${carbonFootprint} tonnes. Substation load peak warnings require Solar battery peak shaving.\n2. Accessibility barriers: Elevator E-4 at Gate 6 breakdown blocks wheelchair seats. Maintenance crew dispatch required. Reroute accessible shuttles.\n3. Waste issues: CCTV-12 flagged non-recyclables in compost. Dispatch compost sorters.`;
        setGeminiBrief(fallbackText);
        setDemoStep(5);
      });
  };

  const queryRAGRules = () => {
    setIsTyping(true);
    fetch('http://localhost:8000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: "What are the rules regarding elevator breakdowns and public transit carbon offsets?",
        context: "Event: EcoAccess Command Center"
      })
    })
      .then(res => res.json())
      .then(data => {
        setChatMessages(prev => [...prev, {
          sender: 'ai',
          text: `Retrieved compliance regulations from AlloyDB pgvector:\n\n${data.ragSnippet || "No direct rules matched."}\n\nRecommendations:\n1. Apply Accessibility Rule 4.2.1 (dispatch repairs, reroute to ramps within 10 min).\n2. Apply Sustainability Code 6.1.2 (increase low-floor electric shuttles by 10% to offset travel carbon).`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          citations: ["AlloyDB pgvector Index"],
          ragSnippet: data.ragSnippet
        }]);
        setIsTyping(false);
        setDemoStep(6);
      })
      .catch(err => {
        // Backend offline: show mock RAG retrieval result
        setChatMessages(prev => [...prev, {
          sender: 'ai',
          text: `RAG RETRIEVAL (AlloyDB pgvector — offline fallback):\n\nAccessibility Rule 4.2.1: In the event of elevator failure, repair crews must be dispatched within 10 minutes. Accessible ramp routes must be communicated to affected visitors via audio announcement and digital signage.\n\nSustainability Code 6.1.2: During peak crowd periods causing carbon overrun, operator must increase low-floor electric shuttle frequency by a minimum of 10% to offset transit emissions and reduce private vehicle demand.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          citations: ["AlloyDB pgvector Index (offline fallback)"],
          ragSnippet: "Accessibility Rule 4.2.1 & Sustainability Code 6.1.2"
        }]);
        setIsTyping(false);
        setDemoStep(6);
      });
  };

  const executeDemoMitigations = () => {
    setSolarPeakShavingActive(true);
    setIncidents(prev => prev.map(inc => {
      if (inc.id === 'inc-301' || inc.id === 'inc-303' || inc.id === 'inc-302' || inc.id === 'inc-304') {
        return { 
          ...inc, 
          status: 'resolved', 
          dispatcherLog: 'Mitigation completed: AI automated mitigation protocols verified.' 
        };
      }
      return inc;
    }));

    setRenewablesShare(75);
    setTransitInclusivity(80);
    setCircularEconomyRate(70);
    setAudioAssistCoverage(70);

    setUtilityAlerts([
      { id: 'ut-1', msg: 'Venue C: AI Solar Shaving active. Carbon intensity balanced.', severity: 'info' }
    ]);

    setScenarioLogs(prev => [
      { time: new Date().toLocaleTimeString(), title: "Mitigation Protocols Deployed", details: "Solar battery buffers activated. Accessible shuttle frequency increased to 80%. All elevators online." },
      ...prev
    ]);

    setDemoStep(7);
  };

  const resetDemoWorkflow = () => {
    setDemoStep(1);
    setSpectatorCount(50000);
    setRenewablesShare(30);
    setTransitInclusivity(40);
    setCircularEconomyRate(30);
    setAudioAssistCoverage(25);
    setSolarPeakShavingActive(false);
    setGeminiBrief("");
    setIncidents(prev => prev.map(inc => ({ ...inc, status: 'unresolved', dispatcherLog: '' })));
    setUtilityAlerts([
      { id: 'ut-1', msg: 'Venue C: Grid drawing from heavy carbon-intensity supply', severity: 'warning' },
      { id: 'ut-2', msg: 'Venue A: Elevator E-4 offline (Elevated Inclusivity Risk)', severity: 'danger' }
    ]);
  };

  // Dispatch individual crew
  const handleDispatch = (id) => {
    setIncidents(prev => prev.map(inc => {
      if (inc.id === id) {
        return { 
          ...inc, 
          status: 'dispatching',
          dispatcherLog: 'AI Resource Router dispatching optimized crews...'
        };
      }
      return inc;
    }));

    let count = 0;
    const interval = setInterval(() => {
      count += 10;
      setDispatchProgress(prev => ({
        ...prev,
        [id]: count
      }));

      if (count >= 100) {
        clearInterval(interval);
        setIncidents(prev => {
          const updated = prev.map(inc => {
            if (inc.id === id) {
              const responderText = id === 'inc-301'
                ? 'Elevator Repair Crew arrived. Elevator E-4 back online.'
                : id === 'inc-302'
                ? 'Solar Battery Substation Unit 3 activated.'
                : id === 'inc-303'
                ? 'Sanitation team deployed. Contamination level cleared.'
                : 'Merchandise vendor relocated. Egress path cleared.';
              
              const resolvedIncident = { 
                ...inc, 
                status: 'resolved',
                dispatcherLog: `Success: Mitigation completed. ${responderText}`
              };

              if (selectedIncident.id === id) {
                setSelectedIncident(resolvedIncident);
              }
              return resolvedIncident;
            }
            return inc;
          });
          return updated;
        });

        if (id === 'inc-301') {
          setUtilityAlerts(prev => prev.filter(al => al.id !== 'ut-2'));
        } else if (id === 'inc-302') {
          setUtilityAlerts(prev => prev.filter(al => al.id !== 'ut-1'));
        }
      }
    }, 300);
  };

  // Run climate scenarios
  const simulateScenario = (scenarioName) => {
    setIsSimulatingEvent(true);
    setActiveScenario(scenarioName);
    
    let scenarioTitle = "";
    let impactText = "";
    if (scenarioName === 'heatwave') {
      scenarioTitle = "Heatwave Advisory (40°C)";
      impactText = "High thermal grid strain at Venue C. Cooling centers active.";
    } else if (scenarioName === 'gale') {
      scenarioTitle = "High Gale Wind Storm Warning";
      impactText = "Outdoor elevators isolated. Shuttle boarding rerouted.";
    } else if (scenarioName === 'normal') {
      scenarioTitle = "Event Normalization";
      impactText = "Climate alerts cleared. All elevators running normally.";
    }

    setScenarioLogs(prev => [
      { time: new Date().toLocaleTimeString(), title: scenarioTitle, details: impactText },
      ...prev
    ]);

    setTimeout(() => {
      setIsSimulatingEvent(false);
    }, 1200);
  };

  const togglePeakShaving = () => {
    setSolarPeakShavingActive(prev => {
      const next = !prev;
      if (next) {
        setUtilityAlerts(prevAlerts => 
          prevAlerts.map(al => {
            if (al.id === 'ut-1') {
              return { ...al, msg: 'Venue C: AI Solar Shaving active. Carbon intensity balanced.', severity: 'info' };
            }
            return al;
          })
        );
      } else {
        setUtilityAlerts(prevAlerts => 
          prevAlerts.map(al => {
            if (al.id === 'ut-1') {
              return { ...al, msg: 'Venue C: Grid drawing from heavy carbon-intensity supply', severity: 'warning' };
            }
            return al;
          })
        );
      }
      return next;
    });
  };

  // Submit chat questions
  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = {
      sender: 'user',
      text: chatInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    const queryInput = chatInput;
    setChatInput('');
    setIsTyping(true);

    const eventContext = `Event: ${eventTitle}, Budget: $${baseBudget}M, Renewables: ${renewablesShare}%, Accessibility: ${transitInclusivity}%, Audio Assist: ${audioAssistCoverage}%`;

    fetch('http://localhost:8000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: queryInput, context: eventContext })
    })
      .then(res => res.json())
      .then(data => {
        setChatMessages(prev => [...prev, {
          sender: 'ai',
          text: data.text,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          citations: data.citations,
          ragSnippet: data.ragSnippet
        }]);
        setIsTyping(false);
      })
      .catch(err => {
        setTimeout(() => {
          let replyText = "";
          let citations = [];
          let ragSnippet = "";
          const query = queryInput.toLowerCase();

          if (query.includes('elevator') || query.includes('gate 6') || query.includes('access') || query.includes('wheelchair')) {
            replyText = `Elevator E-4 is offline. Safety relay replaced. Reroute accessible shuttles.`;
            citations = ["AlloyDB: elevator_status_register"];
            ragSnippet = "ACCESSIBILITY RULE 4.2.1: In the event of primary elevator failure at gates serving mobility zones, operators must reroute passengers to auxiliary ramp structures within 10 minutes and dispatch repairs immediately.";
          } else {
            replyText = `Here is information on: "${queryInput}". Under the current configuration, carbon output is ${carbonFootprint} tonnes.`;
            citations = ["BigQuery: sustainability_kpi_history"];
            ragSnippet = "STADIUM GENERAL COMPLIANCE: Systems must monitor and coordinate green energy mix, waste diversion, and accessibility ratings.";
          }

          setChatMessages(prev => [...prev, {
            sender: 'ai',
            text: replyText,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            citations,
            ragSnippet
          }]);
          setIsTyping(false);
        }, 1000);
      });
  };

  // Real-time Spanish/Japanese translation call
  const translateFeedback = (id, text) => {
    fetch('http://localhost:8000/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    })
      .then(res => res.json())
      .then(data => {
        setSpectatorFeedbacks(prev => prev.map(feed => {
          if (feed.id === id) {
            return {
              ...feed,
              translation: data.translation,
              sentiment: data.sentiment,
              urgency: data.urgency,
              category: data.category
            };
          }
          return feed;
        }));
      })
      .catch(err => console.log("Translation service offline, using mock."));
  };

  // Recalculate metrics dynamically
  const calculateEcoAccessMetrics = () => {
    let baseInclusivityIndex = 45;
    let baseWasteDiversion = 12;
    let baseFanSat = 58;
    
    let baseEnergyMix = 15 + (renewablesShare / 100) * 75;
    baseWasteDiversion += (circularEconomyRate / 100) * 82;
    
    baseInclusivityIndex += (transitInclusivity / 100) * 30 + (audioAssistCoverage / 100) * 20;
    
    baseFanSat += (transitInclusivity / 100) * 12 
      + (circularEconomyRate / 100) * 5 
      + (renewablesShare / 100) * 5 
      + (audioAssistCoverage / 100) * 10;

    if (activeScenario === 'heatwave') {
      baseInclusivityIndex -= 10;
      baseFanSat -= 15;
    } else if (activeScenario === 'gale') {
      baseInclusivityIndex -= 18;
      baseFanSat -= 22;
    }

    const unresolvedElevator = incidents.find(i => i.id === 'inc-301')?.status !== 'resolved';
    const unresolvedGrid = incidents.find(i => i.id === 'inc-302')?.status !== 'resolved';

    if (!unresolvedElevator) {
      baseInclusivityIndex += 15;
      baseFanSat += 10;
    } else {
      baseInclusivityIndex -= 12;
      baseFanSat -= 6;
    }

    if (!unresolvedGrid) {
      baseFanSat += 4;
    }

    const greenEnergyMix = Math.max(15, Math.min(99, Math.round(baseEnergyMix)));
    const wasteDiversion = Math.max(10, Math.min(95, Math.round(baseWasteDiversion)));
    const inclusivityIndex = Math.max(20, Math.min(98, Math.round(baseInclusivityIndex)));
    const fanSat = Math.max(25, Math.min(98, Math.round(baseFanSat)));
    const budgetRemaining = (baseBudget - (renewablesShare / 100) * 5.0 - (transitInclusivity / 100) * 6.5 - (circularEconomyRate / 100) * 3.5 - (audioAssistCoverage / 100) * 2.8).toFixed(1);

    return {
      carbonFootprint,
      greenEnergyMix,
      wasteDiversion,
      inclusivityIndex,
      fanSat,
      budgetRemaining: parseFloat(budgetRemaining),
      unresolvedElevator,
      unresolvedGrid
    };
  };

  const metrics = calculateEcoAccessMetrics();

  const handleTextToSpeech = () => {
    if ('speechSynthesis' in window) {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }

      const textToRead = `EcoAccess Command Strategic Executive Briefing. 
      The current carbon footprint forecast is ${metrics.carbonFootprint} metric tonnes of CO2. 
      The overall Inclusivity and Accessibility Index is at ${metrics.inclusivityIndex} percent, and the fan satisfaction rate is at ${metrics.fanSat} percent.
      The remaining execution budget is ${metrics.budgetRemaining} million dollars.`;

      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.onend = () => setIsSpeaking(false);
      
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <EcoAccessContext.Provider value={{
      activeTab, setActiveTab,
      eventTitle, setEventTitle,
      eventSubtitle, setEventSubtitle,
      baseBudget, setBaseBudget,
      mapNodes, setMapNodes,
      highContrast, setHighContrast,
      fontSizeClass, setFontSizeClass,
      isSpeaking, setIsSpeaking,
      mapOverlayMode, setMapOverlayMode,
      activeScenario, setActiveScenario,
      scenarioLogs, setScenarioLogs,
      isSimulatingEvent, setIsSimulatingEvent,
      incidents, setIncidents,
      selectedIncident, setSelectedIncident,
      dispatchProgress, setDispatchProgress,
      solarPeakShavingActive, setSolarPeakShavingActive,
      utilityAlerts, setUtilityAlerts,
      spectatorFeedbacks, setSpectatorFeedbacks,
      chatInput, setChatInput,
      chatMessages, setChatMessages,
      isTyping, setIsTyping,
      renewablesShare, setRenewablesShare,
      transitInclusivity, setTransitInclusivity,
      circularEconomyRate, setCircularEconomyRate,
      audioAssistCoverage, setAudioAssistCoverage,
      carbonFootprint, setCarbonFootprint,
      energyForecast, setEnergyForecast,
      spectatorCount, setSpectatorCount,
      isVisionAnalyzing, setIsVisionAnalyzing,
      demoStep, setDemoStep,
      geminiBrief, setGeminiBrief,
      metrics,
      persistConfig,
      triggerSpectatorSurge,
      runBigQueryMLForecast,
      triggerPresetVisionAudit,
      handleImageUpload,
      generateAICopilotBrief,
      queryRAGRules,
      executeDemoMitigations,
      resetDemoWorkflow,
      handleDispatch,
      simulateScenario,
      togglePeakShaving,
      handleChatSubmit,
      translateFeedback,
      handleTextToSpeech
    }}>
      {children}
    </EcoAccessContext.Provider>
  );
};

export const useEcoAccess = () => useContext(EcoAccessContext);
