import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import '@/index.css'

// Suppress the benign "ResizeObserver loop completed with undeliverable
// notifications" warning — a known browser limitation triggered by layout
// animations (Framer Motion) and responsive charts (Recharts). It does not
// affect rendering; we swallow only this specific message.
window.addEventListener('error', (e) => {
  if (e.message === 'ResizeObserver loop completed with undeliverable notifications.') {
    e.stopImmediatePropagation();
    e.preventDefault();
  }
});
window.addEventListener('unhandledrejection', (e) => {
  if (e?.reason?.message === 'ResizeObserver loop completed with undeliverable notifications.') {
    e.preventDefault();
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)