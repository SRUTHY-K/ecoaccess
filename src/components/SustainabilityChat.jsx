import React, { useState, useEffect, useRef } from 'react';
import { useEcoAccess } from '../context/EcoAccessContext';
import { Cpu, Send, MessageSquare, Info, Shield, HelpCircle, Volume2, Wifi, Zap } from 'lucide-react';

const getApiUrl = (path) => {
  if (import.meta.env.PROD) {
    return path;
  }
  return `http://127.0.0.1:8000${path}`;
};

const chatTranslations = {
  en: {
    getDirections: "Get Directions",
    hideRouting: "Hide Routing",
    languageLabel: "Language:",
    navigatorTitle: "SAY-BO Event Navigator",
    startLocation: "Start Location:",
    endLocation: "Desired Destination:",
    calcRouteBtn: "Calculate Compass Route",
    placeholderAttendee: "Ask Say-Bo: shuttle schedules, vegan stands, solar points...",
    placeholderManager: "Ask co-pilot: translation flow, elevator repair status, grid load...",
    notifHubTitle: "Bluetooth Stadium Notifications Hub",
    connectedStatus: "CONNECTED",
    disconnectedStatus: "DISCONNECTED",
    broadcastingLive: "Broadcasting Live",
    offlineStatus: "Offline",
    notifLogsActive: "Logs list displays live push alerts below.",
    notifLogsInactive: "Logs inactive. Sync Bluetooth in the sidebar to receive notifications.",
    feedbackFeedTitle: "Multilingual Spectator Feedback Feed",
    feedbackCategory: "Category:",
    translateGemini: "Translate with Gemini",
    sentIn: "Submitted in",
    noFeedbacks: "No spectator feedbacks submitted in this session.",
    noNotifications: "No Bluetooth beacons received. Sync device Bluetooth in the sidebar to begin.",
    satisfactionQuestion: "Are you satisfied with Say-Bo and EcoAccess.ai?",
    satisfactionSub: "Your feedback is logged directly into the Manager Command Center's Multilingual Spectator Feedback Feed.",
    satisfactionYes: "👍 Yes, Very Satisfied!",
    satisfactionNo: "👎 Needs Improvement",
    satisfactionDone: "✓ Response Logged: Thank you for sharing your feedback with Stadium Operations!",
    demoPanelTitle: "Push Simulation Triggers (Demo Panel)",
    btnVegan: "🥗 Vegan Food",
    btnRubbish: "♻️ Recycling Tip",
    btnExit: "🚪 Egress Guide",
    btnShuttle: "🚌 Shuttle Transit",
    btnSolar: "☀️ Solar Charger",
    chatTitleAttendee: "Say-Bo: Spectator Guide And Assistant",
    chatTitleManager: "EcoAccess Chat Co-Pilot (Vertex AI RAG)",
    sayBoActive: "Say-Bo Active"
  },
  es: {
    getDirections: "Obtener Dirección",
    hideRouting: "Ocultar Ruta",
    languageLabel: "Idioma:",
    navigatorTitle: "Navegador de Eventos SAY-BO",
    startLocation: "Origen:",
    endLocation: "Destino Deseado:",
    calcRouteBtn: "Calcular Ruta con Brújula",
    placeholderAttendee: "Pregunte a Say-Bo: horarios, puestos veganos, puntos solares...",
    placeholderManager: "Pregunte al co-pilot: traducción, reparación de ascensores...",
    notifHubTitle: "Centro de Notificaciones BT Estadio",
    connectedStatus: "CONECTADO",
    disconnectedStatus: "DESCONECTADO",
    broadcastingLive: "Transmitiendo en Vivo",
    offlineStatus: "Offline",
    notifLogsActive: "La lista de abajo muestra alertas push en vivo.",
    notifLogsInactive: "Logs inactivos. Sincronice Bluetooth en el menú lateral para recibir alertas.",
    feedbackFeedTitle: "Canal de Comentarios Multilingües",
    feedbackCategory: "Categoría:",
    translateGemini: "Traducir con Gemini",
    sentIn: "Enviado en",
    noFeedbacks: "No hay comentarios enviados en esta sesión.",
    noNotifications: "No se reciben faros Bluetooth. Sincronice el Bluetooth en el menú lateral.",
    satisfactionQuestion: "¿Está satisfecho con Say-Bo y EcoAccess.ai?",
    satisfactionSub: "Sus comentarios se registran directamente en el canal multilingüe del centro de control.",
    satisfactionYes: "👍 ¡Sí, Muy Satisfecho!",
    satisfactionNo: "👎 Necesita Mejoras",
    satisfactionDone: "✓ Respuesta Registrada: ¡Gracias por compartir sus comentarios!",
    demoPanelTitle: "Disparadores de Simulación Push (Panel Demo)",
    btnVegan: "🥗 Comida Vegana",
    btnRubbish: "♻️ Consejo Reciclaje",
    btnExit: "🚪 Guía de Salida",
    btnShuttle: "🚌 Transbordo",
    btnSolar: "☀️ Cargador Solar",
    chatTitleAttendee: "Say-Bo: Guía y Asistente del Espectador",
    chatTitleManager: "EcoAccess Co-Piloto de Chat (Vertex AI RAG)",
    sayBoActive: "Say-Bo Activo"
  },
  ja: {
    getDirections: "道順を調べる",
    hideRouting: "マップ非表示",
    languageLabel: "言語表示:",
    navigatorTitle: "SAY-BO イベントナビゲーター",
    startLocation: "出発地:",
    endLocation: "目的地:",
    calcRouteBtn: "コンパス経路を計算",
    placeholderAttendee: "Say-Boに質問する：シャトル便、ビーガン売店、ソーラー充電など...",
    placeholderManager: "co-pilotに質問する：フィードbackの翻訳、昇降機障害、グリッド状況など...",
    notifHubTitle: "スタジアムBluetooth通知ハブ",
    connectedStatus: "接続中",
    disconnectedStatus: "未接続",
    broadcastingLive: "リアルタイム発信中",
    offlineStatus: "オフライン",
    notifLogsActive: "受信した警告通知が以下にリアルタイムにリストされます。",
    notifLogsInactive: "無効です。サイドバーから端末のBluetoothを同期してください。",
    feedbackFeedTitle: "多言語フィードバックタイムライン",
    feedbackCategory: "カテゴリ:",
    translateGemini: "Geminiで翻訳・感情分析",
    sentIn: "送信された言語:",
    noFeedbacks: "このセッション中に投稿されたフィードバックはありません。",
    noNotifications: "信号を検知できません。サイドバーからBluetooth同期を行ってください。",
    satisfactionQuestion: "Say-BoおよびEcoAccess.aiのサービスに満足していますか？",
    satisfactionSub: "あなたのフィードバックは管理コンソールの多言語フィードバックフィードに直接記録されます。",
    satisfactionYes: "👍 はい、大満足です！",
    satisfactionNo: "👎 改善が必要",
    satisfactionDone: "✓ 送信完了：スタジアム運用チームへのご協力ありがとうございました！",
    demoPanelTitle: "プッシュシミュレーショントリガー（デモパネル）",
    btnVegan: "🥗 ビーガンフード",
    btnRubbish: "♻️ リサイクルガイド",
    btnExit: "🚪 退場誘導ガイド",
    btnShuttle: "🚌 シャトル便案内",
    btnSolar: "☀️ ソーラー充電器",
    chatTitleAttendee: "Say-Bo: 観客ガイド＆アシスタント",
    chatTitleManager: "EcoAccess チャットコパイロット (Vertex AI RAG)",
    sayBoActive: "Say-Bo 稼働中"
  },
  zh: {
    getDirections: "获取路线指引",
    hideRouting: "隐藏导航路线",
    languageLabel: "语言选择:",
    navigatorTitle: "SAY-BO 活动客流导航仪",
    startLocation: "出发起始点:",
    endLocation: "指定目标地:",
    calcRouteBtn: "计算罗盘引导路径",
    placeholderAttendee: "向 Say-Bo 提问：接驳车时刻表、素食铺位置、手机充电桩...",
    placeholderManager: "向副驾驶提问：反馈翻译流程、电梯检修状态、电网负荷...",
    notifHubTitle: "场馆蓝牙无线推送通知终端",
    connectedStatus: "已连接",
    disconnectedStatus: "断开连接",
    broadcastingLive: "无线信标广播中",
    offlineStatus: "离线状态",
    notifLogsActive: "下方实时展示已接收的蓝牙推送警告列表。",
    notifLogsInactive: "日志已停用。请在侧边栏同步设备蓝牙以开始接收通知。",
    feedbackFeedTitle: "多语言参与者意见反馈看板",
    feedbackCategory: "反馈分类:",
    translateGemini: "使用 Gemini 翻译分析",
    sentIn: "原帖提交语言",
    noFeedbacks: "当前会话尚无意见反馈被提交。",
    noNotifications: "未接收到蓝牙信标。请在侧边栏同步设备蓝牙以激活。",
    satisfactionQuestion: "您对 Say-Bo 和 EcoAccess.ai 的服务满意吗？",
    satisfactionSub: "您的反馈将实时记录并传送至管理指挥中心的无障碍多语言观众反馈通道。",
    satisfactionYes: "👍 非常满意！",
    satisfactionNo: "👎 仍需改进",
    satisfactionDone: "✓ 反馈已记录：感谢您向场馆运营团队提出宝贵意见！",
    demoPanelTitle: "无线推送模拟触发器（演示面板）",
    btnVegan: "🥗 素食餐点",
    btnRubbish: "♻️ 分类回收指南",
    btnExit: "🚪 离场客流引导",
    btnShuttle: "🚌 电动接驳交通",
    btnSolar: "☀️ 太阳能充电桩",
    chatTitleAttendee: "Say-Bo: 观众导览与智能助手",
    chatTitleManager: "EcoAccess 智能副驾驶 (Vertex AI RAG)",
    sayBoActive: "Say-Bo 在线中"
  },
  de: {
    getDirections: "Wegbeschreibung",
    hideRouting: "Route ausblenden",
    languageLabel: "Sprache:",
    navigatorTitle: "SAY-BO Event-Navigator",
    startLocation: "Startpunkt:",
    endLocation: "Gewünschtes Ziel:",
    calcRouteBtn: "Kompassroute berechnen",
    placeholderAttendee: "Say-Bo fragen: Shuttles, vegane Stände, Solar-Ladestationen...",
    placeholderManager: "Co-Pilot fragen: Übersetzungsablauf, Aufzugsreparaturen...",
    notifHubTitle: "Stadion-Bluetooth-Benachrichtigungs-Hub",
    connectedStatus: "VERBUNDEN",
    disconnectedStatus: "GETRENNT",
    broadcastingLive: "Live-Übertragung",
    offlineStatus: "Offline",
    notifLogsActive: "Protokollliste zeigt unten Live-Push-Warnungen an.",
    notifLogsInactive: "Protokolle inaktiv. Bluetooth in der Seitenleiste verbinden, um Warnungen zu erhalten.",
    feedbackFeedTitle: "Mehrsprachiger Zuschauer-Feedback-Feed",
    feedbackCategory: "Kategorie:",
    translateGemini: "Mit Gemini übersetzen",
    noNotifications: "Keine Bluetooth-Beacons empfangen. Bluetooth in der Seitenleiste synchronisieren.",
    demoPanelTitle: "Push-Simulationsauslöser (Demo-Panel)",
    btnVegan: "🥗 Veganes Essen",
    btnRubbish: "♻️ Recycling-Tipp",
    btnExit: "🚪 Ausstiegsleitung",
    btnShuttle: "🚌 Shuttle-Transit",
    btnSolar: "☀️ Solar-Ladestation",
    chatTitleAttendee: "Say-Bo: Zuschauer-Guide & Assistent",
    chatTitleManager: "EcoAccess Chat-Co-Pilot (Vertex AI RAG)",
    sayBoActive: "Say-Bo Aktiv"
  }
};

export default function SustainabilityChat() {
  const {
    chatInput,
    setChatInput,
    chatMessages,
    setChatMessages,
    isTyping,
    setIsTyping,
    handleChatSubmit,
    spectatorFeedbacks,
    translateFeedback,
    portalRole,
    userChoices,
    bluetoothLive,
    receivedNotifications,
    setReceivedNotifications,
    triggerAttendeeChoice,
    metrics,
    appLanguage,
    setAppLanguage,
    mapNodes,
    eventTitle,
    baseBudget,
    renewablesShare,
    transitInclusivity,
    audioAssistCoverage,
    sendFeedbackToManager
  } = useEcoAccess();

  const [sentFeedbacks, setSentFeedbacks] = useState({});
  const [expandedRAG, setExpandedRAG] = useState({});
  const [satisfactionSubmitted, setSatisfactionSubmitted] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  const handleSendFeedback = (index, text) => {
    sendFeedbackToManager(text);
    setSentFeedbacks(prev => ({ ...prev, [index]: true }));
  };

  const handleSatisfactionVote = (vote) => {
    setSatisfactionSubmitted(true);
    const text = `Attendee Satisfaction Survey: Are you satisfied with Say-Bo and EcoAccess.ai? -> ${vote === 'Yes' ? 'Yes 👍 (Very Satisfied)' : 'No 👎 (Needs Improvement)'}`;
    
    // Send to manager feed
    sendFeedbackToManager(text);

    // Append to attendee chat timeline
    const userMsg = {
      sender: 'user',
      text: `Satisfaction Survey Response: ${vote}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const aiReply = {
        sender: 'ai',
        text: `Thank you for rating your experience! Your "${vote}" response has been transmitted directly to the Manager Command Center's Multilingual Spectator Feedback Feed in real-time. 🌟`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations: ["EcoAccess.ai Spectator Satisfaction Log"]
      };
      setChatMessages(prev => [...prev, aiReply]);
      setIsTyping(false);
    }, 500);
  };

  const gridNodes = mapNodes;

  const [showDirectionsForm, setShowDirectionsForm] = useState(false);
  const [startNode, setStartNode] = useState('node-entry');
  const [endNode, setEndNode] = useState('node-solar');

  const handleCalculateDirections = () => {
    const start = gridNodes.find(n => n.id === startNode);
    const end = gridNodes.find(n => n.id === endNode);
    if (!start || !end) return;

    const dx = end.x - start.x;
    const dy = start.y - end.y;

    const distanceMeters = Math.round(Math.sqrt(dx*dx + dy*dy) * 10);
    
    let routeInstructions = [];
    if (dy > 3) routeInstructions.push(`Head ${Math.round(dy * 10)} meters North`);
    if (dy < -3) routeInstructions.push(`Head ${Math.round(Math.abs(dy) * 10)} meters South`);
    if (dx > 3) routeInstructions.push(`Head ${Math.round(dx * 10)} meters East`);
    if (dx < -3) routeInstructions.push(`Head ${Math.round(Math.abs(dx) * 10)} meters West`);

    const routeDesc = routeInstructions.length > 0 
      ? routeInstructions.join(', then ') 
      : 'You are already at the destination location.';

    const userMsg = {
      sender: 'user',
      text: `How do I get from ${start.name} to ${end.name}?`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const assistantMsg = {
      sender: 'ai',
      text: `🗺️ **Say-Bo Navigation Assistant**:\nTo travel from **${start.name}** to **${end.name}**:\n\n👉 **Directions:** ${routeDesc}.\n📏 **Estimated Distance:** ~${distanceMeters} meters.\n\nEnjoy the match, and let me know if you need help finding other venue landmarks!`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      citations: []
    };

    setChatMessages(prev => [...prev, userMsg, assistantMsg]);
    setShowDirectionsForm(false);
  };

  const handleLocalChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const rawInput = chatInput;
    setChatInput('');

    const queryInput = rawInput;
    const query = rawInput.toLowerCase();
    
    const userMsg = {
      sender: 'user',
      text: rawInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    const eventContext = `Event: ${eventTitle}, Budget: $${baseBudget}M, Renewables: ${renewablesShare}%, Accessibility: ${transitInclusivity}%, Audio Assist: ${audioAssistCoverage}%`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    fetch(getApiUrl('/api/chat'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: queryInput, context: eventContext }),
      signal: controller.signal
    })
      .then(res => res.json())
      .then(data => {
        clearTimeout(timeoutId);
        setChatMessages(prev => [...prev, {
          sender: 'ai',
          text: data.text,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          citations: data.citations || ["Vertex AI Copilot"],
          ragSnippet: data.ragSnippet || ""
        }]);
        setIsTyping(false);
      })
      .catch(err => {
        clearTimeout(timeoutId);
        // Instant response fallback
        const mockDB = [
          {
            keywords: ['elevator', 'gate 6', 'access', 'wheelchair', 'mobility', 'barrier'],
            reply: "Accessibility Alert: Elevator E-4 near Gate 6 is currently offline. Accessibility paths have been rerouted to auxiliary ramps. A repair crew is dispatched and on-route.",
            citation: "AlloyDB: elevator_status_register (offline)",
            snippet: "ACCESSIBILITY RULE 4.2.1: In the event of primary elevator failure at gates serving mobility zones, operators must reroute passengers to auxiliary ramp structures within 10 minutes and dispatch repairs immediately."
          },
          {
            keywords: ['audio', 'headset', 'headsets', 'earphone', 'earphones', 'hearing', 'sound assistance'],
            reply: "Audio Headsets: To hire audio headsets or for battery queries - please proceed to the main help and information desk for rental. Please note: To promote care - any loss or damages are 100% on the attendee.",
            citation: "AlloyDB RAG: audio_headset_rental_policy",
            snippet: "AUDIO HEADSET POLICY: Headsets and battery servicing are managed at the Main Info & Help Desk. Attendees are 100% responsible for loss or damage during rental."
          },
          {
            keywords: ['solar', 'charge', 'charger', 'charging', 'phone charge', 'power bank', 'plug'],
            reply: "Solar Charging Station: Please understand and to consider all attendee's - there is a 10 minute allocation for the Solar Charging Station and attendees are required to stay with their device for the duration of use. Please do not leave your device unattended. The Venue is not resposible for theft, loss or damage when on site. Thank you.",
            citation: "AlloyDB RAG: solar_charging_station_policy",
            snippet: "SOLAR CHARGING POLICY: 10-minute maximum allocation per device. Unattended devices are strictly prohibited. Venue is not liable for theft, loss, or damage."
          },
          {
            keywords: ['shuttle', 'transit', 'bus', 'transport', 'egress', 'leave', 'leaving', 'departure', 'departures', 'schedule', 'time', 'when do'],
            reply: "Shuttles are scheduled to leave every half an hour, and at peak times, they are scheduled to leave once at full capacity.",
            citation: "AlloyDB RAG: shuttle_departure_schedule",
            snippet: "SHUTTLE TRANSIT SCHEDULE: Electric shuttles depart every 30 minutes during standard operations and immediately upon reaching full capacity during peak spectator traffic."
          },
          {
            keywords: ['food', 'kiosk', 'cart', 'carts', 'eat', 'snack', 'snacks', 'drink', 'drinks', 'vegan', 'concession', 'concessions', 'meal', 'hungry', 'dining'],
            reply: "For food kiosk options, keep a lookout for the mobile food carts on the move throughout the stadium, or head to the main kiosk! Drinks and snacks as well as vegan-friendly options are available.",
            citation: "AlloyDB RAG: food_kiosk_concessions",
            snippet: "FOOD CONCESSION POLICY: In addition to the static Food Kiosk, mobile eco-friendly food carts travel continuously throughout stadium concourses. Drinks, snacks, and vegan options are available."
          },
          {
            keywords: ['directions', 'direction', 'route', 'path', 'how do i get to', 'where is', 'where are', 'navigate', 'way to', 'walk to', 'location of', 'find'],
            reply: "🗺️ **Say-Bo Navigation & Directions Helper**:\nTo calculate your exact walking distance and step-by-step compass directions, please select or specify your current closest checkpoint location from our stadium directory:\n\n📍 **Available Checkpoint Locations:**\n• 🚪 Main Entrance Gate\n• 🚪 Main Exit Gate\n• ☀️ Solar Charging Station\n• 🚌 Shuttle Pick-up\n• 🎧 Audio Headsets\n• ♿ Restrooms\n• ℹ️ Info & Help Desk\n• 🍎 Food Kiosk\n• 🏟️ Main Venue Zone\n\n👉 You can also tap the **🗺️ Get Directions** button above to calculate exact distance metrics and cardinal steps (North, South, East, West) in real-time!",
            citation: "Say-Bo RAG: compass_navigation_calculator",
            snippet: "NAVIGATION SYSTEM RULE 1.1: When spectators request directions, prompt for their closest checkpoint landmark from all active directory nodes and calculate Euclidean distance in meters alongside cardinal orientation."
          },
          {
            keywords: ['bin', 'bins', 'litter', 'rubbish', 'waste', 'trash', 'garbage', 'recycle', 'recycling', 'compost', 'dispose', 'disposal'],
            reply: "Multiple bins are located around the stadium with recycling and organic waste options with signage to help you decide how to dispose, thank you for being mindful and helping the event and planet stay clean.",
            citation: "AlloyDB RAG: waste_bin_recycling_guide",
            snippet: "WASTE DISPOSAL POLICY: Recycled and organic bins are distributed venue-wide with signage guides to assist attendee disposal."
          },
          {
            keywords: ['translate', 'feedback', 'japanese', 'spanish', 'german', 'language'],
            reply: "Feedback translation and sentiment analysis runs automatically on incoming posts. Tapping 'Translate' uses Gemini 2.5 Flash to convert feedback, classify sentiment, and route urgent accessibility reports within 5 minutes.",
            citation: "AlloyDB: feedback_translation_policy (offline)",
            snippet: "TRANSLATION POLICY 1.8.4: All spectator reports submitted in non-English formats must be translated semantically to identify safety or mobility barriers."
          },
          {
            keywords: ['budget', 'fund', 'cost', 'money'],
            reply: `Under the current configuration, execution budget remaining is $${metrics.budgetRemaining}M. Major expenses are allocated to electric shuttle dispatch ($6.5M) and solar battery upgrades ($5.0M).`,
            citation: "AlloyDB: budget_ledger_register (offline)",
            snippet: "STRATEGIC CAPITAL CODE: Sustainability capital upgrades are capped at $30M total budget. Efficiency must be balanced above 70%."
          }
        ];

        const match = mockDB.find(item => 
          item.keywords.some(keyword => query.includes(keyword))
        );

        let replyText = "";
        let citations = [];
        let ragSnippet = "";

        if (match) {
          replyText = match.reply;
          citations = [match.citation];
          ragSnippet = match.snippet;
        } else {
          // Conversational Natural Language diversion checks
          const cleanQuery = query.trim();
          const greetingsList = ['hi', 'hello', 'hey', 'greetings', 'yo', 'good morning', 'good afternoon', 'good evening'];
          const identityList = ['who are you', 'what is your name', 'say-bo', 'saybo', 'what do you do', 'purpose', 'help', 'info'];
          
          const isGreeting = greetingsList.some(g => cleanQuery === g || cleanQuery.startsWith(g + ' '));
          const isIdentity = identityList.some(id => cleanQuery.includes(id));

          if (isGreeting) {
            replyText = "Hello! I am here and ready to guide you. As your stadium assistant, I can help you find universal restrooms, locate solar charging hubs, calculate walking directions, or check transit schedules. How can I assist you today?";
            citations = ["Say-Bo Welcome Router"];
            ragSnippet = "SAY-BO CONVERSATIONAL INTERACTION: Greetings route users directly back to stadium-specific accessibility and carbon indicators.";
          } else if (isIdentity) {
            replyText = "I am Say-Bo, your EcoAccess Spectator Assistant. My focus is to help you navigate the APAC Stadium sustainably and inclusively. Would you like to check accessible directions on the grid, view solar charging nodes, or look up electric shuttle updates?";
            citations = ["Say-Bo Purpose Manual"];
            ragSnippet = "SAY-BO CONVERSATIONAL INTERACTION: Purpose queries are redirected back to the active GIS grid layout context.";
          } else {
            replyText = "I understand your message, but as your virtual stadium navigator, I am focused on the venue's logistics. Let's get back on track: would you like to calculate directions from the Main Entrance Gate, locate the Food Kiosk, or find the nearest Restrooms?";
            citations = ["Say-Bo Stadium GIS Context"];
            ragSnippet = "SAY-BO CONVERSATIONAL INTERACTION: Out-of-scope requests are redirected back to the active GIS grid layout context.";
          }
        }

        if (appLanguage !== 'en') {
          const transDict = {
            es: {
              "Audio Headsets: To hire audio headsets or for battery queries - please proceed to the main help and information desk for rental. Please note: To promote care - any loss or damages are 100% on the attendee.": "Auriculares de audio: Para alquilar auriculares de audio o para consultas sobre baterías, diríjase al mostrador principal de ayuda e información para el alquiler. Tenga en cuenta: Para promover el cuidado, cualquier pérdida o daño corre 100% a cargo del asistente.",
              "Solar Charging Station: Please understand and to consider all attendee's - there is a 10 minute allocation for the Solar Charging Station and attendees are required to stay with their device for the duration of use. Please do not leave your device unattended. The Venue is not resposible for theft, loss or damage when on site. Thank you.": "Estación de Carga Solar: Por favor comprenda y considere a todos los asistentes: hay una asignación de 10 minutos para la Estación de Carga Solar y se requiere que los asistentes permanezcan con su dispositivo durante la duración del uso. Por favor, no deje su dispositivo desatendido. El Recinto no es responsable de robos, pérdidas o daños en el lugar. Gracias.",
              "Multiple bins are located around the stadium with recycling and organic waste options with signage to help you decide how to dispose, thank you for being mindful and helping the event and planet stay clean.": "Se encuentran ubicados múltiples contenedores alrededor del estadio con opciones de reciclaje y residuos orgánicos con señalización para ayudarle a decidir cómo desechar. Gracias por ser atento y ayudar a que el evento y el planeta se mantengan limpios.",
              "Shuttles are scheduled to leave every half an hour, and at peak times, they are scheduled to leave once at full capacity.": "Los transbordadores están programados para salir cada media hora y, en horas pico, están programados para salir una vez que alcanzan su máxima capacidad.",
              "For food kiosk options, keep a lookout for the mobile food carts on the move throughout the stadium, or head to the main kiosk! Drinks and snacks as well as vegan-friendly options are available.": "Para las opciones de quioscos de comida, ¡esté atento a los carritos de comida móviles en movimiento por todo el estadio, o diríjase al quiosco principal! Hay bebidas y bocadillos, así como opciones aptas para veganos disponibles.",
              "🗺️ **Say-Bo Navigation & Directions Helper**:\nTo calculate your exact walking distance and step-by-step compass directions, please select or specify your current closest checkpoint location from our stadium directory:\n\n📍 **Available Checkpoint Locations:**\n• 🚪 Main Entrance Gate\n• 🚪 Main Exit Gate\n• ☀️ Solar Charging Station\n• 🚌 Shuttle Pick-up\n• 🎧 Audio Headsets\n• ♿ Restrooms\n• ℹ️ Info & Help Desk\n• 🍎 Food Kiosk\n• 🏟️ Main Venue Zone\n\n👉 You can also tap the **🗺️ Get Directions** button above to calculate exact distance metrics and cardinal steps (North, South, East, West) in real-time!": "🗺️ **Asistente de Navegación y Direcciones Say-Bo**:\nPara calcular su distancia exacta a pie y las direcciones de compás paso a paso, seleccione o especifique su punto de control más cercano del directorio de nuestro estadio:\n\n📍 **Puntos de Control Disponibles:**\n• 🚪 Puerta de Entrada Principal\n• 🚪 Puerta de Salida Principal\n• ☀️ Estación de Carga Solar\n• 🚌 Parada de Transbordo\n• 🎧 Auriculares de Audio\n• ♿ Baños\n• ℹ️ Mostrador de Información y Ayuda\n• 🍎 Quiosco de Comida\n• 🏟️ Zona Principal del Recinto\n\n👉 ¡También puede tocar el botón **🗺️ Obtener Direcciones** arriba para calcular métricas de distancia exacta y pasos cardinales (Norte, Sur, Este, Oeste) en tiempo real!",
              "Accessibility Alert: Elevator E-4 near Gate 6 is currently offline. Accessibility paths have been rerouted to auxiliary ramps. A repair crew is dispatched and on-route.": "Alerta de accesibilidad: El ascensor E-4 cerca de la Puerta 6 está actualmente fuera de servicio. Las rutas de accesibilidad se han desviado a rampas auxiliares. Un equipo de reparación ha sido enviado y está en camino.",
              "Grid Load Alert: Venue C Substation is drawing heavy load (880 kW Peak). Recommendation is to toggle Solar Battery Peak Shaving to buffer 150 kW and reduce draw on non-renewable grid supplies.": "Alerta de carga de la red: La subestación del Recinto C está consumiendo una carga pesada (880 kW pico). Se recomienda activar la limitación de picos de la batería solar para amortiguar 150 kW y reducir el consumo de suministros de red no renovables.",
              "Vision AI Audit: Compost Bin #4 at Plaza Food Court contains non-compostable plastics (89% probability). Sorter crew dispatch has been suggested.": "Auditoría de IA de visión: El contenedor de compost #4 en la plaza de comidas contiene plásticos no compostables (89% de probabilidad). Se ha sugerido el envío de un equipo de clasificación.",
              "Feedback translation and sentiment analysis runs automatically on incoming posts. Tapping 'Translate' uses Gemini 2.5 Flash to convert feedback, classify sentiment, and route urgent accessibility reports within 5 minutes.": "La traducción de comentarios y el análisis de sentimientos se ejecutan automáticamente en las publicaciones entrantes. Al tocar 'Traducir', se utiliza Gemini 2.5 Flash para convertir comentarios, clasificar el sentimiento y enrutar informes urgentes de accesibilidad en menos de 5 minutos.",
              "Hello! I am here and ready to guide you. As your stadium assistant, I can help you find universal restrooms, locate solar charging hubs, calculate walking directions, or check transit schedules. How can I assist you today?": "¡Hola! Estoy aquí y listo para guiarle. Como su asistente del estadio, puedo ayudarle a encontrar baños universales, ubicar centros de carga solar, calcular direcciones para caminar o verificar los horarios de los transbordadores. ¿Cómo puedo ayudarle hoy?",
              "I am Say-Bo, your EcoAccess Spectator Assistant. My focus is to help you navigate the APAC Stadium sustainably and inclusively. Would you like to check accessible directions on the grid, view solar charging nodes, or look up electric shuttle updates?": "Soy Say-Bo, su Asistente de Espectadores de EcoAccess. Mi objetivo es ayudarle a navegar por el APAC Stadium de forma sostenible e inclusiva. ¿Le gustaría verificar las direcciones accesibles en la cuadrícula, ver los nodos de carga solar o buscar actualizaciones de los transbordadores eléctricos?",
              "I understand your message, but as your virtual stadium navigator, I am focused on the venue's logistics. Let's get back on track: would you like to calculate directions from the Main Entrance Gate, locate the Food Kiosk, or find the nearest Restrooms?": "Entiendo su mensaje, pero como su navegador virtual del estadio, estoy enfocado en la logística del lugar. Volvamos al camino: ¿le gustaría calcular las direcciones desde la Puerta de Entrada Principal, ubicar el Quiosco de Comida o encontrar los Baños más cercanos?"
            },
            ja: {
              "Audio Headsets: To hire audio headsets or for battery queries - please proceed to the main help and information desk for rental. Please note: To promote care - any loss or damages are 100% on the attendee.": "音声ヘッドセット：音声ヘッドセットのレンタルやバッテリーに関するご質問は、メインの総合案内・ヘルプデスクまでお越しください。ご注意：製品の丁寧な取り扱いを促すため、紛失や破損は100%お客様のご負担となります。",
              "Solar Charging Station: Please understand and to consider all attendee's - there is a 10 minute allocation for the Solar Charging Station and attendees are required to stay with their device for the duration of use. Please do not leave your device unattended. The Venue is not resposible for theft, loss or damage when on site. Thank you.": "ソーラー充電ステーション：すべてのお客様への配慮としてご理解をお願いいたします。ソーラー充電ステーションのご利用はお一人様10分間となっており、利用中はお手元で端末をお手元に保持してください。端末を放置しないようお願いいたします。場内での盗難・紛失・破損について、会場は一切の責任を負いかねます。ありがとうございます。",
              "Multiple bins are located around the stadium with recycling and organic waste options with signage to help you decide how to dispose, thank you for being mindful and helping the event and planet stay clean.": "スタジアム周辺にはリサイクルおよび有機ゴミ用の複数のゴミ箱が設置されており、分別に役立つ案内サインがございます。配慮ある行動でイベントと地球環境の美化にご協力いただき、ありがとうございます。",
              "Shuttles are scheduled to leave every half an hour, and at peak times, they are scheduled to leave once at full capacity.": "シャトルバスは30分ごとに出発する予定です。混雑するピーク的には、満席になり次第随時出発します。",
              "For food kiosk options, keep a lookout for the mobile food carts on the move throughout the stadium, or head to the main kiosk! Drinks and snacks as well as vegan-friendly options are available.": "フード売店のご利用については、スタジアム内を巡回している移動式フードカートにご注目いただくか、メイン売店へお向かいください！ドリンクや軽食のほか、ビーガン対応メニューもご用意しております。",
              "🗺️ **Say-Bo Navigation & Directions Helper**:\nTo calculate your exact walking distance and step-by-step compass directions, please select or specify your current closest checkpoint location from our stadium directory:\n\n📍 **Available Checkpoint Locations:**\n• 🚪 Main Entrance Gate\n• 🚪 Main Exit Gate\n• ☀️ Solar Charging Station\n• 🚌 Shuttle Pick-up\n• 🎧 Audio Headsets\n• ♿ Restrooms\n• ℹ️ Info & Help Desk\n• 🍎 Food Kiosk\n• 🏟️ Main Venue Zone\n\n👉 You can also tap the **🗺️ Get Directions** button above to calculate exact distance metrics and cardinal steps (North, South, East, West) in real-time!": "🗺️ **Say-Bo ナビゲーション＆ルート案内助手**:\n徒歩距離とステップバイステップのコンパス方位案内を計算するには、スタジアムディレクトリから現在地に一番近いチェックポイントを選択してください：\n\n📍 **利用可能なチェックポイント地点:**\n• 🚪 メイン入場ゲート\n• 🚪 メイン退場ゲート\n• ☀️ ソーラー充電ステーション\n• 🚌 シャトル乗車場所\n• 🎧 音声ガイドヘッドセット\n• ♿ トイレ\n• ℹ️ 総合案内＆ヘルプデスク\n• 🍎 フード売店\n• 🏟️ メイン会場ゾーン\n\n👉 上部の **🗺️ 経路案内** ボタンをタップすると、リアルタイムで距離と東西南北の方角案内を計算できます！",
              "Accessibility Alert: Elevator E-4 near Gate 6 is currently offline. Accessibility paths have been rerouted to auxiliary ramps. A repair crew is dispatched and on-route.": "アクセシビリティ警告：ゲート6付近のエレベーターE-4は現在オフラインです。アクセシビリティ経路は補助スロープに変更されています。修理クルーが派遣され、移動中です。",
              "Grid Load Alert: Venue C Substation is drawing heavy load (880 kW Peak). Recommendation is to toggle Solar Battery Peak Shaving to buffer 150 kW and reduce draw on non-renewable grid supplies.": "グリッド負荷警告：会場C変電所は高負荷（ピーク880 kW）を検出しています。非再生可能グリッド電源からの電力消費を削減するため、ソーラーバッテリーのピークカット（150 kWバッファ）をオンにすることを推奨します。",
              "Vision AI Audit: Compost Bin #4 at Plaza Food Court contains non-compostable plastics (89% probability). Sorter crew dispatch has been suggested.": "ビジョンAI監査：プラザフードコートの堆肥箱#4に非堆肥化プラスチックが含まれています（確率89%）。ソータークルーの派遣が推奨されています。",
              "Feedback translation and sentiment analysis runs automatically on incoming posts. Tapping 'Translate' uses Gemini 2.5 Flash to convert feedback, classify sentiment, and route urgent accessibility reports within 5 minutes.": "フィードバックの翻訳と感情分析は、受信メッセージに対して自動的に実行されます。「翻訳」をタップすると、Gemini 2.5 Flashを使用してフィードバックを変換、感情を分類し、緊急のアクセシビリティ報告を5分以内にルーティングします。",
              "Hello! I am here and ready to guide you. As your stadium assistant, I can help you find universal restrooms, locate solar charging hubs, calculate walking directions, or check transit schedules. How can I assist you today?": "こんにちは！喜んでご案内いたします。スタジアムのアシスタントとして、多目的トイレの検索、ソーラー充電スタンドの場所、徒歩ルートの計算、シャトルバスの時刻表確認をお手伝いできます。本日はどのようなご用件でしょうか？",
              "I am Say-Bo, your EcoAccess Spectator Assistant. My focus is to help you navigate the APAC Stadium sustainably and inclusively. Would you like to check accessible directions on the grid, view solar charging nodes, or look up electric shuttle updates?": "私はSay-Bo、あなたのEcoAccess観客用アシスタントです。APACスタジアムをサステナブルかつインクルーシブに移動できるようサポートします。グリッド上のバリアフリールートの確認、ソーラー充電ノードの表示、電気シャトルの運行情報の確認などはいかがですか？",
              "I understand your message, but as your virtual stadium navigator, I am focused on the venue's logistics. Let's get back on track: would you like to calculate directions from the Main Entrance Gate, locate the Food Kiosk, or find the nearest Restrooms?": "メッセージを理解しましたが、バーチャルスタジアムナビゲーターとして会場の運営サポートに焦点を当てています。メイン入場ゲートからのルート計算、フード売店の検索、または一番近いトイレの検索などをご案内しましょうか？"
            },
            zh: {
              "Audio Headsets: To hire audio headsets or for battery queries - please proceed to the main help and information desk for rental. Please note: To promote care - any loss or damages are 100% on the attendee.": "语音耳机：如需租用语音耳机或咨询电池相关事宜，请前往主问讯与服务台办理租用。请注意：为倡导爱护设备，任何遗失或损坏将由观众全额承担。",
              "Solar Charging Station: Please understand and to consider all attendee's - there is a 10 minute allocation for the Solar Charging Station and attendees are required to stay with their device for the duration of use. Please do not leave your device unattended. The Venue is not resposible for theft, loss or damage when on site. Thank you.": "太阳能充电站：为照顾并体谅全体观众的需求，请理解太阳能充电站每次限时使用 10 分钟，使用者须在充电期间全程留守设备。请勿将您的设备置于无看管状态。场馆方对现场发生的盗窃、遗失或损坏概不负责。谢谢。",
              "Multiple bins are located around the stadium with recycling and organic waste options with signage to help you decide how to dispose, thank you for being mindful and helping the event and planet stay clean.": "体育场各处均设有多个垃圾桶，提供回收及有机废弃物分类选项，并配有指引标识协助您分类投放。感谢您的细心配合，共同保持赛会与地球环境的整洁。",
              "Shuttles are scheduled to leave every half an hour, and at peak times, they are scheduled to leave once at full capacity.": "接驳车按计划每半小时发车一班；在高峰时段，接驳车满载即刻发车。",
              "For food kiosk options, keep a lookout for the mobile food carts on the move throughout the stadium, or head to the main kiosk! Drinks and snacks as well as vegan-friendly options are available.": "关于美食用餐选择，请留意在整个体育场内流动巡回的移动美食餐车，或直接前往主美食商铺！现场提供各类饮品、小吃以及纯素食亲和选项。",
              "🗺️ **Say-Bo Navigation & Directions Helper**:\nTo calculate your exact walking distance and step-by-step compass directions, please select or specify your current closest checkpoint location from our stadium directory:\n\n📍 **Available Checkpoint Locations:**\n• 🚪 Main Entrance Gate\n• 🚪 Main Exit Gate\n• ☀️ Solar Charging Station\n• 🚌 Shuttle Pick-up\n• 🎧 Audio Headsets\n• ♿ Restrooms\n• ℹ️ Info & Help Desk\n• 🍎 Food Kiosk\n• 🏟️ Main Venue Zone\n\n👉 You can also tap the **🗺️ Get Directions** button above to calculate exact distance metrics and cardinal steps (North, South, East, West) in real-time!": "🗺️ **Say-Bo 路线指引与导航助手**:\n为计算您的准确步行距离与分步指南针方向，请在体育场目录中选择或说明您当前最近的检查点位置：\n\n📍 **可选检查点位置:**\n• 🚪 主入口通道\n• 🚪 主出口通道\n• ☀️ 太阳能充电站\n• 🚌 接驳车乘车点\n• 🎧 辅助语音耳机\n• ♿ 盥洗室\n• ℹ️ 问讯与服务台\n• 🍎 美食餐饮商铺\n• 🏟️ 主场馆核心区\n\n👉 您也可以点击上方的 **🗺️ 获取路线** 按钮，实时计算精确距离与东南西北方向走法！",
              "Accessibility Alert: Elevator E-4 near Gate 6 is currently offline. Accessibility paths have been rerouted to auxiliary ramps. A repair crew is dispatched and on-route.": "无障碍警报：6号门附近的E-4电梯目前已离线。无障碍通道已重定向至辅助坡道。维修人员已派出并在途中。",
              "Grid Load Alert: Venue C Substation is drawing heavy load (880 kW Peak). Recommendation is to toggle Solar Battery Peak Shaving to buffer 150 kW and reduce draw on non-renewable grid supplies.": "电网负载警报：区域C变电站目前负载过重（峰值880 kW）。建议开启太阳能电池削峰填谷以缓冲150 kW，减少非可再生电网的消耗。",
              "Vision AI Audit: Compost Bin #4 at Plaza Food Court contains non-compostable plastics (89% probability). Sorter crew dispatch has been suggested.": "视觉人工智能审计：广场美食广场的4号堆肥箱中含有不可降解的塑料（89%概率）。建议派遣垃圾分类小组。",
              "Feedback translation and sentiment analysis runs automatically on incoming posts. Tapping 'Translate' uses Gemini 2.5 Flash to convert feedback, classify sentiment, and route urgent accessibility reports within 5 minutes.": "反馈翻译和情感分析会自动在收到的帖子中运行。点击“翻译”即可使用Gemini 2.5 Flash转换反馈、分类情感，并在5分钟内分配紧急的无障碍报告。",
              "Hello! I am here and ready to guide you. As your stadium assistant, I can help you find universal restrooms, locate solar charging hubs, calculate walking directions, or check transit schedules. How can I assist you today?": "您好！我已经准备好为您提供指引。作为您的体育场助手，我可以帮助您寻找通用洗手间、定位太阳能充电中心、计算步行路线或查询接驳车时刻表。今天有什么我可以帮您的？",
              "I am Say-Bo, your EcoAccess Spectator Assistant. My focus is to help you navigate the APAC Stadium sustainably and inclusively. Would you like to check accessible directions on the grid, view solar charging nodes, or look up electric shuttle updates?": "我是 Say-Bo，您的 EcoAccess 观众指南助手。我的任务是协助您以绿色环保且无障碍的方式游览 APAC 体育场。您想查询网格上的无障碍路线、查看太阳能充电桩位置，还是检索电动接驳车的最新动态？",
              "I understand your message, but as your virtual stadium navigator, I am focused on the venue's logistics. Let's get back on track: would you like to calculate directions from the Main Entrance Gate, locate the Food Kiosk, or find the nearest Restrooms?": "我理解您的意思，但作为您的虚拟场馆导航员，我的职责专注于场馆后勤。让我们回到正轨：您想计算从主入口出发的路线，寻找餐饮美食商铺，还是寻找最近的盥洗室？"
            },
            de: {
              "Audio Headsets: To hire audio headsets or for battery queries - please proceed to the main help and information desk for rental. Please note: To promote care - any loss or damages are 100% on the attendee.": "Audio-Headsets: Zum Ausleihen von Audio-Headsets oder bei Fragen zum Akku wenden Sie sich bitte an den Haupt-Info- und Helpdesk zum Verleih. Bitte beachten Sie: Um einen sorgfältigen Umgang zu fördern, gehen Verlust oder Beschädigung zu 100 % zu Lasten des Teilnehmers.",
              "Solar Charging Station: Please understand and to consider all attendee's - there is a 10 minute allocation for the Solar Charging Station and attendees are required to stay with their device for the duration of use. Please do not leave your device unattended. The Venue is not resposible for theft, loss or damage when on site. Thank you.": "Solar-Ladestation: Bitte haben Sie Verständnis und nehmen Sie Rücksicht auf alle Teilnehmer – für die Solar-Ladestation gilt eine Zeitfenster von 10 Minuten, und die Teilnehmer müssen während der Nutzung bei ihrem Gerät bleiben. Bitte lassen Sie Ihr Gerät nicht unbeaufsichtigt. Das Stadion übernimmt keine Haftung für Diebstahl, Verlust oder Beschädigung vor Ort. Vielen Dank.",
              "Multiple bins are located around the stadium with recycling and organic waste options with signage to help you decide how to dispose, thank you for being mindful and helping the event and planet stay clean.": "Im gesamten Stadion befinden sich mehrere Abfallbehälter für Recycling und organische Abfälle mit Beschilderungen, die Ihnen bei der Entsorgung helfen. Vielen Dank für Ihre Umsicht und Ihren Beitrag dazu, die Veranstaltung und den Planeten sauber zu halten.",
              "Shuttles are scheduled to leave every half an hour, and at peak times, they are scheduled to leave once at full capacity.": "Shuttles fahren fahrplanmäßig alle halbe Stunde ab, und zu Stoßzeiten fahren sie ab, sobald sie vollständig besetzt sind.",
              "For food kiosk options, keep a lookout for the mobile food carts on the move throughout the stadium, or head to the main kiosk! Drinks and snacks as well as vegan-friendly options are available.": "Achten Sie für Verpflegungsoptionen auf die mobilen Essenswagen, die im gesamten Stadion unterwegs sind, oder begeben Sie sich zum Hauptkiosk! Getränke und Snacks sowie vegan-freundliche Optionen sind verfügbar."
            }
          };
          const targetLang = transDict[appLanguage];
          if (targetLang && targetLang[replyText]) {
            replyText = targetLang[replyText];
          }
        }

        setChatMessages(prev => [...prev, {
          sender: 'ai',
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          citations,
          ragSnippet
        }]);
        setIsTyping(false);
      });
  };

  useEffect(() => {
    if (chatMessages.length > 1) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isTyping]);

  const toggleRAGExpand = (idx) => {
    setExpandedRAG(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const triggerNotification = (notifType) => {
    if (!bluetoothLive) return;

    const notifDict = {
      en: {
        vegan: { id: 'notif-vegan', title: '🥗 EcoAccess.ai: Vegan Dining Active', text: "Concessions update: Spectators can purchase low-carbon vegan wraps at the Food Kiosk to reduce Scope 3 dietary emissions by 40%.", time: 'Just Now', type: 'vegan' },
        rubbish: { id: 'notif-waste', title: '♻️ EcoAccess.ai: Recycling Guide', text: "Recycle alert: Please separate recyclable plastic items and drop them off in the bins to help us achieve a zero-waste match.", time: 'Just Now', type: 'waste' },
        exit: { id: 'notif-egress', title: '🚪 EcoAccess.ai: Optimized Egress', text: "Crowd notice: Avoid egress bottlenecks near the Main Entrance Gate. Spectators are guided to route via the Main Exit Gate for a faster, low-congestion egress outflow.", time: 'Just Now', type: 'transit' },
        shuttle: { id: 'notif-shuttle', title: '🚌 EcoAccess.ai: Low-Carbon Transit', text: "Shuttle update: Low-floor electric shuttles are departing every 5 minutes from the Shuttle Pick-up to decrease private vehicle emissions.", time: 'Just Now', type: 'transit' },
        solar: { id: 'notif-solar', title: '☀️ EcoAccess.ai: Solar Charger Active', text: "Energy alert: Clean solar-powered phone charging points are fully available near the Solar Charging Station. Battery peak-shaving is active.", time: 'Just Now', type: 'solar' }
      },
      es: {
        vegan: { id: 'notif-vegan', title: '🥗 EcoAccess.ai: Comida Vegana Activa', text: "Actualización de concesiones: Los espectadores pueden comprar wraps veganos de bajo carbono en el Quiosco de Comida para reducir las emisiones alimentarias de Alcance 3 en un 40%.", time: 'Ahora', type: 'vegan' },
        rubbish: { id: 'notif-waste', title: '♻️ EcoAccess.ai: Guía de Reciclaje', text: "Alerta de reciclaje: Separe los plásticos reciclables y deposítelos en los contenedores correspondientes para lograr un evento residuo cero.", time: 'Ahora', type: 'waste' },
        exit: { id: 'notif-egress', title: '🚪 EcoAccess.ai: Salida Optimizada', text: "Aviso de multitud: Evite cuellos de botella cerca de la Puerta de Entrada Principal. Se guía a los espectadores a salir por la Puerta de Salida Principal para un flujo más rápido.", time: 'Ahora', type: 'transit' },
        shuttle: { id: 'notif-shuttle', title: '🚌 EcoAccess.ai: Tránsito de Bajo Carbono', text: "Actualización de transbordo: Los autobuses eléctricos de piso bajo salen cada 5 minutos desde la Parada de Transbordo para reducir las emisiones de vehículos privados.", time: 'Ahora', type: 'transit' },
        solar: { id: 'notif-solar', title: '☀️ EcoAccess.ai: Cargador Solar Activo', text: "Alerta de energía: Los puntos de carga solar para teléfonos están disponibles cerca de la Estación de Carga Solar. Amortiguación de picos activa.", time: 'Ahora', type: 'solar' }
      },
      ja: {
        vegan: { id: 'notif-vegan', title: '🥗 EcoAccess.ai: ビーガンフード販売中', text: "売店アップデート：フード売店にて低炭素ビーガンラップを販売中。食事に伴うスコープ3排出量を40%削減します。", time: 'たった今', type: 'vegan' },
        rubbish: { id: 'notif-waste', title: '♻️ EcoAccess.ai: リサイクルガイド', text: "リサイクル通知：プラスチック容器の分別回収にご協力ください。ごみを減らし、ゼロ・ウェイストな試合運営を目指しましょう。", time: 'たった今', type: 'waste' },
        exit: { id: 'notif-egress', title: '🚪 EcoAccess.ai: 最適化退場ルート', text: "退場客流案内：メイン入場ゲート付近の混雑を避けるため、スムーズで低滞留なメイン退場ゲートをご利用ください。", time: 'たった今', type: 'transit' },
        shuttle: { id: 'notif-shuttle', title: '🚌 EcoAccess.ai: 低炭素交通運行中', text: "シャトル便情報：自家用車の排出ガス削減のため、シャトル便乗車場所より低床電動シャトルが5分間隔で運行中です。", time: 'たった今', type: 'transit' },
        solar: { id: 'notif-solar', title: '☀️ EcoAccess.ai: ソーラー充電スタンド稼働中', text: "電力お知らせ：ソーラー充電ステーション付近にて、太陽光発電によるクリーンなスマホ充電ポートが利用可能です。蓄電池のピークカット稼働中。", time: 'たった今', type: 'solar' }
      },
      zh: {
        vegan: { id: 'notif-vegan', title: '🥗 EcoAccess.ai: 纯植物基素食供应中', text: "餐饮更新：观众可在餐饮美食商铺购买低碳植物基素食卷，将 Scope 3 膳食碳足迹削减 40%。", time: '刚刚', type: 'vegan' },
        rubbish: { id: 'notif-waste', title: '♻️ EcoAccess.ai: 垃圾分类回收指南', text: "回收提醒：请将可回收塑料制品投放入对应的分类回收桶中，共同打造零废弃赛会。", time: '刚刚', type: 'waste' },
        exit: { id: 'notif-egress', title: '🚪 EcoAccess.ai: 最佳离场客流引导', text: "人流通知：请避开主入口通道闸机处的离场瓶颈。请观众经由主出口通道闸机离场，享受更顺畅快捷的通行。", time: '刚刚', type: 'transit' },
        shuttle: { id: 'notif-shuttle', title: '🚌 EcoAccess.ai: 低碳绿色接驳交通', text: "接驳车动态：低地板纯电动接驳巴士每 5 分钟从接驳车乘车点发车，有效削减私家车碳排放。", time: '刚刚', type: 'transit' },
        solar: { id: 'notif-solar', title: '☀️ EcoAccess.ai: 太阳能充电桩已就绪', text: "绿电提醒：太阳能移动充电站附近提供全套清洁太阳能手机充电点位，蓄电池削峰填谷模式持续运行中。", time: '刚刚', type: 'solar' }
      },
      de: {
        vegan: { id: 'notif-vegan', title: '🥗 EcoAccess.ai: Veganes Essen Aktiv', text: "Kiosk-Update: Zuschauer können am Lebensmittel-Kiosk kohlenstoffarme vegane Wraps kaufen, um die Scope-3-Ernährungsemissionen um 40 % zu reduzieren.", time: 'Gerade eben', type: 'vegan' },
        rubbish: { id: 'notif-waste', title: '♻️ EcoAccess.ai: Recycling-Leitfaden', text: "Recycling-Hinweis: Bitte trennen Sie wiederverwertbare Kunststoffartikel und werfen Sie sie in die Behälter, um ein abfallfreies Spiel zu erreichen.", time: 'Gerade eben', type: 'waste' },
        exit: { id: 'notif-egress', title: '🚪 EcoAccess.ai: Optimierter Ausstieg', text: "Zuschauerhinweis: Vermeiden Sie Engpässe am Haupteingangstor. Nutzen Sie das Hauptausgangstor für einen schnelleren, staufreien Abfluss.", time: 'Gerade eben', type: 'transit' },
        shuttle: { id: 'notif-shuttle', title: '🚌 EcoAccess.ai: Kohlenstoffarmer Transit', text: "Shuttle-Update: Niederflur-Elektroshuttles fahren alle 5 Minuten an der Shuttle-Abholzone ab, um Emissionen von Privatfahrzeugen zu senken.", time: 'Gerade eben', type: 'transit' },
        solar: { id: 'notif-solar', title: '☀️ EcoAccess.ai: Solar-Ladestation Aktiv', text: "Energie-Hinweis: Saubere solarbetriebene Telefon-Ladestationen stehen nahe der Solar-Ladestation bereit. Batterie-Spitzenlastkappung ist aktiv.", time: 'Gerade eben', type: 'solar' }
      }
    };

    const currentDict = notifDict[appLanguage] || notifDict.en;
    const newNotif = currentDict[notifType];
    if (newNotif) {
      setReceivedNotifications(prev => [newNotif, ...prev.filter(n => n.id !== newNotif.id)]);
    }
  };

  const t = chatTranslations[appLanguage] || chatTranslations.en;

  return (
    <div className="animate-slide-up">
      <div className="section-grid-2x1">
        
        {/* LEFT: CHATBOT PANEL */}
        <div className="glass-panel chatbot-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '520px' }}>
          <div className="panel-header">
            <h2 className="panel-title">
              <Cpu size={18} style={{color: portalRole === 'attendee' ? 'var(--color-accent-emerald)' : 'var(--color-accent-indigo)'}} />
              {portalRole === 'attendee' ? t.chatTitleAttendee : t.chatTitleManager}
            </h2>
            {portalRole === 'attendee' && (
              <span className="pulse-indicator">
                <div className="pulse-dot" style={{ backgroundColor: 'var(--color-accent-emerald)' }}></div>
                <span style={{ fontSize: '0.65rem', fontWeight: 'bold' }}>{t.sayBoActive}</span>
              </span>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Messages viewport */}
          <div className="chat-messages" style={{ height: '400px', overflowY: 'auto', paddingRight: '4px' }}>
            {chatMessages.map((msg, index) => {
              let messageText = msg.text;
              if (index === 0 && msg.sender === 'ai' && msg.text.startsWith("Hello! I am Say-Bo")) {
                const greetings = {
                  en: "Hello! I am Say-Bo, your EcoAccess Global Event Assistant. How can I assist you?",
                  es: "¡Hola! Soy Say-Bo, su Asistente de Eventos Globales de EcoAccess. ¿Cómo puedo ayudarlo?",
                  ja: "こんにちは！私はSay-Bo、あなたのEcoAccessグローバルイベントアシスタントです。どのようにサポートできますか？",
                  zh: "您好！我是 Say-Bo，您的 EcoAccess 全球活动助手。我该如何协助您？",
                  de: "Hallo! Ich bin Say-Bo, Ihr globaler EcoAccess-Event-Assistent. Wie kann ich Sie unterstützen?"
                };
                messageText = greetings[appLanguage] || greetings.en;
              }

              return (
                <div key={index} className={`chat-bubble ${msg.sender} animate-slide-up`} style={{ marginBottom: '0.5rem' }}>
                  <span>{messageText}</span>
                  
                  {portalRole === 'attendee' && msg.sender === 'user' && (
                    <div style={{ marginTop: '0.35rem', display: 'flex', justifyContent: 'flex-end' }}>
                      <button
                        type="button"
                        style={{ 
                          fontSize: '0.55rem', 
                          padding: '0.15rem 0.35rem', 
                          margin: 0, 
                          borderRadius: '4px',
                          background: sentFeedbacks[index] ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                          border: sentFeedbacks[index] ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid var(--border-color)',
                          color: sentFeedbacks[index] ? 'var(--color-accent-emerald)' : 'var(--color-text-secondary)',
                          cursor: 'pointer'
                        }}
                        disabled={sentFeedbacks[index]}
                        onClick={() => handleSendFeedback(index, msg.text)}
                      >
                        {sentFeedbacks[index] ? '✅ Sent to Manager' : '📢 Send Feedback to Manager'}
                      </button>
                    </div>
                  )}
                  
                  {portalRole === 'manager' && msg.ragSnippet && (
                    <div style={{ background: 'rgba(99, 102, 241, 0.05)', border: '1px solid rgba(99, 102, 241, 0.15)', padding: '0.5rem', borderRadius: '6px', marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                      <div 
                        onClick={() => toggleRAGExpand(index)} 
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', fontWeight: '700', color: 'var(--color-accent-indigo)' }}
                      >
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Info size={12} /> AlloyDB pgvector RAG Reference
                        </span>
                        <button style={{ background: 'transparent', border: 'none', color: 'var(--color-accent-indigo)', fontSize: '0.65rem', cursor: 'pointer' }}>
                          {expandedRAG[index] ? '[Collapse]' : '[Expand Details]'}
                        </button>
                      </div>
                      {expandedRAG[index] && (
                        <p style={{ marginTop: '0.35rem', fontStyle: 'italic', margin: '0.35rem 0 0 0', lineHeight: 1.4, color: 'var(--color-text-primary)' }}>
                          {msg.ragSnippet}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Interactive Satisfaction Survey Card (Appears after all 5 star rating choices are selected) */}
            {portalRole === 'attendee' && Boolean(userChoices?.dietary && userChoices?.transport && userChoices?.waste && userChoices?.reusable && userChoices?.sanitizer) && (
              <div className="satisfaction-prompt-card" style={{ 
                padding: '0.85rem 1rem', 
                background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.12) 0%, rgba(16, 185, 129, 0.12) 100%)', 
                border: '1px solid rgba(6, 182, 212, 0.4)', 
                borderRadius: '10px', 
                margin: '0.75rem 0',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
              }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#fff', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span>🌟</span> {t.satisfactionQuestion || "Are you satisfied with Say-Bo and EcoAccess.ai?"}
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', margin: '0 0 0.6rem 0' }}>
                  {t.satisfactionSub || "Your feedback is logged directly into the Manager Command Center's Multilingual Spectator Feedback Feed."}
                </p>

                {satisfactionSubmitted ? (
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-accent-emerald)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    {t.satisfactionDone || "✓ Response Logged: Thank you for sharing your feedback with Stadium Operations!"}
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: '0.55rem', alignItems: 'center' }}>
                    <button
                      type="button"
                      className="button primary"
                      style={{ fontSize: '0.75rem', padding: '0.35rem 0.85rem', background: 'var(--color-accent-emerald)', borderColor: 'var(--color-accent-emerald)', margin: 0, cursor: 'pointer' }}
                      onClick={() => handleSatisfactionVote('Yes')}
                    >
                      {t.satisfactionYes || "👍 Yes, Very Satisfied!"}
                    </button>
                    <button
                      type="button"
                      className="button secondary"
                      style={{ fontSize: '0.75rem', padding: '0.35rem 0.85rem', borderColor: 'var(--color-accent-pink)', color: 'var(--color-accent-pink)', margin: 0, cursor: 'pointer' }}
                      onClick={() => handleSatisfactionVote('No')}
                    >
                      {t.satisfactionNo || "👎 Needs Improvement"}
                    </button>
                  </div>
                )}
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Directions Toggle & Language Selector Option in Chat Interface */}
          <div style={{ padding: '0.4rem 0.5rem 0.25rem 0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
            {portalRole === 'attendee' ? (
              <button
                type="button"
                className="button secondary"
                style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem', border: '1px solid rgba(236, 72, 153, 0.3)', color: 'var(--color-accent-pink)', display: 'flex', alignItems: 'center', gap: '3px', margin: 0 }}
                onClick={() => setShowDirectionsForm(!showDirectionsForm)}
              >
                🗺️ {showDirectionsForm ? t.hideRouting : t.getDirections}
              </button>
            ) : (
              <span style={{ fontSize: '0.65rem', color: 'var(--color-accent-indigo)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MessageSquare size={12} /> Vertex AI Translation Mode
              </span>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ fontSize: '0.65rem', color: 'var(--color-text-secondary)', fontWeight: 'bold' }}>{t.languageLabel}</span>
              <select
                value={appLanguage}
                onChange={(e) => setAppLanguage(e.target.value)}
                style={{ fontSize: '0.65rem', padding: '0.15rem 0.35rem', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-color)', borderRadius: '4px', color: '#fff', cursor: 'pointer', margin: 0 }}
              >
                <option value="en">🇺🇸 English</option>
                <option value="es">🇪🇸 Spanish</option>
                <option value="ja">🇯🇵 Japanese</option>
                <option value="zh">🇨🇳 Chinese</option>
                <option value="de">🇩🇪 German</option>
              </select>
            </div>
          </div>

          {/* Directions Routing Selector Form */}
          {showDirectionsForm && portalRole === 'attendee' && (
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.5rem', margin: '0 0.5rem 0.5rem 0.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <span style={{ fontSize: '0.65rem', fontWeight: 'bold', color: '#fff', textTransform: 'uppercase' }}>🧭 {t.navigatorTitle}</span>
              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '100px', display: 'flex', flexDirection: 'column', gap: '1px' }}>
                  <span style={{ fontSize: '0.55rem', color: 'var(--color-text-muted)' }}>{t.startLocation}</span>
                  <select 
                    value={startNode} 
                    onChange={(e) => setStartNode(e.target.value)}
                    style={{ fontSize: '0.65rem', padding: '0.2rem', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-color)', borderRadius: '4px', color: '#fff' }}
                  >
                    {gridNodes.map(n => <option key={n.id} value={n.id}>{n.name}</option>)}
                  </select>
                </div>
                <div style={{ flex: 1, minWidth: '100px', display: 'flex', flexDirection: 'column', gap: '1px' }}>
                  <span style={{ fontSize: '0.55rem', color: 'var(--color-text-muted)' }}>{t.endLocation}</span>
                  <select 
                    value={endNode} 
                    onChange={(e) => setEndNode(e.target.value)}
                    style={{ fontSize: '0.65rem', padding: '0.2rem', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-color)', borderRadius: '4px', color: '#fff' }}
                  >
                    {gridNodes.map(n => <option key={n.id} value={n.id}>{n.name}</option>)}
                  </select>
                </div>
              </div>
              <button
                type="button"
                className="button primary"
                style={{ fontSize: '0.65rem', padding: '0.25rem', width: '100%', border: 'none', margin: 0 }}
                onClick={handleCalculateDirections}
              >
                {t.calcRouteBtn}
              </button>
            </div>
          )}

          <form className="chat-input-area" onSubmit={handleLocalChatSubmit} style={{ marginTop: 'auto' }}>
            <input 
              type="text" 
              className="chat-input"
              placeholder={portalRole === 'attendee' ? t.placeholderAttendee : t.placeholderManager}
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
            />
            <button type="submit" className="btn-icon">
              <Send size={16} style={{color: '#fff'}} />
            </button>
          </form>
        </div>

        {/* RIGHT PANEL: ROLE-BASED */}
        {portalRole === 'attendee' ? (
          <div className="glass-panel" style={{display: 'flex', flexDirection: 'column', minHeight: '520px'}}>
            <div className="panel-header">
              <h2 className="panel-title">
                <Volume2 size={18} style={{color: 'var(--color-accent-cyan)'}} />
                {t.notifHubTitle}
              </h2>
              <span className={`sentiment-pill ${bluetoothLive ? 'positive' : 'neutral'}`} style={{ fontSize: '0.65rem' }}>
                {bluetoothLive ? t.connectedStatus : t.disconnectedStatus}
              </span>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', padding: '0.5rem', borderRadius: '6px', marginBottom: '0.75rem', fontSize: '0.7rem', color: 'var(--color-text-secondary)', lineHeight: 1.3 }}>
              Status: <strong>{bluetoothLive ? `📡 ${t.broadcastingLive}` : `⚠️ ${t.offlineStatus}`}</strong>. {bluetoothLive ? t.notifLogsActive : t.notifLogsInactive}
            </div>

            {bluetoothLive && (
              <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', padding: '0.5rem', borderRadius: '6px', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.65rem', fontWeight: '800', color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.35rem', textTransform: 'uppercase' }}>{t.demoPanelTitle}</span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '4px' }}>
                  <button className="button secondary" style={{ fontSize: '0.6rem', padding: '0.25rem', border: 'none' }} onClick={() => triggerNotification('vegan')}>{t.btnVegan}</button>
                  <button className="button secondary" style={{ fontSize: '0.6rem', padding: '0.25rem', border: 'none' }} onClick={() => triggerNotification('rubbish')}>{t.btnRubbish}</button>
                  <button className="button secondary" style={{ fontSize: '0.6rem', padding: '0.25rem', border: 'none' }} onClick={() => triggerNotification('exit')}>{t.btnExit}</button>
                  <button className="button secondary" style={{ fontSize: '0.6rem', padding: '0.25rem', border: 'none' }} onClick={() => triggerNotification('shuttle')}>{t.btnShuttle}</button>
                  <button className="button secondary" style={{ fontSize: '0.6rem', padding: '0.25rem', border: 'none', gridColumn: 'span 2' }} onClick={() => triggerNotification('solar')}>{t.btnSolar}</button>
                </div>
              </div>
            )}

            <div style={{ flexGrow: 1, overflowY: 'auto', maxHeight: '200px', paddingRight: '4px' }}>
              {receivedNotifications.length === 0 ? (
                <span style={{ display: 'block', textAlign: 'center', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '2rem' }}>{t.noNotifications}</span>
              ) : (
                receivedNotifications.map(notif => (
                  <div key={notif.id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.6rem', marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#fff' }}>{notif.title}</span>
                      <span style={{ fontSize: '0.6rem', color: 'var(--color-text-muted)' }}>{notif.time}</span>
                    </div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)', lineHeight: 1.3, display: 'block' }}>{notif.text}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          <div className="glass-panel" style={{display: 'flex', flexDirection: 'column'}}>
            <div className="panel-header">
              <h2 className="panel-title">
                <MessageSquare size={18} style={{color: 'var(--color-accent-pink)'}} />
                {t.feedbackFeedTitle}
              </h2>
            </div>

            <span style={{fontSize: '0.8rem', color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.75rem'}}>
              Foreign language fan submissions are matched via **AlloyDB pgvector** and automatically translated to identify accessibility barriers:
            </span>

            <div className="citizen-reports-list" style={{maxHeight: '380px', overflowY: 'auto', paddingRight: '4px'}}>
              {spectatorFeedbacks.map(rep => (
                <div key={rep.id} className="citizen-report-card" style={{background: 'rgba(255, 255, 255, 0.01)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.75rem', marginBottom: '0.75rem'}}>
                  <div className="report-top" style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem'}}>
                    <span className="report-cat" style={{fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--color-text-secondary)'}}>{t.feedbackCategory} {rep.category} ({rep.language})</span>
                  </div>
                  <span className="report-text" style={{fontStyle: 'italic', fontSize: '0.8rem', color: 'var(--color-text-primary)', display: 'block', marginBottom: '0.5rem'}}>"{rep.text}"</span>
                  
                  {rep.translation ? (
                    <div style={{background: 'rgba(99, 102, 241, 0.05)', padding: '0.5rem', borderRadius: '4px', marginTop: '0.25rem', borderLeft: '2px solid var(--color-accent-indigo)'}}>
                      <span style={{fontSize: '0.7rem', fontWeight: '700', color: 'var(--color-accent-indigo)', display: 'block', marginBottom: '0.25rem'}}>AI English Translation</span>
                      <span style={{fontSize: '0.8rem', color: 'var(--color-text-primary)'}}>{rep.translation}</span>
                    </div>
                  ) : (
                    <button 
                      className="button primary" 
                      style={{padding: '0.25rem 0.5rem', fontSize: '0.7rem', marginTop: '0.25rem', minWidth: 'auto', border: 'none'}}
                      onClick={() => translateFeedback(rep.id, rep.text)}
                    >
                      {t.translateGemini}
                    </button>
                  )}
                  
                  <div className="report-bottom" style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--color-text-muted)', marginTop: '0.5rem'}}>
                    <span>{rep.date}</span>
                    <span>Urgency: <strong style={{color: rep.urgency === 'high' ? 'var(--color-accent-red)' : 'var(--color-text-secondary)'}}>{rep.urgency.toUpperCase()}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
