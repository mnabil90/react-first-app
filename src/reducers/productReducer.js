import { LOAD_PRODUCT,PATCH_PRODUCT,SAVE_PRODUCT } from '../actions/productActions';

const ProductReducer = (state={}, action) => {
    switch (action.type) {
      case LOAD_PRODUCT:
        return {
          ...state,
          ...action.payload
      }
      case PATCH_PRODUCT:
        return {
          ...state,
          ...action.payload
      }
      default: return state
    }
}

export default ProductReducer