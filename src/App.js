import React, { Component } from 'react';
import { HashRouter, Route, Switch,Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import { Spinner } from 'reactstrap';
import './App.scss';

const loading = () => <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" />;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/Login/Login'));
const Register = React.lazy(() => import('./views/Default/Pages/Register'));
const Page404 = React.lazy(() => import('./views/Default/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Default/Pages/Page500'));

class App extends Component {

  render() {
    return (
      <HashRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route exact path="/login" name="Login Page" color="primary" render={props => <Login {...props}/>} />

              {/* <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} /> */}
              <Route path="/" name="Home" render={props => this.props.auth.isAuthenticated===true?(<DefaultLayout {...props}/>):(<Redirect to="/login"/>)} />
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps,null)(App);
