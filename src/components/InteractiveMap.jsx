import React, { useState } from 'react';
import { useEcoAccess } from '../context/EcoAccessContext';
import { Compass, Eye, EyeOff, ShieldAlert, CheckCircle2, Zap } from 'lucide-react';

const mapTranslations = {
  en: {
    stadiumMap: "APAC Cricket Stadium Map",
    sensorGrid: "Global Event Venue GIS Sensor Grid",
    labels: "Labels",
    carbon: "Carbon",
    accessibility: "Accessibility",
    telemetryActive: "Venue telemetry channels active. No critical incidents detected at this sector.",
    dispatchCrew: "Dispatch Crew",
    normalLegend: "Normal / Accessible",
    entranceLegend: "Main Entrance Gate",
    exitLegend: "Main Exit Gate",
    elevatorLegend: "Elevator Alert (🚨 Offline)",
    gridSpikeLegend: "Grid Spike (⚡ Anomaly)",
    transportHubLegend: "Transport Hub",
    solarLegend: "Solar Charging Station",
    shuttleLegend: "Shuttle Pick-up",
    audioLegend: "Audio Headsets",
    toiletLegend: "Restrooms",
    helpdeskLegend: "Info & Help Desk",
    foodLegend: "Food Kiosk",
    venueLegend: "Main Venue Zone",
    coordsLabel: "Coords:",
    statusLabel: "Status:"
  },
  es: {
    stadiumMap: "Mapa del APAC Cricket Stadium",
    sensorGrid: "Red de Sensores GIS del Recinto Global",
    labels: "Etiquetas",
    carbon: "Carbono",
    accessibility: "Accesibilidad",
    telemetryActive: "Canales de telemetría activos. No se detectan incidentes en este sector.",
    dispatchCrew: "Enviar Personal",
    normalLegend: "Normal / Accesible",
    entranceLegend: "Puerta de Entrada Principal",
    exitLegend: "Puerta de Salida Principal",
    elevatorLegend: "Alerta de Ascensor (🚨 Offline)",
    gridSpikeLegend: "Pico de Red (⚡ Anomalía)",
    transportHubLegend: "Centro de Transporte",
    solarLegend: "Estación de Carga Solar",
    shuttleLegend: "Parada de Transbordo",
    audioLegend: "Auriculares de Audio",
    toiletLegend: "Baños",
    helpdeskLegend: "Mesa de Ayuda e Información",
    foodLegend: "Quiosco de Comida",
    venueLegend: "Zona Principal del Recinto",
    coordsLabel: "Coordenadas:",
    statusLabel: "Estado:"
  },
  ja: {
    stadiumMap: "APACクリケットスタジアム地図",
    sensorGrid: "グローバル会場GISセンサーグリッド",
    labels: "ラベル表示",
    carbon: "二酸化炭素",
    accessibility: "バリアフリー",
    telemetryActive: "通信状態は正常です。検出されたインシデントはありません。",
    dispatchCrew: "クルーを派遣",
    normalLegend: "正常 / アクセス可能",
    entranceLegend: "メイン入場ゲート",
    exitLegend: "メイン退場ゲート",
    elevatorLegend: "エレベーター障害 (🚨 オフライン)",
    gridSpikeLegend: "電力スパイク (⚡ 異常値)",
    transportHubLegend: "交通ハブ",
    solarLegend: "ソーラー充電ステーション",
    shuttleLegend: "シャトル便乗車場所",
    audioLegend: "音声ガイダンス機器",
    toiletLegend: "トイレ",
    helpdeskLegend: "総合案内・ヘルプデスク",
    foodLegend: "フード売店",
    venueLegend: "メイン会場ゾーン",
    coordsLabel: "座標:",
    statusLabel: "ステータス:"
  },
  zh: {
    stadiumMap: "APAC 板球体育场地图",
    sensorGrid: "场馆 GIS 传感器实时监控网络",
    labels: "显示标注",
    carbon: "碳排放监控",
    accessibility: "无障碍通行",
    telemetryActive: "场馆远程监测通道已激活。该区域未检测到异常事件。",
    dispatchCrew: "派遣现场小组",
    normalLegend: "运行正常 / 通畅",
    entranceLegend: "主入口通道闸机",
    exitLegend: "主出口通道闸机",
    elevatorLegend: "电梯运行故障 (🚨 已离线)",
    gridSpikeLegend: "电网异常载荷 (⚡ 异常波峰)",
    transportHubLegend: "综合交通枢纽",
    solarLegend: "太阳能移动充电站",
    shuttleLegend: "接驳巴士乘车点",
    audioLegend: "助听导览设备处",
    toiletLegend: "盥洗室",
    helpdeskLegend: "咨询服务与求助台",
    foodLegend: "餐饮美食商铺",
    venueLegend: "场馆主区域",
    coordsLabel: "坐标:",
    statusLabel: "状态:"
  },
  de: {
    stadiumMap: "APAC Cricket Stadionplan",
    sensorGrid: "Globales GIS-Sensornetzwerk",
    labels: "Labels",
    carbon: "CO2-Ausstoß",
    accessibility: "Barrierefreiheit",
    telemetryActive: "Telemetriekanäle aktiv. Keine Störungen in diesem Sektor erkannt.",
    dispatchCrew: "Team entsenden",
    normalLegend: "Normal / Barrierefrei",
    entranceLegend: "Haupteingangstor",
    exitLegend: "Hauptausgangstor",
    elevatorLegend: "Aufzugsstörung (🚨 Offline)",
    gridSpikeLegend: "Netzspitze (⚡ Anomalie)",
    transportHubLegend: "Verkehrsknotenpunkt",
    solarLegend: "Solar-Ladestation",
    shuttleLegend: "Shuttle-Haltestelle",
    audioLegend: "Audio-Kopfhörer",
    toiletLegend: "Toiletten",
    helpdeskLegend: "Info- & Hilfsschalter",
    foodLegend: "Lebensmittel-Kiosk",
    venueLegend: "Hauptveranstaltungsbereich",
    coordsLabel: "Koordinaten:",
    statusLabel: "Status:"
  }
};

const nodeDetailsTranslations = {
  en: {
    "node-entry": "Gate 1 Main Entrance: Contextual ticketing, security screening checkpoints, level-grade access corridors, and physical routing support.",
    "node-exit": "Gate 8 Main Exit Gate: High-capacity pedestrian outflow corridor with clear directional lighting guiding spectators directly to transportation links.",
    "node-solar": "Clean Solar Energy Charging Station: Dynamic on-grid cleanliness monitoring active. Allows guests to locate clean energy power points instantly.",
    "node-shuttle": "Shuttle Transit Hub: Low-emission shuttle vehicles depart to main transit links when at full capacity during peak times.",
    "node-headset": "Assistive Hearing Desk: Collect dynamic audio commentary headsets for the APAC cricket match. Loop services active.",
    "node-toilet": "Universal Restroom Facility: Level grade ramped access, auto sliding doors, and water-conserving sensor taps.",
    "node-help": "Venue Support Center: Live team support for physical routing, translation assistance, and general inquiries.",
    "node-food": "Plaza Food Kiosk: Organic and vegan concessions, plastic-free reusable cup drop points, and contactless payment.",
    "node-main-venue": "Main Venue Zone: The primary stadium field hosting cricket match play and main athletics."
  },
  es: {
    "node-entry": "Puerta 1 Entrada Principal: Venta de boletos, puntos de control de seguridad y pasillos de acceso a nivel.",
    "node-exit": "Puerta 8 Salida Principal: Corredor de salida peatonal de alta capacidad con iluminación direccional hacia el transporte.",
    "node-solar": "Estación de Carga Solar Limpia: Monitoreo activo de red limpia. Permite a los invitados ubicar puntos de energía solar.",
    "node-shuttle": "Centro de Transporte de Autobuses: Vehículos de baja emisión hacia los principales enlaces de tránsito.",
    "node-headset": "Puesto de Asistencia Auditiva: Auriculares de comentarios en vivo para el partido de cricket. Servicios de bucle activos.",
    "node-toilet": "Baños Universales: Acceso con rampa a nivel, puertas automáticas y grifos con sensor para ahorro de agua.",
    "node-help": "Centro de Soporte del Recinto: Asistencia en vivo para rutas físicas, traducción y consultas generales.",
    "node-food": "Quiosco de Comida de la Plaza: Alimentos orgánicos y veganos, puntos de reciclaje de vasos y pago sin contacto.",
    "node-main-venue": "Zona Principal del Recinto: Campo principal del estadio que alberga partidos de cricket y atletismo."
  },
  ja: {
    "node-entry": "ゲート1 メイン入場口：コンテキスト対応の発券、手荷物検査、バリアフリー通路、および会場案内サポート。",
    "node-exit": "ゲート8 メイン退場口：混雑を緩和する高容量の歩行者退場通路。交通機関への明瞭な誘導照明付き。",
    "node-solar": "クリーンソーラー充電ステーション：グリッド監視が有効。利用者が太陽光充電ポイントを瞬時に検索可能。",
    "node-shuttle": "シャトルバス乗車ハブ：混雑時に主要な交通リンクへ向けて低排出ガスシャトルバスが随時運行中。",
    "node-headset": "音声支援カウンター：クリケット試合のリアルタイム実況音声ヘッドセットの貸出。ヒアリングループ稼働中。",
    "node-toilet": "多目的トイレ施設：段差なしスロープ、自動引き戸、および節水センサー蛇口を完備。",
    "node-help": "会場サポートセンター：物理的案内、多言語翻訳支援、一般的な問い合わせに対応するチームが常駐。",
    "node-food": "広場フード売店：オーガニック＆ビーガン料理、プラスチックフリー再利用カップ回収所、非接触決済対応。",
    "node-main-venue": "メイン会場ゾーン：クリケット試合および主要陸上競技が開催されるメインスタジアムフィールド。"
  },
  zh: {
    "node-entry": "1号门主入口闸机：智慧票务查验、安检通道、无障碍平地通行走廊与导览服务。",
    "node-exit": "8号门主出口闸机：高容量散场客流疏散通道，配备清晰的导航灯光引导散场客流直达交通枢纽。",
    "node-solar": "清洁太阳能充电站：实时电网清洁度监控。方便观众快速定位绿色能源充电桩。",
    "node-shuttle": "无障碍接驳车总站：高峰期纯电动低排放接驳车客满即发，快速接驳主要交通干线。",
    "node-headset": "助听导览设备服务台：提供板球比赛实时同声传译助听耳机领用，听障回路服务在线。",
    "node-toilet": "无障碍通用盥洗室：平地坡道接入、自动感应平移门与节水感应水龙头。",
    "node-help": "场馆综合服务中心：提供现场路线指引、多语言翻译协助及综合咨询服务。",
    "node-food": "广场美食商铺：提供有机与植物基素食餐食、无塑环保杯回收点及无接触支付。",
    "node-main-venue": "场馆主竞技区：举办板球比赛及大型田径赛事的主体育场核心区域。"
  },
  de: {
    "node-entry": "Tor 1 Haupteingang: Ticketkontrolle, Sicherheits-Checkpoints, ebenenerdige Zugangswege und Wegweisung.",
    "node-exit": "Tor 8 Hauptausgangstor: Hochkapazitäts-Fußgänger-Ausgangskorridor mit klarer Beleuchtung zu den Verkehrsmitteln.",
    "node-solar": "Solar-Ladestation: Überwachung der Stromsauberkeit aktiv. Ermöglicht schnelles Auffinden von Solar-Ladepunkten.",
    "node-shuttle": "Shuttle-Verkehrsknotenpunkt: Emissionsarme Shuttle-Fahrzeuge fahren zu den Hauptverkehrsknotenpunkten.",
    "node-headset": "Audio-Assistenz-Schalter: Abholung von Audiosets für Live-Kommentare zum Cricket-Spiel. Hörschleifen aktiv.",
    "node-toilet": "Barrierefreie Toilettenanlage: Ebenerdiger Rampenzugang, automatische Schiebetüren und wassersparende Sensoren.",
    "node-help": "Stadion-Support-Center: Live-Hilfe für Orientierung vor Ort, Übersetzungsunterstützung und allgemeine Fragen.",
    "node-food": "Plaza-Kiosk: Bio- und vegane Speisen, plastickfreie Mehrwegbecher-Rückgabestellen und kontaktlose Zahlung.",
    "node-main-venue": "Hauptveranstaltungsbereich: Das Hauptspielfeld für Cricket-Spiele und Leichtathletikveranstaltungen."
  }
};

const nodeNameTranslations = {
  en: {
    "node-entry": "🟢 Main Entrance Gate",
    "node-exit": "🔴 Main Exit Gate",
    "node-solar": "☀️ Solar Charging Station",
    "node-shuttle": "🚌 Shuttle Pick-up",
    "node-headset": "🎧 Audio Headset Pick Up",
    "node-toilet": "🚽 Restrooms",
    "node-help": "ℹ️ Information & Help Desk",
    "node-food": "🍎 Food Kiosk",
    "node-main-venue": "Main Venue Zone"
  },
  es: {
    "node-entry": "🟢 Puerta de Entrada Principal",
    "node-exit": "🔴 Puerta de Salida Principal",
    "node-solar": "☀️ Estación de Carga Solar",
    "node-shuttle": "🚌 Parada de Transbordo",
    "node-headset": "🎧 Puesto de Asistencia Auditiva",
    "node-toilet": "🚽 Baños Universales",
    "node-help": "ℹ️ Mesa de Ayuda e Información",
    "node-food": "🍎 Quiosco de Comida",
    "node-main-venue": "Zona Principal del Recinto"
  },
  ja: {
    "node-entry": "🟢 メイン入場ゲート",
    "node-exit": "🔴 メイン退場ゲート",
    "node-solar": "☀️ ソーラー充電ステーション",
    "node-shuttle": "🚌 シャトル便乗車場所",
    "node-headset": "🎧 音声支援機器窓口",
    "node-toilet": "🚽 多目的トイレ",
    "node-help": "ℹ️ 総合案内・ヘルプデスク",
    "node-food": "🍎 フード売店",
    "node-main-venue": "メイン会場ゾーン"
  },
  zh: {
    "node-entry": "🟢 主入口通道闸机",
    "node-exit": "🔴 主出口通道闸机",
    "node-solar": "☀️ 太阳能移动充电站",
    "node-shuttle": "🚌 接驳巴士乘车点",
    "node-headset": "🎧 助听导览设备处",
    "node-toilet": "🚽 无障碍通用盥洗室",
    "node-help": "ℹ️ 咨询服务与求助台",
    "node-food": "🍎 餐饮美食商铺",
    "node-main-venue": "场馆主区域"
  },
  de: {
    "node-entry": "🟢 Haupteingangstor",
    "node-exit": "🔴 Hauptausgangstor",
    "node-solar": "☀️ Solar-Ladestation",
    "node-shuttle": "🚌 Shuttle-Haltestelle",
    "node-headset": "🎧 Audio-Kopfhörer-Schalter",
    "node-toilet": "🚽 Barrierefreie Toiletten",
    "node-help": "ℹ️ Info- & Hilfsschalter",
    "node-food": "🍎 Lebensmittel-Kiosk",
    "node-main-venue": "Hauptveranstaltungsbereich"
  }
};

const compassDict = {
  en: { N: 'N', S: 'S', E: 'E', W: 'W' },
  es: { N: 'N', S: 'S', E: 'E', W: 'O' },
  ja: { N: '北', S: '南', E: '東', W: '西' },
  zh: { N: '北', S: '南', E: '东', W: '西' },
  de: { N: 'N', S: 'S', E: 'O', W: 'W' }
};

export default function InteractiveMap() {
  const {
    mapNodes,
    mapOverlayMode,
    setMapOverlayMode,
    incidents,
    metrics,
    handleDispatch,
    portalRole,
    appLanguage
  } = useEcoAccess();

  const [showLabels, setShowLabels] = useState(true);
  const [activeNode, setActiveNode] = useState(null);
  const [dispatchingId, setDispatchingId] = useState(null);

  const activeNodes = mapNodes;

  const getNodeIncident = (node) => {
    return incidents.find(inc => 
      inc.sector.toLowerCase().includes(node.name.toLowerCase()) || 
      node.name.toLowerCase().includes(inc.sector.toLowerCase())
    );
  };

  const handleNodeSelect = (node) => {
    setActiveNode(node);
  };

  const activeIncident = activeNode ? getNodeIncident(activeNode) : null;
  const t = mapTranslations[appLanguage] || mapTranslations.en;

  return (
    <div className="glass-panel" style={{ position: 'relative' }}>
      <div className="panel-header">
        <h2 className="panel-title">
          <Compass size={18} style={{color: 'var(--color-accent-cyan)'}} />
          {portalRole === 'attendee' ? t.stadiumMap : t.sensorGrid}
        </h2>
        <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center'}}>
          <button 
            className="button secondary"
            style={{padding: '0.25rem 0.5rem', fontSize: '0.75rem', border: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem'}}
            onClick={() => setShowLabels(!showLabels)}
            title="Toggle Node Labels (Mobile Option)"
          >
            {showLabels ? <Eye size={12} /> : <EyeOff size={12} />}
            <span style={{ fontSize: '0.7rem' }}>{t.labels}</span>
          </button>
        </div>
      </div>
      
      <div className="map-canvas-container" style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Compass Directional Widget (Clean Box Grid fitting N, W, E, S without emoji) */}
        <div style={{ 
          position: 'absolute', 
          top: '12px', 
          left: '12px', 
          background: 'rgba(3, 7, 18, 0.85)', 
          border: '1px solid rgba(6, 182, 212, 0.4)', 
          borderRadius: '8px', 
          padding: '6px', 
          zIndex: 6, 
          pointerEvents: 'none',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)'
        }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 18px)', 
            gridTemplateRows: 'repeat(3, 18px)', 
            gap: '2px', 
            textAlign: 'center', 
            fontWeight: 'bold', 
            alignItems: 'center',
            justifyItems: 'center'
          }}>
            <div></div>
            <div style={{ color: 'var(--color-accent-red)', fontSize: '0.75rem', lineHeight: 1 }}>{(compassDict[appLanguage] || compassDict.en).N}</div>
            <div></div>
            <div style={{ color: '#f3f4f6', fontSize: '0.7rem', lineHeight: 1 }}>{(compassDict[appLanguage] || compassDict.en).W}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-accent-cyan)', lineHeight: 1 }}>✥</div>
            <div style={{ color: '#f3f4f6', fontSize: '0.7rem', lineHeight: 1 }}>{(compassDict[appLanguage] || compassDict.en).E}</div>
            <div></div>
            <div style={{ color: '#f3f4f6', fontSize: '0.7rem', lineHeight: 1 }}>{(compassDict[appLanguage] || compassDict.en).S}</div>
            <div></div>
          </div>
        </div>

        <div className="map-grid-layer"></div>
        
        {/* Connections */}
        {mapOverlayMode === 'carbon' ? (
          <>
            <div className="map-connection" style={{ left: '50%', top: '50%', width: '31%', transform: 'rotate(27deg)', borderTop: '2px dashed rgba(239, 68, 68, 0.4)' }}></div>
            <div className="map-connection" style={{ left: '50%', top: '50%', width: '23%', transform: 'rotate(130deg)', borderTop: '2px dashed rgba(239, 68, 68, 0.4)' }}></div>
            <div className="map-connection" style={{ left: '50%', top: '50%', width: '32%', transform: 'rotate(-44deg)', borderTop: '2px dashed rgba(239, 68, 68, 0.4)' }}></div>
          </>
        ) : (
          <>
            <div className="map-connection" style={{ left: '50%', top: '50%', width: '31%', transform: 'rotate(27deg)', borderTop: '2px dashed rgba(6, 182, 212, 0.4)' }}></div>
            <div className="map-connection" style={{ left: '50%', top: '50%', width: '23%', transform: 'rotate(130deg)', borderTop: '2px dashed rgba(6, 182, 212, 0.4)' }}></div>
            <div className="map-connection" style={{ left: '50%', top: '50%', width: '32%', transform: 'rotate(-44deg)', borderTop: '2px dashed rgba(6, 182, 212, 0.4)' }}></div>
          </>
        )}

        {/* Map Nodes Render */}
        {activeNodes.map((node) => {
          const inc = getNodeIncident(node);
          
          let nodeColor = node.color || 'var(--color-accent-emerald)';
          let isCore = ['node-1', 'node-2', 'node-3', 'node-4'].includes(node.id);
          
          if (isCore) {
            if (inc && inc.status === 'unresolved') {
              nodeColor = inc.severity === 'critical' ? 'var(--color-accent-red)' : 'var(--color-accent-orange)';
            } else {
              nodeColor = 'var(--color-accent-emerald)';
            }
          }

          return (
            <div 
              key={node.id}
              className={`map-node ${activeNode?.id === node.id ? 'active' : ''}`}
              style={{
                position: 'absolute',
                left: `${node.x}%`,
                top: `${node.y}%`,
                width: activeNode?.id === node.id ? '16px' : '12px',
                height: activeNode?.id === node.id ? '16px' : '12px',
                borderRadius: '50%',
                backgroundColor: nodeColor,
                border: '2px solid #fff',
                transform: 'translate(-50%, -50%)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                zIndex: activeNode?.id === node.id ? 8 : 5,
                boxShadow: `0 0 10px ${nodeColor}`
              }}
              onClick={() => handleNodeSelect(node)}
            >
              {showLabels && (
                <span 
                  className="node-label"
                  style={{
                    position: 'absolute',
                    top: '15px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(3, 7, 18, 0.9)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontSize: '0.65rem',
                    color: '#fff',
                    whiteSpace: 'nowrap',
                    pointerEvents: 'none',
                    opacity: 1,
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 'normal',
                    zIndex: 10
                  }}
                >
                  {(nodeNameTranslations[appLanguage] || nodeNameTranslations.en)[node.id] || node.name}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Node Details Block */}
      <div style={{ padding: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
        {activeNode ? (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#fff' }}>
                {(nodeNameTranslations[appLanguage] || nodeNameTranslations.en)[activeNode.id] || activeNode.name}
              </span>
              <span style={{ fontSize: '0.65rem', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-mono)' }}>
                {t.coordsLabel || 'Coords:'} {activeNode.x}, {activeNode.y}
              </span>
            </div>

            <p style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)', margin: '4px 0 6px 0', lineHeight: 1.35 }}>
              {(nodeDetailsTranslations[appLanguage] || nodeDetailsTranslations.en)[activeNode.id] || activeNode.details}
            </p>
            
            {activeIncident ? (
              <div style={{ background: 'rgba(239, 68, 68, 0.04)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '0.5rem', borderRadius: '4px', marginTop: '0.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '0.15rem' }}>
                  <ShieldAlert size={12} style={{ color: 'var(--color-accent-red)' }} />
                  <span style={{ fontSize: '0.7rem', fontWeight: 'bold', color: 'var(--color-accent-red)' }}>
                    {activeIncident.type.toUpperCase()}: {activeIncident.issue}
                  </span>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', margin: 0 }}>
                  {activeIncident.description}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.25rem' }}>
                  <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 'bold', color: activeIncident.status === 'resolved' ? 'var(--color-accent-emerald)' : 'var(--color-accent-orange)' }}>
                    {t.statusLabel || 'Status:'} {activeIncident.status}
                  </span>
                  
                  {activeIncident.status === 'unresolved' && (
                    <button 
                      className="button success" 
                      disabled={dispatchingId === activeIncident.id}
                      style={{ padding: '0.25rem 0.5rem', fontSize: '0.7rem', border: 'none', margin: 0, opacity: dispatchingId === activeIncident.id ? 0.7 : 1, cursor: dispatchingId === activeIncident.id ? 'not-allowed' : 'pointer' }}
                      onClick={() => {
                        setDispatchingId(activeIncident.id);
                        setTimeout(() => {
                          handleDispatch(activeIncident.id);
                          setDispatchingId(null);
                        }, 700);
                      }}
                    >
                      {dispatchingId === activeIncident.id ? '⏳ Dispatching Crew...' : t.dispatchCrew}
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                <CheckCircle2 size={14} style={{ color: 'var(--color-accent-emerald)' }} />
                <span>{t.telemetryActive}</span>
              </div>
            )}
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
            <CheckCircle2 size={14} style={{ color: 'var(--color-accent-emerald)' }} />
            <span>{t.telemetryActive}</span>
          </div>
        )}
      </div>

      {/* Unified Map Legend Directory */}
      <div className="map-legend-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem 1rem', marginTop: '1rem', padding: '0.75rem', background: 'rgba(255, 255, 255, 0.01)', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
        <div className="legend-item" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.7rem' }}>
          <span className="legend-color-dot" style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#059669' }}></span>
          <span>{t.venueLegend}</span>
        </div>
        <div className="legend-item" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.7rem' }}>
          <span className="legend-color-dot" style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#2dd4bf' }}></span>
          <span>{t.entranceLegend}</span>
        </div>
        <div className="legend-item" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.7rem' }}>
          <span className="legend-color-dot" style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f43f5e' }}></span>
          <span>{t.exitLegend}</span>
        </div>
        <div className="legend-item" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.7rem' }}>
          <span className="legend-color-dot" style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-accent-yellow)' }}></span>
          <span>{t.solarLegend}</span>
        </div>
        <div className="legend-item" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.7rem' }}>
          <span className="legend-color-dot" style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-accent-pink)' }}></span>
          <span>{t.shuttleLegend}</span>
        </div>
        <div className="legend-item" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.7rem' }}>
          <span className="legend-color-dot" style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-accent-white)' }}></span>
          <span>{t.audioLegend}</span>
        </div>
        <div className="legend-item" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.7rem' }}>
          <span className="legend-color-dot" style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-accent-cyan)' }}></span>
          <span>{t.toiletLegend}</span>
        </div>
        <div className="legend-item" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.7rem' }}>
          <span className="legend-color-dot" style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-accent-purple)' }}></span>
          <span>{t.helpdeskLegend}</span>
        </div>
        <div className="legend-item" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.7rem' }}>
          <span className="legend-color-dot" style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#15803d' }}></span>
          <span>{t.foodLegend}</span>
        </div>
      </div>
    </div>
  );
}
