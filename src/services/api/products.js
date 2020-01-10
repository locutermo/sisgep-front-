import {CONFIG} from '../../configuration/Config'

export const fetchAddProduct = (product) => {
  return fetch(CONFIG + 'products/store', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      "name": product.name,      
      "price": product.price, 
      "state": product.state,
      "stock": product.stock,
      "category": product.category,
      "type": product.type
    })
  })
}

export const fetchGetOrdersProject =(id) =>{
  return fetch(CONFIG+'products/'+id+'/getOrders',{
    method:'GET'
  })
}

export const fetchGetProducts = () => {
  return fetch(CONFIG + 'products', {
    method: 'GET'
  })
}

export const fetchDeleteProduct = (id) => {
  return fetch(CONFIG + 'products/' + id, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'DELETE',
  })
}

export const fetchUpdateProduct = (product) => {
  return fetch(CONFIG + 'products/' + product.id, {
    headers: { 'Content-Type': 'application/json' },
    method: 'PUT',
    body: JSON.stringify({
      "name": product.name,      
      "price": product.price, 
      "state": product.state,
      "stock": product.stock,
      "category": product.category,
      "type": product.type
    })
  })
}