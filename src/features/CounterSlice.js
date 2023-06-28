import { createSlice } from '@reduxjs/toolkit'

export const CounterSlice = createSlice({
  name: 'counter',
  initialState: {
    count : 0
  },
  reducers: {
    addOne:(state) => {
      state.count = state.count+1;
    },
    subOne:(state) => {
        state.count = state.count-1;
    },
    addSome:(state,action) => {
        state.count = state.count+action.payload;
    },
    subSome:(state,action) => {
        state.count = state.count-action.payload;
    },
    reset:(state) => {
        state.count = 0;
    }
  },
})

// Action creators are generated for each case reducer function
export const { addOne,subOne,addSome,subSome,reset } = CounterSlice.actions

export default CounterSlice.reducer