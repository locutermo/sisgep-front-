import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import { Spinner } from 'reactstrap';

import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';


import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';
import { fetchGetProducts } from '../../services/api/products';
import { fetchGetCustomers } from '../../services/api/customers';
import { fetchGetOrders,fetchGetTotalAmounts } from '../../services/api/orders';
import {fetchGetCategories,fetchGetEmployees} from '../../services/api'

import {setProducts,setCategories,setCustomers,setOrders,setTotalAmount,setEmployees} from '../../store/actions'


const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {

  loading = () => <Spinner type="grow" color="primary" />


  signOut(e) {
    e.preventDefault()
    this.props.history.push('/login')
  }

  componentDidMount(){
    //Obtener productos
    fetchGetProducts().then(res => res.json()).then(response => {
      if (response != null) {        
        this.props.onSetProducts(response);
      }
    });
    //Obtener categorias
    fetchGetCategories().then(res => res.json()).then(response => {
      if (response != null) {        
        this.props.onSetCategories(response);
      }
    });
    //Obtener clientes
    fetchGetCustomers().then(res => res.json()).then(response => {
      if (response != null) {
        this.props.onSetCustomers(response.data);
      }
    });
     //Obtener Pedidos
     fetchGetOrders().then(res => res.json()).then(response => {
      if (response != null) {
        this.props.onSetOrders(response.data);
      }
    });

     //Obtener Total de dinero
     fetchGetTotalAmounts().then(res => res.json()).then(response => {
      if (response != null) {
        this.props.onSetTotalAmount(response.totalSales,response.totalDebts);
      }
    });

    //Obtener empleados  
    fetchGetEmployees().then(res => res.json()).then(response => {
      if (response != null) {
        this.props.onSetEmployees(response.data);
      }
    });



  }

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense  fallback={this.loading()}>
            <DefaultHeader employee={this.props.employee} onLogout={e=>this.signOut(e)}/>
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
            <AppSidebarNav navConfig={navigation} {...this.props} router={router}/>
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes} router={router}/>
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })}
                  <Redirect from="/" to="/dashboard" />
                </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSetEmployees: (employees) => dispatch(setEmployees(employees)),  
    onSetCustomers: (customers) => dispatch(setCustomers(customers)),  
    onSetProducts: (products) => dispatch(setProducts(products)),  
    onSetCategories: (categories) => dispatch(setCategories(categories)),  
    onSetOrders: (orders) => dispatch(setOrders(orders)),  
    onSetTotalAmount: (sales,debts) => dispatch(setTotalAmount(sales,debts)),  

    
  }
}


const mapStateToProps = state => {
  return {
    employee : state.auth.employee 
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout)

