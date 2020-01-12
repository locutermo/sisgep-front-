import React from 'react';

const Product = React.lazy(()=>import('./views/Products/Product'))
const Category = React.lazy(()=>import('./views/Category/Category'))


const routes = [
  { path: '/', exact: true, name: 'Home' },  
  { path: '/products', name: 'Product', component: Product },  
  { path: '/categories', name: 'Category', component: Category },  
];

export default routes;
