import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import mainReducer from './src/reducers/main';
import messagesReducer from './src/reducers/messages';

const store = createStore(
    combineReducers({
        mainReducer,
        messagesReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
)

export default store;