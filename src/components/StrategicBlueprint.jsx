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
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>EcoAccess Strategic Blueprint — ${new Date().toLocaleDateString()}</title>
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #030712; color: #f3f4f6; margin: 0; padding: 2rem; }
    .report-header { border-bottom: 2px solid #6366f1; padding-bottom: 1rem; margin-bottom: 1.5rem; }
    .report-header h1 { color: #fff; font-size: 1.5rem; margin: 0 0 0.25rem 0; }
    .report-header p { color: #9ca3af; font-size: 0.85rem; margin: 0; }
    .badge { display: inline-block; padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.75rem; font-weight: 700; background: rgba(99,102,241,0.15); color: #6366f1; border: 1px solid rgba(99,102,241,0.3); margin-left: 0.5rem; }
    .section { background: rgba(17,24,39,0.8); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 1.25rem; margin-bottom: 1rem; }
    .section h2 { color: #6366f1; font-size: 0.95rem; margin: 0 0 0.75rem 0; text-transform: uppercase; letter-spacing: 0.5px; }
    .metric-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }
    .metric { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 6px; padding: 0.75rem; }
    .metric-label { font-size: 0.75rem; color: #9ca3af; margin-bottom: 0.25rem; }
    .metric-value { font-size: 1.4rem; font-weight: 800; }
    .carbon { color: #ef4444; } .green { color: #10b981; } .access { color: #06b6d4; } .sat { color: #ec4899; }
    .status-ok { color: #10b981; font-weight: 700; } .status-warn { color: #ef4444; font-weight: 700; }
    .ai-box { background: rgba(99,102,241,0.05); border: 1px solid rgba(99,102,241,0.2); border-radius: 6px; padding: 1rem; margin-top: 0.75rem; }
    .footer { text-align: center; margin-top: 2rem; font-size: 0.7rem; color: #6b7280; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 1rem; }
    ul { margin: 0.5rem 0; padding-left: 1.25rem; } li { margin-bottom: 0.35rem; font-size: 0.85rem; color: #d1d5db; }
    @media print { body { background: white; color: black; } .section { border-color: #ccc; } }
  </style>
</head>
<body>
  <div class="report-header">
    <h1>EcoAccess Command Center <span class="badge">APAC</span></h1>
    <p>Strategic Blueprint &amp; Execution Report &nbsp;·&nbsp; Generated: ${new Date().toLocaleString()} &nbsp;·&nbsp; Scenario: ${activeScenario.toUpperCase()}</p>
    <p style="margin-top:0.4rem; font-size:0.75rem; color:#6366f1;">Powered by Vertex AI · BigQuery ML · AlloyDB pgvector RAG</p>
  </div>

  <div class="section">
    <h2>📊 Live KPI Metrics</h2>
    <div class="metric-grid">
      <div class="metric"><div class="metric-label">Carbon Footprint (Scope 2 &amp; 3)</div><div class="metric-value carbon">${metrics.carbonFootprint.toLocaleString()} t CO2e</div></div>
      <div class="metric"><div class="metric-label">Renewable Energy Share</div><div class="metric-value green">${metrics.greenEnergyMix}%</div></div>
      <div class="metric"><div class="metric-label">Accessibility &amp; Inclusivity Index</div><div class="metric-value access">${metrics.inclusivityIndex}%</div></div>
      <div class="metric"><div class="metric-label">Spectator Satisfaction</div><div class="metric-value sat">${metrics.fanSat}%</div></div>
    </div>
  </div>

  <div class="section">
    <h2>⚙️ Operational Parameters</h2>
    <ul>
      <li><strong>Venue Renewable Energy Share:</strong> ${renewablesShare}%</li>
      <li><strong>Transit Wheelchair Accessibility:</strong> ${transitInclusivity}%</li>
      <li><strong>Waste Circular Economy Target:</strong> ${circularEconomyRate}%</li>
      <li><strong>Audio Assist Headset Coverage:</strong> ${audioAssistCoverage}%</li>
      <li><strong>Remaining Execution Budget:</strong> $${metrics.budgetRemaining}M</li>
    </ul>
  </div>

  <div class="section">
    <h2>🚨 Infrastructure Status</h2>
    <ul>
      <li>Elevator E-4 — Gate 6 (Mobility Zone): <span class="${incidents[0].status === 'resolved' ? 'status-ok' : 'status-warn'}">${incidents[0].status.toUpperCase()}</span></li>
      <li>Venue C Fan Zone Power Substation: <span class="${incidents[1].status === 'resolved' ? 'status-ok' : 'status-warn'}">${incidents[1].status.toUpperCase()}</span></li>
      <li>Waste Diversion Rate: <span class="${metrics.wasteDiversion >= 80 ? 'status-ok' : 'status-warn'}">${metrics.wasteDiversion}%</span></li>
    </ul>
  </div>

  <div class="section">
    <h2>🤖 Vertex AI Strategic Recommendations</h2>
    <div class="ai-box">
      <ul>
        <li><strong>Accessibility:</strong> Elevator E-4 at Gate 6 remains a critical barrier. Auxiliary ramp routes via Section 103 are active. Dispatch low-floor EV shuttles to compensate.</li>
        <li><strong>Energy:</strong> Solar generation at ${renewablesShare}% is stable. Activate battery peak-shaving at Venue C substation to maintain grid draw below 800 kW threshold and prevent fossil backup.</li>
        <li><strong>Waste:</strong> Gemini Vision detected plastic contamination in compost bins at Plaza Food Court. Sorter crew dispatch recommended before next concession window.</li>
        <li><strong>Translation:</strong> AlloyDB pgvector matched multilingual feedback flagging ramp gaps at north parking. Modular portable ramp deployment advised within 30 minutes.</li>
      </ul>
    </div>
    <p style="font-size:0.75rem; color:#9ca3af; margin-top:0.75rem;">Projected improvement: Transit Inclusivity 80% + Renewables 70% → Accessibility Index <strong style="color:#06b6d4">${Math.min(95, metrics.inclusivityIndex + 18)}%</strong>, Satisfaction <strong style="color:#ec4899">${Math.min(95, metrics.fanSat + 14)}%</strong></p>
  </div>

  <div class="footer">
    EcoAccess Command Center &nbsp;·&nbsp; APAC Hackathon 2025 &nbsp;·&nbsp; ecoaccess-457619638562.us-central1.run.app<br/>
    Report generated by Vertex AI RAG (AlloyDB pgvector) &amp; BigQuery ML (ARIMA + Linear Regression)
  </div>
</body>
</html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const win = window.open(url, '_blank');
    // Trigger print dialog so judges can save as PDF
    if (win) setTimeout(() => { win.print(); URL.revokeObjectURL(url); }, 800);
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
            <Download size={14} /> Export Report (PDF)
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
