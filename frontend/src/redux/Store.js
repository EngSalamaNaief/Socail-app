import {createStore,applyMiddleware,compose} from 'redux';
import Thunk from 'redux-thunk';
import RootReducer from './reducers/RootReducer';
const initialState={};


const store = createStore(RootReducer,initialState,compose(
    applyMiddleware(Thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ))

export default store;