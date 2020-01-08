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
                    type: action.ptype,
                    cost: action.pcost,
                    duration: action.pduration
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
                products: state.products.filter(p => p.id != action.idProject)
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
                        return p;
                    } else return p;
                })
            }
        }

        default: return state

    }
}


export default reducer;