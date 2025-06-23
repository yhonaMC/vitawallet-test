import React from 'react'
import ReactDOM from 'react-dom/client'
import { Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login/Login'
import { Layout, PrivateRoute } from './components'
import { AuthProvider } from './context/AuthContext'

import Dashboard from './pages/Dashboard/Dashboard'
import './index.css'
import { Toaster } from 'react-hot-toast'

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>
}

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AppProviders>
        <Outlet />
      </AppProviders>
    ),
    children: [
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '',
        element: (
          <PrivateRoute>
            <Layout>
              <Outlet />
            </Layout>
          </PrivateRoute>
        ),
        children: [
          {
            path: '/dashboard',
            element: <Dashboard />
          }
        ]
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Toaster position="top-right" reverseOrder={false} gutter={8} />
    <RouterProvider router={router} />
  </React.StrictMode>
)
