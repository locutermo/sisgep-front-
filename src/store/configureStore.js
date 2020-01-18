import {combineReducers,createStore} from 'redux'

//Adding my reducers
import productReducer from './reducers/products'
import categoryReducer from './reducers/categories'
import customerReducer from './reducers/customers'
import orderReducer from './reducers/orders'

import loginReducer from './reducers/login'
//This is the reducing container
const rootReducers =  combineReducers({
    productsReducer: productReducer,
    categoriesReducer: categoryReducer,
    customersReducer: customerReducer, 
    ordersReducer: orderReducer, 
    login: loginReducer,    
})

const configureStore = ()=>{
    return createStore(rootReducers)
}

export default configureStore ; 