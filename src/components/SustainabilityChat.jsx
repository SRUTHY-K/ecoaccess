import React from 'react';
import { useEcoAccess } from '../context/EcoAccessContext';
import { Cpu, Send, MessageSquare, Check } from 'lucide-react';

export default function SustainabilityChat() {
  const {
    chatInput,
    setChatInput,
    chatMessages,
    isTyping,
    handleChatSubmit,
    spectatorFeedbacks,
    translateFeedback,
    eventTitle,
    baseBudget,
    renewablesShare,
    transitInclusivity,
    audioAssistCoverage,
    metrics
  } = useEcoAccess();

  const handleSuggestionClick = (text) => {
    setChatInput(text);
  };

  return (
    <div className="animate-slide-up">
      <div className="section-grid-2x1">
        
        {/* LEFT: CHATBOT */}
        <div className="glass-panel chatbot-container">
          <div className="panel-header">
            <h2 className="panel-title">
              <Cpu size={18} style={{color: 'var(--color-accent-indigo)'}} />
              EcoAccess Chat Co-Pilot (Vertex AI RAG)
            </h2>
          </div>

          <div className="chat-messages" style={{ height: '340px', overflowY: 'auto' }}>
            {chatMessages.map((msg, index) => (
              <div key={index} className={`chat-bubble ${msg.sender}`}>
                <span>{msg.text}</span>
                
                {msg.ragSnippet && (
                  <div style={{ background: 'rgba(99, 102, 241, 0.08)', border: '1px dashed rgba(99, 102, 241, 0.25)', padding: '0.5rem', borderRadius: '4px', marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                    <span style={{ fontWeight: '700', color: 'var(--color-accent-indigo)', display: 'block', marginBottom: '0.25rem' }}>📖 AlloyDB pgvector RAG Match:</span>
                    "{msg.ragSnippet}"
                  </div>
                )}

                {msg.citations && msg.citations.length > 0 && (
                  <div className="citation-list">
                    {msg.citations.map((cit, cIdx) => (
                      <span key={cIdx} className="citation-badge">{cit}</span>
                    ))}
                  </div>
                )}
                <span className="chat-bubble-meta">{msg.time}</span>
              </div>
            ))}
            {isTyping && (
              <div className="chat-bubble ai" style={{alignSelf: 'flex-start'}}>
                <span style={{fontStyle: 'italic', color: 'var(--color-text-secondary)'}}>Gemini is modeling parameters...</span>
              </div>
            )}
          </div>

          <div style={{padding: '0.5rem 0.75rem 0 0.75rem'}}>
            <div className="suggested-queries" style={{display: 'flex', gap: '0.5rem', overflowX: 'auto'}}>
              <button 
                className="btn-suggestion"
                style={{whiteSpace: 'nowrap'}}
                onClick={() => handleSuggestionClick("Explain how AlloyDB translates Spanish and Japanese spectator feedback.")}
              >
                How Translation works
              </button>
              <button 
                className="btn-suggestion"
                style={{whiteSpace: 'nowrap'}}
                onClick={() => handleSuggestionClick("Detail options to fix the broken elevator at Gate 6.")}
              >
                Gate 6 Elevator Fix
              </button>
              <button 
                className="btn-suggestion"
                style={{whiteSpace: 'nowrap'}}
                onClick={() => handleSuggestionClick("What support is provided for visually impaired spectators?")}
              >
                Visually Impaired Support
              </button>
            </div>
          </div>

          <form className="chat-input-area" onSubmit={handleChatSubmit}>
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

          <div className="citizen-reports-list" style={{maxHeight: '380px', overflowY: 'auto'}}>
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
