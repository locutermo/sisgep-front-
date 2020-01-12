import {CONFIG} from '../../configuration/Config'

export const fetchAddCategory = (category) => {
  return fetch(CONFIG + 'categories/store', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      "name": category.name,      
    })
  })
}


export const fetchGetCategories = () => {
  return fetch(CONFIG + 'categories', {
    method: 'GET'
  })
}

export const fetchDeleteCategory = (id) => {
  return fetch(CONFIG + 'categories/' + id, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'DELETE',
  })
}

export const fetchUpdateCategory = (category) => {
  return fetch(CONFIG + 'categories/' + category.id, {
    headers: { 'Content-Type': 'application/json' },
    method: 'PUT',
    body: JSON.stringify({
      "name": category.name,            
    })
  })
}