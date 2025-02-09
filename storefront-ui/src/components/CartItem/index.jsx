import React from 'react'
import * as styles from './styles'
import { IconButton, Typography } from '@mui/material'
import { Delete as DeleteIcon, Remove as RemoveIcon, Add as AddIcon } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import * as cartActions from 'src/redux/cart/actions'

const CartItem = ({ details }) => {
  const dispatch = useDispatch()

  const addProductElementToCart = () => dispatch(cartActions.addProductElementToCart(details))
  const removeProductElementFromCart = () => dispatch(cartActions.removeProductElementFromCart(details))
  const removeProductFromCart = () => dispatch(cartActions.removeProductFromCart(details))

  return (
    <styles.CartItemContainer>
      <img src={details.imageURL} alt="cart-item" height={75}></img>
      <styles.CartItemLeading>
        <Typography variant="h6">{details.title}</Typography>
        <Typography variant="body">{`${details.quantity} x Q${details.price.toFixed(2)}`}</Typography>
      </styles.CartItemLeading>
      <styles.CartItemTrailing>
        <IconButton onClick={removeProductFromCart}>
          <DeleteIcon color="error" />
        </IconButton>
        <div style={{ width: 'max-content' }}>
          <IconButton onClick={removeProductElementFromCart}>
            <RemoveIcon />
          </IconButton>
          <IconButton onClick={addProductElementToCart}>
            <AddIcon />
          </IconButton>
        </div>
      </styles.CartItemTrailing>
    </styles.CartItemContainer>
  )
}

export default CartItem
