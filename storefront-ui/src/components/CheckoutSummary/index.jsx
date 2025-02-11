import { Grid2, Paper, Typography } from '@mui/material'
import React from 'react'

const CheckoutSummary = ({ items = [] }) => {
  const orderTotal = items.reduce((acc, current) => acc + current.price * current.quantity, 0)

  return (
    <Paper elevation={0}>
      <Grid2 container display={'flex'}>
        <Grid2 size={12} display="flex" flexDirection="row" justifyContent="space-between">
          <Typography variant="h6">Total de la orden</Typography>
          <Typography variant="h6">{orderTotal && `Q${orderTotal.toFixed(2)}`}</Typography>
        </Grid2>
      </Grid2>
    </Paper>
  )
}

export default CheckoutSummary
