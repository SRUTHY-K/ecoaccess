import React, { useState } from 'react';
import { useEcoAccess } from '../context/EcoAccessContext';
import { Cpu, Send, MessageSquare, Info, Shield, HelpCircle } from 'lucide-react';

export default function SustainabilityChat() {
  const {
    chatInput,
    setChatInput,
    chatMessages,
    isTyping,
    handleChatSubmit,
    spectatorFeedbacks,
    translateFeedback
  } = useEcoAccess();

  const [expandedRAG, setExpandedRAG] = useState({});

  const handleSuggestionClick = (text) => {
    setChatInput(text);
  };

  const toggleRAGExpand = (idx) => {
    setExpandedRAG(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  return (
    <div className="animate-slide-up">
      <div className="section-grid-2x1">
        
        {/* LEFT: CHATBOT */}
        <div className="glass-panel chatbot-container" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="panel-header">
            <h2 className="panel-title">
              <Cpu size={18} style={{color: 'var(--color-accent-indigo)'}} />
              EcoAccess Chat Co-Pilot (Vertex AI RAG)
            </h2>
          </div>

          <div className="chat-messages" style={{ height: '340px', overflowY: 'auto', paddingRight: '4px' }}>
            {chatMessages.map((msg, index) => (
              <div key={index} className={`chat-bubble ${msg.sender} animate-slide-up`} style={{ marginBottom: '0.5rem' }}>
                <span>{msg.text}</span>
                
                {msg.ragSnippet && (
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
                        "{msg.ragSnippet}"
                      </p>
                    )}
                  </div>
                )}

                {msg.citations && msg.citations.length > 0 && (
                  <div className="citation-list" style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '0.35rem' }}>
                    {msg.citations.map((cit, cIdx) => (
                      <span key={cIdx} className="citation-badge" style={{ display: 'flex', alignItems: 'center', gap: '3px', padding: '2px 6px', borderRadius: '4px', fontSize: '0.6rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'var(--color-text-secondary)' }}>
                        <Shield size={8} style={{ color: 'var(--color-accent-indigo)' }} /> {cit}
                      </span>
                    ))}
                  </div>
                )}
                <span className="chat-bubble-meta" style={{ display: 'block', fontSize: '0.65rem', marginTop: '0.25rem', textAlign: msg.sender === 'user' ? 'right' : 'left' }}>{msg.time}</span>
              </div>
            ))}
            {isTyping && (
              <div className="chat-bubble ai animate-slide-up" style={{alignSelf: 'flex-start'}}>
                <span style={{fontStyle: 'italic', color: 'var(--color-text-secondary)'}}>Gemini is modeling parameters...</span>
              </div>
            )}
          </div>

          <div style={{padding: '0.5rem 0.5rem 0 0.5rem'}}>
            <div className="suggested-queries" style={{display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '0.25rem'}}>
              <button 
                className="btn-suggestion"
                style={{whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '3px'}}
                onClick={() => handleSuggestionClick("Explain how AlloyDB translates Spanish and Japanese spectator feedback.")}
              >
                <HelpCircle size={10} /> How Translation works
              </button>
              <button 
                className="btn-suggestion"
                style={{whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '3px'}}
                onClick={() => handleSuggestionClick("Detail options to fix the broken elevator at Gate 6.")}
              >
                <HelpCircle size={10} /> Gate 6 Elevator Fix
              </button>
              <button 
                className="btn-suggestion"
                style={{whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '3px'}}
                onClick={() => handleSuggestionClick("What support is provided for visually impaired spectators?")}
              >
                <HelpCircle size={10} /> Visually Impaired Support
              </button>
            </div>
          </div>

          <form className="chat-input-area" onSubmit={handleChatSubmit} style={{ marginTop: 'auto' }}>
            <input 
              type="text" 
              className="chat-input"
              placeholder="Ask co-pilot: translation flow, wheelchair shuttle times, grid load..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
            />
            <button type="submit" className="btn-icon">
              <Send size={16} style={{color: '#fff'}} />
            </button>
          </form>
        </div>

        {/* RIGHT: MULTILINGUAL SPECTATOR DATA */}
        <div className="glass-panel" style={{display: 'flex', flexDirection: 'column'}}>
          <div className="panel-header">
            <h2 className="panel-title">
              <MessageSquare size={18} style={{color: 'var(--color-accent-pink)'}} />
              Multilingual Feedback Feed (Vector Search)
            </h2>
          </div>

          <span style={{fontSize: '0.8rem', color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.75rem'}}>
            Foreign language fan submissions are matched via **AlloyDB pgvector** and automatically translated to identify accessibility barriers:
          </span>

          <div className="citizen-reports-list" style={{maxHeight: '380px', overflowY: 'auto', paddingRight: '4px'}}>
            {spectatorFeedbacks.map(rep => (
              <div key={rep.id} className="citizen-report-card" style={{background: 'rgba(255, 255, 255, 0.01)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.75rem', marginBottom: '0.75rem'}}>
                <div className="report-top" style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem'}}>
                  <span className="report-cat" style={{fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--color-text-secondary)'}}>{rep.category} ({rep.language})</span>
                  <span className={`sentiment-pill ${rep.sentiment}`} style={{fontSize: '0.65rem', padding: '0.1rem 0.4rem', borderRadius: '4px', textTransform: 'uppercase', fontWeight: '700'}}>
                    {rep.sentiment}
                  </span>
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
                    Translate with Gemini
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

      </div>
    </div>
  );
}
