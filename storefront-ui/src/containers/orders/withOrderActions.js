import React, { useState, useCallback } from 'react'
import httpClient from 'src/utils/httpClient'
import { getProfile } from 'src/utils/storage'
import * as cartSelectors from 'src/redux/cart/selectors'
import * as cartActions from 'src/redux/cart/actions'
import { useDispatch, useSelector } from 'react-redux'
import { enqueueSnackbar } from 'notistack'
import getHttpError from 'src/utils/getHttpError'
import { useNavigate } from 'react-router-dom'

const withOrderActions = (Component) => (props) => {
  const dispatch = useDispatch()
  const profile = getProfile()
  const cartItems = useSelector(cartSelectors.getCartItemsSelector)
  const navigate = useNavigate()

  const [shippingAddress, setShippingAddress] = useState(profile.shippingAddress)
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)

  const placeOrder = useCallback(async () => {
    setIsPlacingOrder(true)
    const items = Array.from(cartItems || []).map((item) => ({ productId: item.productId, quantity: item.quantity }))
    try {
      const response = await httpClient.post('/orders', {
        shippingAddress,
        items
      })
      setIsPlacingOrder(false)
      if (response.status === 200) {
        dispatch(cartActions.clearCart())
        navigate(`/order-confirmation?orderId=${response.data.orderId}`)
      }
    } catch (error) {
      setIsPlacingOrder(false)
      const errorMessage = getHttpError(error).message
      enqueueSnackbar(errorMessage, {
        autoHideDuration: 2000,
        variant: 'error'
      })
    }
  }, [cartItems, dispatch, navigate, shippingAddress])

  const componentProps = { ...props, shippingAddress, setShippingAddress, placeOrder, isPlacingOrder }

  return <Component {...componentProps} />
}

export default withOrderActions
