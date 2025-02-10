import { Container, Tab, Tabs } from '@mui/material'
import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

export const AccountPage = () => {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <>
      <Tabs value={location.pathname} centered onChange={(_, value) => navigate(value)}>
        <Tab label="Mi perfil" value={'/account/profile'}></Tab>
        <Tab label="Mis pedidos" value={'/account/orders'}></Tab>
      </Tabs>
      <Container maxWidth="sm">
        <Outlet />
      </Container>
    </>
  )
}
