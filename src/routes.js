import React from 'react';

const Product = React.lazy(()=>import('./views/Products/Product'))


const routes = [
  { path: '/', exact: true, name: 'Home' },  
  { path: '/products', name: 'Product', component: Product },  
];

export default routes;
