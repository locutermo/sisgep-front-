import {SET_EMPLOYEE} from '../actions/actionTypes'
const initialState={
    employee: [],
    isAutenticate: false ,
}

const reducer = (state=initialState,action) => {
    switch(action.type){
        case SET_EMPLOYEE:
            return{
                ...state,
                employee: action.employee,
                isAutenticate: action.isAutenticate
            }
        default : return state ; 
    }
}

export default reducer ; 