import React from 'react';

const Product = React.lazy(()=>import('./views/Products/Product'))
const Category = React.lazy(()=>import('./views/Category/Category'))
const Customer = React.lazy(()=>import('./views/Customers/Customer'))


const routes = [
  { path: '/', exact: true, name: 'Home' },  
  { path: '/products', name: 'Product', component: Product },  
  { path: '/categories', name: 'Category', component: Category },  
  { path: '/customers', name: 'Customer', component: Customer },  
];

export default routes;
