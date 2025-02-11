import { Grid2 } from '@mui/material'
import React from 'react'
import OrderItems from 'src/components/OrderItems'
import withOrders from 'src/containers/orders/withOrders'

const OrdersPage = (props) => {
  return (
    <Grid2 container>
      <OrderItems items={props.orders} />
    </Grid2>
  )
}

export default withOrders(OrdersPage)
