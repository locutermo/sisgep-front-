import {SET_EMPLOYEE } from './actionTypes'

export const addEmployee = (employee, band) => {
    return {
        type: SET_EMPLOYEE,
        employee : employee,
        isAutenticate : band
    }
}