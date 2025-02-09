import {
  add_product_element_to_cart,
  add_product_to_cart,
  clear_cart,
  remove_product_element_from_cart,
  remove_product_from_cart
} from './actionTypes'

export const addProductToCart = (value) => ({
  type: add_product_to_cart,
  payload: value
})

export const removeProductFromCart = (value) => ({
  type: remove_product_from_cart,
  payload: value
})

export const addProductElementToCart = (value) => ({
  type: add_product_element_to_cart,
  payload: value
})

export const removeProductElementFromCart = (value) => ({
  type: remove_product_element_from_cart,
  payload: value
})

export const clearCart = () => ({
  type: clear_cart
})
