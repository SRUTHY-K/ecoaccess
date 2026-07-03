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
import LogViewer from './components/LogViewer';

import './App.css';

function DashboardContent() {
  const { activeTab, eventTitle, eventSubtitle } = useEcoAccess();

  return (
    <div className="main-content-wrapper">
      {/* HEADER */}
      <header className="header" style={{ marginBottom: '1.5rem' }}>
        <div className="header-title-section">
          <h1>{eventTitle}</h1>
          <p>{eventSubtitle}</p>
        </div>
        
        <div className="header-status">
          <div className="pulse-indicator">
            <div className="pulse-dot"></div>
            <span>GIS Infrastructure Streams Online</span>
          </div>
        </div>
      </header>

      {/* CONTENT BODY */}
      <div className="content-body">
        {/* KPI Summary Cards */}
        <StatsGrid />

        {/* TAB 1: COMMAND CENTER (DASHBOARD) */}
        {activeTab === 'dashboard' && (
          <div className="animate-slide-up">
            <div className="section-grid-full" style={{ marginBottom: '2rem' }}>
              <InteractiveMap />
            </div>

            <div className="section-grid-2x1" style={{ marginBottom: '2rem' }}>
              <LiveCCTV />
              <BigQueryML />
            </div>

            <StrategicSliders />
          </div>
        )}

        {/* TAB 5: SUSTAINABILITY CHAT */}
        {activeTab === 'citizen' && <SustainabilityChat />}

        {/* TAB 7: KNOWLEDGE ASSISTANT */}
        {activeTab === 'settings' && <ProductConfigurator />}

        {/* TAB 8: SYSTEM LOGS */}
        {activeTab === 'logs' && <LogViewer />}
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
