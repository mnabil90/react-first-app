import thunk from 'redux-thunk';
import reducers from '../reducers';
import { createStore, applyMiddleware } from 'redux'

const middleware = [ thunk];

export const store = createStore(
    reducers,
    applyMiddleware(...middleware)
)