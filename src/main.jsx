import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './styles/base.css';
import './styles/footer.css';
import './styles/hero.css';
import './styles/nav.css';
import './styles/products.css';
import './styles/sections.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
