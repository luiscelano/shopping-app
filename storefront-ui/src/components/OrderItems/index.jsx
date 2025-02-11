import { Grid2 } from '@mui/material'
import React from 'react'
import OrderItem from 'src/components/OrderItem'

const OrderItems = ({ items = [] }) => {
  return (
    <Grid2 container size="12" flexGrow={1} display="flex" flexDirection="column" spacing={2}>
      {items.map((item) => (
        <Grid2 size={12} flexGrow={1}>
          <OrderItem details={item} />
        </Grid2>
      ))}
    </Grid2>
  )
}

export default OrderItems
