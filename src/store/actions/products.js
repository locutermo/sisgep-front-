import {ADD_PRODUCT,SET_PRODUCTS,DELETE_PRODUCT, CHANGE_FORM_STATE, UPDATE_PRODUCT,CHANGE_MODAL_STATE} from './actionTypes'


export const addProduct = (project) => {
    return {
        type: ADD_PROJECT,
        pid: project.id,
        pname: project.name,
        ptype: project.type,
        pcost: project.cost,
        pduration: project.duration,

    }
}

export const setProducts = (products) => {
    return{
        type:SET_PRODUCTS,
        products: products
    }
}

export const deleteProduct = (id)=> {
    return{
        type:DELETE_PRODUCT,
        idProduct: id , 
    }
}
// True -> New , False -> Update
export const changeFormState = (band) => {
    return {
        type: CHANGE_FORM_STATE,
        isCreate: band
    }
}

export const changeModalState = (band)=>{
    return{
        type:CHANGE_MODAL_STATE,
        isModalOpen: band,
    }

}


export const updateProduct = (product) => {
    return {
        type: UPDATE_PRODUCT,
        product : product 
    }
}