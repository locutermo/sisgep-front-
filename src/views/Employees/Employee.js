import React, { Component } from 'react';
import { Col, Row, Button } from 'reactstrap';
import FormNew from './FormNew';
import FormUpdate from './FormUpdate'
import TableEmployees from './TableEmployees'



import swal from 'sweetalert'
import { connect } from 'react-redux';
import { fetchAddEmployee,fetchDeleteEmployee, fetchUpdateEmployee, fetchGetSalesEmployee } from '../../services/api/employees'


import { deleteEmployee, addEmployee, changeFormStateEmployee, updateEmployee, changeModalState } from '../../store/actions'

class Employee extends Component {

  state = {
    employee: [],
    isModalOpen: false,    
    reqFromEmployees: [],
    isReady: false
  }
 

  changeStateModal = (band, id = null) => {
    this.props.onChangeModalState(band);
    if(!band)this.setState({isReady:false});
    if (id != null) this.getOrdersFromEmployee(id);

  }

  /**
   * Agregar Empleado
   *
   * @memberof Employee
   */
  addData = (employee) => {
    fetchAddEmployee(employee).then((data) => {
      console.log(data);
      if(data.data.response==="success"){
        swal("Operación exitosa!", data.data.message, data.data.response);
        this.props.onAddEmployee(data.data.data)
      }else swal("Operación Fallida!", data.data.message, data.data.response);
      
    }).catch(error => {
      console.error(error)
    });
  }

  /**
   * Eliminar un Empleado
   *
   * @memberof Employee
   */
  deleteData = (id) => {
    swal({
      title: "¿Está seguro de eliminar el employeeo?",
      text: "Una vez eliminado, no podrá recuperarlo!! ",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetchDeleteEmployee(id).then((response) => response.json()).
        then((data) => {
          if(data.response==="success"){
            swal("Operación exitosa!",data.message,data.response);
            this.props.onDeleteEmployee(id)
          }else swal("Operación fallida!",data.message,data.response);
          console.log(data);
        }).catch((error) => { console.log() })

      } else {
        swal("El empleado está seguro!");
      }
    });
  }

  /**
   * Obtiene los datos del Empleado que se va a editar
   *
   * @memberof Employee
   */
  editData = (employee) => {
    //Cambiando estado de formulario antes de editar    
    this.changeStateForm(false)
    //Cargando datos 
    this.setState({ employee: employee });

  }

  /**
   * Actualiza los datos de un Empleado
   *
   * @memberof Employee
   */
  updateData = (employee) => {
    fetchUpdateEmployee(employee)
      .then((res) => {
        if(res.data.response==="success"){
          this.props.onUpdateEmployee(res.data.data);
          swal("Operación exitosa!",res.data.message,res.data.response);
        }else swal("Operación fallida!",res.data.message,res.data.response);
      }).catch(error => {
        console.log(error)
      })
  }

  /**
   * Cambia el estado del formulario 
   * true = formulario de registro
   * false = formulario de edición
   * @memberof Employee
   */
  changeStateForm = (band) => {
    this.props.onChangeFormState(band);
  }

  getOrdersFromEmployee = (id) => {
    fetchGetSalesEmployee(id).then(response => response.json()).then(data => {
      this.setState({ reqFromEmployees: data,isReady:true });
    }).catch(error => { console.log(error) })
  }
  



  /**
   * Renderiza el formulario según sea el caso
   *
   * @memberof Employee
   */
  renderForm = () => {
    return (this.props.isCreate) ? <FormNew onAddedData={this.addData}></FormNew> : <FormUpdate onUpdatedData={this.updateData} onChangeFormState={this.changeStateForm} employee={this.state.employee} ></FormUpdate>;
  }


  componentDidMount(){
    console.log(this.props)
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6">{this.renderForm()}</Col>          
        </Row>
        <Row>
          <Col xs="12" sm="12">
            <TableEmployees onOpenModal={this.changeStateModal} onDeleteData={this.deleteData} onEditData={this.editData} data={this.props.employees}></TableEmployees>
          </Col>    
        </Row>
      </div>
    );
  }
}



const mapDispatchToProps = (dispatch) => {
  return {    
    onDeleteEmployee: (id) => dispatch(deleteEmployee(id)),
    onAddEmployee: (employee) => dispatch(addEmployee(employee)),
    onChangeFormState: (isCreate) => dispatch(changeFormStateEmployee(isCreate)),
    onChangeModalState: (isModalOpen) => dispatch(changeModalState(isModalOpen)),
    onUpdateEmployee: (employee) => dispatch(updateEmployee(employee))

  }
}

const mapStateToProps = (state) => {
  return {
    employees: state.employeesReducer.employees,    
    isCreate: state.employeesReducer.isCreate,
    isModalOpen: state.employeesReducer.isModalOpen,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Employee);
