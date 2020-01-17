import React from 'react';
const Dashboard = React.lazy(()=>import('./views/Dashboard/Dashboard'))
const Product = React.lazy(()=>import('./views/Products/Product'))
const Category = React.lazy(()=>import('./views/Category/Category'))
const Customer = React.lazy(()=>import('./views/Customers/Customer'))


const routes = [
  { path: '/', exact: true, name: 'Home' },  
  { path: '/dashboard', name: 'Inicio', component: Dashboard },  
  { path: '/products', name: 'Productos', component: Product },  
  { path: '/categories', name: 'Categorías', component: Category },  
  { path: '/customers', name: 'Clientes', component: Customer },  
];

export default routes;
