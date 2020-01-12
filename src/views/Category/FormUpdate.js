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
        }
    }

    getData = () => {
        let category = [];
        category.id = this.state.id;
        category.name = this.state.name;
        return category;
    }

    componentDidMount() {
        console.log("Insertando datos al renderizar")
        this.setState({ name: this.props.category.name, id: this.props.category.id });
    }

    cleanFields = () => {
        this.setState({ name: '' });
    }

    componentDidUpdate(previousProps, previousState) {
        if (previousProps.category.id !== this.props.category.id) {
            this.setState({ name: this.props.category.name, stock: this.props.category.stock, state: this.props.category.state, price: this.props.category.price, type: this.props.category.type, category: this.props.category.category, id: this.props.category.id });
        }
    }




    validate = () => {
        if (this.state.name != '') {
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
                            <strong>Actualización de Categoría</strong>
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
                            <Col md="12" center={true}>
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