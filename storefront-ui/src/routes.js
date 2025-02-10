import { createBrowserRouter } from 'react-router-dom'
import HomePage from 'src/views/app/home'
import ProfilePage from 'src/views/app/account/profile'
import AppLayout from 'src/components/AppLayout'
import CheckoutPage from 'src/views/app/checkout'
import LoginPage from 'src/views/auth/login'
import SignUpPage from 'src/views/auth/signup'
import RequestPasswordRecoveryPage from 'src/views/auth/request-password'
import ResetPasswordPage from 'src/views/auth/reset-password'
import { AccountPage } from 'src/views/app/account'
import redirectIfAuthenticated from 'src/loaders/redirectIfAuthenticated'
import OrdersPage from 'src/views/app/account/orders'
import OrderConfirmationPage from 'src/views/app/order-confirmation'

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
        path: 'order-confirmation',
        Component: OrderConfirmationPage
      },
      {
        path: '/account',
        Component: AccountPage,
        loader: redirectIfAuthenticated,
        children: [
          {
            path: 'profile',
            Component: ProfilePage
          },
          {
            path: 'orders',
            Component: OrdersPage
          }
        ]
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
