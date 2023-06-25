import { configureStore } from '@reduxjs/toolkit'
import CartStateReducer from '../features/CartStateSlice'

export default configureStore({
  reducer: {
    cartState : CartStateReducer
  },
})