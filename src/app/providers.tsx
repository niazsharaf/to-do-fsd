import { BrowserRouter } from 'react-router-dom'

import type { ReactNode } from 'react'

export function AppProviders({ children }: { children: ReactNode }) {
  return <BrowserRouter>{children}</BrowserRouter>
}
