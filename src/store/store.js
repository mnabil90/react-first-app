import { configureStore } from '@reduxjs/toolkit'
import CartStateReducer from '../features/CartStateSlice'
import CounterSliceReducer from '../features/CounterSlice'

export default configureStore({
  reducer: {
    cartState : CartStateReducer,
    counter : CounterSliceReducer
  },
})