import ReactDOM from 'react-dom/client'
import { App } from './App.jsx'
import './styles.css'

const element = document.querySelector('[data-js="root"]')

const app = ReactDOM.createRoot(element)

app.render(<App />)
