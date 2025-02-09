import { Button, Container, Grid, Grid2, TextField } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import CartItems from 'src/components/CartItems'
import CheckoutSummary from 'src/components/CheckoutSummary'
import * as cartSelectors from 'src/redux/cart/selectors'

const CheckoutPage = () => {
  const cartItems = useSelector(cartSelectors.getCartItemsSelector)

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
            <TextField label="Dirección de envío" variant="outlined" fullWidth />
          </Grid2>
          <Grid2 item size={12}>
            <Button sx={{ borderRadius: '50px', padding: '16px' }} disableElevation fullWidth variant="contained">
              Crear orden
            </Button>
          </Grid2>
        </Grid2>
      </Grid2>
    </Container>
  )
}

export default CheckoutPage
