// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// (опц.) LogRocket, стили и т.д.

const container = document.getElementById('root');
if (!container) throw new Error('No #root element found');

// Кладём root в глобал, чтобы не создавать заново при повторном исполнении модуля (HMR/дубликаты)
let root = window.__APP_ROOT__;
if (!root) {
  root = ReactDOM.createRoot(container);
  window.__APP_ROOT__ = root;
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// (Vite) поддержка HMR, безопасно:
if (import.meta && import.meta.hot) {
  import.meta.hot.accept();
}