import { ADD_ORDER, UPDATE_ORDER, SET_ORDERS, CHANGE_FORM_STATE} from './actionTypes'


export const addOrder = (order) => {
    return {
        type: ADD_ORDER,
        id: order.id,
        date: order.date,
        state: order.state,
        quantity: order.quantity,
        amount: order.amount,
        product_id: order.product_id,        
        user_id: order.user_id,      
        employee_id: order.employee_id,      
        productName: order.productName,      
        userName: order.userName,      
        date : order.date,
        created_at : order.created_at       

    }
}

export const setOrders = (orders) => {
    return{
        type:SET_ORDERS,
        orders: orders
    }
}

export const changeFormStateOrder = (band) => {
    return {
        type: CHANGE_FORM_STATE,
        isCreate: band
    }
}


export const updateOrder = (order) => {
    return {
        type: UPDATE_ORDER,
        order : order 
    }
}