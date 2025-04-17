import { StrictMode } from 'react'
import {HeroUIProvider} from '@heroui/react'
import { createRoot } from 'react-dom/client'
import {ToastProvider} from "@heroui/toast";

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HeroUIProvider>
      <ToastProvider placement='top-right'/>
      <App />
    </HeroUIProvider>
  </StrictMode>,
)
