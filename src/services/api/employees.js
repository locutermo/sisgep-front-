import {CONFIG} from '../../configuration/Config'
import axios from 'axios'
export const fetchAddEmployee = (employee) => {

  let formData = new FormData();
  formData.append('name',employee.name);
  formData.append('lastName',employee.lastName);
  formData.append('dni',employee.dni);
  formData.append('phone',employee.phone);
  formData.append('address',employee.address);
  formData.append('email',employee.email);
  formData.append('birthday',employee.birthday);
  formData.append('photo',employee.photo,employee.photo.name);    
  return axios.post(CONFIG+'employees/store',formData)
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

  let formData = new FormData();
  formData.append('name',employee.name);
  formData.append('lastName',employee.lastName);
  formData.append('dni',employee.dni);
  formData.append('phone',employee.phone);
  formData.append('address',employee.address);
  formData.append('email',employee.email);
  formData.append('birthday',employee.birthday);
  if(employee.photo!=null){
    formData.append('photo',employee.photo,employee.photo.name)
  }   
  else{
    formData.append('photo',null);
    formData.append('remove',true)
  };
    
  console.log("FORMDATA: ",employee.name,employee.dni,employee.email);
  
  return axios.post(CONFIG+'employees/'+employee.id,formData)
}