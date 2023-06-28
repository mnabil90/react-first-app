import { combineReducers } from 'redux';
import counter from './countReducer';
import cartState from './cartstateReducer';
import Product from './productReducer';
export default combineReducers({
    counter,
    cartState,
    Product
})