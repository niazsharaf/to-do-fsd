import { App } from '@app/App'
import { AppProviders } from '@app/providers'
import React from 'react'
import ReactDOM from 'react-dom/client'
import '@shared/styles/global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
)
