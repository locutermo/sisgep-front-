import {combineReducers,createStore} from 'redux'

//Adding my reducers
import productReducer from './reducers/products'

import loginReducer from './reducers/login'
//This is the reducing container
const rootReducers =  combineReducers({
    products: productReducer,
    login: loginReducer,    
})

const configureStore = ()=>{
    return createStore(rootReducers)
}

export default configureStore ; 