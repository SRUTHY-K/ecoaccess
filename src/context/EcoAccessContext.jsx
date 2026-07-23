import React, { createContext, useContext, useState, useEffect } from 'react';

const EcoAccessContext = createContext();

const contextTranslations = {
  en: {
    star1: "Welcome! You made your first sustainable choice during the event to start lowering your carbon footprint and earn EcoStars.",
    star2: "You're doing a great job! You are actively reducing your carbon footprint. The planet appreciates you!",
    star3: "Awesome work in reducing your carbon footprint. Future generations will surely appreciate your choices.",
    star4: "From your sustainable choices throughout our venue, you have reduced your carbon footprint drastically. You are a breath of fresh air to the planet!",
    star5: "You are an eco-sustainability warrior! Your CO2 footprint was very minimal. Congratulations!",
    co2SavedLabel: "Individual CO2 Saved:",
    ratingLabel: "Rating:",
    star5Unlocked: "🌟 **5-Star Eco Warrior Rating Unlocked!**",

    dietaryVeganUser: "I choose the Plant-based Vegan Option! 🌿",
    dietaryStandardUser: "I choose the Standard Meal Option. 🍔",
    transportStairsUser: "I choose to take the stairs! 🚶‍♂️",
    transportRampUser: "I choose to use the accessibility ramp! ♿",
    transportElevatorUser: "I choose to use the elevator. 🛗",
    wasteRecycleUser: "I choose recycling to reduce my footprint! ♻️",
    wasteStandardUser: "I choose standard waste sorting. 🗑️",
    reusableYesUser: "I brought my own reusable cutlery and containers! 🥤",
    reusableNoUser: "I am using standard single-use cups. 🥛",
    sanitizerYesUser: "I will use waterless hand sanitizer to save water! 🧼",
    sanitizerNoUser: "I will wash my hands at the tap. 🚰",

    dietaryVeganAi: "If you choose our Plant-based vegan options, you are helping the planet. Transitioning to a vegan plant-based diet reduces carbon output by avoiding energy-intensive livestock processing.",
    dietaryStandardAi: "You've selected the standard culinary menu. Vegan alternatives remain available at concessions surrounding nodes 1, 2, and 4.",
    transportStairsAi: "If you take the stairs rather than the elevator, you are helping the planet. When navigating between levels, choosing to take the stairs rather than the elevator makes your carbon footprint go down and increases crowd satisfaction.",
    transportRampAi: "If you use the accessibility ramp option, you are helping the planet by utilizing fully accessible, zero-power incline transit. Ramp routes are open across all stadium sections.",
    transportElevatorAi: "You've chosen the elevator. Standard lift transit consumes grid-connected power, but remains fully accessible for those requiring vertical assistance.",
    wasteRecycleAi: "If you put your rubbish away in the correct bins, you are helping the planet. Correct waste sorting diverts compostable materials away from heavy Scope 3 waste emissions.",
    wasteStandardAi: "Waste disposed. Remember to check bin labels! AI CCTV monitoring reports organic materials are active at Food Court Bin #4.",
    reusableYesAi: "If you brought your own reusable cutlery and plates or containers, you are helping the planet. Eliminating single-use food packaging prevents upstream plastic production emissions.",
    reusableNoAi: "Single-use cup selected. EcoAccess reminds all attendees that bringing reusable utensils is the best way to optimize circular economy ratios.",
    sanitizerYesAi: "If you use hand sanitizer rather than washing your hands, you are helping save our precious H2O. Using waterless gel saves liters of clean municipal water.",
    sanitizerNoAi: "Washing hands at the basin. Opt for hand sanitizer next time to conserve water resources at our stadium taps!"
  },
  es: {
    star1: "¡Bienvenido! Has tomado tu primera decisión sostenible durante el evento para comenzar a reducir tu huella de carbono y ganar EcoStars.",
    star2: "¡Estás haciendo un gran trabajo! Estás reduciendo activamente tu huella de carbono. ¡El planeta te lo agradece!",
    star3: "Excelente trabajo reduciendo tu huella de carbono. Las futuras generaciones agradecerán tus decisiones.",
    star4: "A través de tus elecciones sostenibles en nuestro recinto, has reducido drásticamente tu huella de carbono. ¡Eres un respiro para el planeta!",
    star5: "¡Eres un guerrero de la sostenibilidad ecológica! Tu huella de CO2 ha sido mínima. ¡Felicitaciones!",
    co2SavedLabel: "CO2 Individual Ahorrado:",
    ratingLabel: "Calificación:",
    star5Unlocked: "🌟 **¡Calificación 5 Estrellas de Guerrero Ecológico Desbloqueada!**",

    dietaryVeganUser: "¡Elijo la opción vegana basada en plantas! 🌿",
    dietaryStandardUser: "Elijo la opción de menú estándar. 🍔",
    transportStairsUser: "¡Elijo subir por las escaleras! 🚶‍♂️",
    transportRampUser: "¡Elijo usar la rampa de accesibilidad! ♿",
    transportElevatorUser: "Elijo usar el ascensor. 🛗",
    wasteRecycleUser: "¡Elijo el reciclaje para reducir mi huella! ♻️",
    wasteStandardUser: "Elijo la clasificación estándar de residuos. 🗑️",
    reusableYesUser: "¡Traje mis propios cubiertos y contenedores reutilizables! 🥤",
    reusableNoUser: "Estoy usando vasos desechables estándar. 🥛",
    sanitizerYesUser: "¡Usaré desinfectante sin agua para ahorrar agua! 🧼",
    sanitizerNoUser: "Me lavaré las manos en el grifo. 🚰",

    dietaryVeganAi: "Al elegir nuestras opciones veganas a base de plantas, estás ayudando al planeta al evitar el procesamiento intensivo de la ganadería.",
    dietaryStandardAi: "Has seleccionado el menú estándar. Las alternativas veganas siguen disponibles en las concesiones de los nodos 1, 2 y 4.",
    transportStairsAi: "Al usar las escaleras en lugar del ascensor, estás ayudando al planeta, reduciendo tu huella de carbono y mejorando la fluidez del público.",
    transportRampAi: "Al usar la rampa de accesibilidad, estás ayudando al planeta mediante un tránsito de inclinación cero emisiones y totalmente accesible.",
    transportElevatorAi: "Has elegido el ascensor. El tránsito en ascensor consume energía de la red, pero sigue siendo totalmente accesible.",
    wasteRecycleAi: "Al depositar tus residuos en los contenedores correctos, ayudas al planeta desviando materiales compostables de las emisiones Scope 3.",
    wasteStandardAi: "Residuos desechados. ¡Recuerda revisar las etiquetas de los contenedores! El monitoreo CCTV reporta reciclaje activo en el Contenedor #4.",
    reusableYesAi: "Al traer tus propios cubiertos y recipientes reutilizables, ayudas al planeta eliminando emisiones de fabricación de plásticos.",
    reusableNoAi: "Vaso desechable seleccionado. EcoAccess recuerda a todos los asistentes que traer recipientes reutilizables optimiza la economía circular.",
    sanitizerYesAi: "Al usar desinfectante de manos en lugar de lavártelas con agua, estás ahorrando litros de preciada agua potable.",
    sanitizerNoAi: "Lavado de manos en el lavabo. ¡Elige desinfectante de manos la próxima vez para conservar los recursos hídricos!"
  },
  ja: {
    star1: "ようこそ！イベント期間中に最初の持続可能な選択を行い、CO2排出量を削減してEcoStarを獲得し始めました。",
    star2: "素晴らしい取り組みです！積極的にCO2排出量を削減しています。地球もあなたに感謝しています！",
    star3: "CO2排出量の削減に向けた素晴らしい選択です。未来の世代もあなたの決断をきっと感謝するでしょう。",
    star4: "会場全体での持続可能な選択により、CO2排出量を大幅に削減しました。あなたは地球にとって新しい風です！",
    star5: "あなたは環境サステナビリティ・ウォリアーです！CO2排出量は極めて低く抑えられました。おめでとうございます！",
    co2SavedLabel: "個人CO2削減量:",
    ratingLabel: "評価:",
    star5Unlocked: "🌟 **5つ星エコ・ウォリアー称号獲得！**",

    dietaryVeganUser: "植物由来のビーガンメニューを選択します！ 🌿",
    dietaryStandardUser: "標準の食事メニューを選択します。 🍔",
    transportStairsUser: "階段を使って移動します！ 🚶‍♂️",
    transportRampUser: "バリアフリースロープを使用します！ ♿",
    transportElevatorUser: "エレベーターを使用して移動します。 🛗",
    wasteRecycleUser: "環境負荷削減のためリサイクル分別を選択します！ ♻️",
    wasteStandardUser: "標準のゴミ分別を選択します。 🗑️",
    reusableYesUser: "マイカトラリー＆マイ容器を持参しました！ 🥤",
    reusableNoUser: "標準の使い捨てカップを使用します。 🥛",
    sanitizerYesUser: "水を使わない手指消毒剤で節水します！ 🧼",
    sanitizerNoUser: "水道の蛇口で手洗いを行います。 🚰",

    dietaryVeganAi: "植物由来のビーガンメニューを選ぶことで、エネルギー集約的な畜産加工を回避し、地球環境の保護に直接貢献しています。",
    dietaryStandardAi: "標準の食事メニューを選択しました。ノード1、2、4周辺の売店ではビーガン対応メニューもご用意しています。",
    transportStairsAi: "エレベーターではなく階段を利用することで、電力を消費せずCO2排出量を削減し、来場者のスムーズな移動に貢献できます。",
    transportRampAi: "バリアフリースロープを利用することで、電力ゼロの完全アクセシブルな経路を活用し、地球環境の保護に貢献しています。",
    transportElevatorAi: "エレベーターを選択しました。エレベーターの利用は電力を消費しますが、移動サポートが必要な方に最適です。",
    wasteRecycleAi: "正しい分別箱にゴミを捨てることで、堆肥化可能な資源を埋め立てから回避し、スコープ3排出量を削減できます。",
    wasteStandardAi: "ゴミを廃棄しました。ゴミ箱のラベルをよくご確認ください。AIカメラがフードコートゴミ箱#4でのリサイクルを監視中です。",
    reusableYesAi: "マイカトラリーやマイ容器を持参することで、使い捨てプラスチック容器の製造・廃棄に伴うCO2排出を防止しています。",
    reusableNoAi: "使い捨てカップを選択しました。マイ容器の持参が循環型社会の実現とゴミ削減に最も効果的です。",
    sanitizerYesAi: "水を使わない手指消毒剤を使用することで、貴重な水道水を何リットルも節約し、節水に大きく貢献しています。",
    sanitizerNoAi: "水道で手洗いを行います。次回は手指消毒剤を利用して、スタジアムの貴重な水資源を保護しましょう！"
  },
  zh: {
    star1: "欢迎！您在本次活动中做出了首个绿色环保选择，正式开启降低碳足迹并赚取 EcoStars 的旅程。",
    star2: "表现非常出色！您正在积极践行低碳生活，降低个人碳排放。地球感谢您的付出！",
    star3: "在减少碳足迹方面做得太棒了！未来世代必将为您今天的明智选择表示感谢。",
    star4: "通过在场馆各处坚持环保选择，您大幅削减了碳排放。您是让地球焕发绿意的新鲜清流！",
    star5: "您是名副其实的绿色可持续发展战士！您的碳足迹已降低至极低水平。热烈祝贺！",
    co2SavedLabel: "个人累计减碳量:",
    ratingLabel: "环保评级:",
    star5Unlocked: "🌟 **荣耀解锁：5星级环保战士称号！**",

    dietaryVeganUser: "我选择纯植物基素食餐! 🌿",
    dietaryStandardUser: "我选择标准餐饮菜单。 🍔",
    transportStairsUser: "我选择走无障碍楼梯! 🚶‍♂️",
    transportRampUser: "我选择使用无障碍坡道! ♿",
    transportElevatorUser: "我选择乘坐无障碍电梯。 🛗",
    wasteRecycleUser: "我选择分类回收以降低碳足迹! ♻️",
    wasteStandardUser: "我选择标准垃圾分类。 🗑️",
    reusableYesUser: "我自带了自带可重复使用的餐具和水杯! 🥤",
    reusableNoUser: "我正在使用标准一次性杯子。 🥛",
    sanitizerYesUser: "我将使用免洗洗手液以节约水资源! 🧼",
    sanitizerNoUser: "我将在水龙头下洗手。 🚰",

    dietaryVeganAi: "选择纯植物基素食菜单有助于减少高能耗的畜牧业加工碳排放，直接助力保护地球环境。",
    dietaryStandardAi: "您已选择标准菜单。1号、2号和4号节点附近的餐饮铺均提供无碳植物基素食备选。",
    transportStairsAi: "选择步行楼梯而非电梯，不仅能直接降低电网用电负荷与碳足迹，还能有效提升场馆客流通行顺畅度。",
    transportRampAi: "使用无障碍坡道利用了零能耗的绿色通行方式，保障人人共享无障交通的同时实现了零排放。",
    transportElevatorAi: "您选择了乘坐电梯。标准电梯运行会消耗电网电量，但为需要垂直交通协助的观众提供全方位无障碍保障。",
    wasteRecycleAi: "将垃圾投放到正确的分类回收桶中，可避免有机可降解材料进入垃圾填埋场，从而削减 Scope 3 废弃物碳排放。",
    wasteStandardAi: "垃圾已投放。请务必查看分类桶标识！AI 视觉监控显示美食广场 4 号桶正在进行智能分类分析。",
    reusableYesAi: "自带可重复使用的餐具与容器能够从源头上消除一次性塑料包装生产所产生的上游碳排放。",
    reusableNoAi: "已选择一次性杯子。EcoAccess 提醒广大观众，自带环保餐具是提升场馆资源循环利用率的最佳途径。",
    sanitizerYesAi: "使用免洗消毒凝胶代替水洗手，每次均可节省数升宝贵的市政清洁水资源。",
    sanitizerNoAi: "使用水龙头洗手。下次不妨尝试免洗洗手液，共同节约场馆的水资源！"
  },
  de: {
    star1: "Willkommen! Sie haben Ihre erste nachhaltige Entscheidung getroffen, um Ihren CO2-Fußabdruck zu senken und EcoStars zu sammeln.",
    star2: "Großartige Arbeit! Sie reduzieren aktiv Ihren CO2-Fußabdruck. Der Planet dankt es Ihnen!",
    star3: "Hervorragende Arbeit bei der CO2-Reduzierung. Zukünftige Generationen werden Ihre Entscheidungen schätzen.",
    star4: "Durch Ihre nachhaltigen Entscheidungen in unserem Stadion haben Sie Ihren CO2-Ausstoß drastisch gesenkt. Ein echter Gewinn für den Planeten!",
    star5: "Sie sind ein wahrer Eco-Sustainability Warrior! Ihr CO2-Fußabdruck war minimal. Herzlichen Glückwunsch!",
    co2SavedLabel: "Individuell eingespartes CO2:",
    ratingLabel: "Bewertung:",
    star5Unlocked: "🌟 **5-Sterne Eco Warrior Bewertung Freigeschaltet!**",

    dietaryVeganUser: "Ich wähle die pflanzliche vegane Option! 🌿",
    dietaryStandardUser: "Ich wähle das Standard-Menü. 🍔",
    transportStairsUser: "Ich nehme die Treppe! 🚶‍♂️",
    transportRampUser: "Ich nutze die Barrierefreiheitsrampe! ♿",
    transportElevatorUser: "Ich wähle den Aufzug. 🛗",
    wasteRecycleUser: "Ich wähle Recycling zur CO2-Senkung! ♻️",
    wasteStandardUser: "Ich wähle die Standard-Mülltrennung. 🗑️",
    reusableYesUser: "Ich habe mein eigenes Mehrwegbesteck dabei! 🥤",
    reusableNoUser: "Ich verwende Standard-Einwegbecher. 🥛",
    sanitizerYesUser: "Ich nutze wasserloses Handdesinfektionsmittel! 🧼",
    sanitizerNoUser: "Ich wasche meine Hände am Wasserhahn. 🚰",

    dietaryVeganAi: "Mit unserer pflanzlichen veganen Optionen helfen Sie dem Planeten, indem Sie energieintensive Viehzuchtprozesse vermeiden.",
    dietaryStandardAi: "Sie haben das Standard-Menü gewählt. Vegane Alternativen stehen an den Kiosken 1, 2 und 4 bereit.",
    transportStairsAi: "Wenn Sie die Treppe anstelle des Aufzugs nehmen, senken Sie Ihren CO2-Fußabdruck und verbessern den Publikumsfluss.",
    transportRampAi: "Durch die Nutzung der Barrierefreiheitsrampe nutzen Sie eine emissionsfreie und vollständig zugängliche Verbindung.",
    transportElevatorAi: "Sie haben den Aufzug gewählt. Die Fahrt verbraucht Netzstrom, bleibt jedoch für Mobilitätseingeschränkte essenziell.",
    wasteRecycleAi: "Durch die korrekte Mülltrennung vermeiden Sie Scope-3-Emissionen, indem kompostierbare Stoffe verwertet werden.",
    wasteStandardAi: "Abfall entsorgt. Bitte beachten Sie die Mülltonnen-Beschriftungen! Die KI-Überwachung meldet Trennung an Kiosk #4.",
    reusableYesAi: "Das Mitbringen von Mehrweggeschirr vermeidet Emissionen aus der Plastikherstellung direkt an der Quelle.",
    reusableNoAi: "Einwegbecher gewählt. EcoAccess erinnert alle Besucher daran, dass Mehrwegbehälter die Kreislaufwirtschaft optimieren.",
    sanitizerYesAi: "Durch die Nutzung von Handdesinfektionsmittel sparen Sie wertvolle Liter sauberes Trinkwasser.",
    sanitizerNoAi: "Händewaschen am Wasserhahn. Wählen Sie nächstes Mal Handdesinfektionsmittel, um Wasserressourcen zu schonen!"
  }
};

const getApiUrl = (path) => {
  if (import.meta.env.PROD) {
    return path;
  }
  return `http://127.0.0.1:8000${path}`;
};

export const EcoAccessProvider = ({ children }) => {
  // Navigation
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (activeTab === 'citizen') {
      setSidebarCollapsed(true);
    } else {
      setSidebarCollapsed(false);
    }
  }, [activeTab]);
  
  // Dynamic Product Settings & Multilingual Defaults
  const eventTitleTranslations = {
    en: "EcoAccess Command Center",
    es: "Centro de Control EcoAccess",
    ja: "EcoAccess 総合コマンドセンター",
    zh: "EcoAccess 全球场馆指挥中心",
    de: "EcoAccess Command Center"
  };

  const eventSubtitleTranslations = {
    en: "Smart Venue Telemetry, Sustainable Operations & Inclusive Decision Hub",
    es: "Telemetría Inteligente, Operaciones Sostenibles y Centro de Decisión Inclusiva",
    ja: "スマート会場テレメトリ、持続可能な運用＆バリアフリー意思決定ハブ",
    zh: "智能场馆遥测、可持续运营与无障碍决策中心",
    de: "Smarte Stadiontelemetrie, nachhaltiger Betrieb & inklusives Entscheidungszentrum"
  };

  const [rawEventTitle, setRawEventTitle] = useState('EcoAccess Command Center');
  const [rawEventSubtitle, setRawEventSubtitle] = useState('Smart Venue Telemetry, Sustainable Operations & Inclusive Decision Hub');
  const [baseBudget, setBaseBudget] = useState(30.0);
  
  // Custom Dynamic Venue GIS Nodes (Restored original host coordinates)
  const [mapNodes, setMapNodes] = useState([
    { id: 'node-1', name: 'Narendra Modi Stadium — Main Bowl', x: 50, y: 50, type: 'stadium', alert: 'elevator' },
    { id: 'node-2', name: 'IPL Fan Village — Pavilion End', x: 80, y: 35, type: 'fanzone', alert: 'grid' },
    { id: 'node-3', name: "Athletes' & Media Centre", x: 30, y: 25, type: 'village', alert: 'none' },
    { id: 'node-4', name: 'EV Shuttle Hub — Accessible Transport', x: 75, y: 75, type: 'transporthub', alert: 'none' }
  ]);

  // Accessibility Controls
  const [highContrast, setHighContrast] = useState(false);
  const [fontSizeClass, setFontSizeClass] = useState('font-normal'); // font-normal, font-large
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Map Visualization Mode
  const [mapOverlayMode, setMapOverlayMode] = useState('carbon'); // carbon, accessibility

  // Custom Weather / Event Stress Scenarios
  const [activeScenario, setActiveScenario] = useState('normal');
  const [scenarioLogs, setScenarioLogs] = useState([]);
  const [isSimulatingEvent, setIsSimulatingEvent] = useState(false);

  // Active Environmental & Accessibility Anomalies
  const [incidents, setIncidents] = useState([
    {
      id: 'inc-301',
      title: 'Elevator E-4 Breakdown (Access Barrier)',
      sector: 'Venue A: Stadium Arena (Gate 6)',
      location: 'Section 104 Elevator Shaft',
      severity: 'high',
      time: '6 mins ago',
      status: 'unresolved', // unresolved, dispatching, resolved
      description: 'Wheelchair access elevator E-4 is offline. 24 spectators with mobility impairments are blocked from accessing Upper Deck seats.',
      dispatcherLog: ''
    },
    {
      id: 'inc-302',
      title: 'Grid Overload (Scope 2 Concessions)',
      sector: 'Venue C: Mega Fan Zone',
      location: 'Plaza Grid B2, Power Substation',
      severity: 'medium',
      time: '14 mins ago',
      status: 'unresolved',
      description: 'Scope 2 carbon draw spiked to 880 kW due to screen displays. Risk of fossil-fuel backup startup.',
      dispatcherLog: ''
    },
    {
      id: 'inc-303',
      title: 'Recycling Contamination (CCTV-12)',
      sector: 'Venue C: Mega Fan Zone',
      location: 'Plaza Food Court, Bin #4',
      severity: 'medium',
      time: '18 mins ago',
      status: 'unresolved',
      description: 'Vertex AI Vision CCTV-12 detected non-compostable plastics in the organic compost recycling bin. Contamination probability: 89%.',
      dispatcherLog: ''
    },
    {
      id: 'inc-304',
      title: 'Wheelchair Ramp Egress Block (CCTV-04)',
      sector: 'Venue A: Stadium Arena (Main Gate)',
      location: 'Gate 2 Entrance Pathway',
      severity: 'high',
      time: '24 mins ago',
      status: 'unresolved',
      description: 'Vertex AI Vision CCTV-04 detected a merchandise stand and crowd pileup blocking the primary wheelchair egress ramp.',
      dispatcherLog: ''
    }
  ]);
  const [selectedIncident, setSelectedIncident] = useState(incidents[0]);
  const [dispatchProgress, setDispatchProgress] = useState({});

  // Smart Stadium Grid Indicators
  const [solarPeakShavingActive, setSolarPeakShavingActive] = useState(false);
  const [utilityAlerts, setUtilityAlerts] = useState([
    { id: 'ut-1', msg: 'Venue C: Grid drawing from heavy carbon-intensity supply', severity: 'warning' },
    { id: 'ut-2', msg: 'Venue A: Elevator E-4 offline (Elevated Inclusivity Risk)', severity: 'danger' }
  ]);

  // Multilingual Spectator Feeds
  const [spectatorFeedbacks, setSpectatorFeedbacks] = useState([
    { id: 'spec-1', category: 'Accessibility', language: 'Spanish', text: 'No hay rampas cerca del estacionamiento norte, tuve que dar una vuelta enorme en mi silla de ruedas.', translation: 'There are no ramps near the north parking lot, I had to take a huge detour in my wheelchair.', date: 'Today', sentiment: 'negative', urgency: 'high' },
    { id: 'spec-2', category: 'Energy', language: 'English', text: 'The stadium floodlights are running in broad daylight. Total waste of solar energy.', translation: '', date: 'Today', sentiment: 'negative', urgency: 'medium' },
    { id: 'spec-3', category: 'Inclusivity', language: 'Japanese', text: '音声ガイド機器のバッテリーが切れています。視覚障害者向けのサポートが不十分です。', translation: 'The audio guide device batteries are dead. Support for visually impaired fans is insufficient.', date: 'Yesterday', sentiment: 'negative', urgency: 'high' },
    { id: 'spec-4', category: 'Waste', language: 'German', text: 'Warum gibt es Plastikbecher? Ich dachte, dieses Turnier ist eine Null-Abfall-Zone.', translation: 'Why are there plastic cups? I thought this tournament was a zero-waste zone.', date: 'Today', sentiment: 'negative', urgency: 'medium' }
  ]);

  // Dual Portal Role & Action states (Declared first to support dynamic getters)
  const [portalRole, setPortalRole] = useState('manager'); // manager, attendee

  // AI Chat Co-Pilot (Separated histories for Attendee and Manager)
  const [chatInput, setChatInput] = useState('');
  const [attendeeChatMessages, setAttendeeChatMessages] = useState([
    {
      sender: 'ai',
      text: "Hello! I am Say-Bo, your EcoAccess Global Event Assistant. How can I assist you?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      citations: []
    }
  ]);
  const [managerChatMessages, setManagerChatMessages] = useState([
    {
      sender: 'ai',
      text: "Hello! I am the EcoAccess Command Center AI. How can I assist you?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      citations: []
    }
  ]);

  const chatMessages = portalRole === 'attendee' ? attendeeChatMessages : managerChatMessages;
  
  const setChatMessages = (updater) => {
    if (portalRole === 'attendee') {
      if (typeof updater === 'function') {
        setAttendeeChatMessages(updater);
      } else {
        setAttendeeChatMessages(updater);
      }
    } else {
      if (typeof updater === 'function') {
        setManagerChatMessages(updater);
      } else {
        setManagerChatMessages(updater);
      }
    }
  };

  const sendFeedbackToManager = (text) => {
    const langMap = {
      en: 'English',
      es: 'Spanish',
      ja: 'Japanese',
      zh: 'Chinese',
      de: 'German'
    };
    const userLang = langMap[appLanguage] || 'English';
    const newFeedback = {
      id: `spec-${Date.now()}`,
      category: 'Spectator Chat Feedback',
      language: userLang,
      text: text,
      translation: appLanguage === 'en' ? text : `AI Translation: "${text}"`,
      date: 'Just Now',
      sentiment: 'negative',
      urgency: 'high'
    };
    setSpectatorFeedbacks(prev => [newFeedback, ...prev]);
  };

  const handlePortalRoleChange = (role) => {
    setPortalRole(role);
    setActiveTab('dashboard'); // Manager starts on Command Center, Attendee on Venue Guide
  };

  const [isTyping, setIsTyping] = useState(false);
  const [userChoices, setUserChoices] = useState({
    dietary: null, // vegan, standard
    transport: null, // stairs, ramp, elevator
    waste: null, // compost, standard
    reusable: null, // yes, no
    sanitizer: null // yes, no
  });
  const [bluetoothLive, setBluetoothLive] = useState(false);
  const [receivedNotifications, setReceivedNotifications] = useState([]);
  const [congestionHeatmap, setCongestionHeatmap] = useState({
    'Main Entrance Gate': 35,
    'Main Exit Pathway': 12,
    'Solar Charging Station': 22,
    'Shuttle Pick-up': 64,
    'Audio Headsets': 15,
    'Restrooms': 45,
    'Info & Help Desk': 28,
    'Food Kiosk': 88
  });
  const [crewDispatches, setCrewDispatches] = useState([]);
  const [redirectionActive, setRedirectionActive] = useState(false);

  // Accessibility & Sustainability Sliders
  const [renewablesShare, setRenewablesShare] = useState(30);
  const [transitInclusivity, setTransitInclusivity] = useState(40);
  const [circularEconomyRate, setCircularEconomyRate] = useState(30);
  const [audioAssistCoverage, setAudioAssistCoverage] = useState(25);
  const [bluetoothBeaconCoverage, setBluetoothBeaconCoverage] = useState(75);
  const [infraredSensorCoverage, setInfraredSensorCoverage] = useState(80);

  // BQ & Gemini Vision States
  const [carbonFootprint, setCarbonFootprint] = useState(62517); // Locked to stable predicted start
  const [energyForecast, setEnergyForecast] = useState([
    {"time": "18:00", "value": 680.0},
    {"time": "19:00", "value": 880.0},
    {"time": "20:00", "value": 750.0},
    {"time": "21:00", "value": 520.0}
  ]);
  const [spectatorCount, setSpectatorCount] = useState(75000);
  const [currentSpectators, setCurrentSpectators] = useState(68327);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSpectators(prev => {
        const delta = Math.floor(Math.random() * 5) - 2;
        const next = prev + delta;
        if (next > 68350) return 68350;
        if (next < 68300) return 68300;
        return next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const [isVisionAnalyzing, setIsVisionAnalyzing] = useState(false);
  const [demoStep, setDemoStep] = useState(1);
  const [geminiBrief, setGeminiBrief] = useState("");

  const [apiMode, setApiMode] = useState('mock');
  const [apiKey, setApiKey] = useState('');
  const [gcpProjectId, setGcpProjectId] = useState('');
  const [gcpLocation, setGcpLocation] = useState('us-central1');
  const [credsStatus, setCredsStatus] = useState(null);
  const [isVerifyingCreds, setIsVerifyingCreds] = useState(false);
  const [appLanguage, setAppLanguage] = useState('en');
  const [infraredActive, setInfraredActive] = useState(true);

  // Load configuration & credentials on startup
  useEffect(() => {
    // Load config from backend if available, otherwise use defaults
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 600);

    fetch('http://127.0.0.1:8000/api/config', { signal: controller.signal })
      .then(res => res.json())
      .then(data => {
        clearTimeout(timeoutId);
        if (data.eventTitle) setEventTitle(data.eventTitle);
        if (data.eventSubtitle) setEventSubtitle(data.eventSubtitle);
        if (data.baseBudget) setBaseBudget(data.baseBudget);
        if (data.mapNodes) setMapNodes(data.mapNodes);
      })
      .catch(err => {
        clearTimeout(timeoutId);
        console.log("Using local mock configurations (Backend offline).");
      });

    const credsController = new AbortController();
    const credsTimeoutId = setTimeout(() => credsController.abort(), 600);

    fetch('http://127.0.0.1:8000/api/credentials', { signal: credsController.signal })
      .then(res => res.json())
      .then(data => {
        clearTimeout(credsTimeoutId);
        if (data.apiMode) {
          setApiMode(data.apiMode);
          setApiKey(data.apiKey || '');
          setGcpProjectId(data.gcpProjectId || '');
          setGcpLocation(data.gcpLocation || 'us-central1');
        }
      })
      .catch(err => {
        clearTimeout(credsTimeoutId);
        console.log("Using local mock credentials (Backend offline).");
      });
  }, []);

  // Update carbon footprint from BigQuery ML when parameters change
  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 600);

    fetch(`http://127.0.0.1:8000/api/predictions/carbon?renewables=${renewablesShare}&transit=${transitInclusivity}&recycling=${circularEconomyRate}&attendance=${spectatorCount}`, { signal: controller.signal })
      .then(res => res.json())
      .then(data => {
        clearTimeout(timeoutId);
        if (data.carbonFootprint !== undefined) {
          setCarbonFootprint(data.carbonFootprint);
        }
      })
      .catch(err => {
        clearTimeout(timeoutId);
        // Locked to start from 62517 as base for stable initial rendering
        let base = 62517 - (renewablesShare / 100) * 15000 - (transitInclusivity / 100) * 20000 - (circularEconomyRate / 100) * 5000;
        let adj = (spectatorCount - 50000) * 0.25;
        setCarbonFootprint(Math.max(10000, Math.round(base + adj)));
      });
  }, [renewablesShare, transitInclusivity, circularEconomyRate, spectatorCount]);

  // Load energy forecast
  const loadEnergyForecast = () => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 600);

    fetch('http://127.0.0.1:8000/api/predictions/energy', { signal: controller.signal })
      .then(res => res.json())
      .then(data => {
        clearTimeout(timeoutId);
        if (data.forecast) {
          setEnergyForecast(data.forecast);
        }
      })
      .catch(err => {
        clearTimeout(timeoutId);
        // Backend offline: use realistic mock ARIMA forecast
        setEnergyForecast([
          {"time": "18:00", "value": 680.0},
          {"time": "19:00", "value": 880.0},
          {"time": "20:00", "value": 750.0},
          {"time": "21:00", "value": 520.0}
        ]);
      });
  };

  useEffect(() => {
    loadEnergyForecast();
  }, [activeScenario]);

  // Persist configuration
  const persistConfig = (title, subtitle, budget, nodes) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 600);

    fetch('http://127.0.0.1:8000/api/config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventTitle: title,
        eventSubtitle: subtitle,
        baseBudget: budget,
        mapNodes: nodes
      }),
      signal: controller.signal
    })
      .then(res => res.json())
      .then(data => {
        clearTimeout(timeoutId);
        console.log("Event config persisted to Google Cloud database.");
      })
      .catch(err => {
        clearTimeout(timeoutId);
        console.log("Using local session variables (Backend offline).");
      });
  };

  // Demo step simulation triggers
  const triggerSpectatorSurge = () => {
    setIsSimulatingEvent(true);
    setSpectatorCount(75000);
    setRenewablesShare(30);
    setTransitInclusivity(40);
    setCircularEconomyRate(30);
    setAudioAssistCoverage(25);
    
    setIncidents(prev => prev.map(inc => {
      if (inc.id === 'inc-301' || inc.id === 'inc-302' || inc.id === 'inc-303') {
        return { ...inc, status: 'unresolved', dispatcherLog: '' };
      }
      return inc;
    }));

    setUtilityAlerts([
      { id: 'ut-1', msg: 'Venue C: Grid drawing from heavy carbon-intensity supply', severity: 'warning' },
      { id: 'ut-2', msg: 'Venue A: Elevator E-4 offline (Elevated Inclusivity Risk)', severity: 'danger' }
    ]);

    setScenarioLogs(prev => [
      { time: new Date().toLocaleTimeString(), title: "Spectator Surge Active (75,000)", details: "Crowd density spiked at Gate 2 and Gate 6. Grid load rising at Venue C." },
      ...prev
    ]);

    setDemoStep(2);
    setTimeout(() => setIsSimulatingEvent(false), 800);
  };

  const runBigQueryMLForecast = () => {
    setIsSimulatingEvent(true);
    loadEnergyForecast();
    
    setScenarioLogs(prev => [
      { time: new Date().toLocaleTimeString(), title: "BigQuery ML ARIMA Evaluated", details: "Projected peak power load of 880 kW at Venue C concessions." },
      ...prev
    ]);
    
    setDemoStep(3);
    setTimeout(() => setIsSimulatingEvent(false), 800);
  };

  const triggerPresetVisionAudit = (type) => {
    if (type === 'contaminated') {
      setIncidents(prev => prev.map(inc => {
        if (inc.id === 'inc-303') {
          return {
            ...inc,
            status: 'unresolved',
            description: "Vertex AI Vision CCTV-12 detected plastic bottles and aluminum cans in compost bin. Contamination: 89%. Fill: 68%.",
            dispatcherLog: ""
          };
        }
        return inc;
      }));
    } else {
      setIncidents(prev => prev.map(inc => {
        if (inc.id === 'inc-303') {
          return {
            ...inc,
            status: 'resolved',
            description: "Vertex AI Vision CCTV-12 check: Compost bin is clean. Fill level at 42%.",
            dispatcherLog: "Checked: Clean."
          };
        }
        return inc;
      }));
    }
    setDemoStep(4);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsVisionAnalyzing(true);
    const formData = new FormData();
    formData.append("file", file);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    fetch("http://127.0.0.1:8000/api/detect-waste", {
      method: "POST",
      body: formData,
      signal: controller.signal
    })
      .then(res => res.json())
      .then(data => {
        clearTimeout(timeoutId);
        setIsVisionAnalyzing(false);
        if (data.contaminationDetected) {
          setIncidents(prev => prev.map(inc => {
            if (inc.id === 'inc-303') {
              return {
                ...inc,
                status: 'unresolved',
                description: `Gemini Vision audited upload: Contamination detected! Details: ${data.contaminationDetail}. Fill Level: ${data.fillLevel}%.`,
                severity: data.status === 'overflowing' ? 'high' : 'medium'
              };
            }
            return inc;
          }));
          alert(`AI Vision Alert: Recycling contamination detected! Details: ${data.contaminationDetail}`);
        } else {
          setIncidents(prev => prev.map(inc => {
            if (inc.id === 'inc-303') {
              return {
                ...inc,
                status: 'resolved',
                description: `Gemini Vision audited upload: Bin is normal. Fill level at ${data.fillLevel}%. No contamination detected.`,
                dispatcherLog: `Success: Checked via Gemini Vision. No action required.`
              };
            }
            return inc;
          }));
          alert(`AI Vision Result: No contamination detected. Bin is at ${data.fillLevel}% capacity.`);
        }
        setDemoStep(4);
      })
      .catch(err => {
        setIsVisionAnalyzing(false);
        alert("Error calling Gemini Vision API. Backend might be offline.");
      });
  };

  const generateAICopilotBrief = () => {
    setIsTyping(true);
    const eventContext = `Event: ${eventTitle}, Spectators: ${spectatorCount}, Renewables: ${renewablesShare}%, Accessibility: ${transitInclusivity}%, Audio Assist: ${audioAssistCoverage}%, Incidents: Elevator E-4 offline, Venue C grid spike, bin contamination.`;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1200);

    fetch('http://127.0.0.1:8000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: "Provide a unified tactical operations brief regarding the active spectator surge, the energy overload grid warning, and accessibility/waste issues.",
        context: eventContext
      }),
      signal: controller.signal
    })
      .then(res => res.json())
      .then(data => {
        clearTimeout(timeoutId);
        setGeminiBrief(data.text);
        setChatMessages(prev => [...prev, {
          sender: 'ai',
          text: data.text,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          citations: data.citations,
          ragSnippet: data.ragSnippet
        }]);
        setIsTyping(false);
        setDemoStep(5);
      })
      .catch(err => {
        clearTimeout(timeoutId);
        setIsTyping(false);
        const fallbackText = `COPILOT EXECUTIVE SUMMARY:\n1. Carbon Footprint projected at ${carbonFootprint} tonnes. Substation load peak warnings require Solar battery peak shaving.\n2. Accessibility barriers: Elevator E-4 at Gate 6 breakdown blocks wheelchair seats. Maintenance crew dispatch required. Reroute accessible shuttles.\n3. Waste issues: CCTV-12 flagged non-recyclables in compost. Dispatch compost sorters.`;
        setGeminiBrief(fallbackText);
        setDemoStep(5);
      });
  };

  const queryRAGRules = () => {
    setIsTyping(true);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1200);

    fetch('http://127.0.0.1:8000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: "What are the rules regarding elevator breakdowns and public transit carbon offsets?",
        context: "Event: EcoAccess Command Center"
      }),
      signal: controller.signal
    })
      .then(res => res.json())
      .then(data => {
        clearTimeout(timeoutId);
        setChatMessages(prev => [...prev, {
          sender: 'ai',
          text: `Retrieved compliance regulations from AlloyDB pgvector:\n\n${data.ragSnippet || "No direct rules matched."}\n\nRecommendations:\n1. Apply Accessibility Rule 4.2.1 (dispatch repairs, reroute to ramps within 10 min).\n2. Apply Sustainability Code 6.1.2 (increase low-floor electric shuttles by 10% to offset travel carbon).`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          citations: ["AlloyDB pgvector Index"],
          ragSnippet: data.ragSnippet
        }]);
        setIsTyping(false);
        setDemoStep(6);
      })
      .catch(err => {
        clearTimeout(timeoutId);
        // Backend offline: show mock RAG retrieval result
        setChatMessages(prev => [...prev, {
          sender: 'ai',
          text: `RAG RETRIEVAL (AlloyDB pgvector — offline fallback):\n\nAccessibility Rule 4.2.1: In the event of elevator failure, repair crews must be dispatched within 10 minutes. Accessible ramp routes must be communicated to affected visitors via audio announcement and digital signage.\n\nSustainability Code 6.1.2: During peak crowd periods causing carbon overrun, operator must increase low-floor electric shuttle frequency by a minimum of 10% to offset transit emissions and reduce private vehicle demand.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          citations: ["AlloyDB pgvector Index (offline fallback)"],
          ragSnippet: "Accessibility Rule 4.2.1 & Sustainability Code 6.1.2"
        }]);
        setIsTyping(false);
        setDemoStep(6);
      });
  };

  const executeDemoMitigations = () => {
    setSolarPeakShavingActive(true);
    setIncidents(prev => prev.map(inc => {
      if (inc.id === 'inc-301' || inc.id === 'inc-303' || inc.id === 'inc-302' || inc.id === 'inc-304') {
        return { 
          ...inc, 
          status: 'resolved', 
          dispatcherLog: 'Mitigation completed: AI automated mitigation protocols verified.' 
        };
      }
      return inc;
    }));

    setRenewablesShare(75);
    setTransitInclusivity(80);
    setCircularEconomyRate(70);
    setAudioAssistCoverage(70);

    setUtilityAlerts([
      { id: 'ut-1', msg: 'Venue C: AI Solar Shaving active. Carbon intensity balanced.', severity: 'info' }
    ]);

    setScenarioLogs(prev => [
      { time: new Date().toLocaleTimeString(), title: "Mitigation Protocols Deployed", details: "Solar battery buffers activated. Accessible shuttle frequency increased to 80%. All elevators online." },
      ...prev
    ]);

    setDemoStep(7);
  };

  const resetDemoWorkflow = () => {
    setDemoStep(1);
    setSpectatorCount(75000);
    setCurrentSpectators(68327);
    setRenewablesShare(30);
    setTransitInclusivity(40);
    setCircularEconomyRate(30);
    setAudioAssistCoverage(25);
    setSolarPeakShavingActive(false);
    setGeminiBrief("");
    setIncidents(prev => prev.map(inc => ({ ...inc, status: 'unresolved', dispatcherLog: '' })));
    setUtilityAlerts([
      { id: 'ut-1', msg: 'Venue C: Grid drawing from heavy carbon-intensity supply', severity: 'warning' },
      { id: 'ut-2', msg: 'Venue A: Elevator E-4 offline (Elevated Inclusivity Risk)', severity: 'danger' }
    ]);
  };

  // Dispatch individual crew
  const handleDispatch = (id) => {
    setIncidents(prev => prev.map(inc => {
      if (inc.id === id) {
        return { 
          ...inc, 
          status: 'dispatching',
          dispatcherLog: 'AI Resource Router dispatching optimized crews...'
        };
      }
      return inc;
    }));

    let count = 0;
    const interval = setInterval(() => {
      count += 10;
      setDispatchProgress(prev => ({
        ...prev,
        [id]: count
      }));

      if (count >= 100) {
        clearInterval(interval);
        setIncidents(prev => {
          const updated = prev.map(inc => {
            if (inc.id === id) {
              const responderText = id === 'inc-301'
                ? 'Elevator Repair Crew arrived. Elevator E-4 back online.'
                : id === 'inc-302'
                ? 'Solar Battery Substation Unit 3 activated.'
                : id === 'inc-303'
                ? 'Sanitation team deployed. Contamination level cleared.'
                : 'Merchandise vendor relocated. Egress path cleared.';
              
              const resolvedIncident = { 
                ...inc, 
                status: 'resolved',
                dispatcherLog: `Success: Mitigation completed. ${responderText}`
              };

              if (selectedIncident.id === id) {
                setSelectedIncident(resolvedIncident);
              }
              return resolvedIncident;
            }
            return inc;
          });
          return updated;
        });

        if (id === 'inc-301') {
          setUtilityAlerts(prev => prev.filter(al => al.id !== 'ut-2'));
        } else if (id === 'inc-302') {
          setUtilityAlerts(prev => prev.filter(al => al.id !== 'ut-1'));
        }
      }
    }, 300);
  };

  // Run climate scenarios
  const simulateScenario = (scenarioName) => {
    setIsSimulatingEvent(true);
    setActiveScenario(scenarioName);
    
    let scenarioTitle = "";
    let impactText = "";
    if (scenarioName === 'heatwave') {
      scenarioTitle = "Heatwave Advisory (40°C)";
      impactText = "High thermal grid strain at Venue C. Cooling centers active.";
    } else if (scenarioName === 'gale') {
      scenarioTitle = "High Gale Wind Storm Warning";
      impactText = "Outdoor elevators isolated. Shuttle boarding rerouted.";
    } else if (scenarioName === 'normal') {
      scenarioTitle = "Event Normalization";
      impactText = "Climate alerts cleared. All elevators running normally.";
    }

    setScenarioLogs(prev => [
      { time: new Date().toLocaleTimeString(), title: scenarioTitle, details: impactText },
      ...prev
    ]);

    setTimeout(() => {
      setIsSimulatingEvent(false);
    }, 1200);
  };

  const togglePeakShaving = () => {
    setSolarPeakShavingActive(prev => {
      const next = !prev;
      if (next) {
        setUtilityAlerts(prevAlerts => 
          prevAlerts.map(al => {
            if (al.id === 'ut-1') {
              return { ...al, msg: 'Venue C: AI Solar Shaving active. Carbon intensity balanced.', severity: 'info' };
            }
            return al;
          })
        );
      } else {
        setUtilityAlerts(prevAlerts => 
          prevAlerts.map(al => {
            if (al.id === 'ut-1') {
              return { ...al, msg: 'Venue C: Grid drawing from heavy carbon-intensity supply', severity: 'warning' };
            }
            return al;
          })
        );
      }
      return next;
    });
  };

  // Submit chat questions
  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = {
      sender: 'user',
      text: chatInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    const queryInput = chatInput;
    setChatInput('');
    setIsTyping(true);

    const eventContext = `Event: ${eventTitle}, Budget: $${baseBudget}M, Renewables: ${renewablesShare}%, Accessibility: ${transitInclusivity}%, Audio Assist: ${audioAssistCoverage}%`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 600);

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
          citations: data.citations,
          ragSnippet: data.ragSnippet
        }]);
        setIsTyping(false);
      })
      .catch(err => {
        clearTimeout(timeoutId);
        setTimeout(() => {
          let replyText = "";
          let citations = [];
          let ragSnippet = "";
          const query = queryInput.toLowerCase();

          // Free Mock Knowledge Base
          const mockDB = [
            {
              keywords: ['elevator', 'gate 6', 'access', 'wheelchair', 'mobility', 'barrier'],
              reply: "Accessibility Alert: Elevator E-4 near Gate 6 is currently offline. Accessibility paths have been rerouted to auxiliary ramps. A repair crew is dispatched and on-route.",
              citation: "AlloyDB: elevator_status_register (offline)",
              snippet: "ACCESSIBILITY RULE 4.2.1: In the event of primary elevator failure at gates serving mobility zones, operators must reroute passengers to auxiliary ramp structures within 10 minutes and dispatch repairs immediately."
            },
            {
              keywords: ['solar', 'peak shaving', 'energy', 'grid', 'substation', 'power', 'load'],
              reply: "Grid Load Alert: Venue C Substation is drawing heavy load (880 kW Peak). Recommendation is to toggle Solar Battery Peak Shaving to buffer 150 kW and reduce draw on non-renewable grid supplies.",
              citation: "BigQuery: venue_concession_power_ARIMA (offline)",
              snippet: "SUBSTATION ENERGY POLICY: During demand spikes exceeding 800 kW, operators must buffer concession grid loads using solar peak-shaving storage to avoid fossil backup activation."
            },
            {
              keywords: ['shuttle', 'transit', 'bus', 'transport', 'egress', 'crowd'],
              reply: "Transit Report: Crowd density is high at Gate 2. To offset Scope 3 emissions and clear paths, low-floor electric shuttle frequency is recommended to increase by 10%.",
              citation: "AlloyDB RAG: transit_inclusivity_code (offline)",
              snippet: "SUSTAINABILITY CODE 6.1.2: During spectator egress overruns, transit dispatchers must increase shuttle capacity by 10% to offset private vehicle carbon footprint."
            },
            {
              keywords: ['waste', 'contamination', 'dumpster', 'plastics', 'recycle', 'recycling', 'compost', 'bin'],
              reply: "Vision AI Audit: Compost Bin #4 at Plaza Food Court contains non-compostable plastics (89% probability). Sorter crew dispatch has been suggested.",
              citation: "Gemini Vision: plaza_cctv_12_audit (offline)",
              snippet: "WASTE DIVERSION MANUAL: Recycle streams exceeding 5% plastic contamination must be manually sorted or rerouted to prevent entire dumpster load rejection."
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

          // Find keyword match
          const match = mockDB.find(item => 
            item.keywords.some(keyword => query.includes(keyword))
          );

          if (match) {
            replyText = match.reply;
            citations = [match.citation];
            ragSnippet = match.snippet;
          } else {
            replyText = `Here is information on: "${queryInput}". Under the current configuration, carbon output is ${metrics.carbonFootprint} tonnes.`;
            citations = ["BigQuery: sustainability_kpi_history (offline)"];
            ragSnippet = "STADIUM GENERAL COMPLIANCE: Systems must monitor and coordinate green energy mix, waste diversion, and accessibility ratings.";
          }

          setChatMessages(prev => [...prev, {
            sender: 'ai',
            text: replyText,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            citations,
            ragSnippet
          }]);
          setIsTyping(false);
        }, 1000);
      });
  };

  // Real-time Spanish/Japanese translation call
  const translateFeedback = (id, text) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1200);

    fetch(getApiUrl('/api/translate'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
      signal: controller.signal
    })
      .then(res => res.json())
      .then(data => {
        clearTimeout(timeoutId);
        setSpectatorFeedbacks(prev => prev.map(feed => {
          if (feed.id === id) {
            return {
              ...feed,
              translation: data.translation,
              sentiment: data.sentiment,
              urgency: data.urgency,
              category: data.category
            };
          }
          return feed;
        }));
      })
      .catch(err => {
        clearTimeout(timeoutId);
        console.log("Translation service offline, using mock.");
      });
  };

  // Recalculate metrics dynamically
  const calculateEcoAccessMetrics = () => {
    const tContext = contextTranslations[appLanguage] || contextTranslations.en;

    // 1. Calculate attendee choices carbon savings and star rating
    let co2SavedPerPerson = 0;
    let baseEcoStars = 1;
    let starMsg = tContext.star1;

    if (userChoices.dietary === 'vegan') co2SavedPerPerson += 2.1;
    if (userChoices.transport === 'stairs') co2SavedPerPerson += 1.2;
    if (userChoices.transport === 'ramp') co2SavedPerPerson += 1.0;
    if (userChoices.waste === 'recycle') co2SavedPerPerson += 0.8;
    if (userChoices.reusable === 'yes') co2SavedPerPerson += 1.5;
    if (userChoices.sanitizer === 'yes') co2SavedPerPerson += 0.4;

    if (co2SavedPerPerson >= 6.0) {
      baseEcoStars = 5;
      starMsg = tContext.star5;
    } else if (co2SavedPerPerson >= 5.0) {
      baseEcoStars = 4;
      starMsg = tContext.star4;
    } else if (co2SavedPerPerson >= 3.5) {
      baseEcoStars = 3;
      starMsg = tContext.star3;
    } else if (co2SavedPerPerson >= 2.0) {
      baseEcoStars = 2;
      starMsg = tContext.star2;
    }

    // Convert individual CO2 savings to stadium-wide metric reduction (in tonnes)
    const stadiumSavingTonnes = co2SavedPerPerson * spectatorCount * 0.001;

    let baseInclusivityIndex = 45;
    let baseWasteDiversion = 12;
    let baseFanSat = 58;
    
    let baseEnergyMix = 15 + (renewablesShare / 100) * 75;
    baseWasteDiversion += (circularEconomyRate / 100) * 82;
    
    baseInclusivityIndex += (transitInclusivity / 100) * 30 + (audioAssistCoverage / 100) * 20;
    
    baseFanSat += (transitInclusivity / 100) * 12 
      + (circularEconomyRate / 100) * 5 
      + (renewablesShare / 100) * 5 
      + (audioAssistCoverage / 100) * 10;

    // Apply attendee choices modifications to dynamic stats grid
    if (userChoices.dietary === 'vegan') {
      baseFanSat += 5;
      baseWasteDiversion += 6;
    }
    if (userChoices.transport === 'stairs') {
      baseFanSat += 4;
    }
    if (userChoices.transport === 'ramp') {
      baseInclusivityIndex += 8;
      baseFanSat += 5;
    }
    if (userChoices.reusable === 'yes') {
      baseWasteDiversion += 6;
      baseFanSat += 4;
    }
    if (userChoices.waste === 'recycle') {
      baseWasteDiversion += 7;
      baseFanSat += 3;
    }
    if (userChoices.sanitizer === 'yes') {
      baseFanSat += 2;
    }

    if (activeScenario === 'heatwave') {
      baseInclusivityIndex -= 10;
      baseFanSat -= 15;
    } else if (activeScenario === 'gale') {
      baseInclusivityIndex -= 18;
      baseFanSat -= 22;
    }

    const unresolvedElevator = incidents.find(i => i.id === 'inc-301')?.status !== 'resolved';
    const unresolvedGrid = incidents.find(i => i.id === 'inc-302')?.status !== 'resolved';

    if (!unresolvedElevator) {
      baseInclusivityIndex += 15;
      baseFanSat += 10;
    } else {
      baseInclusivityIndex -= 12;
      baseFanSat -= 6;
    }

    if (!unresolvedGrid) {
      baseFanSat += 4;
    }

    const greenEnergyMix = Math.max(15, Math.min(99, Math.round(baseEnergyMix)));
    const wasteDiversion = Math.max(10, Math.min(95, Math.round(baseWasteDiversion)));
    const inclusivityIndex = Math.max(20, Math.min(98, Math.round(baseInclusivityIndex)));
    const fanSat = Math.max(25, Math.min(98, Math.round(baseFanSat)));
    const budgetRemaining = (baseBudget - (renewablesShare / 100) * 5.0 - (transitInclusivity / 100) * 6.5 - (circularEconomyRate / 100) * 3.5 - (audioAssistCoverage / 100) * 2.8).toFixed(1);

    return {
      carbonFootprint: 62517,
      greenEnergyMix,
      wasteDiversion,
      inclusivityIndex,
      fanSat,
      budgetRemaining: parseFloat(budgetRemaining),
      unresolvedElevator,
      unresolvedGrid,
      co2SavedPerPerson,
      attendeeEcoStars: baseEcoStars,
      starMsg
    };
  };

  const metrics = calculateEcoAccessMetrics();

  // Handle attendee choice selection
  const triggerAttendeeChoice = (category, value) => {
    const t = contextTranslations[appLanguage] || contextTranslations.en;

    // 1. Update choices state
    const currentSelection = { ...userChoices, [category]: value };
    setUserChoices(currentSelection);

    // 2. Generate user selection message
    let userText = "";
    if (category === 'dietary') {
      userText = value === 'vegan' ? t.dietaryVeganUser : t.dietaryStandardUser;
    } else if (category === 'transport') {
      userText = value === 'stairs' ? t.transportStairsUser : value === 'ramp' ? t.transportRampUser : t.transportElevatorUser;
    } else if (category === 'waste') {
      userText = (value === 'recycle' || value === 'compost') ? t.wasteRecycleUser : t.wasteStandardUser;
    } else if (category === 'reusable') {
      userText = value === 'yes' ? t.reusableYesUser : t.reusableNoUser;
    } else if (category === 'sanitizer') {
      userText = value === 'yes' ? t.sanitizerYesUser : t.sanitizerNoUser;
    }

    const userMsg = {
      sender: 'user',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prevMsgs => [...prevMsgs, userMsg]);
    setIsTyping(true);

    // Recalculate parameters for precise responses
    let localCo2 = 0;
    if (currentSelection.dietary === 'vegan') localCo2 += 2.1;
    if (currentSelection.transport === 'stairs') localCo2 += 1.2;
    if (currentSelection.transport === 'ramp') localCo2 += 1.0;
    if (currentSelection.waste === 'recycle' || currentSelection.waste === 'compost') localCo2 += 0.8;
    if (currentSelection.reusable === 'yes') localCo2 += 1.5;
    if (currentSelection.sanitizer === 'yes') localCo2 += 0.4;

    let localStars = 1;
    let localStarMsg = t.star1;
    if (localCo2 >= 6.0) {
      localStars = 5;
      localStarMsg = t.star5;
    } else if (localCo2 >= 5.0) {
      localStars = 4;
      localStarMsg = t.star4;
    } else if (localCo2 >= 3.5) {
      localStars = 3;
      localStarMsg = t.star3;
    } else if (localCo2 >= 2.0) {
      localStars = 2;
      localStarMsg = t.star2;
    }

    const allSelected = Boolean(
      currentSelection.dietary &&
      currentSelection.transport &&
      currentSelection.waste &&
      currentSelection.reusable &&
      currentSelection.sanitizer
    );

    // Generate single AI reply
    setTimeout(() => {
      let replyText = "";
      if (category === 'dietary') {
        replyText = value === 'vegan' ? t.dietaryVeganAi : t.dietaryStandardAi;
      } else if (category === 'transport') {
        replyText = value === 'stairs' ? t.transportStairsAi : value === 'ramp' ? t.transportRampAi : t.transportElevatorAi;
      } else if (category === 'waste') {
        replyText = (value === 'recycle' || value === 'compost') ? t.wasteRecycleAi : t.wasteStandardAi;
      } else if (category === 'reusable') {
        replyText = value === 'yes' ? t.reusableYesAi : t.reusableNoAi;
      } else if (category === 'sanitizer') {
        replyText = value === 'yes' ? t.sanitizerYesAi : t.sanitizerNoAi;
      }

      const starEmojis = "⭐".repeat(localStars);
      const co2Formatted = localCo2.toLocaleString(appLanguage === 'es' ? 'es-ES' : appLanguage === 'de' ? 'de-DE' : appLanguage === 'ja' ? 'ja-JP' : appLanguage === 'zh' ? 'zh-CN' : 'en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
      let footerText = `\n\n"${localStarMsg}"\n\n✨ **${t.co2SavedLabel}** ${co2Formatted} kg | ${t.ratingLabel} ${starEmojis}`;

      if (allSelected && localStars === 5) {
        footerText += `\n\n${t.star5Unlocked}\n"${t.star5}"`;
      }

      const aiMsg = {
        sender: 'ai',
        text: replyText + footerText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations: ["Say-Bo Prompt: compliance_rulebook_1.1 (live)"],
        ragSnippet: localStarMsg
      };

      setChatMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleTextToSpeech = () => {
    if ('speechSynthesis' in window) {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }

      const textToRead = `EcoAccess Command Strategic Executive Briefing. 
      The current carbon footprint forecast is ${metrics.carbonFootprint} metric tonnes of CO2. 
      The overall Inclusivity and Accessibility Index is at ${metrics.inclusivityIndex} percent, and the fan satisfaction rate is at ${metrics.fanSat} percent.
      The remaining execution budget is ${metrics.budgetRemaining} million dollars.`;

      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.onend = () => setIsSpeaking(false);
      
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  const computedEventTitle = rawEventTitle === 'EcoAccess Command Center' || Object.values(eventTitleTranslations).includes(rawEventTitle)
    ? (eventTitleTranslations[appLanguage] || eventTitleTranslations.en)
    : rawEventTitle;

  const computedEventSubtitle = rawEventSubtitle === 'Smart Venue Telemetry, Sustainable Operations & Inclusive Decision Hub' || Object.values(eventSubtitleTranslations).includes(rawEventSubtitle)
    ? (eventSubtitleTranslations[appLanguage] || eventSubtitleTranslations.en)
    : rawEventSubtitle;

  return (
    <EcoAccessContext.Provider value={{
      activeTab, setActiveTab,
      sidebarCollapsed, setSidebarCollapsed,
      eventTitle: computedEventTitle, setEventTitle: setRawEventTitle,
      eventSubtitle: computedEventSubtitle, setEventSubtitle: setRawEventSubtitle,
      baseBudget, setBaseBudget,
      mapNodes, setMapNodes,
      highContrast, setHighContrast,
      fontSizeClass, setFontSizeClass,
      isSpeaking, setIsSpeaking,
      mapOverlayMode, setMapOverlayMode,
      activeScenario, setActiveScenario,
      scenarioLogs, setScenarioLogs,
      isSimulatingEvent, setIsSimulatingEvent,
      incidents, setIncidents,
      selectedIncident, setSelectedIncident,
      dispatchProgress, setDispatchProgress,
      solarPeakShavingActive, setSolarPeakShavingActive,
      utilityAlerts, setUtilityAlerts,
      spectatorFeedbacks, setSpectatorFeedbacks,
      chatInput, setChatInput,
      chatMessages, setChatMessages,
      isTyping, setIsTyping,
      renewablesShare, setRenewablesShare,
      transitInclusivity, setTransitInclusivity,
      circularEconomyRate, setCircularEconomyRate,
      audioAssistCoverage, setAudioAssistCoverage,
      bluetoothBeaconCoverage, setBluetoothBeaconCoverage,
      infraredSensorCoverage, setInfraredSensorCoverage,
      carbonFootprint, setCarbonFootprint,
      energyForecast, setEnergyForecast,
      spectatorCount, setSpectatorCount,
      currentSpectators,
      isVisionAnalyzing, setIsVisionAnalyzing,
      demoStep, setDemoStep,
      geminiBrief, setGeminiBrief,
      metrics,
      persistConfig,
      triggerSpectatorSurge,
      runBigQueryMLForecast,
      triggerPresetVisionAudit,
      handleImageUpload,
      generateAICopilotBrief,
      queryRAGRules,
      executeDemoMitigations,
      resetDemoWorkflow,
      handleDispatch,
      simulateScenario,
      togglePeakShaving,
      handleChatSubmit,
      translateFeedback,
      handleTextToSpeech,
      
      // Dual Portal upgrades states & handlers
      portalRole, setPortalRole: handlePortalRoleChange,
      userChoices, setUserChoices,
      bluetoothLive, setBluetoothLive,
      receivedNotifications, setReceivedNotifications,
      congestionHeatmap, setCongestionHeatmap,
      crewDispatches, setCrewDispatches,
      redirectionActive, setRedirectionActive,
      triggerAttendeeChoice,
      sendFeedbackToManager,
      
      // Credentials Configuration
      apiMode, setApiMode,
      apiKey, setApiKey,
      gcpProjectId, setGcpProjectId,
      gcpLocation, setGcpLocation,
      credsStatus, setCredsStatus,
      isVerifyingCreds, setIsVerifyingCreds,
      appLanguage, setAppLanguage,
      infraredActive, setInfraredActive,
      saveAndVerifyCredentials: (mode, key, projectId, location) => {
        setIsVerifyingCreds(true);
        setCredsStatus(null);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1500);

        return fetch('http://127.0.0.1:8000/api/credentials', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            apiMode: mode,
            apiKey: key,
            gcpProjectId: projectId,
            gcpLocation: location
          }),
          signal: controller.signal
        })
          .then(res => res.json())
          .then(data => {
            clearTimeout(timeoutId);
            setIsVerifyingCreds(false);
            setCredsStatus(data);
            if (data.status === 'success') {
              setApiMode(mode);
              setApiKey(key);
              setGcpProjectId(projectId);
              setGcpLocation(location);
            }
            return data;
          })
          .catch(err => {
            clearTimeout(timeoutId);
            setIsVerifyingCreds(false);
            const errResult = { status: 'error', message: "Error contacting backend server. Saved locally." };
            setCredsStatus(errResult);
            return errResult;
          });
      }
    }}>
      {children}
    </EcoAccessContext.Provider>
  );
};

export const useEcoAccess = () => useContext(EcoAccessContext);
