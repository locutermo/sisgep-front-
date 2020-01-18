import React, { Component } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Form,
  FormGroup,
  FormFeedback,
  Input,
  Label,
  Col,
  Row
} from 'reactstrap';
import swal from 'sweetalert'

class FormNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      price : 0,
      isSelected:true,
      name: '',
      user_id: '',
      product_id: '',
      quantity: 1,
      state: '',
      employee_id: 1
    };
  } 
  renderAmount=()=>{    
      return `S/${this.state.productSelected.price * this.state.quantity}`; 
  }

  getAmount =()=>{
    return this.state.price * this.state.quantity ; 
  }

  renderOptionsCollection = (collection) => collection.map(p => { return <option key={p.id} value={p.id} label={p.name}></option> })

  renderOptionsProducts = (collection) => collection.map(p => { return <option key={p.id} value={JSON.stringify({"id":p.id,"price":p.price})} label={p.name+' | '+p.stock+" | S/"+p.price}></option> })
  
  onChangeProduct=(event) =>{    
    let obj = JSON.parse(event.target.value);     
     this.setState({product_id:obj.id,price:obj.price});
  }

  getData = (state) => {
    let order = [];        
    order.user_id = this.state.user_id;
    order.product_id = this.state.product_id;
    order.employee_id = this.state.employee_id;
    order.amount = this.getAmount();
    order.quantity = this.state.quantity;
    order.state = state;
    return order;
  }

  cleanFields = () => {
    this.setState({ user_id:'',product_id:0,isSelected:true,quantity:'1',state:'',price:0});
  }
 

  validate = (state) => {          
    if (this.state.user_id != '' && this.state.product_id !='' && this.state.quantity!='') {
      this.props.onAddedData(this.getData(state));       
      this.cleanFields();
    } else {
      swal("Operación fallida!!", "Verifica que no hayan campos vacíos", "error")
    }
  }

  render() {
    return (
      <Card>
        <CardHeader>
          <strong>Registro de Categorias</strong>
        </CardHeader>
        <CardBody>
          <Form className="was-validated">
            <Row>
              <Col xs="12" md="12">
                <FormGroup>
                  <Label htmlFor="inputSelectUsers">Cliente</Label>
                  <Input type="select" className="form-control-warning" id="inputSelectUsers" value={this.state.user_id} onChange={(e) => { this.setState({ user_id: e.target.value }) }} required>
                    <option value={0} label="Seleccione una opcion"></option>
                    {this.renderOptionsCollection(this.props.customers)}
                  </Input>

                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12" md="12">
                <FormGroup>
                  <Label htmlFor="inputSelectProducts">Producto</Label>
                  <Input  type="select" className="form-control-warning" id="inputSelectProducts" value={`{"id":${this.state.product_id},"price":${this.state.price}}`} onChange={this.onChangeProduct} required>
                    <option value={`"id":${this.state.product_id},"price":${this.state.price}`} selected={this.state.isSelected} label="Seleccione una opcion"></option>
                    {this.renderOptionsProducts(this.props.products)}
                  </Input>

                </FormGroup>
              </Col>
            </Row>         
            <Row>
              <Col xs="12" md="6">
                <Label htmlFor="inputSelectProducts">Cantidad</Label>
                <Input type="number" min="1" className="form-control-warning" id="inputSelectProducts" value={this.state.quantity} onChange={(e) => { this.setState({ quantity: e.target.value }) }} required />
              </Col>
              <Col xs="12" md="6">
                <Label htmlFor="inputSelectProducts">Monto</Label>
                <Input type="text" className="form-control-warning" id="inputSelectProducts" value={this.state.price* this.state.quantity} disabled />
              </Col>
            </Row>
            <br></br>
            <Row>
              <Col xs="12" md="6">
                <FormGroup>
                  <Button color="primary" onClick={() => { this.validate(1) }}> Vender </Button>
                </FormGroup>
              </Col>
              <Col xs="12" md="6">
                <FormGroup>
                  <Button color="danger" onClick={() => { this.validate(2) }}> Fíar </Button>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    )
  }
}

export default FormNew; 