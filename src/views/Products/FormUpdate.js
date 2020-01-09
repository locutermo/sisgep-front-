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
            elements: [{"id":1 , "value":"Producto"},{"id":2 , "value":"Servicio"}],      
            name: '',
            type: ''
        }
    }

    getProjectData = () => {
        let project = [];
        project.id = this.state.id;
        project.name = this.state.name;
        project.type = this.state.type;
        return project;
    }

    componentDidMount() {
        console.log("Insertando datos al renderizar")
        this.setState({ name: this.props.project.name, type: this.props.project.type, id: this.props.project.id });
    }

    cleanFields = () => {
        this.setState({ id: '', name: '', type: '' });
    }

    componentDidUpdate(previousProps, previousState) {
        if (previousProps.project.id !== this.props.project.id) {
            this.setState({ name: this.props.project.name, type: this.props.project.type, id: this.props.project.id });
        }
    }

    renderOptions = () => 
        this.state.elements.map(p => { 
            return <option value={p.id} label={p.value}></option> 
        })
    

    validate = () => {
        if (this.state.type != '' && this.state.name != '' && this.state.type != 0) {
            this.props.onUpdatedData(this.getProjectData()); this.cleanFields();
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
                            <strong>Formulario de Actualización</strong>
                        </Col>
                        <Col xs="12" sm="3">
                            <Button size="sm" color="primary" onClick={() => { this.props.onChangeFormState(true) }}>Cambiar a registro</Button>
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody>
                    <Form className="was-validated">
                        <FormGroup>
                            <Label htmlFor="inputUpdateName">Nombre</Label>
                            <Input type="text" className="form-control-success" id="inputUpdateName" value={this.state.name} onChange={(e) => { this.setState({ name: e.target.value }) }} required />
                            <FormFeedback className="help-block" valid={this.state.name !== ''}>Campo obligatorio</FormFeedback>
                        </FormGroup>                        
                        <FormGroup>
                            <Label htmlFor="inputUpdateType">Tipo</Label>
                            <Input type="select" className="form-control-warning" id="inputUpdateType" value={this.state.type} onChange={(e) => { this.setState({ type: e.target.value }) }} required>
                                <option value={0} label="Seleccione una opcion"></option>
                                {this.renderOptions()}
                            </Input>
                            <FormFeedback className="help-block" valid={this.state.type !== ''}>Campo obligatorio</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Button color="success" onClick={() => { this.validate() }}> Actualizar </Button>
                        </FormGroup>
                    </Form>
                </CardBody>
            </Card>
        )
    }


}