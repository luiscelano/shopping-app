import React from 'react'
import { Navigate } from 'react-router-dom'
import { getIsAuthenticated } from 'src/utils/storage'

function Auth() {
  const isAuthenticated = getIsAuthenticated()

  if (isAuthenticated) return <Navigate to={'/'} replace={true} />

  return <div>auth screen</div>
}

export default Auth
