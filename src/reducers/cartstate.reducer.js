import { UPDATE_AMOUNT } from '../actions/cartstate.actions';

const CartStateReducer = (state = { totalQuantity: 0,totalAmount:0 }, action) => {
    switch (action.type) {
      case UPDATE_AMOUNT:return {
            totalQuantity: action.payload?.totalQuantity,
            totalAmount: action.payload?.totalAmount    
      }
      default: return state
    }
}

export default CartStateReducer