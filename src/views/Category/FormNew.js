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
      name: '',            
    };
  }

  getData = () => {
    let category = [];
    category.name = this.state.name;    
    return category;
  }

  cleanFields = () => {
    this.setState({ name: ''});
  }

  setFields = (category) => {
    this.setState({ name: category.name});
  }
  
  validate = () => {
    if (this.state.name != '') {
      this.props.onAddedData(this.getData()); this.cleanFields();
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
            <FormGroup>
              <Label htmlFor="inputSuccess2i">Nombre</Label>
              <Input type="text" className="form-control-success" id="inputSuccess2i" value={this.state.name} onChange={(e) => { this.setState({ name: e.target.value }) }} required />
              <FormFeedback className="help-block" valid={this.state.name !== ''}>Campo obligatorio</FormFeedback>
            </FormGroup>            
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