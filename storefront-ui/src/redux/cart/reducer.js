const { createAction, createReducer } = require('@reduxjs/toolkit')
const {
  add_product_to_cart,
  remove_product_from_cart,
  add_product_element_to_cart,
  remove_product_element_from_cart,
  clear_cart
} = require('./actionTypes')

const addProductToCart = createAction(add_product_to_cart)
const removeProductFromCart = createAction(remove_product_from_cart)
const addProductElementToCart = createAction(add_product_element_to_cart)
const removeProductElementFromCart = createAction(remove_product_element_from_cart)
const clearCart = createAction(clear_cart)

const initialState = {
  items: []
}

const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addProductToCart, (state, action) => {
      const index = state.items.findIndex((item) => item.productId === action.payload.productId)
      if (index === -1) state.items.push({ ...action.payload, quantity: 1 })
      else state.items[index].quantity += 1
    })
    .addCase(removeProductFromCart, (state, action) => {
      const index = state.items.findIndex((item) => item.productId === action.payload)
      state.items.splice(index, 1)
    })
    .addCase(addProductElementToCart, (state, action) => {
      state.items = state.items.map((item) => {
        if (item.productId !== action.payload.productId) return item
        return {
          ...item,
          quantity: item.quantity + 1
        }
      })
    })
    .addCase(removeProductElementFromCart, (state, action) => {
      state.items = state.items
        .map((item) => {
          if (item.productId !== action.payload.productId) return item

          return {
            ...item,
            quantity: item.quantity - 1
          }
        })
        .filter((item) => item.quantity > 0)
    })
    .addCase(clearCart, (state, _) => {
      state.items = []
    })
})

export default cartReducer
