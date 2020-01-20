import {ADD_EMPLOYEE,SET_EMPLOYEES,DELETE_EMPLOYEE, CHANGE_FORM_STATE, UPDATE_EMPLOYEE,CHANGE_MODAL_STATE} from './actionTypes'


export const addEmployee = (employee) => {
    return {
        type: ADD_EMPLOYEE,
        id: employee.id,
        dni: employee.dni, 
        name: employee.name,
        lastName: employee.lastName,
        photo:employee.photo,
        phone: employee.phone,
        email: employee.email,
        address: employee.address,
        birthday: employee.birthday,
        created_at : employee.created_at,
        totalSales : 0         
    }
}



export const setEmployees = (employees) => {
    return{
        type:SET_EMPLOYEES,
        employees: employees
    }
}

export const deleteEmployee = (id)=> {
    return{
        type:DELETE_EMPLOYEE,
        idEmployee: id , 
    }
}
export const changeFormStateEmployee = (band) => {
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


export const updateEmployee = (employee) => {
    return {
        type: UPDATE_EMPLOYEE,
        employee : employee 
    }
}





