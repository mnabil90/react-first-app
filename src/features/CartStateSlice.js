import { createSlice } from '@reduxjs/toolkit'

export const cartStateSlice = createSlice({
  name: 'cartState',
  initialState: {
    totalQuantity : 0,
    totalAmount: 0,
  },
  reducers: {
    updateCartState:(state,action) => {
      state.totalAmount = action.payload.totalAmount;
      state.totalQuantity = action.payload.totalQuantity;
    }
  },
})

// Action creators are generated for each case reducer function
export const { updateCartState } = cartStateSlice.actions

export default cartStateSlice.reducer