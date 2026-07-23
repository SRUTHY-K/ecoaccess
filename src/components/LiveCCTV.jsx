import React, { useState } from 'react';
import { useEcoAccess } from '../context/EcoAccessContext';
import { Eye, Shield, Users, Radio, AlertTriangle } from 'lucide-react';

const cctvTranslations = {
  en: {
    title: "Vertex AI Vision: Live Stream Analyzers (Max 75,000 Capacity)",
    streamsHeader: "Vertex AI Vision Streams (Max 75,000 Capacity)",
    cctvNodesBadge: "4/4 CCTV Nodes",
    cctvCore: "CCTV Core",
    cctv1Title: "Entrance Gate",
    cctv2Title: "Main Exit Gate",
    cctv3Title: "Shuttle Pick-up Zone",
    cctv4Title: "Lift Door #1",
    obstruction: "Obstruction",
    clear: "Clear",
    contamination: "Contamination",
    liftOutage: "Lift Outage",
    normal: "Normal",
    cctv1DescAlert: "Main entrance gate pathway blocked by ticketing bottlenecks.",
    cctv1DescOk: "Ticketing flow clear.",
    cctv2DescAlert: "Litter pileup blocking secondary emergency exit gate.",
    cctv2DescOk: "Emergency exit clear.",
    cctv3DescAlert: "Shuttle bus queue congestion detected at pickup zone.",
    cctv3DescOk: "Shuttles boarding normally.",
    cctv4DescAlert: "Wheelchair elevator E-4 offline. Door sensor failure.",
    cctv4DescOk: "Lift operating normally.",
    heatmapTitle: "Live Congestion Heatmap (Infrared Sensors)",
    capacity: "Capacity",
    dispatchTitle: "Operator Crew Dispatch & Asset Overrides",
    dispatchBtnBin: "Dispatch Cleaner to Bin #4",
    dispatchBtnGate6: "Dispatch Repair to Audio Headset Station",
    dispatchBtnGate2: "Dispatch Security to Main Entrance Gate",
    dispatchConsole: "Dynamic Operator Dispatch Console",
    audioCrew: "Audio Floor Crew",
    solarCrew: "Solar & Electric Crew",
    cleaningCrew: "Cleaning Crew",
    assignedLocation: "Assigned Location:",
    customNotes: "Custom Notes / Comments:",
    sendPush: "Send Push Notification",
    logDispatchBtn: "Log & Dispatch Crew",
    noDispatches: "No dispatches logged in this session.",
    redirectionRoute: "Food Kiosk Congestion Control",
    redirectionActive: "Food Trolleys Deployed",
    redirectionOff: "Deploy Food Trolleys",
    audioDesk: "Audio Assist Desk",
    audioPool: "Pool: 88% Available",
    warningTitle: "Threshold Warning:",
    warningDesc: "Organic Waste Bin #4 has reached 92% capacity limit. Cleaner crew dispatch required.",
    irOfflineBanner: "❌ Infrared Telemetry Offline (Toggle on in Sidebar)",
    activeSensors: "Active Infrared Sensors: 12/12",
    avgDensity: "Avg Venue Crowd Density:",
    alertThreshold: "Congestion Alert Threshold: 80% Capacity",
    securityCrew: "Security",
    foodTrolleysCrew: "Food Trolleys",
    floorStaffCrew: "Floor Staff",
    solarDesk: "Solar Charging Station",
    solarPool: "Pool: 94% Available"
  },
  es: {
    title: "Vertex AI Vision: Analizadores de Stream en Vivo (Capacidad Máx. 75,000)",
    streamsHeader: "Flujos de Visión Vertex AI (Capacidad Máx. 75,000)",
    cctvNodesBadge: "4/4 Nodos CCTV",
    cctvCore: "Núcleo CCTV",
    cctv1Title: "Puerta de Entrada",
    cctv2Title: "Puerta de Salida Principal",
    cctv3Title: "Zona de Transbordo",
    cctv4Title: "Puerta de Ascensor #1",
    obstruction: "Obstrucción",
    clear: "Despejado",
    contamination: "Contaminación",
    liftOutage: "Ascensor Caído",
    normal: "Normal",
    cctv1DescAlert: "Vía de entrada bloqueada por cuellos de botella de boletos.",
    cctv1DescOk: "Flujo de entrada despejado.",
    cctv2DescAlert: "Basura acumulada bloqueando la salida de emergencia secundaria.",
    cctv2DescOk: "Salida de emergencia despejada.",
    cctv3DescAlert: "Congestión detectada en la cola de transbordo de autobuses.",
    cctv3DescOk: "Autobuses abordando normalmente.",
    cctv4DescAlert: "Ascensor de sillas de ruedas offline. Falla de sensor de puerta.",
    cctv4DescOk: "Ascensor operando normalmente.",
    heatmapTitle: "Mapa de Congestión en Vivo (Sensores Infrarrojos)",
    capacity: "Capacidad",
    dispatchTitle: "Despacho de Personal Operativo y Anulaciones",
    dispatchBtnBin: "Enviar Limpiador a Contenedor #4",
    dispatchBtnGate6: "Enviar Reparación a Mesa de Audio",
    dispatchBtnGate2: "Enviar Seguridad a Entrada Principal",
    dispatchConsole: "Consola Dinámica de Despacho de Operadores",
    audioCrew: "Personal de Audio",
    solarCrew: "Personal Solar y Eléctrico",
    cleaningCrew: "Personal de Limpieza",
    assignedLocation: "Ubicación Asignada:",
    customNotes: "Notas / Comentarios:",
    sendPush: "Enviar Notificación Push",
    logDispatchBtn: "Registrar y Enviar Personal",
    noDispatches: "No se registraron despachos en esta sesión.",
    redirectionRoute: "Control de Congestión de Comida",
    redirectionActive: "Carritos de Comida Enviados",
    redirectionOff: "Enviar Carritos de Comida",
    audioDesk: "Mesa de Asistencia de Audio",
    audioPool: "Disponibilidad: 88% Libre",
    warningTitle: "Alerta de Límite:",
    warningDesc: "El contenedor #4 orgánico ha alcanzado el 92% de capacidad. Se requiere personal.",
    irOfflineBanner: "❌ Telemetría Infrarroja Offline (Activar en menú lateral)",
    activeSensors: "Sensores Infrarrojos Activos: 12/12",
    avgDensity: "Densidad Promedio de la Multitud:",
    alertThreshold: "Límite de Alerta de Congestión: 80% Capacidad",
    securityCrew: "Seguridad",
    foodTrolleysCrew: "Carritos de Comida",
    floorStaffCrew: "Personal de Campo",
    solarDesk: "Estación de Carga Solar",
    solarPool: "Disponibilidad: 94% Libre"
  },
  ja: {
    title: "Vertex AI Vision: リアルタイム映像解析（最大75,000人対応）",
    streamsHeader: "Vertex AI Vision 映像ストリーム（最大収容人数 75,000名）",
    cctvNodesBadge: "4/4 CCTVノード",
    cctvCore: "CCTVコア",
    cctv1Title: "入場ゲート",
    cctv2Title: "メイン退場ゲート",
    cctv3Title: "シャトル便乗車場所",
    cctv4Title: "エレベーターの扉 #1",
    obstruction: "混雑遮断",
    clear: "正常",
    contamination: "異物混入警告",
    liftOutage: "故障停止中",
    normal: "正常稼働",
    cctv1DescAlert: "発券のボトルネックにより入場ゲートが塞がれています。",
    cctv1DescOk: "入場ゲートはクリアです。",
    cctv2DescAlert: "非常口ゲートにゴミが堆積し、通路が塞がれています。",
    cctv2DescOk: "非常口ゲートクリア。",
    cctv3DescAlert: "シャトル便の乗車列で客流混雑が発生しています。",
    cctv3DescOk: "シャトル便は順調に運行しています。",
    cctv4DescAlert: "車椅子用エレベーター故障停止中。扉センサー異常。",
    cctv4DescOk: "エレベーター正常動作中。",
    heatmapTitle: "混雑度ヒートマップ（赤外線センサー情報）",
    capacity: "収容能力",
    dispatchTitle: "現場指示および設備マニュアル操作パネル",
    dispatchBtnBin: "ゴミ箱#4に清掃員を派遣",
    dispatchBtnGate6: "音声支援デスクに修理クルーを派遣",
    dispatchBtnGate2: "メイン入場ゲートに警備員を派遣",
    dispatchConsole: "オペレーター指示发令コンソール",
    audioCrew: "音響フロアクルー",
    solarCrew: "太陽光・電気クルー",
    cleaningCrew: "清掃クルー",
    assignedLocation: "派遣対象位置:",
    customNotes: "特記事項 / コメント入力:",
    sendPush: "プッシュ通知を同時送信",
    logDispatchBtn: "ログ保存と指示実行",
    noDispatches: "このセッション中にログされた指示はありません。",
    redirectionRoute: "売店混雑回避ルート",
    redirectionActive: "移動カート配置中",
    redirectionOff: "移動フードカートを派遣",
    audioDesk: "音声支援機器窓口",
    audioPool: "機器在庫：88% 利用可能",
    warningTitle: "閾値アラート:",
    warningDesc: "有機ゴミ箱#4の容量が92%に達しました。清掃指示が必要です。",
    irOfflineBanner: "❌ 赤外線計測オフライン（サイドバーでオンにしてください）",
    activeSensors: "有効な赤外線センサー数: 12/12",
    avgDensity: "平均混雑密度:",
    alertThreshold: "混雑警告しきい値: 80% 収容数",
    securityCrew: "警備員",
    foodTrolleysCrew: "移動フードカート",
    floorStaffCrew: "フロアスタッフ",
    solarDesk: "ソーラー充電ステーション",
    solarPool: "利用可能: 94%"
  },
  zh: {
    title: "Vertex AI Vision: 监控摄像头实时画面流解析 (承载上限 75,000)",
    streamsHeader: "Vertex AI Vision 实时监控视频流 (承载上限 75,000)",
    cctvNodesBadge: "4/4 CCTV 监控节点",
    cctvCore: "监控系统核心",
    cctv1Title: "主入口闸机",
    cctv2Title: "主出口闸机",
    cctv3Title: "接驳车乘车点",
    cctv4Title: "电梯轿厢门 #1",
    obstruction: "人流阻塞",
    clear: "正常通畅",
    contamination: "垃圾混装污染",
    liftOutage: "电梯故障离线",
    normal: "运行正常",
    cctv1DescAlert: "票务系统瓶颈导致主入口通道拥堵。",
    cctv1DescOk: "主入口通行正常。",
    cctv2DescAlert: "杂物堆积阻塞次要紧急疏散闸门。",
    cctv2DescOk: "紧急出口通畅。",
    cctv3DescAlert: "接驳车乘车处检测到客流排队阻塞。",
    cctv3DescOk: "接驳巴士运行正常。",
    cctv4DescAlert: "轮椅无障碍电梯故障离线。轿门传感器失效。",
    cctv4DescOk: "电梯运行正常。",
    heatmapTitle: "区域拥挤度实时热力图 (红外客流传感器数据)",
    capacity: "区域负荷率",
    dispatchTitle: "控制台指令下发与设备手动覆盖",
    dispatchBtnBin: "派遣清洁人员前往4号桶",
    dispatchBtnGate6: "派遣维修人员前往助听设备处",
    dispatchBtnGate2: "派遣安全巡逻队前往主入口",
    dispatchConsole: "控制台指令动态调度终端",
    audioCrew: "音响广播楼层组",
    solarCrew: "太阳能与供电维护组",
    cleaningCrew: "卫生清洁小组",
    assignedLocation: "调度目标地点:",
    customNotes: "调度备注 / 指令说明:",
    sendPush: "同步向场馆发送蓝牙推送",
    logDispatchBtn: "保存记录并执行下发",
    noDispatches: "本会话中尚无手动指令记录。",
    redirectionRoute: "美食街拥堵控制",
    redirectionActive: "餐饮车已部署",
    redirectionOff: "部署移动餐饮车",
    audioDesk: "助听导览设备存取处",
    audioPool: "可用设备余量: 88%",
    warningTitle: "容量阈值警报:",
    warningDesc: "有机厨余垃圾4号桶容量已达92%上限。请派遣清洁人员前往处理。",
    irOfflineBanner: "❌ 红外客流测算传感器已离线 (请在侧边栏开启)",
    activeSensors: "当前处于激活状态的传感器: 12/12",
    avgDensity: "平均场馆客流拥挤度:",
    alertThreshold: "客流拥挤预警阈值: 80% 负荷",
    securityCrew: "安全巡逻队",
    foodTrolleysCrew: "移动餐饮车",
    floorStaffCrew: "场馆现场人员",
    solarDesk: "太阳能充电站",
    solarPool: "可用容量: 94%"
  },
  de: {
    title: "Vertex AI Vision: Live-Stream-Analysatoren (Max. 75.000 Kapazität)",
    streamsHeader: "Vertex AI Vision Videostreams (Max. 75.000 Kapazität)",
    cctvNodesBadge: "4/4 CCTV-Knoten",
    cctvCore: "CCTV-Kern",
    cctv1Title: "Eingangstor",
    cctv2Title: "Hauptausgangstor",
    cctv3Title: "Shuttle-Abholzone",
    cctv4Title: "Aufzugstür #1",
    obstruction: "Engpass",
    clear: "Frei",
    contamination: "Kontamination",
    liftOutage: "Aufzugsstörung",
    normal: "Normal",
    cctv1DescAlert: "Haupteingangstor durch Ticket-Engpässe blockiert.",
    cctv1DescOk: "Eingangsbereich frei.",
    cctv2DescAlert: "Müllbehälter blockieren den sekundären Notausgang.",
    cctv2DescOk: "Notausgang frei.",
    cctv3DescAlert: "Warteschlangen-Stau am Shuttle-Abholpunkt erkannt.",
    cctv3DescOk: "Shuttles fahren normal.",
    cctv4DescAlert: "Rollstuhlaufzug E-4 offline. Türsensorfehler.",
    cctv4DescOk: "Aufzug läuft normal.",
    heatmapTitle: "Live-Stau-Heatmap (Infrarotsensoren)",
    capacity: "Auslastung",
    dispatchTitle: "Operator Team-Einsatz & manuelle Overrides",
    dispatchBtnBin: "Reinigungskraft zu Behälter #4 senden",
    dispatchBtnGate6: "Reparatur zur Audiostation senden",
    dispatchBtnGate2: "Sicherheit zum Haupteingangstor senden",
    dispatchConsole: "Konsole für manuellen Team-Einsatz",
    audioCrew: "Audio-Flourteam",
    solarCrew: "Solar- & Elektrikteam",
    cleaningCrew: "Reinigungsteam",
    assignedLocation: "Zuweisungsort:",
    customNotes: "Optionale Details / Kommentare:",
    sendPush: "Push-Benachrichtigung senden",
    logDispatchBtn: "Protokollieren & Team senden",
    noDispatches: "Keine Einsätze in dieser Sitzung protokolliert.",
    redirectionRoute: "Kiosk-Stauumleitung",
    redirectionActive: "Food-Trolleys entsendet",
    audioDesk: "Audio-Hilfsschalter",
    audioPool: "Pool: 88 % verfügbar",
    warningTitle: "Schwellenwertwarnung:",
    warningDesc: "Biomüllbehälter #4 hat 92 % Kapazitätsgrenze erreicht. Reinigungskraft erforderlich.",
    solarDesk: "Solar-Ladestation",
    solarPool: "Pool: 94 % verfügbar",
    securityCrew: "Sicherheitsdienst",
    foodTrolleysCrew: "Lebensmittel-Trolleys",
    floorStaffCrew: "Bodenpersonal",
    irOfflineBanner: "❌ Infrarot-Telemetrie offline (In der Seitenleiste aktivieren)",
    activeSensors: "Aktive Infrarotsensoren: 12/12",
    avgDensity: "Durchschn. Menschendichte:",
    alertThreshold: "Überlastungs-Warnschwelle: 80 % Kapazität"
  }
};

const sectorTranslations = {
  en: {
    "Main Entrance Gate": "Main Entrance Gate",
    "Main Exit Pathway": "Main Exit Pathway",
    "Solar Charging Station": "Solar Charging Station",
    "Shuttle Pick-up": "Shuttle Pick-up",
    "Audio Headsets": "Audio Headsets",
    "Restrooms": "Restrooms",
    "Info & Help Desk": "Info & Help Desk",
    "Food Kiosk": "Food Kiosk"
  },
  es: {
    "Main Entrance Gate": "Puerta de Entrada Principal",
    "Main Exit Pathway": "Vía de Salida Principal",
    "Solar Charging Station": "Estación de Carga Solar",
    "Shuttle Pick-up": "Zona de Transbordo",
    "Audio Headsets": "Auriculares de Audio",
    "Restrooms": "Baños Universales",
    "Info & Help Desk": "Mesa de Ayuda e Información",
    "Food Kiosk": "Quiosco de Comida"
  },
  ja: {
    "Main Entrance Gate": "メイン入場ゲート",
    "Main Exit Pathway": "メイン退場通路",
    "Solar Charging Station": "ソーラー充電ステーション",
    "Shuttle Pick-up": "シャトル便乗車場所",
    "Audio Headsets": "音声支援機器窓口",
    "Restrooms": "多目的トイレ",
    "Info & Help Desk": "総合案内・ヘルプデスク",
    "Food Kiosk": "フード売店"
  },
  zh: {
    "Main Entrance Gate": "主入口通道闸机",
    "Main Exit Pathway": "主出口散场通道",
    "Solar Charging Station": "太阳能移动充电站",
    "Shuttle Pick-up": "接驳巴士乘车点",
    "Audio Headsets": "助听导览设备处",
    "Restrooms": "无障碍通用盥洗室",
    "Info & Help Desk": "综合咨询服务台",
    "Food Kiosk": "餐饮美食商铺"
  },
  de: {
    "Main Entrance Gate": "Haupteingangstor",
    "Main Exit Pathway": "Hauptausgangsweg",
    "Solar Charging Station": "Solar-Ladestation",
    "Shuttle Pick-up": "Shuttle-Haltestelle",
    "Audio Headsets": "Audio-Kopfhörer",
    "Restrooms": "Barrierefreie Toiletten",
    "Info & Help Desk": "Info- & Hilfsschalter",
    "Food Kiosk": "Lebensmittel-Kiosk"
  }
};

export default function LiveCCTV() {
  const { 
    incidents,
    setIncidents,
    portalRole,
    congestionHeatmap,
    setCongestionHeatmap,
    crewDispatches,
    setCrewDispatches,
    redirectionActive,
    setRedirectionActive,
    setReceivedNotifications,
    bluetoothLive,
    appLanguage,
    infraredActive
  } = useEcoAccess();

  const [customLogText, setCustomLogText] = useState('');
  const [selectedCrews, setSelectedCrews] = useState({
    audio: false,
    solar: false,
    cleaning: false,
    security: false,
    foodTrolleys: false,
    floorStaff: false
  });
  const [assignedLocation, setAssignedLocation] = useState('🟢 Main Entrance Gate');
  const [sendPush, setSendPush] = useState(true);

  const handleCustomLogSubmit = (e) => {
    e.preventDefault();
    
    const crewNames = [];
    if (selectedCrews.audio) crewNames.push('Audio Floor Crew');
    if (selectedCrews.solar) crewNames.push('Solar & Electric Crew');
    if (selectedCrews.cleaning) crewNames.push('Cleaning Crew');
    if (selectedCrews.security) crewNames.push('Security Patrols');
    if (selectedCrews.foodTrolleys) crewNames.push('Food Trolleys');
    if (selectedCrews.floorStaff) crewNames.push('Floor Staff');

    if (crewNames.length === 0 && !customLogText.trim()) {
      alert("Please select at least one crew or type a custom note.");
      return;
    }

    const crewString = crewNames.length > 0 ? crewNames.join(', ') : 'Operator General Action';
    const logMessage = `[DISPATCH] Sent ${crewString} to ${assignedLocation}.${customLogText.trim() ? ` Note: ${customLogText}` : ''}`;

    setCrewDispatches(prev => [
      { time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }), log: logMessage },
      ...prev
    ]);

    if (sendPush) {
      setReceivedNotifications(prev => [
        {
          id: `custom-notif-${Date.now()}`,
          title: `📡 Stadium Dispatch: ${crewString}`,
          text: `Operators dispatched ${crewString} to ${assignedLocation}.${customLogText.trim() ? ` Comment: "${customLogText}"` : ''}`,
          time: 'Just Now',
          type: 'custom'
        },
        ...prev
      ]);
    }

    setCustomLogText('');
    setSelectedCrews({ audio: false, solar: false, cleaning: false, security: false, foodTrolleys: false, floorStaff: false });
  };

  const dispatchCrewToNode = (incId, crewName, customLogMsg) => {
    setIncidents(prev => prev.map(inc => inc.id === incId ? { ...inc, status: 'resolved' } : inc));
    
    const newLog = customLogMsg || `[DISPATCH] Dispatched ${crewName} to resolve incident ${incId}.`;
    setCrewDispatches(prev => [
      { time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }), log: newLog },
      ...prev
    ]);

    if (bluetoothLive) {
      setReceivedNotifications(prev => [
        {
          id: `dispatch-resolve-${incId}-${Date.now()}`,
          title: customLogMsg ? `🎧 Audio Crew Notified` : `🔧 Dispatch Resolved (${crewName})`,
          text: customLogMsg ? `Audio crew notified and dispatched to Audio Headset Station.` : `Support unit ${crewName} deployed to active incident sector. Offline status resolved.`,
          time: 'Just Now',
          type: 'dispatch'
        },
        ...prev
      ]);
    }
  };

  const handleRedirectionToggle = () => {
    setRedirectionActive(prev => {
      const next = !prev;
      if (next && bluetoothLive) {
        setReceivedNotifications(prevNotifs => [
          {
            id: 'notif-redirect',
            title: '🍎 Concession Congestion Alert',
            text: "Access Alert: Food Kiosk sector is heavily congested. Mobile food trolleys have been deployed to decrease concession line wait times.",
            time: 'Just Now',
            type: 'redirect'
          },
          ...prevNotifs
        ]);
      }
      return next;
    });
  };

  const unresolvedEgress = incidents.some(inc => inc.id === 'inc-304' && inc.status === 'unresolved');
  const unresolvedContam = incidents.some(inc => inc.id === 'inc-303' && inc.status === 'unresolved');
  const unresolvedShuttle = incidents.some(inc => inc.id === 'inc-302' && inc.status === 'unresolved');
  const unresolvedElevator = incidents.some(inc => inc.id === 'inc-301' && inc.status === 'unresolved');

  const RenderCCTVFeed = ({ camId, isAlertActive, colorVar }) => {
    return (
      <div className="cctv-viewport" style={{ position: 'relative', width: '96px', height: '64px', background: '#020617', borderRadius: '6px', overflow: 'hidden', flexShrink: 0, border: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ position: 'absolute', top: '4px', left: '4px', display: 'flex', alignItems: 'center', gap: '3px', zIndex: 5, background: 'rgba(0,0,0,0.6)', padding: '1px 4px', borderRadius: '3px' }}>
          <div className="pulse-dot" style={{ backgroundColor: isAlertActive ? `var(--color-accent-${colorVar})` : 'var(--color-accent-emerald)', width: '5px', height: '5px' }}></div>
          <span className="cctv-hud-text" style={{ position: 'static', fontSize: '0.55rem', color: isAlertActive ? `var(--color-accent-${colorVar})` : 'var(--color-accent-emerald)', lineHeight: 1 }}>REC</span>
        </div>
        
        {isAlertActive && <div className="cctv-scanline" style={{ background: `rgba(var(--color-accent-${colorVar}-glow), 0.5)` }}></div>}

        <div className="cctv-target-brackets" style={{ opacity: isAlertActive ? 0.8 : 0.35, top: '24%', left: '20%', width: '60%', height: '52%' }}>
          <div className="cctv-bracket cctv-bracket-topleft" style={{ borderColor: isAlertActive ? `var(--color-accent-${colorVar})` : '#555', width: '10px', height: '10px' }}></div>
          <div className="cctv-bracket cctv-bracket-topright" style={{ borderColor: isAlertActive ? `var(--color-accent-${colorVar})` : '#555', width: '10px', height: '10px' }}></div>
          <div className="cctv-bracket cctv-bracket-bottomleft" style={{ borderColor: isAlertActive ? `var(--color-accent-${colorVar})` : '#555', width: '10px', height: '10px' }}></div>
          <div className="cctv-bracket cctv-bracket-bottomright" style={{ borderColor: isAlertActive ? `var(--color-accent-${colorVar})` : '#555', width: '10px', height: '10px' }}></div>
        </div>

        <div className="cctv-cam-id" style={{ fontSize: '0.42rem', color: 'rgba(255,255,255,0.75)', position: 'absolute', bottom: '3px', right: '3px', fontFamily: 'var(--font-mono)', zIndex: 5, background: 'rgba(0,0,0,0.75)', padding: '1px 3px', borderRadius: '2px' }}>
          {camId}
        </div>
      </div>
    );
  };

  const t = cctvTranslations[appLanguage] || cctvTranslations.en;

  // Calculate live average congestion densities from sensors
  const densities = Object.values(congestionHeatmap);
  const avgCongestionDensity = Math.round(densities.reduce((a, b) => a + b, 0) / densities.length);

  return (
    <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div className="panel-header">
        <h2 className="panel-title">
          <Eye size={18} style={{ color: 'var(--color-accent-cyan)' }} />
          {t.title}
        </h2>
        <span style={{ fontSize: '0.7rem', padding: '0.15rem 0.4rem', borderRadius: '4px', background: 'rgba(6, 182, 212, 0.1)', color: 'var(--color-accent-cyan)', fontWeight: '700', textTransform: 'uppercase' }}>{t.cctvNodesBadge}</span>
      </div>

      {/* SECTION 1: 4 LIVE CCTV CAMERA STREAMS (Max 75,000 Spectator Capacity) */}
      <div>
        <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--color-text-secondary)', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Shield size={12} /> {t.streamsHeader}
        </span>
        <div className="grid-2x2-compact" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.85rem' }}>
          {/* Stream 1 - Entrance Gate */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', background: 'rgba(255, 255, 255, 0.01)', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid var(--border-color)', height: '100%', boxSizing: 'border-box' }}>
            <RenderCCTVFeed camId="CAM_01_ENTRANCE" label="LIVE" isAlertActive={unresolvedEgress} colorVar="red" />
            <div style={{ flexGrow: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#fff', lineHeight: 1.2 }}>{t.cctv1Title}</span>
                <span style={{ fontSize: '0.68rem', color: unresolvedEgress ? 'var(--color-accent-red)' : 'var(--color-accent-emerald)', fontWeight: '700', textTransform: 'uppercase', flexShrink: 0, padding: '0.1rem 0.35rem', borderRadius: '4px', background: unresolvedEgress ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)' }}>
                  {unresolvedEgress ? t.obstruction : t.clear}
                </span>
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)', display: 'block', marginTop: '2px', lineHeight: 1.35 }}>
                {unresolvedEgress ? t.cctv1DescAlert : t.cctv1DescOk}
              </span>
            </div>
          </div>

          {/* Stream 2 - Main Exit Gate */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', background: 'rgba(255, 255, 255, 0.01)', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid var(--border-color)', height: '100%', boxSizing: 'border-box' }}>
            <RenderCCTVFeed camId="CAM_02_EXIT" label="LIVE" isAlertActive={unresolvedContam} colorVar="orange" />
            <div style={{ flexGrow: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#fff', lineHeight: 1.2 }}>{t.cctv2Title}</span>
                <span style={{ fontSize: '0.68rem', color: unresolvedContam ? 'var(--color-accent-orange)' : 'var(--color-accent-emerald)', fontWeight: '700', textTransform: 'uppercase', flexShrink: 0, padding: '0.1rem 0.35rem', borderRadius: '4px', background: unresolvedContam ? 'rgba(249, 115, 22, 0.1)' : 'rgba(16, 185, 129, 0.1)' }}>
                  {unresolvedContam ? t.contamination : t.clear}
                </span>
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)', display: 'block', marginTop: '2px', lineHeight: 1.35 }}>
                {unresolvedContam ? t.cctv2DescAlert : t.cctv2DescOk}
              </span>
            </div>
          </div>

          {/* Stream 3 - Shuttle Pick-up Zone */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', background: 'rgba(255, 255, 255, 0.01)', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid var(--border-color)', height: '100%', boxSizing: 'border-box' }}>
            <RenderCCTVFeed camId="CAM_03_SHUTTLE" label="LIVE" isAlertActive={unresolvedShuttle} colorVar="orange" />
            <div style={{ flexGrow: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#fff', lineHeight: 1.2 }}>{t.cctv3Title}</span>
                <span style={{ fontSize: '0.68rem', color: unresolvedShuttle ? 'var(--color-accent-orange)' : 'var(--color-accent-emerald)', fontWeight: '700', textTransform: 'uppercase', flexShrink: 0, padding: '0.1rem 0.35rem', borderRadius: '4px', background: unresolvedShuttle ? 'rgba(249, 115, 22, 0.1)' : 'rgba(16, 185, 129, 0.1)' }}>
                  {unresolvedShuttle ? t.obstruction : t.clear}
                </span>
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)', display: 'block', marginTop: '2px', lineHeight: 1.35 }}>
                {unresolvedShuttle ? t.cctv3DescAlert : t.cctv3DescOk}
              </span>
            </div>
          </div>

          {/* Stream 4 - Lift Door # 1 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', background: 'rgba(255, 255, 255, 0.01)', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid var(--border-color)', height: '100%', boxSizing: 'border-box' }}>
            <RenderCCTVFeed camId="CAM_04_ELEVATOR" label="LIVE" isAlertActive={unresolvedElevator} colorVar="red" />
            <div style={{ flexGrow: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#fff', lineHeight: 1.2 }}>{t.cctv4Title}</span>
                <span style={{ fontSize: '0.68rem', color: unresolvedElevator ? 'var(--color-accent-red)' : 'var(--color-accent-emerald)', fontWeight: '700', textTransform: 'uppercase', flexShrink: 0, padding: '0.1rem 0.35rem', borderRadius: '4px', background: unresolvedElevator ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)' }}>
                  {unresolvedElevator ? t.liftOutage : t.normal}
                </span>
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)', display: 'block', marginTop: '2px', lineHeight: 1.35 }}>
                {unresolvedElevator ? t.cctv4DescAlert : t.cctv4DescOk}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: CONGESTION HEATMAPS (Respects infraredActive toggle state) */}
      <div className="heatmap-container">
        <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--color-accent-pink)', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Users size={12} /> {t.heatmapTitle}
        </span>

        {infraredActive ? (
          <div>
            {/* Infrared Stats Header Metrics */}
            <div style={{ background: 'rgba(236,72,153,0.04)', border: '1px solid rgba(236,72,153,0.15)', padding: '0.45rem', borderRadius: '6px', marginBottom: '0.75rem', display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ fontSize: '0.65rem', color: '#fff', fontWeight: 'bold' }}>📡 {t.activeSensors}</span>
              <span style={{ fontSize: '0.65rem', color: 'var(--color-text-secondary)' }}>
                🔥 {t.avgDensity} <strong>{avgCongestionDensity}%</strong>
              </span>
              <span style={{ fontSize: '0.6rem', color: 'var(--color-accent-pink)', fontWeight: 'bold' }}>⚠️ {t.alertThreshold}</span>
            </div>

            {/* Density Bars */}
            {Object.entries(congestionHeatmap).map(([sector, density]) => (
              <div key={sector} style={{ marginBottom: '0.4rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: 'var(--color-text-secondary)' }}>
                  <span>{(sectorTranslations[appLanguage] || sectorTranslations.en)[sector] || sector}</span>
                  <span style={{ fontWeight: 'bold', color: density > 75 ? 'var(--color-accent-red)' : density > 40 ? 'var(--color-accent-orange)' : 'var(--color-accent-emerald)' }}>
                    {density}% {t.capacity}
                  </span>
                </div>
                <div className="heatmap-sector-bar">
                  <div 
                    className={`heatmap-sector-fill ${density > 75 ? 'high' : density > 40 ? 'medium' : 'low'}`} 
                    style={{ width: `${density}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ border: '1px dashed rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '6px', textAlign: 'center', background: 'rgba(0,0,0,0.2)' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>{t.irOfflineBanner}</span>
          </div>
        )}
      </div>

      {/* SECTION 3: CREW DISPATCH & ASSET MANAGEMENT */}
      <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', padding: '0.75rem', borderRadius: '8px' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--color-accent-emerald)', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Shield size={12} /> {t.dispatchTitle}
        </span>
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
          <button 
            className="button success" 
            style={{ fontSize: '0.65rem', padding: '0.35rem 0.5rem', flexGrow: 1, minWidth: '80px', border: 'none', cursor: 'pointer' }}
            onClick={() => dispatchCrewToNode('inc-303', '♻️ Cleaners')}
          >
            {t.dispatchBtnBin}
          </button>
          <button 
            className="button success" 
            style={{ fontSize: '0.65rem', padding: '0.35rem 0.5rem', flexGrow: 1, minWidth: '80px', border: 'none', cursor: 'pointer' }}
            onClick={() => dispatchCrewToNode('inc-301', '🎧 Audio Crew', '[DISPATCH] Audio crew notified 🎧.')}
          >
            {t.dispatchBtnGate6}
          </button>
          <button 
            className="button success" 
            style={{ fontSize: '0.65rem', padding: '0.35rem 0.5rem', flexGrow: 1, minWidth: '80px', border: 'none', cursor: 'pointer' }}
            onClick={() => dispatchCrewToNode('inc-304', '👮 Security Patrols')}
          >
            {t.dispatchBtnGate2}
          </button>
        </div>

        {/* Advanced Dynamic Crew Dispatch Console */}
        <form onSubmit={handleCustomLogSubmit} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: '0.6rem', borderRadius: '6px', marginBottom: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.65rem', fontWeight: 'bold', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>{t.dispatchConsole}</span>
          
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.65rem', color: '#fff', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={selectedCrews.audio} 
                onChange={(e) => setSelectedCrews(prev => ({ ...prev, audio: e.target.checked }))}
                style={{ cursor: 'pointer' }}
              />
              {t.audioCrew}
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.65rem', color: '#fff', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={selectedCrews.solar} 
                onChange={(e) => setSelectedCrews(prev => ({ ...prev, solar: e.target.checked }))}
                style={{ cursor: 'pointer' }}
              />
              {t.solarCrew}
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.65rem', color: '#fff', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={selectedCrews.cleaning} 
                onChange={(e) => setSelectedCrews(prev => ({ ...prev, cleaning: e.target.checked }))}
                style={{ cursor: 'pointer' }}
              />
              {t.cleaningCrew}
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.65rem', color: '#fff', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={selectedCrews.security} 
                onChange={(e) => setSelectedCrews(prev => ({ ...prev, security: e.target.checked }))}
                style={{ cursor: 'pointer' }}
              />
              {t.securityCrew}
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.65rem', color: '#fff', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={selectedCrews.foodTrolleys} 
                onChange={(e) => setSelectedCrews(prev => ({ ...prev, foodTrolleys: e.target.checked }))}
                style={{ cursor: 'pointer' }}
              />
              {t.foodTrolleysCrew}
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.65rem', color: '#fff', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={selectedCrews.floorStaff} 
                onChange={(e) => setSelectedCrews(prev => ({ ...prev, floorStaff: e.target.checked }))}
                style={{ cursor: 'pointer' }}
              />
              {t.floorStaffCrew}
            </label>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 120px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ fontSize: '0.55rem', color: 'var(--color-text-muted)' }}>{t.assignedLocation}</span>
              <select 
                value={assignedLocation} 
                onChange={(e) => setAssignedLocation(e.target.value)}
                style={{ width: '100%', fontSize: '0.7rem', padding: '0.25rem', background: '#0b1329', border: '1px solid var(--border-color)', borderRadius: '4px', color: '#fff' }}
              >
                <option value="🟢 Main Entrance Gate">{appLanguage === 'es' ? '🟢 Puerta de Entrada Principal' : appLanguage === 'ja' ? '🟢 メイン入場ゲート' : appLanguage === 'zh' ? '🟢 主入口通道闸机' : appLanguage === 'de' ? '🟢 Haupteingangstor' : '🟢 Main Entrance Gate'}</option>
                <option value="🔴 Main Exit Pathway">{appLanguage === 'es' ? '🔴 Vía de Salida Principal' : appLanguage === 'ja' ? '🔴 メイン退場通路' : appLanguage === 'zh' ? '🔴 主出口散场通道' : appLanguage === 'de' ? '🔴 Hauptausgangsweg' : '🔴 Main Exit Pathway'}</option>
                <option value="☀️ Solar Charging Station">{appLanguage === 'es' ? '☀️ Estación de Carga Solar' : appLanguage === 'ja' ? '☀️ ソーラー充電ステーション' : appLanguage === 'zh' ? '☀️ 太阳能移动充电站' : appLanguage === 'de' ? '☀️ Solar-Ladestation' : '☀️ Solar Charging Station'}</option>
                <option value="🚌 Shuttle Pick-up">{appLanguage === 'es' ? '🚌 Zona de Transbordo' : appLanguage === 'ja' ? '🚌 シャトル便乗車場所' : appLanguage === 'zh' ? '🚌 接驳巴士乘车点' : appLanguage === 'de' ? '🚌 Shuttle-Haltestelle' : '🚌 Shuttle Pick-up'}</option>
                <option value="🎧 Audio Headsets">{appLanguage === 'es' ? '🎧 Auriculares de Audio' : appLanguage === 'ja' ? '🎧 音声アシストデスク' : appLanguage === 'zh' ? '🎧 助听导览设备处' : appLanguage === 'de' ? '🎧 Audio-Kopfhörer' : '🎧 Audio Headsets'}</option>
                <option value="♿ Restrooms">{appLanguage === 'es' ? '♿ Baños Universales' : appLanguage === 'ja' ? '♿ 多目的トイレ' : appLanguage === 'zh' ? '♿ 无障碍通用盥洗室' : appLanguage === 'de' ? '♿ Barrierefreie Toiletten' : '♿ Restrooms'}</option>
                <option value="ℹ️ Info & Help Desk">{appLanguage === 'es' ? 'ℹ️ Mesa de Ayuda e Información' : appLanguage === 'ja' ? 'ℹ️ 総合案内・ヘルプデスク' : appLanguage === 'zh' ? 'ℹ️ 综合咨询服务台' : appLanguage === 'de' ? 'ℹ️ Info- & Hilfsschalter' : 'ℹ️ Info & Help Desk'}</option>
                <option value="🍎 Food Kiosk">{appLanguage === 'es' ? '🍎 Quiosco de Comida' : appLanguage === 'ja' ? '🍎 フード売店' : appLanguage === 'zh' ? '🍎 餐饮美食商铺' : appLanguage === 'de' ? '🍎 Lebensmittel-Kiosk' : '🍎 Food Kiosk'}</option>
              </select>
            </div>
            
            <div style={{ flex: '2 1 200px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ fontSize: '0.55rem', color: 'var(--color-text-muted)' }}>{t.customNotes}</span>
              <input 
                type="text" 
                placeholder={appLanguage === 'es' ? 'Ingrese detalles...' : appLanguage === 'ja' ? '詳細を入力...' : appLanguage === 'zh' ? '输入详细描述...' : appLanguage === 'de' ? 'Details eingeben...' : 'Enter details...'}
                value={customLogText}
                onChange={(e) => setCustomLogText(e.target.value)}
                style={{ width: '100%', fontSize: '0.7rem', padding: '0.25rem 0.5rem', background: '#0b1329', border: '1px solid var(--border-color)', borderRadius: '4px', color: '#fff' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.25rem', borderTop: '1px dashed rgba(255,255,255,0.05)', paddingTop: '0.4rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.65rem', color: 'var(--color-accent-cyan)', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={sendPush} 
                onChange={(e) => setSendPush(e.target.checked)}
                style={{ cursor: 'pointer' }}
              />
              {t.sendPush} {bluetoothLive ? '📡 (Live Broadcast)' : '⚠️ (Mock Offline)'}
            </label>
            
            <button 
              type="submit" 
              className="button primary"
              style={{ fontSize: '0.65rem', padding: '0.25rem 0.75rem', border: 'none', margin: 0 }}
            >
              {t.logDispatchBtn}
            </button>
          </div>
        </form>

        {/* Crew Dispatch Log history */}
        <div style={{ maxHeight: '60px', overflowY: 'auto', background: 'rgba(0,0,0,0.1)', padding: '0.25rem', borderRadius: '4px' }}>
          {crewDispatches.length === 0 ? (
            <span style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', display: 'block', textAlign: 'center' }}>{t.noDispatches}</span>
          ) : (
            crewDispatches.map((dispatch, idx) => (
              <span key={idx} style={{ fontSize: '0.6rem', color: 'var(--color-text-secondary)', display: 'block', fontFamily: 'var(--font-mono)', padding: '2px 0' }}>
                [{dispatch.time}] {dispatch.log}
              </span>
            ))
          )}
        </div>
      </div>

      {/* SECTION 4: INFRASTRUCTURE ALERTS & POOLS */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', padding: '0.5rem', borderRadius: '8px', flex: 1, minWidth: '120px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span style={{ fontSize: '0.65rem', fontWeight: '800', color: 'var(--color-text-secondary)', display: 'block', textTransform: 'uppercase', marginBottom: '0.25rem' }}>{t.audioDesk}</span>
          <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#fff', display: 'block' }}>{t.audioPool}</span>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', padding: '0.5rem', borderRadius: '8px', flex: 1, minWidth: '120px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span style={{ fontSize: '0.65rem', fontWeight: '800', color: 'var(--color-accent-yellow)', display: 'block', textTransform: 'uppercase', marginBottom: '0.25rem' }}>{t.solarDesk}</span>
          <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#fff', display: 'block' }}>{t.solarPool}</span>
        </div>
      </div>

      {/* Smart Infrastructure Alert Banner */}
      {unresolvedContam && (
        <div style={{ background: 'rgba(249, 115, 22, 0.08)', border: '1px solid rgba(249, 115, 22, 0.25)', padding: '0.5rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertTriangle size={14} style={{ color: 'var(--color-accent-orange)' }} />
          <span style={{ fontSize: '0.65rem', color: '#fff', lineHeight: 1.3 }}>
            <strong>{t.warningTitle}</strong> {t.warningDesc}
          </span>
        </div>
      )}

    </div>
  );
}
