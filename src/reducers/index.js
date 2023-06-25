import { combineReducers } from 'redux';
import counter from './count.reducer';
import cartState from './cartstate.reducer';
export default combineReducers({
    counter,
    cartState
})