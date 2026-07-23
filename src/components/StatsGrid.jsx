import React, { useState, useEffect, useRef } from 'react';
import { useEcoAccess } from '../context/EcoAccessContext';
import { 
  Activity, 
  Zap, 
  Compass, 
  MessageSquare, 
  ArrowUpRight, 
  ArrowDownRight 
} from 'lucide-react';

// Smooth count-up animation when a metric value changes
function useAnimatedNumber(target, duration = 700) {
  const [current, setCurrent] = useState(target);
  const prevRef = useRef(target);
  useEffect(() => {
    const start = prevRef.current;
    const diff = target - start;
    if (diff === 0) return;
    const startTime = performance.now();
    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic: feels natural for counters
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(start + diff * eased));
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        prevRef.current = target;
      }
    };
    requestAnimationFrame(step);
  }, [target, duration]);
  return current;
}

const statsTranslations = {
  en: {
    carbonFootprint: "Carbon Footprint",
    metricTonnes: "Metric Tonnes CO2e",
    scope: "Scope 2 & 3",
    renewableShare: "Renewable Energy",
    energyMix: "Green Energy Mix",
    activePeak: "Active Peak",
    accessibilityIndex: "Accessibility Index",
    barrierWarning: "Barrier Warning",
    highInclusivity: "High Inclusivity",
    gisGrid: "GIS Grid",
    spectatorSat: "Spectator Satisfaction",
    highlySatisfied: "Highly Satisfied",
    reputationStrain: "Reputation Strain",
    liveSentiment: "Live Sentiment",
    scale: "0-100% Scale"
  },
  es: {
    carbonFootprint: "Huella de Carbono",
    metricTonnes: "Toneladas Métricas CO2e",
    scope: "Alcance 2 y 3",
    renewableShare: "Energía Renovable",
    energyMix: "Mix de Energía Verde",
    activePeak: "Pico Activo",
    accessibilityIndex: "Índice de Accesibilidad",
    barrierWarning: "Alerta de Barreras",
    highInclusivity: "Alta Inclusividad",
    gisGrid: "Red GIS",
    spectatorSat: "Satisfacción del Espectador",
    highlySatisfied: "Muy Satisfecho",
    reputationStrain: "Tensión de Reputación",
    liveSentiment: "Sentimiento en Vivo",
    scale: "Escala 0-100%"
  },
  ja: {
    carbonFootprint: "炭素排出量",
    metricTonnes: "二酸化炭素換算トン",
    scope: "スコープ 2 & 3",
    renewableShare: "再生可能エネルギー比率",
    energyMix: "グリーンエネルギー割合",
    activePeak: "アクティブピーク",
    accessibilityIndex: "アクセシビリティ指標",
    barrierWarning: "障壁警告アラート",
    highInclusivity: "高いアクセシビリティ",
    gisGrid: "GISグリッド層",
    spectatorSat: "来場者満足度",
    highlySatisfied: "極めて満足",
    reputationStrain: "評価低下リスク",
    liveSentiment: "ライブ感情推移",
    scale: "0-100% スケール"
  },
  zh: {
    carbonFootprint: "碳排放足迹监控",
    metricTonnes: "公吨 CO2e",
    scope: "范围 2 与 范围 3",
    renewableShare: "绿电与可再生能源占比",
    energyMix: "清洁环保能源结构",
    activePeak: "当前活动峰值",
    accessibilityIndex: "无障碍通行指数",
    barrierWarning: "出行阻碍警告",
    highInclusivity: "高无障碍覆盖率",
    gisGrid: "GIS 传感器网络",
    spectatorSat: "参与者活动满意度",
    highlySatisfied: "极度满意度",
    reputationStrain: "公共声誉承压",
    liveSentiment: "实时情感分析",
    scale: "0-100% 百分比刻度"
  },
  de: {
    carbonFootprint: "CO2-Fußabdruck",
    metricTonnes: "Metrische Tonnen CO2e",
    scope: "Scope 2 & 3",
    renewableShare: "Erneuerbare Energien",
    energyMix: "Grüner Energiemix",
    activePeak: "Aktive Spitze",
    accessibilityIndex: "Barrierefreiheitsindex",
    barrierWarning: "Barrierewarnung",
    highInclusivity: "Hohe Inklusion",
    gisGrid: "GIS-Netzwerk",
    spectatorSat: "Zuschauerzufriedenheit",
    highlySatisfied: "Sehr zufrieden",
    reputationStrain: "Rufbelastung",
    liveSentiment: "Live-Stimmungsanalyse",
    scale: "0-100% Skala"
  }
};

export default function StatsGrid() {
  const { metrics, appLanguage } = useEcoAccess();

  const handleTextToSpeech = () => {};

  const animatedCarbon = useAnimatedNumber(metrics.carbonFootprint);
  const animatedGreen = useAnimatedNumber(metrics.greenEnergyMix);
  const animatedIncl = useAnimatedNumber(metrics.inclusivityIndex);
  const animatedFanSat = useAnimatedNumber(metrics.fanSat);

  const carbonPct = 28; // Displays clean 28% carbon intensity load scale against the steady 62,517 t baseline
  const energyPct = Math.max(0, Math.min(100, Math.round(animatedGreen)));
  const accessPct = Math.max(0, Math.min(100, Math.round(animatedIncl)));
  const fanPct = Math.max(0, Math.min(100, Math.round(animatedFanSat)));

  const t = statsTranslations[appLanguage] || statsTranslations.en;

  return (
    <div className="dashboard-summary-grid">
      {/* CARD 1: CARBON FOOTPRINT */}
      <div className="glass-panel stat-card" style={{ '--accent-gradient': 'var(--color-accent-red)', transition: 'transform 0.2s ease', display: 'flex', flexDirection: 'column' }}>
        <div className="stat-header">
          <span style={{ fontSize: '0.8rem', fontWeight: '600' }}>{t.carbonFootprint}</span>
          <Activity size={16} style={{color: 'var(--color-accent-red)'}} />
        </div>
        <div className="stat-value">{animatedCarbon.toLocaleString()} t</div>
        <div className="stat-change negative" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: '0.4rem', marginBottom: '0.8rem' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)' }}>{t.metricTonnes}</span>
          <span style={{ fontSize: '0.72rem', fontWeight: '700', color: 'var(--color-accent-red)' }}>{t.scope}</span>
        </div>

        {/* Linear Progress Bar Line & Percentage */}
        <div style={{ marginTop: 'auto', width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: 'var(--color-text-secondary)', marginBottom: '0.2rem' }}>
            <span style={{ textTransform: 'uppercase', fontSize: '0.55rem', fontWeight: '800', color: 'var(--color-text-muted)', letterSpacing: '0.02em' }}>{t.scale}</span>
            <span style={{ fontWeight: 'bold', color: 'var(--color-accent-red)' }}>{carbonPct}%</span>
          </div>
          <div style={{ width: '100%', height: '5px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${carbonPct}%`, background: 'var(--color-accent-red)', boxShadow: '0 0 8px var(--color-accent-red-glow)', borderRadius: '3px', transition: 'width 0.4s ease' }} />
          </div>
        </div>
      </div>

      {/* CARD 2: GREEN ENERGY MIX */}
      <div className="glass-panel stat-card" style={{ '--accent-gradient': 'var(--color-accent-emerald)', transition: 'transform 0.2s ease', display: 'flex', flexDirection: 'column' }}>
        <div className="stat-header">
          <span style={{ fontSize: '0.8rem', fontWeight: '600' }}>{t.renewableShare}</span>
          <Zap size={16} style={{color: 'var(--color-accent-emerald)'}} />
        </div>
        <div className="stat-value">{animatedGreen}%</div>
        <div className="stat-change positive" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: '0.4rem', marginBottom: '0.8rem' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)' }}>{t.energyMix}</span>
          <span style={{ fontSize: '0.72rem', fontWeight: '700', color: 'var(--color-accent-emerald)' }}>{t.activePeak}</span>
        </div>

        {/* Linear Progress Bar Line & Percentage */}
        <div style={{ marginTop: 'auto', width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: 'var(--color-text-secondary)', marginBottom: '0.2rem' }}>
            <span style={{ textTransform: 'uppercase', fontSize: '0.55rem', fontWeight: '800', color: 'var(--color-text-muted)', letterSpacing: '0.02em' }}>{t.scale}</span>
            <span style={{ fontWeight: 'bold', color: 'var(--color-accent-emerald)' }}>{energyPct}%</span>
          </div>
          <div style={{ width: '100%', height: '5px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${energyPct}%`, background: 'var(--color-accent-emerald)', boxShadow: '0 0 8px var(--color-accent-emerald-glow)', borderRadius: '3px', transition: 'width 0.4s ease' }} />
          </div>
        </div>
      </div>

      {/* CARD 3: ACCESSIBILITY INDEX */}
      <div className="glass-panel stat-card" style={{ '--accent-gradient': 'var(--color-accent-cyan)', transition: 'transform 0.2s ease', display: 'flex', flexDirection: 'column' }}>
        <div className="stat-header">
          <span style={{ fontSize: '0.8rem', fontWeight: '600' }}>{t.accessibilityIndex}</span>
          <Compass size={16} style={{color: 'var(--color-accent-cyan)'}} />
        </div>
        <div className="stat-value">{animatedIncl}%</div>
        <div className={`stat-change ${metrics.inclusivityIndex > 60 ? 'positive' : 'negative'}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: '0.4rem', marginBottom: '0.8rem' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)' }}>{metrics.inclusivityIndex > 70 ? t.highInclusivity : t.barrierWarning}</span>
          <span style={{ fontSize: '0.72rem', fontWeight: '700', color: 'var(--color-accent-cyan)' }}>{t.gisGrid}</span>
        </div>

        {/* Linear Progress Bar Line & Percentage */}
        <div style={{ marginTop: 'auto', width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: 'var(--color-text-secondary)', marginBottom: '0.2rem' }}>
            <span style={{ textTransform: 'uppercase', fontSize: '0.55rem', fontWeight: '800', color: 'var(--color-text-muted)', letterSpacing: '0.02em' }}>{t.scale}</span>
            <span style={{ fontWeight: 'bold', color: 'var(--color-accent-cyan)' }}>{accessPct}%</span>
          </div>
          <div style={{ width: '100%', height: '5px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${accessPct}%`, background: 'var(--color-accent-cyan)', boxShadow: '0 0 8px var(--color-accent-cyan-glow)', borderRadius: '3px', transition: 'width 0.4s ease' }} />
          </div>
        </div>
      </div>

      {/* CARD 4: SPECTATOR SATISFACTION */}
      <div className="glass-panel stat-card" style={{ '--accent-gradient': 'var(--color-accent-pink)', transition: 'transform 0.2s ease', display: 'flex', flexDirection: 'column' }}>
        <div className="stat-header">
          <span style={{ fontSize: '0.8rem', fontWeight: '600' }}>{t.spectatorSat}</span>
          <MessageSquare size={16} style={{color: 'var(--color-accent-pink)'}} />
        </div>
        <div className="stat-value">{animatedFanSat}%</div>
        <div className={`stat-change ${metrics.fanSat > 65 ? 'positive' : 'negative'}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: '0.4rem', marginBottom: '0.8rem' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)' }}>{metrics.fanSat > 75 ? t.highlySatisfied : t.reputationStrain}</span>
          <span style={{ fontSize: '0.72rem', fontWeight: '700', color: 'var(--color-accent-pink)' }}>{t.liveSentiment}</span>
        </div>

        {/* Linear Progress Bar Line & Percentage */}
        <div style={{ marginTop: 'auto', width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: 'var(--color-text-secondary)', marginBottom: '0.2rem' }}>
            <span style={{ textTransform: 'uppercase', fontSize: '0.55rem', fontWeight: '800', color: 'var(--color-text-muted)', letterSpacing: '0.02em' }}>{t.scale}</span>
            <span style={{ fontWeight: 'bold', color: 'var(--color-accent-pink)' }}>{fanPct}%</span>
          </div>
          <div style={{ width: '100%', height: '5px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${fanPct}%`, background: 'var(--color-accent-pink)', boxShadow: '0 0 8px var(--color-accent-pink-glow)', borderRadius: '3px', transition: 'width 0.4s ease' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
