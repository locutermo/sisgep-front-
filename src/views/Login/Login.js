import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {CONFIG} from '../../configuration/Config'
import swal from 'sweetalert';
import {addEmployeeAuth} from '../../store/actions/'
import {connect} from 'react-redux';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';



class Login extends Component {

  state={
    email: '',
    password: ''
  }

  validate = ()=>{        
    console.log("Props: ",this.props);
    fetch(CONFIG+'employees/login',{
        method:'POST',
        headers:{
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            "email" : this.state.email,
            "password": this.state.password
        })
    }
    ).then(response=>response.json()).
    then(data=>{
        if(data.response==="success"){                
            this.props.onAddEmployeeAuth(data.data,true);    
            console.log("ACCESO AL SISTEMA: ",this.props);
            this.props.history.push('/dashboard');
        }else swal("Operación sin exito!!",data.message,data.response)            

    }).catch(error=>{console.log(error)})
    
    
};

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" value={this.state.email} onChange={(e)=>{this.setState({email:e.target.value})}} placeholder="Username" autoComplete="email" />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" value={this.state.password} onChange={(e)=>{this.setState({password:e.target.value})}} placeholder="Password" autoComplete="current-password" />                        
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" onClick={()=>{this.validate()}}>Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
    return{
        onAddEmployeeAuth: (employee,isAuthenticated) => dispatch(addEmployeeAuth(employee,isAuthenticated)),        
    }
}


export default connect(null,mapDispatchToProps)(Login);
