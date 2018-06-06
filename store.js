import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import mainReducer from './src/reducers/main';

const store = createStore(
    combineReducers({
        mainReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
)

export default store;