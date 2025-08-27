import { App } from '@app/App'
import { AppProviders } from '@app/providers'
import ReactDOM from 'react-dom/client'
import '@shared/styles/global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AppProviders>
    <App />
  </AppProviders>,
)
