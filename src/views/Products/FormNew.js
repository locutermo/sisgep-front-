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
      states: [{ "id": 1, "value": "DISPONIBLE" }, { "id": 2, "value": "NO DISPONIBLE" }, { "id": 3, "value": "VACÍO" }],
      categories: [{ "id": 1, "value": "Verduras" }, { "id": 2, "value": "Frutas" }, { "id": 3, "value": "Golosinas" }],
      types: [{ "id": 1, "value": "Unidad" }, { "id": 2, "value": "Kg" }],

      state:'',
      type:'',
      category:'',
      name: '',
      price: '',
      stock: '',
      

    };
  }

  getData = () => {
    let product = [];
    product.name = this.state.name;
    product.type = this.state.type;
    product.stock = this.state.stock;
    product.price = this.state.price ; 
    product.category = this.state.category;
    product.state = this.state.state ; 
    return product;
  }

  cleanFields = () => {
    this.setState({ name: '', type: '', category:'',price:'',stock:'' ,state:''});
  }

  setFields = (product) => {
    this.setState({ name: product.name, type: product.type,price:product.price,stock:product.stock,category:product.category,state:product.state });
  }

  renderOptions = (collection) => collection.map(p => { return <option key={p.id} value={p.id} label={p.value}></option> })

  validate = () => {
    if (this.state.type != '' && this.state.name != '' && this.state.type != 0) {
      this.props.onAddedData(this.getData()); this.cleanFields();
    } else {
      swal("Operación fallida!!", "Verifica que no hayan campos vacíos", "error")
    }
  }

  render() {
    return (
      <Card>
        <CardHeader>
          <strong>Registro de Producto</strong>
        </CardHeader>
        <CardBody>
          <Form className="was-validated">
            <FormGroup>
              <Label htmlFor="inputSuccess2i">Nombre</Label>
              <Input type="text" className="form-control-success" id="inputSuccess2i" value={this.state.name} onChange={(e) => { this.setState({ name: e.target.value }) }} required />
              <FormFeedback className="help-block" valid={this.state.name !== ''}>Campo obligatorio</FormFeedback>
            </FormGroup>
            <Row>
              <Col xs="12" md="6">
                <FormGroup>
                  <Label htmlFor="inputSuccess2i">Precio</Label>
                  <Input type="number" step="any" className="form-control-success" id="inputSuccess2i" value={this.state.price} onChange={(e) => { this.setState({ price: e.target.value }) }} required />
                  <FormFeedback className="help-block" valid={this.state.price !== ''}>Campo obligatorio</FormFeedback>
                </FormGroup>
              </Col>
              <Col xs="12" md="6">
                <FormGroup>
                  <Label htmlFor="inputSuccess2i">Stock inicial</Label>
                  <Input type="number" step="any" className="form-control-success" id="inputSuccess2i" value={this.state.stock} onChange={(e) => { this.setState({ stock: e.target.value }) }} required />
                  <FormFeedback className="help-block" valid={this.state.stock !== ''}>Campo obligatorio</FormFeedback>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12" md="4">
                <FormGroup>
                  <Label htmlFor="inputSelectStates">Estado</Label>
                  <Input type="select" className="form-control-warning" id="inputSelectStates" value={this.state.state} onChange={(e) => { this.setState({ state: e.target.value }) }} required>
                    <option value={0} label="Seleccione una opcion"></option>
                    {this.renderOptions(this.state.states)}
                  </Input>                  
                </FormGroup>
              </Col>
              <Col xs="12" md="4">
                <FormGroup>
                  <Label htmlFor="inputSelectTypes">Tipo</Label>
                  <Input type="select" className="form-control-warning" id="inputSelectTypes" value={this.state.type} onChange={(e) => { this.setState({ type: e.target.value }) }} required>
                    <option value={0} label="Seleccione una opcion"></option>
                    {this.renderOptions(this.state.types)}
                  </Input>
                  
                </FormGroup>
              </Col>
              <Col xs="12" md="4">
                <FormGroup>
                  <Label htmlFor="inputSelectCategories">Categoría</Label>
                  <Input type="select" className="form-control-warning" id="inputSelectCategories" value={this.state.category} onChange={(e) => { this.setState({ category: e.target.value }) }} required>
                    <option value={0} label="Seleccione una opcion"></option>
                    {this.renderOptions(this.state.categories)}
                  </Input>
                  
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Button color="info" onClick={() => { this.validate() }}> Registrar </Button>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    )
  }
}

export default FormNew; 