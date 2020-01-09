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
} from 'reactstrap';
import swal from 'sweetalert'

class FormNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      elements: [{"id":1 , "value":"Producto"},{"id":2 , "value":"Servicio"}],      
      name: '',
      type: '',
    };
  }

  getProjectData = () => {
    let project = [];
    project.name = this.state.name;
    project.type = this.state.type;
    return project;
  }

  cleanFields = () => {
    this.setState({ name: '', type: '' });
  }

  setFields = (project) => {
    this.setState({ name: project.name, type: project.type });
  }

  renderOptions = () => this.state.elements.map(p => {return <option key={p.id} value={p.id} label={p.value + " - "+ p.id}></option>})
  
  validate = () => {
    if(this.state.type!='' && this.state.name!='' && this.state.type!=0){
      this.props.onAddedData(this.getProjectData()); this.cleanFields();
    }else{
      swal("Operación fallida!!","Verifica que no hayan campos vacíos","error")
    }
  }

  render() {
    return (
        <Card>
          <CardHeader>
            <strong>Formulario de Registro</strong>          
          </CardHeader>
          <CardBody>
            <Form className="was-validated">
              <FormGroup>
                <Label htmlFor="inputSuccess2i">Nombre</Label>
                <Input type="text" className="form-control-success" id="inputSuccess2i" value={this.state.name} onChange={(e) => { this.setState({ name: e.target.value }) }} required />
                <FormFeedback className="help-block" valid={this.state.name !== ''}>Campo obligatorio</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="inputWarning2i">Tipo</Label>
                <Input type="select" className="form-control-warning" id="inputWarning2i" value={this.state.type} onChange={(e) => { this.setState({ type: e.target.value }) }} required>                                    
                    <option value={0} label="Seleccione una opcion"></option>
                    {this.renderOptions()}
                </Input>
                <FormFeedback className="help-block" valid={this.state.type !== ''}>Campo obligatorio</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Button onClick={() => { this.validate() }}> Registrar </Button>
              </FormGroup>
            </Form>
          </CardBody>
        </Card>
      )
  }
}

export default FormNew; 