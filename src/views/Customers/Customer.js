import React, { Component } from 'react';
import { Col, Row, Button } from 'reactstrap';
import FormNew from './FormNew';
import FormUpdate from './FormUpdate'
import TableCustomers from './TableCustomers'



import swal from 'sweetalert'
import { connect } from 'react-redux';
import { fetchAddCustomer,fetchDeleteCustomer, fetchUpdateCustomer, fetchGetOrdersCustomer } from '../../services/api/customers'


import { deleteCustomer, addCustomer, changeFormStateCustomer, updateCustomer, changeModalState } from '../../store/actions'

class Customer extends Component {

  state = {
    customer: [],
    isModalOpen: false,    
    reqFromCustomers: [],
    isReady: false
  }
 

  changeStateModal = (band, id = null) => {
    this.props.onChangeModalState(band);
    if(!band)this.setState({isReady:false});
    if (id != null) this.getOrdersFromCustomer(id);

  }

  /**
   * Agregar Proyecto
   *
   * @memberof Customer
   */
  addData = (customer) => {
    fetchAddCustomer(customer).then((response) => {
      swal("Operación exitosa!", "Proyecto registrado correctamente!", "success");
      return response.json()
    }).then((data) => {
      console.log("ADDDATA: ",data);
      this.props.onAddCustomer(data.success.user)
    }).catch(error => {
      console.error(error)
    });
  }

  /**
   * Eliminar un proyecto
   *
   * @memberof Customer
   */
  deleteData = (id) => {
    swal({
      title: "¿Está seguro de eliminar el customero?",
      text: "Una vez eliminado, no podrá recuperarlo!! ",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetchDeleteCustomer(id).then((response) => {
          swal("Poof! Tu customero ha sido eliminado!", { icon: "success", });
          this.props.onDeleteCustomer(id)
          return response.json()
        }).then((data) => {
          console.log(data);
        }).catch((error) => { console.log() })

      } else {
        swal("Tu customero está seguro!");
      }
    });
  }

  /**
   * Obtiene los datos del proyecto que se va a editar
   *
   * @memberof Customer
   */
  editData = (customer) => {
    //Cambiando estado de formulario antes de editar    
    this.changeStateForm(false)
    //Cargando datos 
    this.setState({ customer: customer });

  }

  /**
   * Actualiza los datos de un proyecto
   *
   * @memberof Customer
   */
  updateData = (customer) => {
    fetchUpdateCustomer(customer).then((response) => { return response.json() })
      .then((data) => {
        this.props.onUpdateCustomer(customer);
        swal("Cliente actualizado correctamente");
      }).catch(error => {
        console.log(error)
      })
  }

  /**
   * Cambia el estado del formulario 
   * true = formulario de registro
   * false = formulario de edición
   * @memberof Customer
   */
  changeStateForm = (band) => {
    this.props.onChangeFormState(band);
  }

  getOrdersFromCustomer = (id) => {
    fetchGetOrdersCustomer(id).then(response => response.json()).then(data => {
      this.setState({ reqFromCustomers: data,isReady:true });
    }).catch(error => { console.log(error) })
  }
  



  /**
   * Renderiza el formulario según sea el caso
   *
   * @memberof Customer
   */
  renderForm = () => {
    return (this.props.isCreate) ? <FormNew onAddedData={this.addData}></FormNew> : <FormUpdate onUpdatedData={this.updateData} onChangeFormState={this.changeStateForm} customer={this.state.customer} ></FormUpdate>;
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
            <TableCustomers onOpenModal={this.changeStateModal} onDeleteData={this.deleteData} onEditData={this.editData} data={this.props.customers}></TableCustomers>
          </Col>    
        </Row>
      </div>
    );
  }
}



const mapDispatchToProps = (dispatch) => {
  return {    
    onDeleteCustomer: (id) => dispatch(deleteCustomer(id)),
    onAddCustomer: (customer) => dispatch(addCustomer(customer)),
    onChangeFormState: (isCreate) => dispatch(changeFormStateCustomer(isCreate)),
    onChangeModalState: (isModalOpen) => dispatch(changeModalState(isModalOpen)),
    onUpdateCustomer: (customer) => dispatch(updateCustomer(customer))

  }
}

const mapStateToProps = (state) => {
  return {
    customers: state.customersReducer.customers,    
    isCreate: state.customersReducer.isCreate,
    isModalOpen: state.customersReducer.isModalOpen,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Customer);
