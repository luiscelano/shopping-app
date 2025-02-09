import { Grid2 } from '@mui/material'
import React from 'react'
import CartItem from '../CartItem'

const CartItems = ({ items = [] }) => {
  return (
    <Grid2 container display="flex" flexDirection="column" spacing={2}>
      {items.map((item, index) => (
        <CartItem details={item} key={`cart-item-${index}`} />
      ))}
    </Grid2>
  )
}

export default CartItems
