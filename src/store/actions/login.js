import {SET_EMPLOYEE } from './actionTypes'

export const addEmployeeAuth = (employee, band) => {
    return {
        type: SET_EMPLOYEE,
        employee : employee,
        isAuthenticated : band
    }
}