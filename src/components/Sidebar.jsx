import React, { useState, useEffect } from 'react';
import { useEcoAccess } from '../context/EcoAccessContext';
import { 
  Activity, 
  LayoutDashboard, 
  Compass, 
  ShieldAlert, 
  Zap, 
  MessageSquare, 
  FileText, 
  Settings, 
  Eye, 
  Type, 
  Volume2, 
  Cpu, 
  Building,
  Wifi,
  Cloud
} from 'lucide-react';

const sidebarTranslations = {
  en: {
    brandSubtitle: "Smart Stadium GIS Portal",
    commandCenter: "Command Center",
    venueGisGuide: "Venue Guide",
    sustainabilityChat: "Sustainability Chat",
    sayBoChat: "Say-Bo Chat",
    knowledgeAssistant: "Knowledge Assistant",
    accessibilityControls: "Accessibility Controls",
    manager: "Manager",
    attendee: "Attendee",
    connectBt: "Connect Stadium BT",
    btLive: "Bluetooth: Live 📡",
    highContrast: "High Contrast",
    largeFont: "Font: Large",
    stdFont: "Font: Standard",
    audioBrief: "Audio Briefing (TTS)",
    stopBrief: "Stop Audio Readout",
    appLanguageDisplay: "App Language Display",
    portalRoleLabel: "Portal Role",
    sustainabilityActions: "Sustainability Actions",
    dietaryChoice: "Dietary Option",
    transportChoice: "Transport Mode",
    wasteChoice: "Waste Management",
    reusableChoice: "Drinkware Choice",
    hygieneChoice: "Hand Hygiene",
    transitStairs: "🚶 Stairs (+1.2kg)",
    transitRamp: "♿ Ramp (+1.0kg)",
    transitElevator: "🛗 Elevator (+0.0kg)",
    dietVegan: "🌱 Vegan Wrap (+2.1kg)",
    dietStandard: "🍔 Burger (+0.0kg)",
    wasteRecycle: "♻️ Recycle (+0.8kg)",
    wasteLandfill: "🗑️ Landfill (+0.0kg)",
    reusableYes: "🥤 Reusable (+1.5kg)",
    reusableNo: "🥛 Cup (+0.0kg)",
    hygieneSanitizer: "🧼 Sanitizer (+0.4kg)",
    hygieneTap: "🚰 Tap (+0.0kg)",
    ratingLevel: "Rating",
    starsLabel: "Stars",
    co2SavedUnit: "kg CO2 saved",
    btStatusConnected: "📡 Live Connection: Bluetooth is live. Syncing push alerts for access, congestion, food, solar hubs, transit, and bin capacities.",
    btStatusDisconnected: "⚠️ Disconnected: Connect to stadium Bluetooth to receive live, local-first push alerts regarding transit, accessibility, and concessions.",
    infraredToggle: "Infrared Sensors",
    irActive: "Infrared: Active 🔥",
    irOffline: "Infrared: Offline ❌",
    btSettingsPanel: "BT Settings & Diagnostics",
    testConnBtn: "Test Connection",
    signalStr: "Signal Strength:",
    batteryLevel: "Battery Level:",
    testing: "Testing Beacons...",
    testSecure: "Connection Secure (0ms latency)",
    btConnectedSpectators: "Connected Spectators:",
    enableHighContrast: "Enable High Contrast",
    disableHighContrast: "Disable High Contrast",
    infraredFeed: "Infrared Feed:",
    spectatorAnalytics: "Spectator Analytics",
    inAttendance: "In Attendance:",
    eventCapacity: "Event Capacity:",
    occupancyRate: "Occupancy Rate:",
    activeStatus: "Active",
    bluetoothBeaconLabel: "BT Beacon:",
    onLabel: "ON",
    offLabel: "OFF",
    excellentLabel: "-58 dBm (Excellent)",
    stackTitle: "EcoAccess Stack",
    stackGemini: "Gemini Translation",
    stackBQ: "BigQuery Carbon ML",
    stackAlloy: "AlloyDB RAG Index",
    stackVertex: "Vertex AI Agent",
    stackCloudRun: "Google Cloud Run"
  },
  es: {
    brandSubtitle: "Portal GIS de Estadio Inteligente",
    commandCenter: "Centro de Control",
    venueGisGuide: "Guía del Recinto",
    sustainabilityChat: "Chat de Sostenibilidad",
    sayBoChat: "Chat de Say-Bo",
    knowledgeAssistant: "Asistente de Conocimiento",
    accessibilityControls: "Controles de Accesibilidad",
    manager: "Administrador",
    attendee: "Asistente",
    connectBt: "Conectar BT Estadio",
    btLive: "Bluetooth: Activo 📡",
    highContrast: "Alto Contraste",
    largeFont: "Fuente: Grande",
    stdFont: "Fuente: Estándar",
    audioBrief: "Lectura de Audio (TTS)",
    stopBrief: "Detener Lectura",
    appLanguageDisplay: "Idioma de la Aplicación",
    portalRoleLabel: "Rol del Portal",
    sustainabilityActions: "Acciones de Sostenibilidad",
    dietaryChoice: "Opción Alimenticia",
    transportChoice: "Modo de Transporte",
    wasteChoice: "Gestión de Residuos",
    reusableChoice: "Tipo de Vaso",
    hygieneChoice: "Higiene de Manos",
    transitStairs: "🚶 Escaleras (+1.2kg)",
    transitRamp: "♿ Rampa (+1.0kg)",
    transitElevator: "🛗 Ascensor (+0.0kg)",
    dietVegan: "🥗 Vegano (+2.1kg)",
    dietStandard: "🍔 Estándar (+0.0kg)",
    wasteRecycle: "♻️ Reciclar (+0.8kg)",
    wasteLandfill: "🗑️ Vertedero (+0.0kg)",
    reusableYes: "🥤 Reutilizable (+1.5kg)",
    reusableNo: "🥛 Vaso Desechable (+0.0kg)",
    hygieneSanitizer: "🧼 Desinfectante (+0.4kg)",
    hygieneTap: "🚰 Grifo (+0.0kg)",
    ratingLevel: "Calificación",
    starsLabel: "Estrellas",
    co2SavedUnit: "kg CO2 ahorrado",
    btStatusConnected: "📡 Conexión activa: El Bluetooth está activo. Sincronizando alertas de accesibilidad, congestión, comida, cargadores y tránsito.",
    btStatusDisconnected: "⚠️ Desconectado: Conéctese al Bluetooth del estadio para recibir alertas de accesibilidad y transporte en tiempo real.",
    infraredToggle: "Sensores Infrarrojos",
    irActive: "Infrarrojo: Activo 🔥",
    irOffline: "Infrarrojo: Offline ❌",
    btSettingsPanel: "Ajustes y Diagnósticos BT",
    testConnBtn: "Probar Conexión",
    signalStr: "Fuerza de Señal:",
    batteryLevel: "Nivel de Batería:",
    testing: "Probando Beacons...",
    testSecure: "Conexión Segura (0ms latencia)",
    btConnectedSpectators: "Espectadores Conectados:",
    enableHighContrast: "Activar Alto Contraste",
    disableHighContrast: "Desactivar Alto Contraste",
    infraredFeed: "Flujo Infrarrojo:",
    spectatorAnalytics: "Análisis de Espectadores",
    inAttendance: "Asistentes Presentes:",
    eventCapacity: "Capacidad del Evento:",
    occupancyRate: "Tasa de Ocupación:",
    activeStatus: "Activo",
    bluetoothBeaconLabel: "Baliza BT:",
    onLabel: "ACTIVADO",
    offLabel: "DESACTIVADO",
    excellentLabel: "-58 dBm (Excelente)",
    stackTitle: "Arquitectura EcoAccess",
    stackGemini: "Traducción Gemini",
    stackBQ: "BigQuery Carbono ML",
    stackAlloy: "Índice RAG AlloyDB",
    stackVertex: "Agente Vertex AI",
    stackCloudRun: "Google Cloud Run"
  },
  ja: {
    brandSubtitle: "スマートスタジアムGISポータル",
    commandCenter: "コマンドセンター",
    venueGisGuide: "会場ガイド",
    sustainabilityChat: "サステナビリティチャット",
    sayBoChat: "Say-Boチャット",
    knowledgeAssistant: "ナレッジアシスタント",
    accessibilityControls: "アクセシビリティ設定",
    manager: "管理者",
    attendee: "来場者",
    connectBt: "スタジアムBT接続",
    btLive: "Bluetooth: アクティブ 📡",
    highContrast: "高コントラスト",
    largeFont: "フォント: 大",
    stdFont: "フォント: 標準",
    audioBrief: "音声読み上げ (TTS)",
    stopBrief: "読み上げ停止",
    appLanguageDisplay: "アプリ表示言語",
    portalRoleLabel: "ポータル役割",
    sustainabilityActions: "持続可能性アクション",
    dietaryChoice: "食事の選択",
    transportChoice: "移動モード",
    wasteChoice: "廃棄物管理",
    reusableChoice: "カップの選択",
    hygieneChoice: "手指衛生",
    transitStairs: "🚶 階段 (+1.2kg)",
    transitRamp: "♿ スロープ (+1.0kg)",
    transitElevator: "🛗 エレベーター (+0.0kg)",
    dietVegan: "🥗 ビーガン (+2.1kg)",
    dietStandard: "🍔 標準 (+0.0kg)",
    wasteRecycle: "♻️ リサイクル (+0.8kg)",
    wasteLandfill: "🗑️ 埋め立て (+0.0kg)",
    reusableYes: "🥤 マイカップ (+1.5kg)",
    reusableNo: "🥛 使い捨てコップ (+0.0kg)",
    hygieneSanitizer: "🧼 消毒液 (+0.4kg)",
    hygieneTap: "🚰 水道 (+0.0kg)",
    ratingLevel: "評価",
    starsLabel: "つ星",
    co2SavedUnit: "kg CO2 削減",
    btStatusConnected: "📡 ライブ接続：Bluetooth接続中。バリアフリー警告や人流制御の更新を同期しています。",
    btStatusDisconnected: "⚠️ 切断：更新情報を受信するためにスタジアムBluetoothに接続してください。",
    infraredToggle: "赤外線センサー",
    irActive: "赤外線：アクティブ 🔥",
    irOffline: "赤外線：オフライン ❌",
    btSettingsPanel: "BT設定と診断",
    testConnBtn: "接続テスト実行",
    signalStr: "信号強度:",
    batteryLevel: "バッテリー残量:",
    testing: "テスト中...",
    testSecure: "接続正常 (遅延 0ms)",
    btConnectedSpectators: "同期済みの観客数:",
    enableHighContrast: "高コントラストを有効化",
    disableHighContrast: "高コントラストを無効化",
    infraredFeed: "赤外線フィード:",
    spectatorAnalytics: "来場者分析リアルタイム看板",
    inAttendance: "現在の入場者数:",
    eventCapacity: "収容可能人数:",
    occupancyRate: "収容率:",
    activeStatus: "アクティブ",
    bluetoothBeaconLabel: "BTビーコン:",
    onLabel: "オン",
    offLabel: "オフ",
    excellentLabel: "-58 dBm (良好)",
    stackTitle: "EcoAccess 技術スタック",
    stackGemini: "Gemini 多言語翻訳エンジン",
    stackBQ: "BigQuery 炭素MLモデル",
    stackAlloy: "AlloyDB RAG インデックス",
    stackVertex: "Vertex AI エージェント",
    stackCloudRun: "Google Cloud Run"
  },
  zh: {
    brandSubtitle: "智慧场馆 GIS 地理信息门户",
    commandCenter: "控制指挥中心",
    venueGisGuide: "场馆指南",
    sustainabilityChat: "可持续发展聊天",
    sayBoChat: "Say-Bo 助手",
    knowledgeAssistant: "知识库配置",
    accessibilityControls: "无障碍控制设置",
    manager: "系统管理员",
    attendee: "活动参与者",
    connectBt: "连接场馆蓝牙",
    btLive: "蓝牙已连接 📡",
    highContrast: "高对比度模式",
    largeFont: "字体: 特大",
    stdFont: "字体: 标准",
    audioBrief: "语音播报 (TTS)",
    stopBrief: "停止播放",
    appLanguageDisplay: "系统显示语言",
    portalRoleLabel: "门户身份",
    sustainabilityActions: "绿色环保行动选项",
    dietaryChoice: "膳食偏好",
    transportChoice: "出行方式",
    wasteChoice: "垃圾分类",
    reusableChoice: "饮水杯选择",
    hygieneChoice: "手部卫生",
    transitStairs: "🚶 步行楼梯 (+1.2kg)",
    transitRamp: "♿ 无障碍坡道 (+1.0kg)",
    transitElevator: "🛗 电梯 (+0.0kg)",
    dietVegan: "🥗 素食 (+2.1kg)",
    dietStandard: "🍔 标准荤食 (+0.0kg)",
    wasteRecycle: "♻️ 资源回收 (+0.8kg)",
    wasteLandfill: "🗑️ 填埋垃圾 (+0.0kg)",
    reusableYes: "🥤 环保自带杯 (+1.5kg)",
    reusableNo: "🥛 一次性纸杯 (+0.0kg)",
    hygieneSanitizer: "🧼 免洗消毒凝胶 (+0.4kg)",
    hygieneTap: "🚰 盥洗室自来水 (+0.0kg)",
    ratingLevel: "贡献评级",
    starsLabel: "星",
    co2SavedUnit: "kg CO2 减排",
    btStatusConnected: "📡 蓝牙已激活：连接正常。正在实时同步无障碍警报、人流导引及公用设施动态。",
    btStatusDisconnected: "⚠️ 蓝牙已断开：请连接场馆蓝牙以接收实时无障碍及场馆警报。",
    infraredToggle: "红外温度客流传感器",
    irActive: "红外客流测算: 开启 🔥",
    irOffline: "红外客流测算: 关闭 ❌",
    btSettingsPanel: "蓝牙连接诊断与设备设置",
    testConnBtn: "连接诊断测试",
    signalStr: "信号发射功率:",
    batteryLevel: "信标电池电量:",
    testing: "连接信号强度测试中...",
    testSecure: "硬件连接正常 (延迟 0ms)",
    btConnectedSpectators: "蓝牙已连接观众数:",
    enableHighContrast: "开启高对比度模式",
    disableHighContrast: "关闭高对比度模式",
    infraredFeed: "红外热感视频流:",
    spectatorAnalytics: "观众客流数据分析",
    inAttendance: "当前在场人数:",
    eventCapacity: "场馆核定容量:",
    occupancyRate: "上座率/占用率:",
    activeStatus: "正常运行中",
    bluetoothBeaconLabel: "BT蓝牙信标:",
    onLabel: "开启",
    offLabel: "关闭",
    excellentLabel: "-58 dBm (信号极佳)",
    stackTitle: "EcoAccess 技术架构",
    stackGemini: "Gemini 智能多语言翻译",
    stackBQ: "BigQuery 碳足迹机器学习",
    stackAlloy: "AlloyDB RAG 向量索引",
    stackVertex: "Vertex AI 智能体",
    stackCloudRun: "Google Cloud Run 服务"
  },
  de: {
    brandSubtitle: "Smart Stadium GIS Portal",
    commandCenter: "Kontrollzentrum",
    venueGisGuide: "Veranstaltungsleitfaden",
    sustainabilityChat: "Nachhaltigkeits-Chat",
    sayBoChat: "Say-Bo-Assistent",
    knowledgeAssistant: "Wissensassistent",
    accessibilityControls: "Barrierefreiheit",
    manager: "Manager",
    attendee: "Besucher",
    connectBt: "Stadion-BT verbinden",
    btLive: "Bluetooth: Aktiv 📡",
    highContrast: "Hoher Kontrast",
    largeFont: "Schrift: Groß",
    stdFont: "Schrift: Standard",
    audioBrief: "Sprachausgabe (TTS)",
    stopBrief: "Ausgabe stoppen",
    appLanguageDisplay: "App-Sprachanzeige",
    portalRoleLabel: "Portalrolle",
    sustainabilityActions: "Nachhaltigkeitsaktionen",
    dietaryChoice: "Ernährungsauswahl",
    transportChoice: "Transportmodus",
    wasteChoice: "Müllentsorgung",
    reusableChoice: "Trinkbehälter",
    hygieneChoice: "Handhygiene",
    transitStairs: "🚶 Treppe (+1.2kg)",
    transitRamp: "♿ Rampe (+1.0kg)",
    transitElevator: "🛗 Aufzug (+0.0kg)",
    dietVegan: "🥗 Vegan (+2.1kg)",
    dietStandard: "🍔 Standard (+0.0kg)",
    wasteRecycle: "♻️ Recycling (+0.8kg)",
    wasteLandfill: "🗑️ Deponie (+0.0kg)",
    reusableYes: "🥤 Mehrwegbecher (+1.5kg)",
    reusableNo: "🥛 Einwegbecher (+0.0kg)",
    hygieneSanitizer: "🧼 Desinfektion (+0.4kg)",
    hygieneTap: "🚰 Wasserhahn (+0.0kg)",
    ratingLevel: "Bewertung",
    starsLabel: "Sterne",
    co2SavedUnit: "kg CO2 eingespart",
    btStatusConnected: "📡 Live-Verbindung: Bluetooth aktiv. ADA-Warnmeldungen & Besucherrouten-Updates werden empfangen.",
    btStatusDisconnected: "⚠️ Verbindung getrennt: Bitte mit dem Stadion-Bluetooth verbinden, um ADA-Updates zu erhalten.",
    infraredToggle: "Infrarotsensoren",
    irActive: "Infrarot: Aktiv 🔥",
    irOffline: "Infrarot: Offline ❌",
    btSettingsPanel: "BT-Einstellungen & Diagnose",
    testConnBtn: "Verbindung testen",
    signalStr: "Signalstärke:",
    batteryLevel: "Batterieladung:",
    testing: "Verbindungstest...",
    testSecure: "Verbindung sicher (0ms Latenz)",
    btConnectedSpectators: "Verbundene Zuschauer:",
    enableHighContrast: "Hohen Kontrast aktivieren",
    disableHighContrast: "Hohen Kontrast deaktivieren",
    infraredFeed: "Infrarot-Feed:",
    spectatorAnalytics: "Zuschauer-Analytik",
    inAttendance: "Anwesende Personen:",
    eventCapacity: "Stadionkapazität:",
    occupancyRate: "Auslastungsrate:",
    activeStatus: "Aktiv",
    bluetoothBeaconLabel: "BT-Beacon:",
    onLabel: "EIN",
    offLabel: "AUS",
    excellentLabel: "-58 dBm (Ausgezeichnet)",
    stackTitle: "EcoAccess Architektur",
    stackGemini: "Gemini Übersetzung",
    stackBQ: "BigQuery Carbon ML",
    stackAlloy: "AlloyDB RAG Index",
    stackVertex: "Vertex AI Agent",
    stackCloudRun: "Google Cloud Run"
  }
};

export default function Sidebar() {
  const {
    activeTab,
    setActiveTab,
    highContrast,
    setHighContrast,
    fontSizeClass,
    setFontSizeClass,
    isSpeaking,
    handleTextToSpeech,
    portalRole,
    setPortalRole,
    bluetoothLive,
    setBluetoothLive,
    setReceivedNotifications,
    userChoices,
    triggerAttendeeChoice,
    metrics,
    appLanguage,
    setAppLanguage,
    infraredActive,
    setInfraredActive,
    spectatorCount,
    currentSpectators,
    sidebarCollapsed,
    setSidebarCollapsed
  } = useEcoAccess();

  const [btTestState, setBtTestState] = useState('');

  const welcomeDict = {
    en: {
      title: 'Welcome & General Engagement',
      text: "Welcome to APAC Stadium! Connect to stadium beacons for local-first updates.",
      time: 'Just Now'
    },
    es: {
      title: 'Bienvenida y Participación General',
      text: "¡Bienvenido al APAC Stadium! Conéctese a los faros del estadio para recibir actualizaciones locales.",
      time: 'Ahora'
    },
    ja: {
      title: 'ウェルカム＆一般案内',
      text: "APACスタジアムへようこそ！スタジアムビーコンに接続して、地域限定の最新情報をリアルタイム受信できます。",
      time: 'たった今'
    },
    zh: {
      title: '欢迎与综合服务指引',
      text: "欢迎来到 APAC 板球体育场！连接场馆无线信标即可接收实时本地化无障碍与赛事通知。",
      time: '刚刚'
    },
    de: {
      title: 'Willkommen & Allgemeine Einbindung',
      text: "Willkommen im APAC-Stadion! Verbinden Sie sich mit Stadion-Beacons für lokale Updates.",
      time: 'Gerade eben'
    }
  };

  useEffect(() => {
    if (bluetoothLive) {
      const currentWelcome = welcomeDict[appLanguage] || welcomeDict.en;
      setReceivedNotifications(prev => {
        if (!prev.some(n => n.id === 'notif-welcome')) return prev;
        return prev.map(n => n.id === 'notif-welcome' ? { ...n, title: currentWelcome.title, text: currentWelcome.text, time: currentWelcome.time } : n);
      });
    }
  }, [appLanguage, bluetoothLive]);

  const handleBluetoothToggle = () => {
    setBluetoothLive(prev => {
      const next = !prev;
      if (next) {
        const currentWelcome = welcomeDict[appLanguage] || welcomeDict.en;
        setReceivedNotifications([
          {
            id: 'notif-welcome',
            title: currentWelcome.title,
            text: currentWelcome.text,
            time: currentWelcome.time,
            type: 'general'
          }
        ]);
      } else {
        setReceivedNotifications([]);
      }
      return next;
    });
  };

  const handleTestConnection = () => {
    setBtTestState(t.testing);
    setTimeout(() => {
      setBtTestState(t.testSecure);
    }, 800);
  };

  const t = sidebarTranslations[appLanguage] || sidebarTranslations.en;

  return (
    <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-brand">
        <Activity size={24} style={{ color: 'var(--color-accent-emerald)' }} />
        <div>
          <h1 className="brand-title">EcoAccess.ai</h1>
          <p className="brand-subtitle">{t.brandSubtitle}</p>
        </div>
      </div>

      {/* PORTAL SWITCHER */}
      <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <span style={{ fontSize: '0.65rem', fontWeight: 'bold', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
          {t.portalRoleLabel}
        </span>
        <div style={{ display: 'flex', gap: '4px' }}>
          <button 
            className={`button ${portalRole === 'attendee' ? 'primary' : 'secondary'}`} 
            style={{ flex: 1, padding: '0.35rem', fontSize: '0.7rem', border: 'none', minWidth: '0' }}
            onClick={() => setPortalRole('attendee')}
          >
            {t.attendee}
          </button>
          <button 
            className={`button ${portalRole === 'manager' ? 'primary' : 'secondary'}`} 
            style={{ flex: 1, padding: '0.35rem', fontSize: '0.7rem', border: 'none', minWidth: '0' }}
            onClick={() => setPortalRole('manager')}
          >
            {t.manager}
          </button>
        </div>
      </div>

      <nav className="nav-group">
        <button 
          className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <LayoutDashboard className="nav-icon" size={18} />
          {portalRole === 'attendee' ? t.venueGisGuide : t.commandCenter}
        </button>
        
        <button 
          className={`nav-item ${activeTab === 'citizen' ? 'active' : ''}`}
          onClick={() => setActiveTab('citizen')}
        >
          <MessageSquare className="nav-icon" size={18} />
          {portalRole === 'attendee' ? t.sayBoChat : t.sustainabilityChat}
        </button>

        {portalRole === 'manager' && (
          <button 
            className="nav-item"
            onClick={() => {
              setActiveTab('dashboard');
              setTimeout(() => {
                const el = document.getElementById('knowledge-assistant-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
          >
            <Settings className="nav-icon" size={18} />
            {t.knowledgeAssistant || 'Knowledge Assistant'}
          </button>
        )}
      </nav>

      {/* BLUETOOTH STADIUM BROADCAST PUSH BUTTON */}
      <div style={{ padding: '0 0.25rem', marginTop: '1rem' }}>
        <button
          className={`button ${bluetoothLive ? 'primary bluetooth-pulse-active' : 'secondary'}`}
          style={{ width: '100%', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', padding: '0.5rem 0.25rem', borderColor: bluetoothLive ? 'var(--color-accent-cyan)' : 'var(--border-color)', margin: 0 }}
          onClick={handleBluetoothToggle}
          title="Connect to stadium-wide Bluetooth push notifications"
        >
          <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: bluetoothLive ? '#00e5ff' : '#555' }}></span>
          {bluetoothLive ? t.btLive : t.connectBt}
        </button>

        {/* Bluetooth Contextual Description */}
        <div style={{ marginTop: '0.4rem', padding: '0.45rem', borderRadius: '6px', background: bluetoothLive ? 'rgba(6, 182, 212, 0.05)' : 'rgba(255,255,255,0.01)', border: bluetoothLive ? '1px solid rgba(6, 182, 212, 0.15)' : '1px dashed var(--border-color)', fontSize: '0.65rem', color: 'var(--color-text-secondary)', lineHeight: 1.3 }}>
          {bluetoothLive ? t.btStatusConnected : t.btStatusDisconnected}
        </div>

        {/* MANAGER EXTRA DIAGNOSTIC AND SETTINGS CONTROL PANEL */}
        {portalRole === 'manager' && (
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', padding: '0.5rem', borderRadius: '6px', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.6rem', fontWeight: 'bold', color: 'var(--color-accent-cyan)', textTransform: 'uppercase' }}>📡 {t.btSettingsPanel}</span>
            
            {/* Toggle switch for BT */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.65rem', color: '#fff' }}>{t.bluetoothBeaconLabel || 'Bluetooth Beacon:'}</span>
              <button 
                className={`button ${bluetoothLive ? 'success' : 'secondary'}`} 
                style={{ fontSize: '0.6rem', padding: '0.15rem 0.4rem', border: 'none', margin: 0 }}
                onClick={handleBluetoothToggle}
              >
                {bluetoothLive ? (t.onLabel || 'ON') : (t.offLabel || 'OFF')}
              </button>
            </div>

            {/* Signal Strength Progress Bar */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6rem', color: 'var(--color-text-secondary)', marginBottom: '2px' }}>
                <span>{t.signalStr}</span>
                <span style={{ color: bluetoothLive ? 'var(--color-accent-emerald)' : '#555', fontWeight: 'bold' }}>{bluetoothLive ? (t.excellentLabel || '-58 dBm (Excellent)') : 'N/A'}</span>
              </div>
              <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: bluetoothLive ? '85%' : '0%', background: 'var(--color-accent-emerald)', transition: 'width 0.3s ease' }} />
              </div>
            </div>

            {/* Battery percentage */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6rem', color: 'var(--color-text-secondary)' }}>
              <span>{t.batteryLevel}</span>
              <span style={{ fontWeight: 'bold', color: '#fff' }}>92%</span>
            </div>

            {/* Connected Spectators */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6rem', color: 'var(--color-text-secondary)', borderTop: '1px dashed rgba(255,255,255,0.05)', paddingTop: '4px', marginTop: '2px' }}>
              <span>{t.btConnectedSpectators}</span>
              <span style={{ fontWeight: 'bold', color: bluetoothLive ? 'var(--color-accent-cyan)' : 'var(--color-text-muted)' }}>
                {bluetoothLive ? Math.round(spectatorCount * 0.248).toLocaleString(appLanguage === 'es' ? 'es-ES' : appLanguage === 'de' ? 'de-DE' : appLanguage === 'ja' ? 'ja-JP' : appLanguage === 'zh' ? 'zh-CN' : 'en-US') : 0} ({bluetoothLive ? '24.8%' : '0%'})
              </span>
            </div>

            {/* Test Connection Button */}
            <button 
              className="button secondary" 
              style={{ width: '100%', fontSize: '0.6rem', padding: '0.2rem', border: '1px solid rgba(255,255,255,0.1)', margin: 0, marginTop: '2px' }}
              onClick={handleTestConnection}
            >
              ⚡ {t.testConnBtn}
            </button>
            {btTestState && (
              <span style={{ fontSize: '0.55rem', color: 'var(--color-accent-cyan)', textAlign: 'center', display: 'block', fontStyle: 'italic' }}>{btTestState}</span>
            )}
          </div>
        )}

        {/* INFRARED HEATMAP SENSORS TOGGLE CARD */}
        {portalRole === 'manager' && (
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', padding: '0.5rem', borderRadius: '6px', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.6rem', fontWeight: 'bold', color: 'var(--color-accent-pink)', textTransform: 'uppercase' }}>🔥 {t.infraredToggle}</span>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.65rem', color: '#fff' }}>{t.infraredFeed || 'Infrared Feed:'}</span>
              <button 
                className={`button ${infraredActive ? 'success' : 'secondary'}`} 
                style={{ fontSize: '0.6rem', padding: '0.15rem 0.4rem', border: 'none', margin: 0 }}
                onClick={() => setInfraredActive(prev => !prev)}
              >
                {infraredActive ? (t.onLabel || 'ON') : (t.offLabel || 'OFF')}
              </button>
            </div>
            <span style={{ fontSize: '0.55rem', color: 'var(--color-text-secondary)', display: 'block', fontStyle: 'italic', textAlign: 'center' }}>
              {infraredActive ? t.irActive : t.irOffline}
            </span>
          </div>
        )}

        {/* REAL-TIME SPECTATOR ANALYTICS PANEL */}
        {portalRole === 'manager' && (
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', padding: '0.5rem', borderRadius: '6px', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.6rem', fontWeight: 'bold', color: 'var(--color-accent-cyan)', textTransform: 'uppercase' }}>📊 {t.spectatorAnalytics || 'Spectator Analytics'}</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: 'var(--color-text-secondary)' }}>
                <span>{t.inAttendance || 'In Attendance:'}</span>
                <span style={{ fontWeight: 'bold', color: '#fff' }}>{currentSpectators.toLocaleString(appLanguage === 'es' ? 'es-ES' : appLanguage === 'de' ? 'de-DE' : appLanguage === 'ja' ? 'ja-JP' : appLanguage === 'zh' ? 'zh-CN' : 'en-US')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: 'var(--color-text-secondary)' }}>
                <span>{t.eventCapacity || 'Event Capacity:'}</span>
                <span style={{ fontWeight: 'bold', color: '#fff' }}>{spectatorCount.toLocaleString(appLanguage === 'es' ? 'es-ES' : appLanguage === 'de' ? 'de-DE' : appLanguage === 'ja' ? 'ja-JP' : appLanguage === 'zh' ? 'zh-CN' : 'en-US')}</span>
              </div>
              {/* Progress bar */}
              <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden', marginTop: '4px' }}>
                <div style={{ height: '100%', width: `${(currentSpectators / spectatorCount) * 100}%`, background: 'var(--color-accent-cyan)', transition: 'width 0.5s ease' }} />
              </div>
              <span style={{ fontSize: '0.55rem', color: 'var(--color-accent-cyan)', display: 'block', fontStyle: 'italic', marginTop: '2px', textAlign: 'center' }}>
                {t.occupancyRate || 'Occupancy Rate:'} {((currentSpectators / spectatorCount) * 100).toFixed(1)}% {t.activeStatus || 'Active'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* REAL-TIME SUSTAINABILITY ACTIONS (Attendee Mode only) */}
      {portalRole === 'attendee' && (
        <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          
          {/* Gamified Star Impact Tracker (Vertically stacked layout) */}
          <div className="eco-impact-badge" style={{ animation: 'fadeIn 0.5s', padding: '0.6rem', background: 'rgba(16, 185, 129, 0.06)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '8px', maxWidth: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem' }}>
            <div className="star-emoji-container" style={{ fontSize: '1.2rem', textAlign: 'center', letterSpacing: '2px' }}>
              {"⭐".repeat(metrics.attendeeEcoStars)}
              {"☆".repeat(5 - metrics.attendeeEcoStars)}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#fff', textAlign: 'center', fontWeight: '800' }}>
              {t.ratingLevel}: {metrics.attendeeEcoStars}/5 {t.starsLabel || 'Stars'}
            </div>
            <div style={{ fontSize: '0.65rem', color: 'var(--color-accent-emerald)', textAlign: 'center', fontWeight: '700' }}>
              (-{metrics.co2SavedPerPerson.toFixed(1)} {t.co2SavedUnit || 'kg CO2 saved'})
            </div>
            <span style={{ fontSize: '0.65rem', color: 'var(--color-text-secondary)', display: 'block', marginTop: '2px', textAlign: 'center', fontStyle: 'italic', lineHeight: 1.2, wordBreak: 'break-word', whiteSpace: 'normal', overflowWrap: 'break-word' }}>
              "{metrics.starMsg}"
            </span>
          </div>

          {/* Scrollable choices board */}
          <div className="sustainability-choice-board" style={{ padding: '0.6rem 0.5rem', maxHeight: '220px', overflowY: 'auto', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', background: 'rgba(255,255,255,0.01)' }}>
            <span style={{ fontSize: '0.65rem', fontWeight: '800', color: 'var(--color-accent-emerald)', display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {t.sustainabilityActions}
            </span>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {/* Dietary Option */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ fontSize: '0.6rem', color: 'var(--color-text-secondary)' }}>{t.dietaryChoice}:</span>
                <div style={{ display: 'flex', gap: '2px' }}>
                  <button 
                    className={`choice-button ${userChoices.dietary === 'vegan' ? 'selected' : ''}`} 
                    style={{ flex: 1, padding: '0.25rem', fontSize: '0.58rem' }} 
                    onClick={() => triggerAttendeeChoice('dietary', 'vegan')}
                  >
                    {t.dietVegan}
                  </button>
                  <button 
                    className={`choice-button ${userChoices.dietary === 'standard' ? 'selected' : ''}`} 
                    style={{ flex: 1, padding: '0.25rem', fontSize: '0.58rem' }} 
                    onClick={() => triggerAttendeeChoice('dietary', 'standard')}
                  >
                    {t.dietStandard}
                  </button>
                </div>
              </div>

              {/* Transport Mode Option */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ fontSize: '0.6rem', color: 'var(--color-text-secondary)' }}>{t.transportChoice}:</span>
                <div style={{ display: 'flex', gap: '2px' }}>
                  <button 
                    className={`choice-button ${userChoices.transport === 'stairs' ? 'selected' : ''}`} 
                    style={{ flex: 1, padding: '0.25rem', fontSize: '0.55rem' }} 
                    onClick={() => triggerAttendeeChoice('transport', 'stairs')}
                  >
                    {t.transitStairs}
                  </button>
                  <button 
                    className={`choice-button ${userChoices.transport === 'ramp' ? 'selected' : ''}`} 
                    style={{ flex: 1, padding: '0.25rem', fontSize: '0.55rem' }} 
                    onClick={() => triggerAttendeeChoice('transport', 'ramp')}
                  >
                    {t.transitRamp}
                  </button>
                  <button 
                    className={`choice-button ${userChoices.transport === 'elevator' ? 'selected' : ''}`} 
                    style={{ flex: 1, padding: '0.25rem', fontSize: '0.55rem' }} 
                    onClick={() => triggerAttendeeChoice('transport', 'elevator')}
                  >
                    {t.transitElevator}
                  </button>
                </div>
              </div>

              {/* Waste Management Option */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ fontSize: '0.6rem', color: 'var(--color-text-secondary)' }}>{t.wasteChoice}:</span>
                <div style={{ display: 'flex', gap: '2px' }}>
                  <button 
                    className={`choice-button ${userChoices.waste === 'recycle' ? 'selected' : ''}`} 
                    style={{ flex: 1, padding: '0.25rem', fontSize: '0.58rem' }} 
                    onClick={() => triggerAttendeeChoice('waste', 'recycle')}
                  >
                    {t.wasteRecycle}
                  </button>
                  <button 
                    className={`choice-button ${userChoices.waste === 'landfill' ? 'selected' : ''}`} 
                    style={{ flex: 1, padding: '0.25rem', fontSize: '0.58rem' }} 
                    onClick={() => triggerAttendeeChoice('waste', 'landfill')}
                  >
                    {t.wasteLandfill}
                  </button>
                </div>
              </div>

              {/* Drinkware Option */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ fontSize: '0.6rem', color: 'var(--color-text-secondary)' }}>{t.reusableChoice}:</span>
                <div style={{ display: 'flex', gap: '2px' }}>
                  <button 
                    className={`choice-button ${userChoices.reusable === 'yes' ? 'selected' : ''}`} 
                    style={{ flex: 1, padding: '0.25rem', fontSize: '0.58rem' }} 
                    onClick={() => triggerAttendeeChoice('reusable', 'yes')}
                  >
                    {t.reusableYes}
                  </button>
                  <button 
                    className={`choice-button ${userChoices.reusable === 'no' ? 'selected' : ''}`} 
                    style={{ flex: 1, padding: '0.25rem', fontSize: '0.58rem' }} 
                    onClick={() => triggerAttendeeChoice('reusable', 'no')}
                  >
                    {t.reusableNo}
                  </button>
                </div>
              </div>

              {/* Hand Hygiene Option */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ fontSize: '0.6rem', color: 'var(--color-text-secondary)' }}>{t.hygieneChoice}:</span>
                <div style={{ display: 'flex', gap: '2px' }}>
                  <button 
                    className={`choice-button ${userChoices.sanitizer === 'yes' ? 'selected' : ''}`} 
                    style={{ flex: 1, padding: '0.25rem', fontSize: '0.58rem' }} 
                    onClick={() => triggerAttendeeChoice('sanitizer', 'yes')}
                  >
                    {t.hygieneSanitizer}
                  </button>
                  <button 
                    className={`choice-button ${userChoices.sanitizer === 'no' ? 'selected' : ''}`} 
                    style={{ flex: 1, padding: '0.25rem', fontSize: '0.58rem' }} 
                    onClick={() => triggerAttendeeChoice('sanitizer', 'no')}
                  >
                    {t.hygieneTap}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ACCESSIBILITY TOGGLE PANEL */}
      <div style={{marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingBottom: '1rem'}}>
        <span style={{fontSize: '0.7rem', fontWeight: '700', color: 'var(--color-text-secondary)', textTransform: 'uppercase'}}>
          {t.accessibilityControls}
        </span>
        
        <button 
          className="button secondary" 
          style={{fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'flex-start'}}
          onClick={() => setHighContrast(prev => !prev)}
          title="Toggle high-contrast display for visually impaired stakeholders"
        >
          <Eye size={14} />
          {highContrast ? (t.disableHighContrast || 'Disable High Contrast') : (t.enableHighContrast || 'Enable High Contrast')}
        </button>

        <button 
          className="button secondary" 
          style={{fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'flex-start'}}
          onClick={() => setFontSizeClass(prev => prev === 'font-normal' ? 'font-large' : 'font-normal')}
          title="Enlarge typography font size"
        >
          <Type size={14} />
          {fontSizeClass === 'font-large' ? t.stdFont : t.largeFont}
        </button>

        {portalRole === 'manager' && (
          <button 
            className={`button ${isSpeaking ? 'danger' : 'secondary'}`} 
            style={{fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'flex-start'}}
            onClick={handleTextToSpeech}
            title="Listen to an audio readout of current dashboard metrics"
          >
            <Volume2 size={14} />
            {isSpeaking ? t.stopBrief : t.audioBrief}
          </button>
        )}

        {/* Global Language Translator Dropdown inside Accessibility Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '0.25rem' }}>
          <span style={{ fontSize: '0.6rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 'bold' }}>
            {t.appLanguageDisplay}
          </span>
          <select 
            value={appLanguage} 
            onChange={(e) => setAppLanguage(e.target.value)}
            style={{ width: '100%', fontSize: '0.75rem', padding: '0.35rem 0.5rem', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-color)', borderRadius: '4px', color: '#fff', cursor: 'pointer' }}
          >
            <option value="en">🇺🇸 English</option>
            <option value="es">🇪🇸 Spanish (Español)</option>
            <option value="ja">🇯🇵 Japanese (日本語)</option>
            <option value="zh">🇨🇳 Chinese (中文)</option>
            <option value="de">🇩🇪 German (Deutsch)</option>
          </select>
        </div>
      </div>

      {portalRole === 'manager' && (
        <div className="sidebar-footer">
          <div className="architecture-badge">
            <span className="architecture-badge-title">{t.stackTitle}</span>
            <span className="architecture-badge-item">
              <Cpu size={10} style={{color: 'var(--color-accent-emerald)'}} /> {t.stackGemini}
            </span>
            <span className="architecture-badge-item">
              <Activity size={10} style={{color: 'var(--color-accent-cyan)'}} /> {t.stackBQ}
            </span>
            <span className="architecture-badge-item">
              <Building size={10} style={{color: 'var(--color-accent-indigo)'}} /> {t.stackAlloy}
            </span>
            <span className="architecture-badge-item">
              <Activity size={10} style={{color: 'var(--color-accent-pink)'}} /> {t.stackVertex}
            </span>
            <span className="architecture-badge-item">
              <Cloud size={10} style={{color: 'var(--color-accent-orange)'}} /> {t.stackCloudRun}
            </span>
          </div>
        </div>
      )}
    </aside>
  );
}
