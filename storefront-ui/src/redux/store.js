import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter/reducer'
import cartReducer from './cart/reducer'

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('reduxState')
    if (serializedState === null) return undefined
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('reduxState', serializedState)
  } catch (err) {
    console.error('Could not save state', err)
  }
}

const store = configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer
  },
  preloadedState: loadState()
})

store.subscribe(() => {
  saveState(store.getState())
})

export default store
