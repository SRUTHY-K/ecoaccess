import React from 'react';
import { useEcoAccess } from '../context/EcoAccessContext';
import { 
  Cpu, 
  FileText, 
  Volume2, 
  Download, 
  Info, 
  Compass, 
  Zap, 
  ShieldAlert 
} from 'lucide-react';

export function StrategicSliders() {
  const {
    renewablesShare, setRenewablesShare,
    transitInclusivity, setTransitInclusivity,
    circularEconomyRate, setCircularEconomyRate,
    audioAssistCoverage, setAudioAssistCoverage,
    metrics
  } = useEcoAccess();

  return (
    <div className="glass-panel" style={{marginBottom: '2rem'}}>
      <div className="panel-header">
        <h2 className="panel-title">
          <Cpu size={18} style={{color: 'var(--color-accent-indigo)'}} />
          AI Action Planner: Sustainable & Inclusive Resource Allocation
        </h2>
      </div>

      <div className="section-grid-1x1">
        
        {/* Sliders */}
        <div className="simulation-sliders">
          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">Venue Renewable Energy Share</span>
              <span className="slider-value">{renewablesShare}%</span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="100" 
              step="5" 
              value={renewablesShare} 
              onChange={(e) => setRenewablesShare(parseInt(e.target.value))}
              className="custom-range"
              style={{ '--thumb-color': 'var(--color-accent-emerald)' }}
            />
            <span style={{fontSize: '0.7rem', color: 'var(--color-text-muted)'}}>On-site solar micro-grids. Reduces Scope 1 & 2 carbon footprints.</span>
          </div>

          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">Transit Wheelchair Accessibility</span>
              <span className="slider-value">{transitInclusivity}%</span>
            </div>
            <input 
              type="range" 
              min="20" 
              max="100" 
              step="5" 
              value={transitInclusivity} 
              onChange={(e) => setTransitInclusivity(parseInt(e.target.value))}
              className="custom-range"
              style={{ '--thumb-color': 'var(--color-accent-cyan)' }}
            />
            <span style={{fontSize: '0.7rem', color: 'var(--color-text-muted)'}}>Low-floor electric shuttle bus allocation. Saves travel emissions and ensures inclusive fan mobility.</span>
          </div>

          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">Waste Circular Economy Target</span>
              <span className="slider-value">{circularEconomyRate}%</span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="100" 
              step="5" 
              value={circularEconomyRate} 
              onChange={(e) => setCircularEconomyRate(parseInt(e.target.value))}
              className="custom-range"
              style={{ '--thumb-color': 'var(--color-accent-orange)' }}
            />
            <span style={{fontSize: '0.7rem', color: 'var(--color-text-muted)'}}>Certified compostable packaging and smart recycling sorting systems.</span>
          </div>

          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">Audio Assist Headset Coverage</span>
              <span className="slider-value">{audioAssistCoverage}%</span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="100" 
              step="5" 
              value={audioAssistCoverage} 
              onChange={(e) => setAudioAssistCoverage(parseInt(e.target.value))}
              className="custom-range"
              style={{ '--thumb-color': 'var(--color-accent-indigo)' }}
            />
            <span style={{fontSize: '0.7rem', color: 'var(--color-text-muted)'}}>Transmits real-time audio commentary to visually impaired fans.</span>
          </div>
        </div>

        {/* Projected metrics chart */}
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <span style={{fontSize: '0.8rem', fontWeight: '700', color: 'var(--color-text-secondary)', textTransform: 'uppercase', marginBottom: '0.5rem'}}>
            Projected Event Inclusivity & Carbon Targets
          </span>
          
          <div className="custom-chart-container">
            <div className="custom-chart-gridlines">
              <div className="gridline"></div>
              <div className="gridline"></div>
              <div className="gridline"></div>
              <div className="gridline"></div>
            </div>
            <span className="chart-y-axis-label">Target Efficiency %</span>
            
            {/* Bar 1: CO2 Mitigated */}
            <div className="custom-chart-bar-group">
              <div 
                className="custom-chart-bar" 
                style={{ 
                  height: `${Math.max(5, Math.min(100, Math.round(((86000 - metrics.carbonFootprint) / 76000) * 100)))}%`, 
                  '--bar-color-top': 'var(--color-accent-red)', 
                  '--bar-color-bottom': 'rgba(239, 68, 68, 0.2)' 
                }}
              >
                <span className="custom-chart-bar-value">{Math.round(((86000 - metrics.carbonFootprint) / 76000) * 100)}%</span>
              </div>
              <span className="custom-chart-label">CO2 Mitigated</span>
            </div>

            {/* Bar 2: Renewable Energy */}
            <div className="custom-chart-bar-group">
              <div 
                className="custom-chart-bar" 
                style={{ 
                  height: `${metrics.greenEnergyMix}%`, 
                  '--bar-color-top': 'var(--color-accent-emerald)', 
                  '--bar-color-bottom': 'rgba(16, 185, 129, 0.2)' 
                }}
              >
                <span className="custom-chart-bar-value">{metrics.greenEnergyMix}%</span>
              </div>
              <span className="custom-chart-label">Renewables</span>
            </div>

            {/* Bar 3: Accessibility */}
            <div className="custom-chart-bar-group">
              <div 
                className="custom-chart-bar" 
                style={{ 
                  height: `${metrics.inclusivityIndex}%`, 
                  '--bar-color-top': 'var(--color-accent-cyan)', 
                  '--bar-color-bottom': 'rgba(6, 182, 212, 0.2)' 
                }}
              >
                <span className="custom-chart-bar-value">{metrics.inclusivityIndex}%</span>
              </div>
              <span className="custom-chart-label">Accessibility</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export function StrategicReport() {
  const {
    activeScenario,
    renewablesShare,
    transitInclusivity,
    audioAssistCoverage,
    circularEconomyRate,
    metrics,
    incidents,
    isSpeaking,
    handleTextToSpeech
  } = useEcoAccess();

  const downloadReport = () => {
    const text = `==================================================
ECOACCESS COMMAND - TOURNAMENT STRATEGIC PLAN
Generated: ${new Date().toLocaleString()}
Weather Scenario Mode: ${activeScenario.toUpperCase()}
==================================================

1. DIRECTIVE SCENARIOS & OPERATING PARAMS
- Venue Renewable Energy Share: ${renewablesShare}%
- Transit Wheelchair Accessibility: ${transitInclusivity}%
- Waste Circular Economy Target: ${circularEconomyRate}%
- Audio Assist Headset Coverage: ${audioAssistCoverage}%
- Remaining Execution Budget: $${metrics.budgetRemaining}M

2. TARGET INDICES (BigQuery Forecasts)
- Carbon Footprint Output: ${metrics.carbonFootprint} Tonnes CO2e
- Green Energy Mix Ratio: ${metrics.greenEnergyMix}%
- Waste Landfill Diversion Rate: ${metrics.wasteDiversion}%
- Inclusivity & Accessibility Index: ${metrics.inclusivityIndex}%
- Spectator Satisfaction Rating: ${metrics.fanSat}%

3. STADIUM INFRASTRUCTURE STATUS
- Elevator E-4 Gate 6: ${incidents[0].status.toUpperCase()}
- Venue C Fan Zone Power Substation: ${incidents[1].status.toUpperCase()}

4. STRATEGIC RECOMMENDATIONS (Vertex AI Co-Pilot)
* Accessibility: Current elevator outage at Gate 6 affects wheelchair pathways. Maintenance dispatched. Deploy auxiliary low-floor bus shuttles.
* Energy: Renewable solar generation at ${renewablesShare}% is stable. Balance thermal spikes at Venue C with solar buffers.
* Translation: AlloyDB has translated feedback from Spanish and Japanese, flagging ramp requirements at North parking. Recommend modular ramp installation.

==================================================
Report powered by Vertex AI RAG and BigQuery ML.
==================================================`;
    
    const element = document.createElement("a");
    const file = new Blob([text], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `ecoaccess_event_plan_${activeScenario}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="animate-slide-up glass-panel">
      <div className="panel-header">
        <h2 className="panel-title">
          <FileText size={18} style={{color: 'var(--color-accent-indigo)'}} />
          Strategic EcoAccess & Execution Blueprint
        </h2>
        <div style={{display: 'flex', gap: '0.5rem'}}>
          <button className="button secondary" onClick={handleTextToSpeech} style={{border: 'none'}}>
            <Volume2 size={14} /> {isSpeaking ? 'Stop Audio Readout' : 'Audio Briefing (TTS)'}
          </button>
          <button className="button secondary" onClick={downloadReport} style={{border: 'none'}}>
            <Download size={14} /> Download Strategic Blueprint (.txt)
          </button>
        </div>
      </div>

      <div className="report-view-container">
        <div className="report-section">
          <h3 className="report-h3">
            <Info size={16} style={{color: 'var(--color-accent-indigo)'}} />
            1. Executive Summary & Goals
          </h3>
          <p className="report-p">
            This strategic blueprint aligns tournament environmental mitigation targets with absolute social inclusivity. Derived from BigQuery ML carbon forecasts and AlloyDB vector accessibility audits, our current metrics place forecasted greenhouse gas emissions at <strong>{metrics.carbonFootprint.toLocaleString()} tonnes CO2e</strong>, with an Accessibility and Inclusivity Score of <strong>{metrics.inclusivityIndex}%</strong> and a remaining operational budget of <strong>${metrics.budgetRemaining}M</strong>.
          </p>
        </div>

        <div className="report-section">
          <h3 className="report-h3">
            <Compass size={16} style={{color: 'var(--color-accent-cyan)'}} />
            2. Inclusivity & Transit Accessibility
          </h3>
          <p className="report-p">
            Transit Accessibility allocation is set to <strong>{transitInclusivity}%</strong>.
          </p>
          <ul className="bullet-list">
            <li className="bullet-item">
              <strong>Low-Floor Electric Fleet:</strong> Low-floor shuttle coverage accounts for {transitInclusivity}% of active transport connections. Shifting spectators to electric rail offsets travel emissions by approximately {Math.round((transitInclusivity / 100) * 35000)} metric tonnes.
            </li>
            <li className="bullet-item">
              <strong>Spectator Audio Assistance:</strong> Current audio description headset coverage is {audioAssistCoverage}%, ensuring blind and visually impaired fans receive high-fidelity, real-time stadium audio.
            </li>
          </ul>
        </div>

        <div className="report-section">
          <h3 className="report-h3">
            <Zap size={16} style={{color: 'var(--color-accent-emerald)'}} />
            3. Renewable Energy & Grid Integration
          </h3>
          <p className="report-p">
            Renewable energy share target is set to <strong>{renewablesShare}%</strong>.
          </p>
          <ul className="bullet-list">
            <li className="bullet-item">
              <strong>Green Power Source Mix:</strong> Venue electricity supply operates at {metrics.greenEnergyMix}% renewable capacity.
            </li>
            <li className="bullet-item">
              <strong>Battery Storage:</strong> Active solar-shaving routes 480 kWh batteries to Venue C Fan Zone to offset peak concessions overload.
            </li>
          </ul>
        </div>

        <div className="report-section">
          <h3 className="report-h3">
            <ShieldAlert size={16} style={{color: 'var(--color-accent-red)'}} />
            4. Infrastructure Operations & Anomaly Resolutions
          </h3>
          <ul className="bullet-list">
            <li className="bullet-item">
              <strong>Elevator E-4 Gate 6:</strong> {metrics.unresolvedElevator ? 'CRITICAL OUTAGE ACTIVE. Visually and mobility impaired spectators blocked from seats. Repair crews en-route.' : 'RESOLVED. Relay replaced. Elevator and ramps fully active.'}
            </li>
            <li className="bullet-item">
              <strong>Venue C Substation Load:</strong> {metrics.unresolvedGrid ? 'Overload warning active. Fossil generator startup risk.' : 'RESOLVED. AI battery load-shaving successfully balanced peak concessions draw.'}
            </li>
          </ul>
        </div>

        <div className="report-section" style={{background: 'rgba(99, 102, 241, 0.05)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(99, 102, 241, 0.15)'}}>
          <h3 className="report-h3" style={{color: 'var(--color-accent-indigo)'}}>
            <Cpu size={16} />
            Vertex AI EcoAccess Strategic Recommendation
          </h3>
          <p className="report-p" style={{color: 'var(--color-text-primary)'}}>
            To maximize event success: increase <strong>Transit Inclusivity to 80%</strong>, and adjust <strong>Renewable Energy to 70%</strong>. This is forecast to optimize overall inclusivity ratings to <strong>{Math.min(95, metrics.inclusivityIndex + 18)}%</strong> and spectator satisfaction to <strong>{Math.min(95, metrics.fanSat + 14)}%</strong>, while maintaining healthy execution reserves.
          </p>
        </div>
      </div>
    </div>
  );
}
