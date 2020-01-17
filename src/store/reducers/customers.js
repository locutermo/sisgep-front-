import { ADD_CUSTOMER, SET_CUSTOMERS, DELETE_CUSTOMER, CHANGE_FORM_STATE, UPDATE_CUSTOMER,CHANGE_MODAL_STATE } from '../actions/actionTypes'
const initialState = {
    customers: [],
    isCreate: true,
    isModalOpen:false, 

}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CUSTOMER:
            return {
                ...state,
                customers: state.customers.concat({
                    id: action.id,
                    dni:action.dni,
                    name: action.name,
                    lastName: action.lastName,
                    email: action.email,
                    phone:action.phone,
                    address: action.address,
                    birthday: action.birthday,          
                    created_at : action.created_at          
                })
            };
        case SET_CUSTOMERS:
            return {
                ...state,
                customers: action.customers,
            }
        case DELETE_CUSTOMER:
            return {
                ...state,
                customers: state.customers.filter(customer => customer.id != action.idCustomer)
            };
        case CHANGE_FORM_STATE:
            return {
                ...state,
                isCreate: action.isCreate
            }

        case CHANGE_MODAL_STATE:
            return {
                ...state,
                isModalOpen: action.isModalOpen
            };

        case UPDATE_CUSTOMER: {
            return {
                ...state,
                customers: state.customers.map(customer => {
                    if (customer.id == action.customer.id) {
                        customer.name = action.customer.name;
                        customer.dni = action.customer.dni;
                        customer.lastName = action.customer.lastName;
                        customer.phone = action.customer.phone;
                        customer.email = action.customer.email;
                        customer.address = action.customer.address;
                        customer.birthday = action.customer.birthday
                        customer.created_at = action.customer.created_at
                        return customer;
                    } else return customer;
                })
            }
        }

        default: return state

    }
}


export default reducer;