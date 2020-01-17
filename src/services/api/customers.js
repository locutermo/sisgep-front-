import {CONFIG} from '../../configuration/Config'

export const fetchAddCustomer = (customer) => {
  return fetch(CONFIG + 'register', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      "name": customer.name,      
      "lastName": customer.lastName, 
      "dni" : customer.dni,
      "phone": customer.phone,
      "address": customer.address,
      "email": customer.email,
      "birthday": customer.birthday,      
    })
  })
}

export const fetchGetOrdersCustomer =(id) =>{
  return fetch(CONFIG+'users/'+id+'/getOrders',{
    method:'GET'
  })
}

export const fetchGetCustomers = () => {
  return fetch(CONFIG + 'users', {
    method: 'GET'
  })
}

export const fetchDeleteCustomer = (id) => {
  return fetch(CONFIG + 'users/' + id, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'DELETE',
  })
}

export const fetchUpdateCustomer = (customer) => {
  return fetch(CONFIG + 'users/' + customer.id, {
    headers: { 'Content-Type': 'application/json' },
    method: 'PUT',
    body: JSON.stringify({
      "name": customer.name,      
      "lastName": customer.lastName, 
      "dni" : customer.dni,
      "phone": customer.phone,
      "address": customer.address,
      "email": customer.email,
      "birthday": customer.birthday,      
    })
  })
}