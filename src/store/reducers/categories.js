import { ADD_CATEGORY, SET_CATEGORIES, DELETE_CATEGORY, CHANGE_FORM_STATE, UPDATE_CATEGORY } from '../actions/actionTypes'
const initialState = {
    categories: [],
    selectedProject: null,
    isCreate: true,
    isModalOpen:false, 

}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CATEGORY:
            return {
                ...state,
                categories: state.categories.concat({
                    id: action.id,
                    name: action.name,                      
                    created_at : action.created_at          
                })
            };
        case SET_CATEGORIES:
            return {
                ...state,
                categories: action.categories,
            }
        case DELETE_CATEGORY:
            return {
                ...state,
                categories: state.categories.filter(p => p.id != action.idCategory)
            };
        case CHANGE_FORM_STATE:
            return {
                ...state,
                isCreate: action.isCreate
            }

        case UPDATE_CATEGORY: {
            return {
                ...state,
                categories: state.categories.map(p => {
                    if (p.id == action.category.id) {
                        p.name = action.category.name;                        
                        return p;
                    } else return p;
                })
            }
        }

        default: return state

    }
}


export default reducer;