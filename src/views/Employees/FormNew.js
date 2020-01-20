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
import ImageUploader from 'react-images-upload';

class FormNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      lastName: '',
      dni: '',
      phone: '',
      email: '',
      birthday: '',
      address: '',
      // pictures: [],
      picture: []
    };

    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(picture) {
    this.setState({
        // pictures: this.state.pictures.concat(picture),
        picture: picture
    });

}


  getData = () => {

    let employee = [];
    employee.name = this.state.name;
    employee.lastName = this.state.lastName;
    employee.dni = this.state.dni;
    employee.phone = this.state.phone;
    employee.email = this.state.email;
    employee.address = this.state.address;
    employee.birthday = this.state.birthday;
    employee.photo = this.state.picture[0]
    return employee;
  }

  cleanFields = () => {
    this.setState({ name: '', lastName: '', dni: '', phone: '', email: '', address: '', birthday: '' });
  }


  validate = () => {      
      console.log("Imagen: ",this.state.picture[0]);
    if (this.state.name != '' && this.state.lastName != '' && this.state.dni != '' && this.state.email != '') {
      this.props.onAddedData(this.getData()); this.cleanFields();
    } else {
      swal("Operación fallida!!", "Verifica que no hayan campos vacíos", "error")
    }
  }

  render() {
    return (
      <Card>
        <CardHeader>
          <strong>Registro de Cliente</strong>
        </CardHeader>
        <CardBody>
          <Form className="was-validated">
            <Row>
              <Col xs="12" md="4">
                <FormGroup>
                  <Label htmlFor="inputSuccess2i">Nombre</Label>
                  <Input type="text" className="form-control-success" id="inputSuccess2i" value={this.state.name} onChange={(e) => { this.setState({ name: e.target.value }) }} required />
                  <FormFeedback className="help-block" valid={this.state.name !== ''}>Campo obligatorio</FormFeedback>
                </FormGroup>
              </Col>
              <Col xs="12" md="5">
                <FormGroup>
                  <Label htmlFor="inputSuccess2i">Apellidos</Label>
                  <Input type="text" step="any" className="form-control-success" id="inputSuccess2i" value={this.state.lastName} onChange={(e) => { this.setState({ lastName: e.target.value }) }} required />
                  <FormFeedback className="help-block" valid={this.state.lastName !== ''}>Campo obligatorio</FormFeedback>
                </FormGroup>
              </Col>
              <Col xs="12" md="3">
                <FormGroup>
                  <Label htmlFor="inputSuccess2i">DNI</Label>
                  <Input type="text" step="any" className="form-control-success" id="inputSuccess2i" value={this.state.dni} onChange={(e) => { this.setState({ dni: e.target.value }) }} required />
                  <FormFeedback className="help-block" valid={this.state.dni !== ''}>Campo obligatorio</FormFeedback>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12" md="6">
                <FormGroup>
                  <Label htmlFor="inputSuccess2i">Correo Electrónico</Label>
                  <Input type="text" step="any" className="form-control-success" id="inputSuccess2i" value={this.state.email} onChange={(e) => { this.setState({ email: e.target.value }) }} required />
                  <FormFeedback className="help-block" valid={this.state.email !== ''}>Campo obligatorio</FormFeedback>
                </FormGroup>
              </Col>
              <Col xs="12" md="6">
                <FormGroup>
                  <Label htmlFor="inputAddress">Dirección</Label>
                  <Input type="text" step="any" className="form-control-success" id="inputAddress" value={this.state.address} onChange={(e) => { this.setState({ address: e.target.value }) }} />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12" md="6">
                <FormGroup>
                  <Label htmlFor="inputBirthday">Fecha de Nacimiento</Label>
                  <Input type="date" className="form-control-warning" id="inputBirthday" value={this.state.birthday} onChange={(e) => { this.setState({ birthday: e.target.value }) }}></Input>
                </FormGroup>
              </Col>
              <Col xs="12" md="6">
                <FormGroup>
                  <Label htmlFor="inputPhoneNumber">Nº Celular</Label>
                  <Input type="text" className="form-control-warning" id="inputPhoneNumber" value={this.state.phone} onChange={(e) => { this.setState({ phone: e.target.value }) }}></Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12" md="6">
                <ImageUploader
                  withIcon={true}
                  buttonText='Elige la imagen'
                  onChange={this.onDrop}
                  imgExtension={['.jpg', '.gif', '.png', '.gif']}
                  maxFileSize={5242880}
                  withPreview={true}
                  singleImage={true}
                />
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