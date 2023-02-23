import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root  = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <GoogleOAuthProvider clientId ="858168193951-q9rvhogde7ig6gdob3d2gtpjaj9loa0t.apps.googleusercontent.com">
    <App />
    </GoogleOAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);


// reportWebVitals();
