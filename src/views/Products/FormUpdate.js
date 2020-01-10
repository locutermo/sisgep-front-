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
            states: [{ "id": 1, "value": "DISPONIBLE" }, { "id": 2, "value": "NO DISPONIBLE" }, { "id": 3, "value": "VACÍO" }],
            categories: [{ "id": 1, "value": "Verduras" }, { "id": 2, "value": "Frutas" }, { "id": 3, "value": "Golosinas" }],
            types: [{ "id": 1, "value": "Unidad" }, { "id": 2, "value": "Kg" }],
      
            state:'',
            type:'',
            category:'',
            name: '',
            price: '',
            stock: '',
        }
    }

    getData = () => {
        let product = [];
        product.id = this.state.id ; 
        product.name = this.state.name;
        product.type = this.state.type;
        product.stock = this.state.stock;
        product.price = this.state.price ; 
        product.category = this.state.category;
        product.state = this.state.state ; 
        return product;
      }

    componentDidMount() {
        console.log("Insertando datos al renderizar")
        this.setState({ name: this.props.product.name,stock:this.props.product.stock,state:this.props.product.state,price:this.props.product.price, type: this.props.product.type,category:this.props.product.category, id: this.props.product.id });
    }

    cleanFields = () => {
        this.setState({ name: '', type: '', category:'',price:'',stock:'' ,state:''});
      }

    componentDidUpdate(previousProps, previousState) {
        if (previousProps.product.id !== this.props.product.id) {
            this.setState({ name: this.props.product.name,stock:this.props.product.stock,state:this.props.product.state,price:this.props.product.price, type: this.props.product.type,category:this.props.product.category, id: this.props.product.id });
        }
    }

    renderOptions = (collection) => collection.map(p => { return <option key={p.id} value={p.id} label={p.value}></option> })
    

    validate = () => {
        if (this.state.type != '' && this.state.name != '' && this.state.type != 0) {
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
                            <strong>Actualización de producto</strong>
                        </Col>
                        <Col xs="12" sm="3">
                            <Button size="sm" color="primary" onClick={() => { this.props.onChangeFormState(true) }}>Cambiar a registro</Button>
                        </Col>
                    </Row>
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
                  <Input type="select"  id="inputSelectStates" value={this.state.state} onChange={(e) => { this.setState({ state: e.target.value }) }} >
                    <option value={0} label="Seleccione una opcion"></option>
                    {this.renderOptions(this.state.states)}
                  </Input>                  
                </FormGroup>
              </Col>
              <Col xs="12" md="4">
                <FormGroup>
                  <Label htmlFor="inputSelectTypes">Tipo</Label>
                  <Input type="select" id="inputSelectTypes" value={this.state.type} onChange={(e) => { this.setState({ type: e.target.value }) }} >
                    <option value={0} label="Seleccione una opcion"></option>
                    {this.renderOptions(this.state.types)}
                  </Input>
                  
                </FormGroup>
              </Col>
              <Col xs="12" md="4">
                <FormGroup>
                  <Label htmlFor="inputSelectCategories">Categoría</Label>
                  <Input type="select" id="inputSelectCategories" value={this.state.category} onChange={(e) => { this.setState({ category: e.target.value }) }} >
                    <option value={0} label="Seleccione una opcion"></option>
                    {this.renderOptions(this.state.categories)}
                  </Input>
                  
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="12" center>
              <FormGroup>
              <Button color="success" onClick={() => { this.validate() }}> Actualizar </Button>
            </FormGroup>
              </Col>
            </Row>
          </Form>
        </CardBody>
            </Card>
        )
    }


}