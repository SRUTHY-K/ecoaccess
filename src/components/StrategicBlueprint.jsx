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

const sliderTranslations = {
  en: {
    title: "AI Action Planner: Sustainable & Inclusive Resource Allocation",
    renewablesLabel: "Venue Renewable Energy Share",
    renewablesDesc: "On-site solar micro-grids. Reduces Scope 1 & 2 carbon footprints.",
    transitLabel: "Transit Wheelchair Accessibility",
    transitDesc: "Low-floor electric shuttle bus allocation. Saves travel emissions and ensures inclusive fan mobility.",
    wasteLabel: "Waste Circular Economy Target",
    wasteDesc: "Certified compostable packaging and smart recycling sorting systems.",
    audioLabel: "Audio Assist Headset Coverage",
    audioDesc: "Multi-language assistive audio headsets for hearing-impaired and international attendees.",
    bluetoothLabel: "BT Beacon Wayfinding Mesh",
    bluetoothDesc: "High-precision indoor BT beacons for spectator micro-navigation and accessible path routing.",
    infraredLabel: "Infrared Thermal Occupancy Grid",
    infraredDesc: "Infrared thermal grid sensors for live crowd density monitoring and automated HVAC power balancing.",
    projectedTitle: "Projected Event Inclusivity & Carbon Targets",
    yAxisLabel: "Target Efficiency %",
    barCo2: "CO2 Mitigated",
    barRenewables: "Renewables",
    barAccessibility: "Accessibility",
    barAudio: "Audio Assist",
    barBluetooth: "BT Beacons",
    barInfrared: "Infrared Grid"
  },
  es: {
    title: "Planificador de Acción de IA: Asignación Sostenible e Inclusiva",
    renewablesLabel: "Cuota de Energía Renovable del Recinto",
    renewablesDesc: "Micro-redes solares en el sitio. Reduce la huella de carbono Alcance 1 y 2.",
    transitLabel: "Accesibilidad en Silla de Ruedas para Tránsito",
    transitDesc: "Asignación de autobuses eléctricos de piso bajo. Ahorra emisiones y garantiza movilidad inclusiva.",
    wasteLabel: "Objetivo de Economía Circular de Residuos",
    wasteDesc: "Empaques compostables certificados y sistemas inteligentes de clasificación de reciclaje.",
    audioLabel: "Cobertura de Auriculares de Asistencia de Audio",
    audioDesc: "Auriculares de audio de asistencia multilingüe para asistentes con discapacidad auditiva.",
    bluetoothLabel: "Red de Balizas BT Wayfinding",
    bluetoothDesc: "Balizas BT de alta precisión para micronavegación y rutas accesibles de espectadores.",
    infraredLabel: "Red Térmica Infrarroja de Ocupación",
    infraredDesc: "Sensores infrarrojos térmicos para monitoreo de densidad de multitud y balance climatización.",
    projectedTitle: "Proyección de Objetivos de Inclusividad y Carbono",
    yAxisLabel: "Eficiencia Objetivo %",
    barCo2: "CO2 Mitigado",
    barRenewables: "Renovables",
    barAccessibility: "Accesibilidad",
    barAudio: "Asistencia Audio",
    barBluetooth: "Balizas BT",
    barInfrared: "Red Infrarroja"
  },
  ja: {
    title: "AI アクションプランナー：持続可能＆アクセシブルなリソース最適化",
    renewablesLabel: "会場再生可能エネルギー比率",
    renewablesDesc: "オンサイト太陽光マイクログリッド。スコープ1＆2のCO2排出量を削減します。",
    transitLabel: "車椅子対応低床交通アクセシビリティ",
    transitDesc: "低床電動シャトルバスの配置。移動時の排出量を削減し、車椅子来場者のアクセスを保証します。",
    wasteLabel: "廃棄物循環型経済目標比率",
    wasteDesc: "認証済みたい肥化可能容器とAIスマートリサイクル分別の導入。",
    audioLabel: "音声支援ヘッドセットカバー率",
    audioDesc: "聴覚障害者および国際来場者向けの多言語音声支援ヘッドセット。",
    bluetoothLabel: "BTビーコンメッシュカバー率",
    bluetoothDesc: "高精度屋内BTビーコンによる来場者のマイクロナビゲーション＆バリアフリー案内。",
    infraredLabel: "赤外線サーマルセンサグリッドカバー率",
    infraredDesc: "リアルタイム群衆密度検知およびHVAC空調自動制御のための赤外線サーマル格子。",
    projectedTitle: "推計イベントバリアフリー＆炭素目標指標",
    yAxisLabel: "目標効率率 %",
    barCo2: "削減CO2量",
    barRenewables: "再エネ比率",
    barAccessibility: "バリアフリー度",
    barAudio: "音声アシスト",
    barBluetooth: "BTビーコン",
    barInfrared: "赤外線グリッド"
  },
  zh: {
    title: "人工智能行动规划器：绿色可持续与无障碍资源调度",
    renewablesLabel: "场馆可再生能源绿电占比",
    renewablesDesc: "场馆分布式太阳能微电网，有效削削减范围 1 与范围 2 碳足迹。",
    transitLabel: "轮椅无障碍交通接驳覆盖率",
    transitDesc: "低地板纯电动无障碍接驳车调度，降低 Scope 3 交通碳排放，保障无障碍出行。",
    wasteLabel: "废弃物循环经济回收目标",
    wasteDesc: "可降解餐具认证与 Vertex AI 智能垃圾分类回收系统。",
    audioLabel: "助听导览设备点位覆盖率",
    audioDesc: "为听障人士与国际观众提供多语言实时同声传译助听设备。",
    bluetoothLabel: "BT 蓝牙信标导航定位网络覆盖率",
    bluetoothDesc: "高精度室内 BT 蓝牙信标，为观众提供微型导航与无障碍路径指引。",
    infraredLabel: "红外热成像人流监测网格覆盖率",
    infraredDesc: "红外热成像传感器阵列，用于实时人流密度监测与 HVAC 智能空调节能。",
    projectedTitle: "预测活动包容度与碳减排目标",
    yAxisLabel: "目标效率 %",
    barCo2: "碳减排量",
    barRenewables: "可再生绿电",
    barAccessibility: "无障碍通行度",
    barAudio: "助听覆盖率",
    barBluetooth: "BT信标",
    barInfrared: "红外热感网格"
  },
  de: {
    title: "KI-Aktionsplaner: Nachhaltige & Inklusive Ressourcenzuweisung",
    renewablesLabel: "Anteil Erneuerbarer Energien des Stadions",
    renewablesDesc: "Solar-Mikronetze vor Ort. Reduziert Scope 1 & 2 CO2-Fußabdrücke.",
    transitLabel: "Rollstuhlgerechte Transit-Barrierefreiheit",
    transitDesc: "Zuweisung von Elektro-Niederflurbussen. Spart Reiseemissionen und sichert inklusive Mobilität.",
    wasteLabel: "Ziel für Abfall-Kreislaufwirtschaft",
    wasteDesc: "Zertifizierte kompostierbare Verpackungen und intelligente Recycling-Sortiersysteme.",
    audioLabel: "Abdeckung mit Audio-Assistenz-Headsets",
    audioDesc: "Mehrsprachige Assistenz-Headsets für hörgeschädigte und internationale Besucher.",
    bluetoothLabel: "BT-Beacon-Netzabdeckung",
    bluetoothDesc: "Hochpräzise BT-Beacons für Mikronavigation und barrierefreie Wegeführung.",
    infraredLabel: "Infrarot-Thermosensor-Netzabdeckung",
    infraredDesc: "Infrarot-Thermosensoren für Echtzeit-Personendichte und automatische HVAC-Steuerung.",
    projectedTitle: "Prognostizierte Inklusions- & CO2-Ziele",
    yAxisLabel: "Zieleffizienz %",
    barCo2: "CO2 Eingespart",
    barRenewables: "Erneuerbare",
    barAccessibility: "Barrierefreiheit",
    barAudio: "Audio-Assistenz",
    barBluetooth: "BT-Beacons",
    barInfrared: "Infrarot-Netz"
  }
};

export function StrategicSliders() {
  const {
    renewablesShare, setRenewablesShare,
    transitInclusivity, setTransitInclusivity,
    circularEconomyRate, setCircularEconomyRate,
    audioAssistCoverage, setAudioAssistCoverage,
    bluetoothBeaconCoverage, setBluetoothBeaconCoverage,
    infraredSensorCoverage, setInfraredSensorCoverage,
    appLanguage,
    metrics
  } = useEcoAccess();

  const t = sliderTranslations[appLanguage] || sliderTranslations.en;

  return (
    <div className="glass-panel" style={{marginBottom: '2rem'}}>
      <div className="panel-header">
        <h2 className="panel-title">
          <Cpu size={18} style={{color: 'var(--color-accent-indigo)'}} />
          {t.title}
        </h2>
      </div>

      <div className="section-grid-1x1">
        
        {/* Sliders */}
        <div className="simulation-sliders">
          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">{t.renewablesLabel}</span>
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
            <span style={{fontSize: '0.7rem', color: 'var(--color-text-muted)'}}>{t.renewablesDesc}</span>
          </div>

          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">{t.transitLabel}</span>
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
            <span style={{fontSize: '0.7rem', color: 'var(--color-text-muted)'}}>{t.transitDesc}</span>
          </div>

          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">{t.wasteLabel}</span>
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
            <span style={{fontSize: '0.7rem', color: 'var(--color-text-muted)'}}>{t.wasteDesc}</span>
          </div>

          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">{t.audioLabel}</span>
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
              style={{ '--thumb-color': 'var(--color-accent-pink)' }}
            />
            <span style={{fontSize: '0.7rem', color: 'var(--color-text-muted)'}}>{t.audioDesc}</span>
          </div>

          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">{t.bluetoothLabel}</span>
              <span className="slider-value">{bluetoothBeaconCoverage}%</span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="100" 
              step="5" 
              value={bluetoothBeaconCoverage} 
              onChange={(e) => setBluetoothBeaconCoverage(parseInt(e.target.value))}
              className="custom-range"
              style={{ '--thumb-color': '#a855f7' }}
            />
            <span style={{fontSize: '0.7rem', color: 'var(--color-text-muted)'}}>{t.bluetoothDesc}</span>
          </div>

          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">{t.infraredLabel}</span>
              <span className="slider-value">{infraredSensorCoverage}%</span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="100" 
              step="5" 
              value={infraredSensorCoverage} 
              onChange={(e) => setInfraredSensorCoverage(parseInt(e.target.value))}
              className="custom-range"
              style={{ '--thumb-color': '#f59e0b' }}
            />
            <span style={{fontSize: '0.7rem', color: 'var(--color-text-muted)'}}>{t.infraredDesc}</span>
          </div>
        </div>

        {/* Projected metrics chart */}
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <span style={{fontSize: '0.8rem', fontWeight: '700', color: 'var(--color-text-secondary)', textTransform: 'uppercase', marginBottom: '0.5rem'}}>
            {t.projectedTitle}
          </span>
          
          <div className="custom-chart-container">
            <div className="custom-chart-gridlines">
              <div className="gridline"></div>
              <div className="gridline"></div>
              <div className="gridline"></div>
              <div className="gridline"></div>
            </div>
            <span className="chart-y-axis-label">{t.yAxisLabel}</span>
            
            {/* Bar 1: CO2 Mitigated */}
            <div className="custom-chart-bar-group">
              <div 
                className="custom-chart-bar" 
                style={{ 
                  height: `${circularEconomyRate}%`, 
                  '--bar-color-top': 'var(--color-accent-red)', 
                  '--bar-color-bottom': 'rgba(239, 68, 68, 0.2)' 
                }}
              />
              <span className="custom-chart-label" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span>{t.barCo2}</span>
                <strong style={{ color: 'var(--color-accent-red)', fontSize: '0.65rem', marginTop: '2px' }}>
                  ${((circularEconomyRate / 100) * 3.5).toFixed(1)}M
                </strong>
              </span>
            </div>

            {/* Bar 2: Renewable Energy */}
            <div className="custom-chart-bar-group">
              <div 
                className="custom-chart-bar" 
                style={{ 
                  height: `${renewablesShare}%`, 
                  '--bar-color-top': 'var(--color-accent-emerald)', 
                  '--bar-color-bottom': 'rgba(16, 185, 129, 0.2)' 
                }}
              />
              <span className="custom-chart-label" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span>{t.barRenewables}</span>
                <strong style={{ color: 'var(--color-accent-emerald)', fontSize: '0.65rem', marginTop: '2px' }}>
                  ${((renewablesShare / 100) * 5.0).toFixed(1)}M
                </strong>
              </span>
            </div>

            {/* Bar 3: Accessibility */}
            <div className="custom-chart-bar-group">
              <div 
                className="custom-chart-bar" 
                style={{ 
                  height: `${transitInclusivity}%`, 
                  '--bar-color-top': 'var(--color-accent-cyan)', 
                  '--bar-color-bottom': 'rgba(6, 182, 212, 0.2)' 
                }}
              />
              <span className="custom-chart-label" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span>{t.barAccessibility}</span>
                <strong style={{ color: 'var(--color-accent-cyan)', fontSize: '0.65rem', marginTop: '2px' }}>
                  ${((transitInclusivity / 100) * 6.5).toFixed(1)}M
                </strong>
              </span>
            </div>

            {/* Bar 4: Audio Assist */}
            <div className="custom-chart-bar-group">
              <div 
                className="custom-chart-bar" 
                style={{ 
                  height: `${audioAssistCoverage}%`, 
                  '--bar-color-top': 'var(--color-accent-indigo)', 
                  '--bar-color-bottom': 'rgba(99, 102, 241, 0.2)' 
                }}
              />
              <span className="custom-chart-label" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span>{t.barAudio}</span>
                <strong style={{ color: 'var(--color-accent-indigo)', fontSize: '0.65rem', marginTop: '2px' }}>
                  ${((audioAssistCoverage / 100) * 2.8).toFixed(1)}M
                </strong>
              </span>
            </div>

            {/* Bar 5: Bluetooth Beacons */}
            <div className="custom-chart-bar-group">
              <div 
                className="custom-chart-bar" 
                style={{ 
                  height: `${bluetoothBeaconCoverage}%`, 
                  '--bar-color-top': '#a855f7', 
                  '--bar-color-bottom': 'rgba(168, 85, 247, 0.2)' 
                }}
              />
              <span className="custom-chart-label" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span>{t.barBluetooth}</span>
                <strong style={{ color: '#a855f7', fontSize: '0.65rem', marginTop: '2px' }}>
                  ${((bluetoothBeaconCoverage / 100) * 4.2).toFixed(1)}M
                </strong>
              </span>
            </div>

            {/* Bar 6: Infrared Thermal Grid */}
            <div className="custom-chart-bar-group">
              <div 
                className="custom-chart-bar" 
                style={{ 
                  height: `${infraredSensorCoverage}%`, 
                  '--bar-color-top': '#f59e0b', 
                  '--bar-color-bottom': 'rgba(245, 158, 11, 0.2)' 
                }}
              />
              <span className="custom-chart-label" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span>{t.barInfrared}</span>
                <strong style={{ color: '#f59e0b', fontSize: '0.65rem', marginTop: '2px' }}>
                  ${((infraredSensorCoverage / 100) * 3.8).toFixed(1)}M
                </strong>
              </span>
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
