import {ADD_PRODUCT,SET_PRODUCTS,DELETE_PRODUCT, CHANGE_FORM_STATE, UPDATE_PRODUCT,CHANGE_MODAL_STATE} from './actionTypes'


export const addProduct = (product) => {
    return {
        type: ADD_PRODUCT,
        pid: product.id,
        pname: product.name,
        pprice: product.price,
        pstock: product.stock,
        pstate: product.state,
        ptype: product.type,
        pcategory: product.category,
        pcreated_at : product.created_at

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