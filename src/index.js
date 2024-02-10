import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals.js';
import { LoadScript } from '@react-google-maps/api';

const bootstrapLink = document.createElement('link');
bootstrapLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css';
bootstrapLink.rel = 'stylesheet';
document.head.appendChild(bootstrapLink);

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LoadScript googleMapsApiKey={apiKey}>
    <App />
    </LoadScript>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

