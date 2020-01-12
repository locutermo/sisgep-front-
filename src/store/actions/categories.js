import { ADD_CATEGORY, SET_CATEGORIES, DELETE_CATEGORY, CHANGE_FORM_STATE, UPDATE_CATEGORY } from './actionTypes'


export const addCategory = (category) => {
    return {
        type: ADD_CATEGORY,
        id: category.id,
        name: category.name,        
        created_at : category.created_at
    }
}

export const setCategories = (categories) => {
    return{
        type:SET_CATEGORIES,
        categories: categories
    }
}

export const deleteCategory = (id)=> {
    return{
        type:DELETE_CATEGORY,
        idCategory: id , 
    }
}
// True -> New , False -> Update
export const changeFormStateCategory = (band) => {
    return {
        type: CHANGE_FORM_STATE,
        isCreate: band
    }
}


export const updateCategory = (category) => {
    return {
        type: UPDATE_CATEGORY,
        category : category 
    }
}