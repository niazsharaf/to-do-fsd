import { App } from '@app/App'
import { AppProviders } from '@app/providers'
import ReactDOM from 'react-dom/client'

import { version as APP_VERSION } from '../package.json'
import '@shared/styles/global.css'

console.log('--- App started')
console.log('version:', APP_VERSION)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AppProviders>
    <App />
  </AppProviders>,
)
