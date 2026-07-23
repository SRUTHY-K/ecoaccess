import React, { useState } from 'react';
import { useEcoAccess } from '../context/EcoAccessContext';
import { Activity } from 'lucide-react';

const bqTranslations = {
  en: {
    title: "Carbon & Energy Forecasts",
    mlActive: "ML Models Active",
    scopeTitle: "Scope 2 & 3 Carbon Footprint (Next 4 Hours)",
    scopeDesc: "BigQuery ML Linear Regression model projects carbon emissions based on current venue and transit parameters.",
    resourceTitle: "Resource Utilization Rate",
    efficiency: "Efficiency",
    resourceDesc: "Optimized allocation recommends increasing low-floor shuttle count by 8 units during egress windows.",
    solarTitle: "Solar Grid Forecast",
    solarDesc: "Solar generation models project localized off-grid buffers. Dynamic battery reserves buffer peak concession draws.",
    peak: "kW Peak",
    thermalTitle: "Venue Thermal & Concession Grid Demand (kW)",
    thermalDesc: "ARIMA model predicts peak grid power spike during 20:00 - 21:00 match intermission."
  },
  es: {
    title: "Pronósticos de Carbono y Energía",
    mlActive: "Modelos ML Activos",
    scopeTitle: "Huella de Carbono Alcance 2 y 3 (Próximas 4 Horas)",
    scopeDesc: "El modelo de regresión lineal de BigQuery ML proyecta emisiones basadas en parámetros de recinto y tránsito.",
    resourceTitle: "Tasa de Utilización de Recursos",
    efficiency: "Eficiencia",
    resourceDesc: "La asignación optimizada recomienda aumentar la flota de autobuses eléctricos en 8 unidades.",
    solarTitle: "Pronóstico de Red Solar",
    solarDesc: "Los modelos de generación solar proyectan reservas locales fuera de la red. Las baterías dinámicas amortiguan los picos de consumo.",
    peak: "kW Pico",
    thermalTitle: "Demanda Térmica y de Red de Concesiones (kW)",
    thermalDesc: "El modelo ARIMA predice el pico de potencia durante el descanso del partido de 20:00 a 21:00."
  },
  ja: {
    title: "二酸化炭素・電力需要予測",
    mlActive: "機械学習モデル稼働中",
    scopeTitle: "スコープ 2 & 3 炭素排出量予測（今後4時間）",
    scopeDesc: "BigQuery ML線形回帰モデルが現在の会場・交通パラメータに基づき排出量を予測します。",
    resourceTitle: "リソース利用効率率",
    efficiency: "効率",
    resourceDesc: "最適化配分アルゴリズムは退場時に低床シャトルバスを8台増便することを推奨します。",
    solarTitle: "太陽光発電出力予測",
    solarDesc: "太陽光発電モデルは局所的なオフグリッドバッファを予測します。動的バッテリーアレイがピーク時の消費電力を調整します。",
    peak: "kW ピーク",
    thermalTitle: "会場熱量＆コンセッショングリッド需要 (kW)",
    thermalDesc: "ARIMAモデルはハーフタイム（20:00～21:00）における電力需要のピークを予測します。"
  },
  zh: {
    title: "碳排放与电能负载预测",
    mlActive: "机器学习模型已激活",
    scopeTitle: "范围 2 与 3 碳足迹预测（未来 4 小时）",
    scopeDesc: "BigQuery ML 线性回归模型基于当前场馆与交通参数实时预测碳排放趋势。",
    resourceTitle: "资源综合利用率",
    efficiency: "效率",
    resourceDesc: "优化分配算法建议在散场高峰期增派 8 辆低地板电动接驳车。",
    solarTitle: "太阳能电网输出预测",
    solarDesc: "太阳能发电预测模型构建区域化离线微电网缓冲。动态储能电池组有效平抑高峰期商铺用电负荷。",
    peak: "kW 峰值",
    thermalTitle: "场馆热负荷与商铺电网需求 (kW)",
    thermalDesc: "ARIMA 时间序列模型预测在 20:00 - 21:00 中场休息期间出现用电高峰。"
  },
  de: {
    title: "CO2- & Energieprognosen",
    mlActive: "ML-Modelle Aktiv",
    scopeTitle: "Scope 2 & 3 CO2-Fußabdruck (Nächste 4 Stunden)",
    scopeDesc: "Das BigQuery ML-Linear-Regression-Modell prognostiziert Emissionen basierend auf aktuellen Parametern.",
    resourceTitle: "Ressourcenauslastung",
    efficiency: "Effizienz",
    resourceDesc: "Optimierte Zuweisung empfiehlt die Erhöhung der Niederflur-Shuttles um 8 Einheiten während der Abreise.",
    solarTitle: "Solar-Netzprognose",
    solarDesc: "Solarerzeugungsmodelle prognostizieren lokale Off-Grid-Puffer. Dynamische Batteriespeicher puffern Spitzenlasten ab.",
    peak: "kW Spitze",
    thermalTitle: "Thermische Stadionlast & Kiosknetz-Bedarf (kW)",
    thermalDesc: "Das ARIMA-Modell sagt eine Verbrauchsspitze während der Halbzeitpause von 20:00 bis 21:00 Uhr voraus."
  }
};

export default function BigQueryML() {
  const { metrics, energyForecast, renewablesShare, transitInclusivity, appLanguage } = useEcoAccess();
  const [hoveredThermalPoint, setHoveredThermalPoint] = useState(null);
  const [hoveredSolarPoint, setHoveredSolarPoint] = useState(null);

  const t = bqTranslations[appLanguage] || bqTranslations.en;

  // SVG dimensions
  const chartWidth = 380;
  const chartHeight = 120;

  // Project Thermal data points to SVG space
  const maxVal = energyForecast && energyForecast.length > 0 
    ? Math.max(...energyForecast.map(f => f.value), 1000) 
    : 1000;

  const points = (energyForecast || []).map((f, i) => {
    const x = 25 + i * ((chartWidth - 50) / (energyForecast.length - 1));
    const y = chartHeight - 25 - (f.value / maxVal) * (chartHeight - 50);
    return { x, y, value: f.value, time: f.time };
  });

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = points.length > 0 
    ? `${linePath} L ${points[points.length - 1].x} ${chartHeight - 25} L ${points[0].x} ${chartHeight - 25} Z` 
    : '';

  // Project Solar data points to SVG space (declining solar generation in evening hours)
  const solarForecast = [
    { time: "18:00", value: 340.0 },
    { time: "19:00", value: 190.0 },
    { time: "20:00", value: 45.0 },
    { time: "21:00", value: 0.0 }
  ];

  const maxSolarVal = Math.max(...solarForecast.map(f => f.value), 500);

  const solarPoints = solarForecast.map((f, i) => {
    const x = 25 + i * ((chartWidth - 50) / (solarForecast.length - 1));
    const y = chartHeight - 25 - (f.value / maxSolarVal) * (chartHeight - 50);
    return { x, y, value: f.value, time: f.time };
  });

  const solarLinePath = solarPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const solarAreaPath = solarPoints.length > 0 
    ? `${solarLinePath} L ${solarPoints[solarPoints.length - 1].x} ${chartHeight - 25} L ${solarPoints[0].x} ${chartHeight - 25} Z` 
    : '';

  return (
    <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', width: '100%', boxSizing: 'border-box' }}>
      <div className="panel-header">
        <h2 className="panel-title">
          <Activity size={18} style={{ color: 'var(--color-accent-orange)' }} />
          {t.title}
        </h2>
        <span style={{ fontSize: '0.7rem', padding: '0.15rem 0.4rem', borderRadius: '4px', background: 'rgba(249, 115, 22, 0.1)', color: 'var(--color-accent-orange)', fontWeight: '700', textTransform: 'uppercase' }}>{t.mlActive}</span>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', flexGrow: 1 }}>
        
        {/* SECTION 1: CARBON FORECAST */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
            <span style={{ fontWeight: '600', color: '#fff' }}>{t.scopeTitle}</span>
            <span className="font-mono" style={{ color: 'var(--color-accent-red)' }}>+{Math.round(metrics.carbonFootprint / 24)} t CO2e / hour</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
            {t.scopeDesc}
          </div>
          {/* BQ Input Parameters */}
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.35rem' }}>
            {[
              { label: 'Renewables', val: `${renewablesShare}%`, color: 'var(--color-accent-emerald)' },
              { label: 'Transit Inclusivity', val: `${transitInclusivity}%`, color: 'var(--color-accent-cyan)' },
              { label: 'Attendance', val: '75,000', color: 'var(--color-accent-orange)' },
            ].map(p => (
              <span key={p.label} style={{
                fontSize: '0.68rem',
                padding: '0.15rem 0.45rem',
                borderRadius: '4px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)'
              }}>
                <span style={{ color: 'var(--color-text-muted)' }}>{p.label}: </span>
                <span style={{ color: p.color, fontWeight: '700' }}>{p.val}</span>
              </span>
            ))}
          </div>
        </div>

        {/* SECTION 2: RESOURCE UTILIZATION RATE & SOLAR ENERGY FORECAST (MOVED UP) */}
        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
            <span style={{ fontWeight: '600', color: '#fff' }}>{t.resourceTitle}</span>
            <span className="font-mono" style={{ color: 'var(--color-accent-cyan)' }}>{(renewablesShare * 0.4 + transitInclusivity * 0.6).toFixed(1)}% {t.efficiency}</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.75rem' }}>
            {t.resourceDesc}
          </div>

          {/* SOLAR GRID FORECAST SUB-SECTION */}
          <div style={{ borderTop: '1px dashed rgba(255, 255, 255, 0.06)', paddingTop: '0.75rem', marginTop: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
              <span style={{ fontWeight: '600', color: '#fff' }}>{t.solarTitle}</span>
              <span className="font-mono" style={{ color: 'var(--color-accent-yellow)', fontWeight: '700' }}>
                {solarForecast && solarForecast.length > 0 ? `${Math.max(...solarForecast.map(f => f.value))} kW Peak` : "340 kW Peak"}
              </span>
            </div>

            <div style={{ position: 'relative', width: '100%' }}>
              <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="arima-chart-svg">
                <defs>
                  <linearGradient id="solarAreaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-accent-yellow)" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="var(--color-accent-yellow)" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Gridlines */}
                <line x1="20" y1="25" x2={chartWidth - 20} y2="25" className="arima-chart-grid" />
                <line x1="20" y1={chartHeight / 2} x2={chartWidth - 20} y2={chartHeight / 2} className="arima-chart-grid" />
                <line x1="20" y1={chartHeight - 25} x2={chartWidth - 20} y2={chartHeight - 25} className="arima-chart-grid" />

                {/* Area path */}
                {solarAreaPath && <path d={solarAreaPath} style={{ fill: 'url(#solarAreaGradient)' }} />}

                {/* Line path */}
                {solarLinePath && <path d={solarLinePath} style={{ stroke: 'var(--color-accent-yellow)', strokeWidth: 2, fill: 'none' }} />}

                {/* Data points */}
                {solarPoints.map((p, i) => (
                  <circle 
                    key={i}
                    cx={p.x}
                    cy={p.y}
                    style={{ fill: 'var(--color-accent-yellow)', stroke: '#111', strokeWidth: 1.5, cursor: 'pointer' }}
                    r={hoveredSolarPoint?.x === p.x ? 5 : 3.5}
                    onMouseEnter={() => setHoveredSolarPoint(p)}
                    onMouseLeave={() => setHoveredSolarPoint(null)}
                  />
                ))}

                {/* X Axis Labels */}
                {solarPoints.map((p, i) => (
                  <text 
                    key={i}
                    x={p.x}
                    y={chartHeight - 2}
                    fill="var(--color-text-secondary)"
                    fontSize="8"
                    textAnchor="middle"
                  >
                    {p.time.includes(' ') ? p.time.split(' ')[1].substring(0, 5) : p.time}
                  </text>
                ))}

                {/* Responsive SVG Tooltip */}
                {hoveredSolarPoint && (
                  <g style={{ pointerEvents: 'none' }}>
                    <rect 
                      x={hoveredSolarPoint.x - 40} 
                      y={hoveredSolarPoint.y - 28} 
                      width="80" 
                      height="22" 
                      rx="3" 
                      fill="rgba(9, 13, 22, 0.95)" 
                      stroke="var(--color-accent-yellow)" 
                      strokeWidth="1" 
                    />
                    <text 
                      x={hoveredSolarPoint.x} 
                      y={hoveredSolarPoint.y - 18} 
                      fill="#fff" 
                      fontSize="7" 
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {Math.round(hoveredSolarPoint.value)} kW
                    </text>
                    <text 
                      x={hoveredSolarPoint.x} 
                      y={hoveredSolarPoint.y - 10} 
                      fill="var(--color-text-secondary)" 
                      fontSize="5" 
                      textAnchor="middle"
                    >
                      at {hoveredSolarPoint.time.includes(' ') ? hoveredSolarPoint.time.split(' ')[1].substring(0, 5) : hoveredSolarPoint.time}
                    </text>
                  </g>
                )}
              </svg>
            </div>

            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
              {t.solarDesc}
            </div>
          </div>
        </div>

        {/* SECTION 3: HIGH FIDELITY SVG THERMAL GRID ENERGY CHART */}
        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
            <span style={{ fontWeight: '600', color: '#fff' }}>{t.thermalTitle}</span>
            <span className="font-mono" style={{ color: 'var(--color-accent-orange)', fontWeight: '700' }}>
              {energyForecast && energyForecast.length > 0 ? `${Math.max(...energyForecast.map(f => f.value))} ${t.peak}` : `880 ${t.peak}`}
            </span>
          </div>

          <div style={{ position: 'relative', width: '100%' }}>
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="arima-chart-svg">
              <defs>
                <linearGradient id="arimaAreaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-accent-orange)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="var(--color-accent-orange)" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Gridlines */}
              <line x1="20" y1="25" x2={chartWidth - 20} y2="25" className="arima-chart-grid" />
              <line x1="20" y1={chartHeight / 2} x2={chartWidth - 20} y2={chartHeight / 2} className="arima-chart-grid" />
              <line x1="20" y1={chartHeight - 25} x2={chartWidth - 20} y2={chartHeight - 25} className="arima-chart-grid" />

              {/* Fossil backup activation threshold at 800 kW */}
              {(() => {
                const thresholdY = chartHeight - 25 - (800 / maxVal) * (chartHeight - 50);
                return (
                  <g>
                    <line
                      x1="20" y1={thresholdY}
                      x2={chartWidth - 20} y2={thresholdY}
                      stroke="var(--color-accent-red)"
                      strokeWidth="1.5"
                      strokeDasharray="5,3"
                      opacity="0.75"
                    />
                    <text
                      x={chartWidth - 22} y={thresholdY - 3}
                      fill="var(--color-accent-red)"
                      fontSize="6"
                      textAnchor="end"
                      fontWeight="bold"
                    >
                      800kW — Fossil Backup Threshold
                    </text>
                  </g>
                );
              })()}

              {/* Area path */}
              {areaPath && <path d={areaPath} className="arima-chart-area" />}

              {/* Line path */}
              {linePath && <path d={linePath} className="arima-chart-line" />}

              {/* Data points */}
              {points.map((p, i) => (
                <circle 
                  key={i}
                  cx={p.x}
                  cy={p.y}
                  className="arima-chart-dot"
                  onMouseEnter={() => setHoveredThermalPoint(p)}
                  onMouseLeave={() => setHoveredThermalPoint(null)}
                />
              ))}

              {/* X Axis Labels */}
              {points.map((p, i) => (
                <text 
                  key={i}
                  x={p.x}
                  y={chartHeight - 2}
                  fill="var(--color-text-secondary)"
                  fontSize="8"
                  textAnchor="middle"
                >
                  {p.time.includes(' ') ? p.time.split(' ')[1].substring(0, 5) : p.time}
                </text>
              ))}

              {/* Responsive SVG Tooltip */}
              {hoveredThermalPoint && (
                <g style={{ pointerEvents: 'none' }}>
                  <rect 
                    x={hoveredThermalPoint.x - 40} 
                    y={hoveredThermalPoint.y - 28} 
                    width="80" 
                    height="22" 
                    rx="3" 
                    fill="rgba(9, 13, 22, 0.95)" 
                    stroke="var(--color-accent-orange)" 
                    strokeWidth="1" 
                  />
                  <text 
                    x={hoveredThermalPoint.x} 
                    y={hoveredThermalPoint.y - 18} 
                    fill="#fff" 
                    fontSize="7" 
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {Math.round(hoveredThermalPoint.value)} kW
                  </text>
                  <text 
                    x={hoveredThermalPoint.x} 
                    y={hoveredThermalPoint.y - 10} 
                    fill="var(--color-text-secondary)" 
                    fontSize="5" 
                    textAnchor="middle"
                  >
                    at {hoveredThermalPoint.time.includes(' ') ? hoveredThermalPoint.time.split(' ')[1].substring(0, 5) : hoveredThermalPoint.time}
                  </text>
                </g>
              )}
            </svg>
          </div>

          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
            {t.thermalDesc}
          </div>
        </div>

      </div>
    </div>
  );
}
