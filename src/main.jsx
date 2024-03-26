import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const element = document.querySelector('[data-js="root"]')

const app = ReactDOM.createRoot(element)

app.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
