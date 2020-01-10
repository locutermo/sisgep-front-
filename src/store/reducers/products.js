import { ADD_PRODUCT, SET_PRODUCTS, DELETE_PRODUCT, CHANGE_FORM_STATE, UPDATE_PRODUCT,CHANGE_MODAL_STATE } from '../actions/actionTypes'
const initialState = {
    products: [],
    selectedProject: null,
    isCreate: true,
    isModalOpen:false, 

}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PRODUCT:
            return {
                ...state,
                products: state.products.concat({
                    id: action.pid,
                    name: action.pname,
                    price: action.pprice,
                    stock: action.pstock,
                    state:action.pstock,
                    type: action.ptype,
                    category: action.pcategory,          
                    created_at : action.pcreated_at          
                })
            };
        case SET_PRODUCTS:
            return {
                ...state,
                products: action.products,
            }
        case DELETE_PRODUCT:
            return {
                ...state,
                products: state.products.filter(p => p.id != action.idProduct)
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

        case UPDATE_PRODUCT: {
            return {
                ...state,
                products: state.products.map(p => {
                    if (p.id == action.product.id) {
                        p.name = action.product.name;
                        p.type = action.product.type;
                        p.price = action.product.price;
                        p.stock = action.product.stock;
                        p.state = action.product.state;
                        p.category = action.product.category
                        return p;
                    } else return p;
                })
            }
        }

        default: return state

    }
}


export default reducer;