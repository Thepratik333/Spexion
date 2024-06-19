import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from 'react-hot-toast';

const customToastOptions = {
  position: "bottom-center",
  style: {
    backgroundColor: "#dcd7d7",
    marginRight: '50px',
  }
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <App />
      <Toaster toastOptions={customToastOptions}/>
 </React.StrictMode>,
)
