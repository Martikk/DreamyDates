import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import './index.css';
// import LogRocket from 'logrocket';
// LogRocket.init('0eqphi/martik');

function ensureRoot() {
  let el = document.getElementById('root');
  if (!el) {
    el = document.createElement('div');
    el.id = 'root';
    document.body.appendChild(el);
  }
  return el;
}

function mount() {
  const container = ensureRoot();

  if (!window.__APP_ROOT__) {
    window.__APP_ROOT__ = ReactDOM.createRoot(container);
  }

  window.__APP_ROOT__.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount);
} else {
  mount();
}

// CRA/Webpack HMR only (без Vite)
if (typeof module !== 'undefined' && module.hot) {
  module.hot.accept();
}