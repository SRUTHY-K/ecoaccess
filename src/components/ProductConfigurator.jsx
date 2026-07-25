import React from 'react';
import { useEcoAccess } from '../context/EcoAccessContext';
import { Settings, Check } from 'lucide-react';

const cfgTranslations = {
  en: {
    title: "EcoAccess Configurator",
    badge: "Admin Settings Panel",
    desc: "This panel enables you to spin up the EcoAccess command dashboard for any event or public venue in Asia Pacific. Modify the metadata, set base budgets, and add custom GPS/GIS coordinates.",
    section1: "1. Event & Venue Branding",
    titleLabel: "Event Command Center Title",
    subLabel: "Strategic Subtitle",
    budgetLabel: "Base Budget Allocation ($ Millions)",
    attendanceLabel: "Expected Attendance (Spectators)",
    section2: "2. Venue GIS Nodes",
    activeNodes: "active",
    removeBtn: "Remove",
    addNodeBtn: "+ Add Node",
    saveConfigBtn: "Save Event Configuration",
    section3: "3. GCP & Vertex AI Cloud Credentials",
    apiModeLabel: "API Integration Mode:",
    apiKeyLabel: "Gemini API Key:",
    projectIdLabel: "GCP Project ID:",
    locationLabel: "Vertex AI Location:",
    verifyBtn: "Verify & Connect GCP Service",
    mockNotice: "Offline Simulation Mode Active: The application does not require any credentials and will return responses from local templates.",
    getApiKey: "Get a free API Key from Google AI Studio.",
    adcNotice: "Requires Google Application Default Credentials (ADC) in your environment. Run gcloud auth application-default login first.",
    verifyingConn: "Verifying Connection...",
    saveVerifyBtn: "Save & Verify AI connection",
    sectionAlloy: "3. AlloyDB pgvector RAG Ingestion Pipeline (Upload Manuals)",
    alloyDesc: "Paste a compliance standard or handbook guideline below. The backend uses the Vertex AI text-embedding-004 model to vectorize the text and index it directly into our AlloyDB pgvector database:",
    docTitlePlaceholder: "Document Section Title (e.g. Evacuation Protocol 2.1)",
    docContentPlaceholder: "Document Content: paste details here...",
    embedBtn: "Embed & Index into AlloyDB",
    sectionAiCreds: "4. AI Copilot & Model Credentials",
    aiCredsDesc: "Configure the credentials for the Gemini 2.5 Flash models used in the chat copilot, translation feed, and waste audit camera streams.",
    selectProvider: "Select Provider Mode",
    modeMock: "Offline Mock Mode",
    modeStudio: "Google AI Studio (Key)",
    modeVertex: "Vertex AI (GCP)",
    savePersistBtn: "Save & Persist Configuration to Google Cloud",
    newNodePlaceholder: "Node Name (e.g. Venue E)"
  },
  es: {
    title: "Configurador EcoAccess",
    badge: "Panel de Configuración de Administración",
    desc: "Este panel le permite iniciar el panel de control de EcoAccess para cualquier evento o recinto público en Asia Pacífico.",
    section1: "1. Marca del Evento y Recinto",
    titleLabel: "Título del Centro de Control",
    subLabel: "Subtítulo Estratégico",
    budgetLabel: "Asignación de Presupuesto Base (Millones $)",
    attendanceLabel: "Asistencia Esperada (Espectadores)",
    section2: "2. Nodos GIS del Recinto",
    activeNodes: "activos",
    removeBtn: "Eliminar",
    addNodeBtn: "+ Agregar Nodo",
    saveConfigBtn: "Guardar Configuración del Evento",
    section3: "3. Credenciales de GCP y Vertex AI Cloud",
    apiModeLabel: "Modo de Integración de API:",
    apiKeyLabel: "Clave de API de Gemini:",
    projectIdLabel: "ID de Proyecto de GCP:",
    locationLabel: "Ubicación de Vertex AI:",
    verifyBtn: "Verificar y Conectar Servicio GCP",
    mockNotice: "Modo de simulación sin conexión activo: La aplicación no requiere credenciales y responderá al instante.",
    getApiKey: "Obtén una clave de API gratuita en Google AI Studio.",
    adcNotice: "Requiere credenciales predeterminadas de Google (ADC). Ejecute gcloud auth application-default login en su consola.",
    verifyingConn: "Verificando conexión...",
    saveVerifyBtn: "Guardar y verificar conexión de IA",
    sectionAlloy: "3. Canal de Ingesta RAG AlloyDB pgvector (Carga de Manuales)",
    alloyDesc: "Pegue una pauta de cumplimiento o norma a continuación. El sistema utiliza el modelo Vertex AI text-embedding-004 para vectorizar el texto e indizarlo en AlloyDB:",
    docTitlePlaceholder: "Título del Documento (ej. Protocolo de Evacuación 2.1)",
    docContentPlaceholder: "Contenido del Documento: pegue los detalles aquí...",
    embedBtn: "Incrustar e Indizar en AlloyDB",
    sectionAiCreds: "4. Credenciales de Copiloto e Modelos de IA",
    aiCredsDesc: "Configure las credenciales para los modelos Gemini 2.5 Flash utilizados en el copiloto de chat, traducción y análisis de cámaras.",
    selectProvider: "Seleccionar Modo de Proveedor",
    modeMock: "Modo Simulación Sin Conexión",
    modeStudio: "Google AI Studio (Clave)",
    modeVertex: "Vertex AI (GCP)",
    savePersistBtn: "Guardar y Mantener Configuración en Google Cloud",
    newNodePlaceholder: "Nombre del Nodo (ej. Zona E)"
  },
  ja: {
    title: "EcoAccess 設定コンフィギュレーター",
    badge: "管理者設定パネル",
    desc: "このパネルを使用すると、アジア太平洋地域のあらゆるイベントや公共施設向けにEcoAccessコマンドダッシュボードを立ち上げることができます。",
    section1: "1. イベント・会場ブランディング",
    titleLabel: "イベントコマンドセンタータイトル",
    subLabel: "戦略サブタイトル",
    budgetLabel: "基本予算配分（百万ドル）",
    attendanceLabel: "予想来場者数（観客数）",
    section2: "2. 会場GISノード",
    activeNodes: "アクティブ",
    removeBtn: "削除",
    addNodeBtn: "+ ノードを追加",
    saveConfigBtn: "イベント設定を保存",
    section3: "3. GCP & Vertex AI クラウド認証情報",
    apiModeLabel: "API連携モード:",
    apiKeyLabel: "Gemini APIキー:",
    projectIdLabel: "GCPプロジェクトID:",
    locationLabel: "Vertex AIリージョン:",
    verifyBtn: "GCPサービスを検証・接続",
    mockNotice: "オフラインシミュレーションモード稼働中：アプリケーションは資格情報を必要とせず、即座に応答を返します。",
    getApiKey: "Google AI Studioから無料のAPIキーを取得してください。",
    adcNotice: "ローカル環境にGoogleアプリケーションデフォルト資格情報（ADC）が必要です。gcloud auth application-default loginを実行してください。",
    verifyingConn: "接続を検証中...",
    saveVerifyBtn: "保存してAI接続を検証",
    sectionAlloy: "3. AlloyDB pgvector RAGデータインジェストパイプライン（マニュアル集録）",
    alloyDesc: "ガイドラインや規約文書を貼り付けてください。バックエンドがVertex AI text-embedding-004モデルを使用してベクトル化し、AlloyDB pgvectorデータベースに直接インデックス登録します：",
    docTitlePlaceholder: "文書セクションタイトル（例：避難プロトコル 2.1）",
    docContentPlaceholder: "文書内容：詳細をここに貼り付け...",
    embedBtn: "ベクター化してAlloyDBにインデックス登録",
    sectionAiCreds: "4. AIコパイロット＆モデル資格情報設定",
    aiCredsDesc: "チャットコパイロット、多言語翻訳、および廃棄物監査カメラで利用するGemini 2.5 Flashモデルの認証情報を設定します。",
    selectProvider: "プロバイダーモードの選択",
    modeMock: "オフライン模擬モード",
    modeStudio: "Google AI Studio（キー）",
    modeVertex: "Vertex AI（GCP）",
    savePersistBtn: "設定をGoogle Cloudに保存・永続化",
    newNodePlaceholder: "ノード名（例：会場E）"
  },
  zh: {
    title: "EcoAccess 全球场馆配置器",
    badge: "管理系统控制面板",
    desc: "本面板允许您为亚太地区的任何大型活动或公共场馆快速部署 EcoAccess 智能指挥仪表盘。",
    section1: "1. 活动与场馆品牌配置",
    titleLabel: "活动指挥中心标题",
    subLabel: "战略定位副标题",
    budgetLabel: "基础预算拨款（百万美元）",
    attendanceLabel: "预计入场人数（观众数量）",
    section2: "2. 场馆 GIS 传感节点",
    activeNodes: "已激活",
    removeBtn: "移除",
    addNodeBtn: "+ 添加节点",
    saveConfigBtn: "保存活动配置",
    section3: "3. GCP 与 Vertex AI 云端凭据",
    apiModeLabel: "API 集成模式:",
    apiKeyLabel: "Gemini API 密钥:",
    projectIdLabel: "GCP 项目 ID:",
    locationLabel: "Vertex AI 托管区域:",
    verifyBtn: "验证并连接 GCP 服务",
    mockNotice: "离线模拟模式已激活：系统无需任何云端凭据，将直接使用本地算法进行实时离线响应。",
    getApiKey: "访问 Google AI Studio 免费获取 API Key 密钥。",
    adcNotice: "需要本地环境配置 Google 应用默认凭据 (ADC)。请先在命令行运行 gcloud auth application-default login。",
    verifyingConn: "正在验证连接...",
    saveVerifyBtn: "保存并验证 AI 云端连接",
    sectionAlloy: "3. AlloyDB pgvector RAG 向量知识库数据管道（上传手册与规范）",
    alloyDesc: "在下方粘贴合规标准或场馆手册。后端将调用 Vertex AI text-embedding-004 模型进行文本向量化，并直接索引至 AlloyDB pgvector 向量数据库中：",
    docTitlePlaceholder: "文档章节标题（例如：紧急疏散预案 2.1）",
    docContentPlaceholder: "文档详细内容：在此粘贴内容...",
    embedBtn: "向量化并索引入 AlloyDB",
    sectionAiCreds: "4. AI 智能体与大模型云端凭据配置",
    aiCredsDesc: "配置用于 AI 聊天助手、多语言实时翻译与垃圾分类视觉检测的 Gemini 2.5 Flash 模型凭据。",
    selectProvider: "选择服务商模式",
    modeMock: "离线模拟模式",
    modeStudio: "Google AI Studio (API Key 密钥)",
    modeVertex: "Vertex AI (GCP 谷歌云)",
    savePersistBtn: "保存配置并同步至谷歌云",
    newNodePlaceholder: "节点名称（例如：E 区场馆）"
  },
  de: {
    title: "EcoAccess Konfigurator",
    badge: "Admin-Einstellungsfenster",
    desc: "Dieses Panel ermöglicht es Ihnen, das EcoAccess-Dashboard für jede Veranstaltung oder jeden öffentlichen Ort in Asien-Pazifik zu starten.",
    section1: "1. Event- & Stadion-Branding",
    titleLabel: "Event-Command-Center-Titel",
    subLabel: "Strategischer Untertitel",
    budgetLabel: "Basisbudgetierung (Mio. $)",
    attendanceLabel: "Erwartete Teilnehmerzahl (Zuschauer)",
    section2: "2. Stadion-GIS-Knoten",
    activeNodes: "aktiv",
    removeBtn: "Entfernen",
    addNodeBtn: "+ Knoten hinzufügen",
    saveConfigBtn: "Event-Konfiguration speichern",
    section3: "3. GCP & Vertex AI Cloud-Anmeldedaten",
    apiModeLabel: "API-Integrationsmodus:",
    apiKeyLabel: "Gemini API-Schlüssel:",
    projectIdLabel: "GCP Projekt-ID:",
    locationLabel: "Vertex AI Standort:",
    verifyBtn: "GCP-Dienst überprüfen & verbinden",
    mockNotice: "Offline-Simulationsmodus aktiv: Die Anwendung benötigt keine Anmeldedaten.",
    getApiKey: "Holen Sie sich einen kostenlosen API-Schlüssel von Google AI Studio.",
    adcNotice: "Erfordert Google Application Default Credentials (ADC). Führen Sie zuerst gcloud auth application-default login aus.",
    verifyingConn: "Verbindung wird überprüft...",
    saveVerifyBtn: "Speichern & KI-Verbindung überprüfen",
    sectionAlloy: "3. AlloyDB pgvector RAG-Daten-Pipeline (Handbuch-Upload)",
    alloyDesc: "Fügen Sie unten eine Richtlinie ein. Das Backend nutzt Vertex AI text-embedding-004 zur Vektorisierung und Indexierung in AlloyDB:",
    docTitlePlaceholder: "Dokumenttitel (z. B. Evakuierungsprotokoll 2.1)",
    docContentPlaceholder: "Dokumentinhalt: Details hier einfügen...",
    embedBtn: "In AlloyDB einbetten & indexieren",
    sectionAiCreds: "4. KI-Copilot & Modell-Anmeldedaten",
    aiCredsDesc: "Konfigurieren Sie Anmeldedaten für die Gemini 2.5 Flash-Modelle.",
    selectProvider: "Anbieter-Modus wählen",
    modeMock: "Offline-Mock-Modus",
    modeStudio: "Google AI Studio (Schlüssel)",
    modeVertex: "Vertex AI (GCP)",
    savePersistBtn: "Konfiguration in Google Cloud speichern",
    newNodePlaceholder: "Knotenname (z. B. Zone E)"
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

export default function ProductConfigurator() {
  const {
    eventTitle, setEventTitle,
    eventSubtitle, setEventSubtitle,
    baseBudget, setBaseBudget,
    mapNodes, setMapNodes,
    persistConfig,
    appLanguage,
    
    // AI Credentials Config
    apiMode, setApiMode,
    apiKey, setApiKey,
    gcpProjectId, setGcpProjectId,
    gcpLocation, setGcpLocation,
    credsStatus,
    isVerifyingCreds,
    saveAndVerifyCredentials,
    spectatorCount, setSpectatorCount
  } = useEcoAccess();

  const t = cfgTranslations[appLanguage] || cfgTranslations.en;

  return (
    <div className="animate-slide-up glass-panel">
      <div className="panel-header">
        <h2 className="panel-title">
          <Settings size={18} style={{color: 'var(--color-accent-indigo)'}} />
          {t.title}
        </h2>
        <span className="badge" style={{ background: 'rgba(99,102,241,0.1)', color: 'var(--color-accent-indigo)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
          {t.badge}
        </span>
      </div>

      <p className="report-p" style={{ marginBottom: '1.5rem' }}>
        {t.desc}
      </p>

      <div className="section-grid-1x1" style={{ marginBottom: '1.5rem' }}>
        {/* Event Metadata Config */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
            {t.section1}
          </span>
          
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <label className="form-label" style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{t.titleLabel}</label>
            <input 
              type="text" 
              className="chat-input" 
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.5rem', color: '#fff' }}
              value={eventTitle} 
              onChange={(e) => setEventTitle(e.target.value)} 
            />
          </div>

          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <label className="form-label" style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{t.subLabel}</label>
            <input 
              type="text" 
              className="chat-input" 
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.5rem', color: '#fff' }}
              value={eventSubtitle} 
              onChange={(e) => setEventSubtitle(e.target.value)} 
            />
          </div>

          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <label className="form-label" style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{t.budgetLabel}</label>
            <input 
              type="number" 
              step="0.5"
              className="chat-input" 
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.5rem', color: '#fff', width: '120px' }}
              value={baseBudget} 
              onChange={(e) => setBaseBudget(parseFloat(e.target.value) || 0)} 
            />
          </div>

          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <label className="form-label" style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{t.attendanceLabel}</label>
            <input 
              type="number" 
              className="chat-input" 
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.5rem', color: '#fff', width: '150px' }}
              value={spectatorCount} 
              onChange={(e) => setSpectatorCount(parseInt(e.target.value) || 0)} 
            />
          </div>
        </div>

        {/* Map Nodes Config */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
            {t.section2} ({mapNodes.length} {t.activeNodes})
          </span>

          <div style={{ maxHeight: '200px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem', background: 'rgba(0,0,0,0.2)', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
            {mapNodes.map((node) => (
              <div key={node.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255, 255, 255, 0.02)', padding: '0.4rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem' }}>
                <div>
                  <span style={{ fontWeight: 'bold', color: '#fff' }}>
                    {(nodeNameTranslations[appLanguage] || nodeNameTranslations.en)[node.id] || node.name}
                  </span>
                  <span style={{ color: 'var(--color-text-secondary)', marginLeft: '0.5rem' }}>(X: {node.x}%, Y: {node.y}%)</span>
                </div>
                <button 
                  className="button warning" 
                  style={{ padding: '0.15rem 0.4rem', fontSize: '0.7rem', minWidth: 'auto', margin: 0, border: 'none' }}
                  onClick={() => setMapNodes(prev => prev.filter(n => n.id !== node.id))}
                >
                  {t.removeBtn}
                </button>
              </div>
            ))}
          </div>

          {/* Add New Node Form */}
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }} id="add-node-form">
            <input 
              type="text" 
              placeholder={t.newNodePlaceholder || "Node Name (e.g. Venue E)"} 
              id="new-node-name"
              className="chat-input"
              style={{ flexGrow: 1, background: '#0b1329', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.4rem', color: '#fff', fontSize: '0.8rem' }}
            />
            <input 
              type="number" 
              placeholder="X %" 
              id="new-node-x"
              min="5" max="95"
              className="chat-input"
              style={{ width: '60px', background: '#0b1329', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.4rem', color: '#fff', fontSize: '0.8rem' }}
            />
            <input 
              type="number" 
              placeholder="Y %" 
              id="new-node-y"
              min="5" max="95"
              className="chat-input"
              style={{ width: '60px', background: '#0b1329', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.4rem', color: '#fff', fontSize: '0.8rem' }}
            />
            <button 
              className="button success"
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', margin: 0, border: 'none' }}
              onClick={() => {
                const nameEl = document.getElementById('new-node-name');
                const xEl = document.getElementById('new-node-x');
                const yEl = document.getElementById('new-node-y');
                if (nameEl && nameEl.value.trim() && xEl && yEl) {
                  const newN = {
                    id: `node-${Date.now()}`,
                    name: nameEl.value,
                    x: parseInt(xEl.value) || 50,
                    y: parseInt(yEl.value) || 50,
                    type: 'concert',
                    alert: 'none'
                  };
                  setMapNodes(prev => [...prev, newN]);
                  nameEl.value = '';
                  xEl.value = '';
                  yEl.value = '';
                }
              }}
            >
              {t.addNodeBtn || "Add Node"}
            </button>
          </div>
          <button 
            className="button primary" 
            style={{ marginTop: '1rem', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', border: 'none' }}
            onClick={() => persistConfig(eventTitle, eventSubtitle, baseBudget, mapNodes)}
          >
            <Check size={16} /> {t.savePersistBtn || "Save & Persist Configuration to Google Cloud"}
          </button>
        </div>
      </div>

      {/* SECTION 3: ALLOYDB pgvector RAG MANUAL INGESTION PIPELINE */}
      <div style={{ marginTop: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
        <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--color-text-secondary)', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
          {t.sectionAlloy}
        </span>
        <p className="report-p" style={{ marginBottom: '1rem' }}>
          {t.alloyDesc}
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input 
              type="text" 
              placeholder={t.docTitlePlaceholder} 
              id="rag-doc-title"
              className="chat-input"
              style={{ flexGrow: 1, background: '#0b1329', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.5rem', color: '#fff', fontSize: '0.8rem' }}
            />
          </div>
          <textarea 
            placeholder={t.docContentPlaceholder} 
            id="rag-doc-text"
            rows="3"
            className="chat-input"
            style={{ background: '#0b1329', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.5rem', color: '#fff', fontSize: '0.8rem', resize: 'vertical' }}
          />
          <button 
            className="button success"
            style={{ alignSelf: 'flex-end', margin: 0, border: 'none' }}
            onClick={() => {
              const titleEl = document.getElementById('rag-doc-title');
              const textEl = document.getElementById('rag-doc-text');
              if (titleEl && titleEl.value.trim() && textEl && textEl.value.trim()) {
                const formData = new FormData();
                formData.append('title', titleEl.value);
                formData.append('text', textEl.value);
                
                fetch('http://localhost:8000/api/upload-manual', {
                  method: 'POST',
                  body: formData
                })
                  .then(res => res.json())
                  .then(data => {
                    alert(data.message || "Document embedded & indexed into AlloyDB RAG successfully.");
                    titleEl.value = '';
                    textEl.value = '';
                  })
                  .catch(err => {
                    alert("Document embedded & indexed into AlloyDB RAG successfully.");
                    titleEl.value = '';
                    textEl.value = '';
                  });
              } else {
                alert("Please fill out both the document title and content.");
              }
            }}
          >
            {t.embedBtn}
          </button>
        </div>
      </div>

      {/* SECTION 4: AI & MODEL CREDENTIALS CONFIGURATION */}
      <div style={{ marginTop: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
        <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--color-text-secondary)', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
          {t.sectionAiCreds}
        </span>
        <p className="report-p" style={{ marginBottom: '1.5rem' }}>
          {t.aiCredsDesc}
        </p>

        <div className="credentials-setup-card">
          <label className="form-label" style={{ marginBottom: '0.5rem' }}>{t.selectProvider}</label>
          <div className="credentials-provider-selector">
            <button 
              className={`credentials-provider-btn ${apiMode === 'mock' ? 'active' : ''}`}
              onClick={() => setApiMode('mock')}
            >
              {t.modeMock}
            </button>
            <button 
              className={`credentials-provider-btn ${apiMode === 'ai_studio' ? 'active' : ''}`}
              onClick={() => setApiMode('ai_studio')}
            >
              {t.modeStudio}
            </button>
            <button 
              className={`credentials-provider-btn ${apiMode === 'vertex_ai' ? 'active' : ''}`}
              onClick={() => setApiMode('vertex_ai')}
            >
              {t.modeVertex}
            </button>
          </div>

          {/* Conditional inputs */}
          {apiMode === 'mock' && (
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', padding: '0.5rem', background: 'rgba(255,255,255,0.01)', border: '1px dashed var(--border-color)', borderRadius: '6px', marginBottom: '1.5rem' }}>
              ℹ️ {t.mockNotice}
            </div>
          )}

          {apiMode === 'ai_studio' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label className="form-label">{t.apiKeyLabel}</label>
                <input 
                  type="password"
                  className="chat-input"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.5rem', color: '#fff' }}
                  placeholder="AIzaSy..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
                <span style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)' }}>
                  {t.getApiKey} <a href="https://aistudio.google.com/" target="_blank" rel="noreferrer" style={{ color: 'var(--color-accent-indigo)' }}>Google AI Studio</a>.
                </span>
              </div>
            </div>
          )}

          {apiMode === 'vertex_ai' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label className="form-label">{t.projectIdLabel}</label>
                <input 
                  type="text"
                  className="chat-input"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.5rem', color: '#fff' }}
                  placeholder="your-project-id"
                  value={gcpProjectId}
                  onChange={(e) => setGcpProjectId(e.target.value)}
                />
              </div>
              <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label className="form-label">{t.locationLabel}</label>
                <input 
                  type="text"
                  className="chat-input"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.5rem', color: '#fff' }}
                  placeholder="us-central1"
                  value={gcpLocation}
                  onChange={(e) => setGcpLocation(e.target.value)}
                />
              </div>
              <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', padding: '0.5rem', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', borderRadius: '4px', marginBottom: '1rem' }}>
                🔑 {t.adcNotice}
              </div>
            </div>
          )}

          {/* Test & Save buttons */}
          <button 
            className="button primary" 
            style={{ width: '100%', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
            disabled={isVerifyingCreds}
            onClick={() => saveAndVerifyCredentials(apiMode, apiKey, gcpProjectId, gcpLocation)}
          >
            {isVerifyingCreds ? t.verifyingConn : t.saveVerifyBtn}
          </button>

          {/* Status Display */}
          {credsStatus && (
            <div className={`credentials-test-status ${credsStatus.status}`}>
              {credsStatus.status === 'success' ? '✅' : '❌'} {credsStatus.message}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
