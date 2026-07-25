import React, { useState } from 'react';
import { useEcoAccess } from '../context/EcoAccessContext';
import { Compass, Eye, EyeOff, ShieldAlert, CheckCircle2, Zap } from 'lucide-react';
import { VENUE_PRESETS } from '../data/venuePresets';

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
    elevatorNodeLegend: "Wheelchair Elevator & Ramp",
    wasteLegend: "Smart Waste CCTV Hub",
    waterLegend: "Water Refill Station",
    medicalLegend: "First Aid & Medical Hub",
    bessLegend: "Solar Battery BESS",
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
    elevatorNodeLegend: "Ascensor y Rampa Accesible",
    wasteLegend: "Centro de Residuos CCTV",
    waterLegend: "Estación de Recarga de Agua",
    medicalLegend: "Puesto de Primeros Auxilios",
    bessLegend: "Batería Solar BESS",
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
    elevatorNodeLegend: "車椅子エレベーター＆スロープ",
    wasteLegend: "AIゴミ箱監視ステーション",
    waterLegend: "給水・水分補給スタンド",
    medicalLegend: "救护・救急医療ハブ",
    bessLegend: "蓄電池BESSシステム",
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
    elevatorNodeLegend: "轮椅无障碍电梯坡道",
    wasteLegend: "智能垃圾 CCTV 监控站",
    waterLegend: "饮用水补给站",
    medicalLegend: "医疗急救中心",
    bessLegend: "储能电池 BESS 站",
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
    elevatorNodeLegend: "Rollstuhl-Aufzug & Rampe",
    wasteLegend: "Smart-Waste-CCTV-Station",
    waterLegend: "Wasser-Nachfüllstation",
    medicalLegend: "Erste-Hilfe-Zentrum",
    bessLegend: "Solar-Batterie-BESS",
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
    "node-main-venue": "Main Venue Zone: The primary stadium field hosting cricket match play and main athletics.",
    "node-elevator": "Section 104 Elevator & Ramp: Wheelchair vertical lift shaft and step-free incline corridor.",
    "node-waste": "Food Court Bin Station #4: Live Gemini CCTV bin fill-level and contamination monitoring.",
    "node-water": "H2O Refill Bar: Municipal water conservation sensor taps and plastic bottle refill point.",
    "node-medical": "Main Concourse Medical Station: Heat-stress triage and rapid response emergency crew dispatch.",
    "node-bess": "Grid Substation BESS: 500kWh battery energy storage system for peak power load shaving."
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
    "node-main-venue": "Zona Principal del Recinto: Campo principal del estadio que alberga partidos de cricket y atletismo.",
    "node-elevator": "Ascensor y Rampa Sección 104: Pozo de ascensor para sillas de ruedas y pasillo sin escalones.",
    "node-waste": "Estación de Contenedores #4: Monitoreo en vivo por CCTV Gemini de nivel de llenado y contaminación.",
    "node-water": "Barra de Recarga H2O: Grifos con sensor de conservación de agua y punto de recarga de botellas.",
    "node-medical": "Estación Médica Principal: Triaje de estrés por calor y envío de personal de emergencia.",
    "node-bess": "Subestación BESS: Sistema de almacenamiento de batería de 500kWh para reducir picos de carga."
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
    "node-main-venue": "メイン会場ゾーン：クリケット試合および主要陸上競技が開催されるメインスタジアムフィールド。",
    "node-elevator": "104区画エレベーター＆スロープ：車椅子対応垂直昇降エレベーターおよび段差なし通路。",
    "node-waste": "フードコートゴミ箱#4：Gemini AIカメラによる満容量・分別混入リアルタイム監視中。",
    "node-water": "給水スタンド：節水センサー蛇口およびマイボトル無料給水スポット。",
    "node-medical": "救護所・医療ステーション：熱中症応急手当および緊急救護チーム即時派遣対応。",
    "node-bess": "変電所BESS蓄電池：電力ピークカット用500kWh蓄電池エネルギー貯蔵システム。"
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
    "node-main-venue": "场馆主竞技区：举办板球比赛及大型田径赛事的主体育场核心区域。",
    "node-elevator": "104区段无障碍电梯与坡道：轮椅垂直升降梯与零阶梯坡道通道。",
    "node-waste": "美食广场4号垃圾桶：Gemini 视觉 AI 实时监控溢满与分类污染。",
    "node-water": "饮用水补给站：节水感应水龙头与自带水杯免费饮用水接入点。",
    "node-medical": "主走廊医疗急救站：高温中暑检伤分类与紧急救护小组快速调度。",
    "node-bess": "变电站 BESS 储能系统：500kWh 电池储能系统用于削峰填谷平抑电网负荷。"
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
    "node-main-venue": "Hauptveranstaltungsbereich: Das Hauptspielfeld für Cricket-Spiele und Leichtathletikveranstaltungen.",
    "node-elevator": "Sektor 104 Aufzug & Rampe: Rollstuhlgerechter Vertikallift und stufenloser Zugangskorridor.",
    "node-waste": "Abfallstation #4: Live-CCTV-Überwachung des Füllstands und der Mülltrennung.",
    "node-water": "Wasser-Refill-Bar: Wassersparende Sensor-Armaturen und Trinkwasser-Auffüllstation.",
    "node-medical": "Erste-Hilfe-Station: Hitzestress-Erstversorgung und Notfall-Einsatzkräfte-Entsendung.",
    "node-bess": "Batterie-BESS-Substation: 500kWh Batterie-Energiespeichersystem für Netzspitzen-Kappung."
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
    "node-main-venue": "Main Venue Zone",
    "node-elevator": "🛗 Elevator & Ramp Shaft",
    "node-waste": "♻️ Smart Waste CCTV Hub",
    "node-water": "💧 Water Refill Station",
    "node-medical": "🚑 First Aid & Medical Hub",
    "node-bess": "🔋 Solar Battery Storage BESS"
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
    "node-main-venue": "Zona Principal del Recinto",
    "node-elevator": "🛗 Ascensor y Rampa Sección 104",
    "node-waste": "♻️ Centro de Residuos CCTV",
    "node-water": "💧 Estación de Recarga de Agua",
    "node-medical": "🚑 Puesto de Primeros Auxilios",
    "node-bess": "🔋 Batería Solar BESS"
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
    "node-main-venue": "メイン会場ゾーン",
    "node-elevator": "🛗 車椅子エレベーター＆スロープ",
    "node-waste": "♻️ AIゴミ箱監視ステーション",
    "node-water": "💧 給水・水分補給スタンド",
    "node-medical": "🚑 救護・救急医療ハブ",
    "node-bess": "🔋 蓄電池BESSシステム"
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
    "node-main-venue": "场馆主区域",
    "node-elevator": "🛗 轮椅无障碍电梯坡道",
    "node-waste": "♻️ 智能垃圾 CCTV 监控站",
    "node-water": "💧 饮用水补给站",
    "node-medical": "🚑 医疗急救中心",
    "node-bess": "🔋 储能电池 BESS 站"
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
    "node-main-venue": "Hauptveranstaltungsbereich",
    "node-elevator": "🛗 Rollstuhl-Aufzug & Rampe",
    "node-waste": "♻️ Smart-Waste-CCTV-Station",
    "node-water": "💧 Wasser-Nachfüllstation",
    "node-medical": "🚑 Erste-Hilfe-Zentrum",
    "node-bess": "🔋 Solar-Batterie-BESS"
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
    setMapNodes,
    setEventTitle,
    setEventSubtitle,
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
      <div className="panel-header" style={{ flexWrap: 'wrap', gap: '0.5rem' }}>
        <h2 className="panel-title">
          <Compass size={18} style={{color: 'var(--color-accent-cyan)'}} />
          {portalRole === 'attendee' ? t.stadiumMap : t.sensorGrid}
        </h2>
        <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center', marginLeft: 'auto'}}>
          <select 
            className="chat-input"
            style={{ padding: '0.2rem 0.5rem', fontSize: '0.72rem', background: '#0b1329', color: '#fff', border: '1px solid var(--border-color)', borderRadius: '4px', cursor: 'pointer' }}
            title="Switch Global Venue Presets"
            onChange={(e) => {
              const found = VENUE_PRESETS.find(p => p.id === e.target.value);
              if (found) {
                setEventTitle(found.title);
                setEventSubtitle(found.subtitle);
                setMapNodes(found.nodes);
              }
            }}
          >
            {VENUE_PRESETS.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>

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
        
        {/* SVG Node Connections (Pixel-perfect vector lines) */}
        <svg 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 3 }}
        >
          {activeNodes.filter(n => n.id !== 'node-main-venue' && n.id !== 'node-1').map(targetNode => {
            const centerNode = activeNodes.find(n => n.id === 'node-main-venue' || n.id === 'node-1') || { x: 50, y: 50 };
            const lineColor = mapOverlayMode === 'carbon' ? 'rgba(239, 68, 68, 0.35)' : 'rgba(6, 182, 212, 0.35)';
            return (
              <line 
                key={`line-${targetNode.id}`}
                x1={centerNode.x}
                y1={centerNode.y}
                x2={targetNode.x}
                y2={targetNode.y}
                stroke={lineColor}
                strokeWidth="0.2"
                strokeDasharray="0.6, 0.6"
              />
            );
          })}
        </svg>

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
        <div className="legend-item" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.7rem' }}>
          <span className="legend-color-dot" style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#3b82f6' }}></span>
          <span>{t.elevatorNodeLegend || "Wheelchair Elevator & Ramp"}</span>
        </div>
        <div className="legend-item" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.7rem' }}>
          <span className="legend-color-dot" style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }}></span>
          <span>{t.wasteLegend || "Smart Waste CCTV Hub"}</span>
        </div>
        <div className="legend-item" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.7rem' }}>
          <span className="legend-color-dot" style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#06b6d4' }}></span>
          <span>{t.waterLegend || "Water Refill Station"}</span>
        </div>
        <div className="legend-item" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.7rem' }}>
          <span className="legend-color-dot" style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444' }}></span>
          <span>{t.medicalLegend || "First Aid & Medical Hub"}</span>
        </div>
        <div className="legend-item" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.7rem' }}>
          <span className="legend-color-dot" style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#8b5cf6' }}></span>
          <span>{t.bessLegend || "Solar Battery BESS"}</span>
        </div>
      </div>
    </div>
  );
}
