import { applyMiddleware, compose } from 'redux';
import {thunk} from 'redux-thunk';
import { legacy_createStore as createStore} from 'redux'
import rootReducer from './reducers';

const initialState = {};
const middleware = [thunk];

const store = createStore(rootReducer, initialState, compose(
  applyMiddleware(...middleware),
  typeof window.__REDUX_DEVTOOLS_EXTENSION__ === "undefined"
? a => a
: window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
));
export default store;