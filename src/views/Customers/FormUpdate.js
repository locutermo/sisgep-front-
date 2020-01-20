import React from 'react'
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
    Row,
    Col
} from 'reactstrap';
import swal from 'sweetalert'

export default class FormUpdate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: null,      
            name: '',
            lastName: '',
            dni: '',
            phone: '',
            email: '',
            birthday: '',
            address: '',
        }
    }

    getData = () => {
      let customer = [];
      customer.id = this.state.id ;
      customer.name = this.state.name;
      customer.lastName = this.state.lastName;
      customer.dni = this.state.dni ; 
      customer.phone = this.state.phone;
      customer.email = this.state.email;
      customer.address = this.state.address;
      customer.birthday = this.state.birthday;
      return customer;
      }

    componentDidMount() {
        this.setState({ id:this.props.customer.id, name: this.props.customer.name, lastName: this.props.customer.lastName, dni: this.props.customer.dni, phone: this.props.customer.phone, email: this.props.customer.email, address: this.props.customer.address, birthday: this.props.customer.birthday  });
      }

    cleanFields = () => {
      this.setState({ name: '', lastName: '', dni: '', phone: '', email: '', address: '', birthday: '' });
    }

    componentDidUpdate(previousProps, previousState) {
        if (previousProps.customer.id !== this.props.customer.id) {
          this.setState({ name: this.props.customer.name, lastName: this.props.customer.lastName, dni: this.props.customer.dni, phone: this.props.customer.phone, email: this.props.customer.email, address: this.props.customer.address, birthday: this.props.customer.birthday  });

        }
    }
    
    

    validate = () => {
      if (this.state.name != '' && this.state.lastName != '' && this.state.dni != ''&& this.state.email != '') {
            this.props.onUpdatedData(this.getData()); this.cleanFields();
        } else {
            swal("Operación fallida!!", "Verifica que no hayan campos vacíos", "error")
        }
    }

    render() {
        return (
          <Card>
          <CardHeader>
          <Row>
                        <Col xs="12" sm="9">
                            <strong>Actualización de Cliente</strong>
                        </Col>
                        <Col xs="12" sm="3">
                            <Button size="sm" color="primary" onClick={() => { this.props.onChangeFormState(true) }}>Cambiar a registro</Button>
                        </Col>
                    </Row>
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
                      <Input type="text" step="any" className="form-control-success" id="inputAddress" value={this.state.address} onChange={(e) => { this.setState({ address: e.target.value }) }}/>                    
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
                <FormGroup>
                  <Button color="info" onClick={() => { this.validate() }}> Actualizar </Button>
                </FormGroup>
            </Form>
          </CardBody>
        </Card>
        )
    }


}