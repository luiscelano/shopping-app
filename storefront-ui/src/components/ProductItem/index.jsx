import { Button, Card, CardContent, Typography } from '@mui/material'
import React from 'react'
import * as styles from './styles'
import * as cartActions from 'src/redux/cart/actions'
import { useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'

const ProductItem = ({ details }) => {
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()

  const addProductToCart = () => {
    enqueueSnackbar('Producto agregado al carrito', {
      autoHideDuration: 2000,
      variant: 'default'
    })
    return dispatch(cartActions.addProductToCart(details))
  }
  return (
    <Card variant="outlined" sx={{ flexGrow: 1 }}>
      <CardContent>
        <styles.CardContainer>
          <img src={details.imageURL} alt="img-product" height={200}></img>
          <styles.CardContent>
            <styles.CardBody>
              <Typography variant="h5">{details?.title}</Typography>
              <Typography variant="body">{details?.description}</Typography>
              <Typography variant="h6">{`Q${details?.price?.toFixed(2)}`}</Typography>
            </styles.CardBody>
            <styles.CardBottom>
              <Button variant="contained" disableElevation sx={{ borderRadius: '50px' }} onClick={addProductToCart}>
                Agregar al carrito
              </Button>
            </styles.CardBottom>
          </styles.CardContent>
        </styles.CardContainer>
      </CardContent>
    </Card>
  )
}

export default ProductItem
