import {CONFIG} from '../../configuration/Config'

export const fetchAddOrder = (order) => {
  return fetch(CONFIG + 'orders/store', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({            
      "state":order.state,              	               
      "quantity":order.quantity,              	               
      "amount":order.amount,
      "user_id":order.user_id,
      "product_id":order.product_id,
      "employee_id":order.staemployee_idte
    })
  })
}


export const fetchGetOrders = () => {
  return fetch(CONFIG + 'orders', {
    method: 'GET'
  })
}

export const fetchUpdateOrder = (order) => {
  return fetch(CONFIG + 'orders/' + order.id+'/pay', {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST'    
  })
}