import { ADD_EMPLOYEE, SET_EMPLOYEES, DELETE_EMPLOYEE, CHANGE_FORM_STATE, UPDATE_EMPLOYEE,CHANGE_MODAL_STATE ,INCREMENT_TOTAL_AMOUNT_OF_EMPLOYEE,UPDATE_TOTAL_AMOUNT_OF_EMPLOYEE} from '../actions/actionTypes'
const initialState = {
    employees: [],
    isCreate: true,
    isModalOpen:false, 

}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_EMPLOYEE:
            return {
                ...state,
                employees: state.employees.concat({
                    id: action.id,
                    dni:action.dni,
                    name: action.name,
                    lastName: action.lastName,
                    email: action.email,
                    phone:action.phone,
                    address: action.address,
                    birthday: action.birthday,          
                    created_at : action.created_at,
                    totalSales : action.totalSales,                    
                })
            };
        case SET_EMPLOYEES:
            return {
                ...state,
                employees: action.employees,
            }
        case DELETE_EMPLOYEE:
            return {
                ...state,
                employees: state.employees.filter(employee => employee.id != action.idEmployee)
            };
        case CHANGE_FORM_STATE:
            return {
                ...state,
                isCreate: action.isCreate
            }

        case CHANGE_MODAL_STATE:
            return {
                ...state,
                isModalOpen: action.isModalOpen
            };

        case UPDATE_EMPLOYEE: {
            return {
                ...state,
                employees: state.employees.map(employee => {
                    if (employee.id == action.employee.id) {
                        employee.name = action.employee.name;
                        employee.dni = action.employee.dni;
                        employee.lastName = action.employee.lastName;
                        employee.phone = action.employee.phone;
                        employee.email = action.employee.email;
                        employee.address = action.employee.address;
                        employee.birthday = action.employee.birthday
                        employee.created_at = action.employee.created_at
                        return employee;
                    } else return employee;
                })
            }
        }

        default: return state

    }
}


export default reducer;