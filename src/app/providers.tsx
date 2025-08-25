import { BrowserRouter } from 'react-router-dom'

import type { ReactNode } from 'react'

export function AppProviders({ children }: { children: ReactNode }) {
  return <BrowserRouter basename="/to-do-fsd">{children}</BrowserRouter>
}
