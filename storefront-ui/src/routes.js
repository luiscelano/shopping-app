import { createBrowserRouter } from 'react-router-dom'
import HomePage from 'src/views/app/home'
import Profile from 'src/views/app/profile'
import AppLayout from 'src/components/AppLayout'
import CheckoutPage from 'src/views/app/checkout'
import LoginPage from 'src/views/auth/login'
import SignUpPage from 'src/views/auth/signup'
import RequestPasswordRecoveryPage from 'src/views/auth/request-password'
import ResetPasswordPage from 'src/views/auth/reset-password'

const routes = createBrowserRouter([
  {
    path: '/',
    Component: AppLayout,
    children: [
      {
        path: '',
        Component: HomePage
      },
      {
        path: 'checkout',
        Component: CheckoutPage
      },
      {
        path: 'profile',
        Component: Profile
      },
      {
        path: '/auth',
        children: [
          {
            path: 'login',
            Component: LoginPage
          },
          {
            path: 'signup',
            Component: SignUpPage
          },
          {
            path: 'request-password',
            Component: RequestPasswordRecoveryPage
          },
          {
            path: 'reset-password',
            Component: ResetPasswordPage
          }
        ]
      }
    ]
  }
])

export default routes
