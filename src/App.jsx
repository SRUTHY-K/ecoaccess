import React from 'react';
import { EcoAccessProvider, useEcoAccess } from './context/EcoAccessContext';
import Sidebar from './components/Sidebar';
import StatsGrid from './components/StatsGrid';
import InteractiveMap from './components/InteractiveMap';
import LiveCCTV from './components/LiveCCTV';
import BigQueryML from './components/BigQueryML';
import SustainabilityChat from './components/SustainabilityChat';
import { StrategicSliders } from './components/StrategicBlueprint';
import ProductConfigurator from './components/ProductConfigurator';

import './App.css';

const appTranslations = {
  en: {
    spectatorPortal: "EcoAccess.ai Spectator Portal",
    spectatorDesc: "Interactive Guide, Carbon Savings, & Inclusivity Map",
    attendeeStatus: "Bluetooth & Local Guide Synced",
    managerStatus: "GIS Infrastructure Streams Online"
  },
  es: {
    spectatorPortal: "Portal de Espectadores EcoAccess.ai",
    spectatorDesc: "Guía Interactiva, Ahorro de Carbono y Mapa de Inclusividad",
    attendeeStatus: "Guía Local y Bluetooth Sincronizados",
    managerStatus: "Flujos de Infraestructura GIS Activos"
  },
  ja: {
    spectatorPortal: "EcoAccess.ai 観客専用ポータル",
    spectatorDesc: "双方向ガイド、二酸化炭素削減＆バリアフリーマップ",
    attendeeStatus: "Bluetooth・ローカルガイド同期中",
    managerStatus: "GISインフラ監視ストリーム稼働中"
  },
  zh: {
    spectatorPortal: "EcoAccess.ai 观众自助服务终端",
    spectatorDesc: "无障碍引导、实时碳减排效益与 GIS 地图系统",
    attendeeStatus: "蓝牙与本地电子导览已同步",
    managerStatus: "场馆 GIS 数据流在线中"
  },
  de: {
    spectatorPortal: "EcoAccess.ai Zuschauerportal",
    spectatorDesc: "Interaktiver Leitfaden, CO2-Einsparung & Barrierefreiheitskarte",
    attendeeStatus: "Bluetooth & Lokaler Leitfaden synchronisiert",
    managerStatus: "GIS-Infrastruktur-Datenströme online"
  }
};

const managerTitleTranslations = {
  en: {
    title: "APAC Cricket Stadium Management Console",
    subtitle: "Real-Time Energy Grid, Vision AI, & Accessibility Dispatch"
  },
  es: {
    title: "Consola de Gestión del Estadio de Cricket APAC",
    subtitle: "Red de Energía en Tiempo Real, IA de Visión y Despacho de Accesibilidad"
  },
  ja: {
    title: "APACクリケットスタジアム管理コンソール",
    subtitle: "リアルタイム電力グリッド、ビジョンAI、アクセシビリティ指示発令"
  },
  zh: {
    title: "APAC 板球体育场综合管理控制台",
    subtitle: "实时智能电网、视觉人工智能审计与无障碍调度中心"
  },
  de: {
    title: "APAC Cricket Stadion Management-Konsole",
    subtitle: "Echtzeit-Stromnetz, Vision KI & Barrierefreiheits-Einsatz"
  }
};

function DashboardContent() {
  const { activeTab, portalRole, appLanguage, spectatorCount, sidebarCollapsed, setSidebarCollapsed } = useEcoAccess();

  const tApp = appTranslations[appLanguage] || appTranslations.en;
  const tMgr = managerTitleTranslations[appLanguage] || managerTitleTranslations.en;

  const currentTitle = portalRole === 'attendee' ? tApp.spectatorPortal : tMgr.title;
  const currentSubtitle = portalRole === 'attendee' ? tApp.spectatorDesc : tMgr.subtitle;
  const currentStatus = portalRole === 'attendee' ? tApp.attendeeStatus : tApp.managerStatus;

  return (
    <div className="main-content-wrapper">
      {/* HEADER */}
      <header className="header" style={{ marginBottom: '1.5rem' }}>
        <div className="header-title-section" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button 
            className="button secondary" 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            style={{ padding: '0.45rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', margin: 0 }}
            title="Toggle Sidebar"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', color: 'var(--color-text-secondary)' }}>
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
          
          <div>
            <h1 style={{ fontSize: '1.5rem', margin: 0, fontWeight: '800' }}>{currentTitle}</h1>
            <p style={{ margin: '2px 0 0 0' }}>{currentSubtitle}</p>
          </div>
        </div>
        
        <div className="header-status" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
          <div className="pulse-indicator">
            <div className="pulse-dot"></div>
            <span>{currentStatus}</span>
          </div>
        </div>
      </header>

      {/* CONTENT BODY */}
      <div className="content-body">
        {/* TAB 1: COMMAND CENTER (DASHBOARD) */}
        {activeTab === 'dashboard' && (
          <div className="animate-slide-up">
            {/* KPI Summary Cards (Only shown to Manager on Command Center) */}
            {portalRole === 'manager' && <StatsGrid />}

            <div className="section-grid-full" style={{ marginBottom: '2rem' }}>
              <InteractiveMap />
            </div>

            {portalRole === 'manager' && (
              <>
                {/* Vertex AI Vision: Live Stream Analyzers (Max 75,000 Capacity) */}
                <div style={{ marginBottom: '1.5rem', width: '100%' }}>
                  <LiveCCTV />
                </div>

                {/* BigQuery ML: Carbon & Energy Forecasts (Positioned under Live Stream Analyzers) */}
                <div style={{ marginBottom: '1.5rem', width: '100%' }}>
                  <BigQueryML />
                </div>

                {/* Strategic Blueprint Sliders */}
                <div style={{ marginBottom: '1.5rem', width: '100%' }}>
                  <StrategicSliders />
                </div>

                {/* Merged Knowledge Assistant Module */}
                <div id="knowledge-assistant-section">
                  <ProductConfigurator />
                </div>
              </>
            )}
          </div>
        )}

        {/* TAB 5: SUSTAINABILITY CHAT (No metric boxes above chat) */}
        {activeTab === 'citizen' && <SustainabilityChat />}
      </div>
    </div>
  );
}

function AppLayout() {
  const { highContrast, fontSizeClass } = useEcoAccess();
  return (
    <div className={`app-container ${highContrast ? 'high-contrast-active' : ''} ${fontSizeClass}`}>
      <Sidebar />
      <main className="main-content">
        <DashboardContent />
      </main>
    </div>
  );
}

function App() {
  return (
    <EcoAccessProvider>
      <AppLayout />
    </EcoAccessProvider>
  );
}

export default App;
