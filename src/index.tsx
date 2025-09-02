import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/googleAutocomplete.css';
import App from './App';
import { initPixel } from 'src/marketing/pixel';

// Initialize Meta Pixel (use env variable or fallback)
if (process.env.NODE_ENV === 'production') {
    initPixel(process.env.REACT_APP_META_PIXEL_ID || '1403191310783955');
}

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    // <React.StrictMode>
    <App />
    // </React.StrictMode>
);