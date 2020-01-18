import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';

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
import { fetchGetCategories } from '../../services/api/categories';
import { fetchGetCustomers } from '../../services/api/customers';
import { fetchGetOrders,fetchGetTotalAmounts } from '../../services/api/orders';
import {setProducts,setCategories,setCustomers,setOrders,setTotalAmount} from '../../store/actions'


const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
    e.preventDefault()
    this.props.history.push('/login')
  }

  componentDidMount(){
    //Obtener productos
    fetchGetProducts().then(res => res.json()).then(response => {
      if (response != null) {
        console.log(response);
        this.props.onSetProducts(response);
      }
    });
    //Obtener categorias
    fetchGetCategories().then(res => res.json()).then(response => {
      if (response != null) {
        console.log(response);
        this.props.onSetCategories(response);
      }
    });
    //Obtener clientes
    fetchGetCustomers().then(res => res.json()).then(response => {
      if (response != null) {
        console.log("CUSTOMERS RESPONSE: ",response.data);
        this.props.onSetCustomers(response.data);
      }
    });
     //Obtener Pedidos
     fetchGetOrders().then(res => res.json()).then(response => {
      if (response != null) {
        console.log("ORDERS RESPONSE: ",response.data);
        this.props.onSetOrders(response.data);
      }
    });

     //Obtener Pedidos
     fetchGetTotalAmounts().then(res => res.json()).then(response => {
      if (response != null) {
        console.log("ORDERS RESPONSE: ",response.data);
        this.props.onSetTotalAmount(response.totalSales,response.totalDebts);
      }
    });

    



  }

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense  fallback={this.loading()}>
            <DefaultHeader onLogout={e=>this.signOut(e)}/>
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
    onSetCustomers: (customers) => dispatch(setCustomers(customers)),  
    onSetProducts: (products) => dispatch(setProducts(products)),  
    onSetCategories: (categories) => dispatch(setCategories(categories)),  
    onSetOrders: (orders) => dispatch(setOrders(orders)),  
    onSetTotalAmount: (sales,debts) => dispatch(setTotalAmount(sales,debts)),  
  }
}

export default connect(null, mapDispatchToProps)(DefaultLayout)

