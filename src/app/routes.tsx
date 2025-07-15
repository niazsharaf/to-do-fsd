import { Navigate } from 'react-router-dom'
import { MainLayout } from '@widgets/main-layout'
import { HomePage } from '@pages/home-page'
import { LoginPage } from '@pages/login-page'

export const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '*', element: <Navigate to="/" /> },
    ],
  },
]
