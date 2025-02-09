import { createBrowserRouter, redirect } from 'react-router-dom'
import HomePage from 'src/views/app/home'
import Profile from 'src/views/app/profile'
import Auth from 'src/views/auth'
import AppLayout from 'src/components/AppLayout'
import Posts from 'src/views/app/posts'
import CheckoutPage from 'src/views/app/checkout'

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
        path: 'posts',
        Component: Posts
      }
    ]
  },
  { path: '/auth', Component: Auth }
])

export default routes
