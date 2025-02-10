import { Button, Container, Grid2, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import useQueryParams from 'src/utils/useQueryParams'

const OrderConfirmationPage = () => {
  const navigate = useNavigate()
  const query = useQueryParams()
  return (
    <Container maxWidth="sm">
      <Grid2 container spacing={3} display="flex" flexDirection="column">
        <Grid2
          size="12"
          sx={{ flexGrow: 1 }}
          display="flex"
          flexDirection="row"
          justifyContent="center"
          textAlign="center">
          <Typography variant="h4">Orden realizada correctamente!</Typography>
        </Grid2>
        <Grid2
          size="12"
          sx={{ flexGrow: 1 }}
          display="flex"
          flexDirection="row"
          justifyContent="center"
          textAlign="center">
          <Typography variant="h5">{`Orden #${query.get('orderId')}`}</Typography>
        </Grid2>
        <Grid2 size="12">
          <Button
            fullWidth
            disableElevation
            variant="contained"
            sx={{ borderRadius: '50px' }}
            onClick={() => navigate('/')}>
            Volver a inicio
          </Button>
        </Grid2>
      </Grid2>
    </Container>
  )
}

export default OrderConfirmationPage
