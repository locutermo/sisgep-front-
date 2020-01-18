import { ADD_ORDER, UPDATE_ORDER, SET_ORDERS, CHANGE_FORM_STATE} from '../actions/actionTypes'
const initialState = {
    orders: [],    
    isCreate: true,
    isModalOpen:false, 

}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ORDER:
            return {
                ...state,
                orders: state.orders.concat({
                    id: action.id,
                    date: action.date,
                    state: action.state,
                    quantity: action.quantity,
                    amount: action.amount,
                    product_id: action.product_id,        
                    user_id: action.user_id,      
                    employee_id: action.employee_id,      
                    productName: action.productName,
                    userName: action.userName,
                    date : action.date,
                    created_at : action.created_at       
                })
            };
        case SET_ORDERS:
            return {
                ...state,
                orders: action.orders,
            }
        case CHANGE_FORM_STATE:
            return {
                ...state,
                isCreate: action.isCreate
            }

        case UPDATE_ORDER: {
            return {
                ...state,
                orders: state.orders.map(p => {
                    if (p.id == action.order.id) {
                        p.state = 1;
                        return p;
                    } else return p;
                })
            }
        }

        default: return state

    }
}


export default reducer;