import { ADD_ORDER, UPDATE_ORDER, SET_ORDERS, CHANGE_FORM_STATE,SET_TOTAL_AMOUNT,INCREMENT_TOTAL_AMOUNT,UPDATE_TOTAL_AMOUNT} from './actionTypes'


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

export const updateTotalAmount = (amount)=>{
    return{
        type: UPDATE_TOTAL_AMOUNT,        
        amount : amount 
    }
}

export const incrementTotalAmount = (state,amount)=>{
    return{
        type: INCREMENT_TOTAL_AMOUNT,
        state : state ,
        amount : amount 
    }
}



export const setTotalAmount = (sales,debts)=>{
    return{
        type: SET_TOTAL_AMOUNT,
        sales: sales , 
        debts : debts 
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