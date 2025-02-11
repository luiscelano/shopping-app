import React from 'react'
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Divider, Grid2, Typography } from '@mui/material'
import * as styles from './styles'

const OrderItem = ({ details }) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon id={`order-${details.orderId}-header`} />}>
        <Typography component="span" sx={{ width: '33%', flexShrink: 0 }}>{`Orden #${details.orderId}`}</Typography>
        <Typography component="span" sx={{ color: 'text.secondary' }}>
          {`Q${details.orderTotal.toFixed(2)}`}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid2 size="12">
          <Typography variant="body1">{`Dirección de envío: ${details.shippingAddress}`}</Typography>
        </Grid2>
        <br />
        <Divider />
        <br />
        <Grid2 container size="12" display="flex" flexDirection="column" spacing={2}>
          {Array.from(details.orderItems).map((item) => (
            <>
              <styles.OrderProductItemContainer>
                <img src={item.product.imageURL} alt="order-product-item" width={'40px'} />
                <styles.OrderProductItemLeading>
                  <Typography variant="subtitle1">{item.product.title}</Typography>
                  <Typography component="span" sx={{ color: 'text.secondary' }}>{`Q${item.price.toFixed(
                    2
                  )}`}</Typography>
                </styles.OrderProductItemLeading>
                <styles.OrderProductItemTrailing>
                  <Typography variant="body1">{`Cantidad: ${item.quantity}`}</Typography>
                </styles.OrderProductItemTrailing>
              </styles.OrderProductItemContainer>
              <Divider />
            </>
          ))}
        </Grid2>
      </AccordionDetails>
    </Accordion>
  )
}

export default OrderItem
