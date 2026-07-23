import React, { Component, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("React Error Boundary caught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', background: '#0b1329', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
          <h2>EcoAccess Command Center</h2>
          <p style={{ color: '#ef4444', margin: '1rem 0' }}>{this.state.error && this.state.error.toString()}</p>
          <button 
            style={{ padding: '0.5rem 1rem', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
          >
            Reset Session & Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
