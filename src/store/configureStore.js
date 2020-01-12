import {combineReducers,createStore} from 'redux'

//Adding my reducers
import productReducer from './reducers/products'
import categoryReducer from './reducers/categories'

import loginReducer from './reducers/login'
//This is the reducing container
const rootReducers =  combineReducers({
    productsReducer: productReducer,
    categoriesReducer: categoryReducer,
    login: loginReducer,    
})

const configureStore = ()=>{
    return createStore(rootReducers)
}

export default configureStore ; 