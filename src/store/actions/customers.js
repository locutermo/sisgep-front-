import {ADD_CUSTOMER,SET_CUSTOMERS,DELETE_CUSTOMER, CHANGE_FORM_STATE, UPDATE_CUSTOMER,CHANGE_MODAL_STATE,INCREMENT_TOTAL_AMOUNT_OF_CUSTOMER,UPDATE_TOTAL_AMOUNT_OF_CUSTOMER} from './actionTypes'


export const addCustomer = (customer) => {
    return {
        type: ADD_CUSTOMER,
        id: customer.id,
        dni: customer.dni, 
        name: customer.name,
        lastName: customer.lastName,
        phone: customer.phone,
        email: customer.email,
        address: customer.address,
        birthday: customer.birthday,
        created_at : customer.created_at,
        totalSales : 0 , 
        totalDebts : 0
    }
}



export const setCustomers = (customers) => {
    return{
        type:SET_CUSTOMERS,
        customers: customers
    }
}

export const deleteCustomer = (id)=> {
    return{
        type:DELETE_CUSTOMER,
        idCustomer: id , 
    }
}
export const changeFormStateCustomer = (band) => {
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


export const updateCustomer = (customer) => {
    return {
        type: UPDATE_CUSTOMER,
        customer : customer 
    }
}





export const updateTotalAmountOfCustomer= (idCustomer,amount)=>{
    return{
        type: UPDATE_TOTAL_AMOUNT_OF_CUSTOMER,    
        id : idCustomer,    
        amount : amount 
    }
}

export const incrementTotalAmountOfCustomer = (idCustomer,state,amount)=>{
    return{
        type: INCREMENT_TOTAL_AMOUNT_OF_CUSTOMER,
        state : state ,
        id:idCustomer,
        amount : amount 
    }
}