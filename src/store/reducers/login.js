import {SET_EMPLOYEE} from '../actions/actionTypes'
const initialState={
    employee: [],
    isAuthenticated: false ,
}

const reducer = (state=initialState,action) => {
    switch(action.type){
        case SET_EMPLOYEE:
            return{
                ...state,
                employee: action.employee,
                isAuthenticated: action.isAuthenticated
            }
        default : return state ; 
    }
}

export default reducer ; 