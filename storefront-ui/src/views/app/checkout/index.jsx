import { Button, Container, Grid2, TextField, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CartItems from 'src/components/CartItems'
import CheckoutSummary from 'src/components/CheckoutSummary'
import withOrderActions from 'src/containers/orders/withOrderActions'
import * as cartSelectors from 'src/redux/cart/selectors'
import { getIsAuthenticated } from 'src/utils/storage'

const CheckoutPage = ({ shippingAddress, setShippingAddress, placeOrder, isPlacingOrder }) => {
  const cartItems = useSelector(cartSelectors.getCartItemsSelector)
  const isAuthenticated = getIsAuthenticated()
  const navigate = useNavigate()

  if (!Array.from(cartItems || []).length) {
    return (
      <Container maxWidth="sm">
        <Grid2
          size="12"
          sx={{ flexGrow: 1 }}
          display="flex"
          flexDirection="row"
          justifyContent="center"
          textAlign="center"
          margin={5}>
          <Typography variant="h4">No hay productos en el carrito</Typography>
        </Grid2>
        <Grid2 size="12">
          <Button
            sx={{ borderRadius: '50px', padding: '16px' }}
            disableElevation
            fullWidth
            variant="contained"
            onClick={() => navigate('/')}>
            Regresar a inicio
          </Button>
        </Grid2>
      </Container>
    )
  }
  return (
    <Container>
      <Grid2 container spacing={3} display={'flex'} flexDirection={'row'} alignItems={'flex-start'}>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <CartItems items={cartItems} />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }} spacing={2} container>
          <Grid2 item size={12}>
            <CheckoutSummary items={cartItems} />
          </Grid2>
          <Grid2 item size={12}>
            <TextField
              disabled={!isAuthenticated}
              defaultValue={shippingAddress}
              onChange={(event) => setShippingAddress(event.target.value)}
              label="Dirección de envío"
              variant="outlined"
              fullWidth
            />
          </Grid2>
          <Grid2 item size={12}>
            <Button
              disabled={!isAuthenticated}
              sx={{ borderRadius: '50px', padding: '16px' }}
              disableElevation
              fullWidth
              variant="contained"
              loadingPosition="start"
              loading={isPlacingOrder}
              onClick={placeOrder}>
              Crear orden
            </Button>
          </Grid2>
          {!isAuthenticated && (
            <Grid2 item size={12}>
              <Button disableElevation fullWidth variant="text" onClick={() => navigate('/auth/login')}>
                Iniciar sesión para continuar
              </Button>
            </Grid2>
          )}
        </Grid2>
      </Grid2>
    </Container>
  )
}

export default withOrderActions(CheckoutPage)
