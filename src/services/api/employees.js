import {CONFIG} from '../../configuration/Config'

export const fetchAddEmployee = (employee) => {
  return fetch(CONFIG + 'employees/store', {
    headers: {
      'Content-Type': 'application/json',
      'Accept':'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      "name": employee.name,      
      "lastName": employee.lastName, 
      "dni" : employee.dni,
      "phone": employee.phone,
      "address": employee.address,
      "email": employee.email,
      "birthday": employee.birthday,      
    })
  })
}

export const fetchGetSalesEmployee =(id) =>{
  return fetch(CONFIG+'employees/'+id+'/getSales',{
    method:'GET'
  })
}

export const fetchGetEmployees = () => {
  return fetch(CONFIG + 'employees', {
    method: 'GET'
  })
}

export const fetchDeleteEmployee = (id) => {
  return fetch(CONFIG + 'employees/' + id, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'DELETE',
  })
}

export const fetchUpdateEmployee = (employee) => {
  return fetch(CONFIG + 'employees/' + employee.id, {
    headers: { 'Content-Type': 'application/json' },
    method: 'PUT',
    body: JSON.stringify({
      "name": employee.name,      
      "lastName": employee.lastName, 
      "dni" : employee.dni,
      "phone": employee.phone,
      "address": employee.address,
      "email": employee.email,
      "birthday": employee.birthday,      
    })
  })
}