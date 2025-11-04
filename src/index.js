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

  // Создаём root только один раз (устойчиво к повторному выполнению)
  if (!window.__APP_ROOT__) {
    window.__APP_ROOT__ = ReactDOM.createRoot(container);
  }

  window.__APP_ROOT__.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// Ждём готовности DOM (устранит ранние гонки)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount);
} else {
  mount();
}

/** HMR (кросс-совместимо) */
// Vite
if (typeof import !== 'undefined' && typeof import.meta !== 'undefined' && import.meta.hot) {
  import.meta.hot.accept();
}
// CRA/Webpack
if (typeof module !== 'undefined' && module.hot) {
  module.hot.accept();
}