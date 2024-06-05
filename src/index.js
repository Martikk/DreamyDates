import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import LogRocket from 'logrocket';
LogRocket.init('0eqphi/martik');


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
            <App />
    </React.StrictMode>
);
