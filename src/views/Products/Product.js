import React, { Component } from 'react';
import { Col, Row, Button } from 'reactstrap';
import FormNew from './FormNew';
import FormUpdate from './FormUpdate'
import TableProducts from './TableProducts'



import swal from 'sweetalert'
import { connect } from 'react-redux';
import { fetchAddProduct,fetchDeleteProduct, fetchUpdateProduct, fetchGetOrdersProject } from '../../services/api/products'


import { deleteProduct, addProduct, changeFormState, updateProduct, changeModalState } from '../../store/actions'

class Product extends Component {

  state = {
    product: [],
    isModalOpen: false,    
    reqFromProjects: [],
    isReady: false
  }
 

  changeStateModal = (band, id = null) => {
    this.props.onChangeModalState(band);
    if(!band)this.setState({isReady:false});
    if (id != null) this.getOrdersFromProduct(id);

  }

  /**
   * Agregar Proyecto
   *
   * @memberof Product
   */
  addData = (product) => {
    fetchAddProduct(product).then((response) => {
      swal("Operación exitosa!", "Proyecto registrado correctamente!", "success");
      return response.json()
    }).then((data) => {
      this.props.onAddProject(data)
    }).catch(error => {
      console.error(error)
    });
  }

  /**
   * Eliminar un proyecto
   *
   * @memberof Product
   */
  deleteData = (id) => {
    swal({
      title: "¿Está seguro de eliminar el producto?",
      text: "Una vez eliminado, no podrá recuperarlo!! ",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetchDeleteProduct(id).then((response) => {
          swal("Poof! Tu producto ha sido eliminado!", { icon: "success", });
          this.props.onDeleteProject(id)
          return response.json()
        }).then((data) => {
          console.log(data);
        }).catch((error) => { console.log() })

      } else {
        swal("Tu producto está seguro!");
      }
    });
  }

  /**
   * Obtiene los datos del proyecto que se va a editar
   *
   * @memberof Product
   */
  editData = (product) => {
    //Cambiando estado de formulario antes de editar    
    this.changeStateForm(false)
    //Cargando datos 
    this.setState({ product: product });

  }

  /**
   * Actualiza los datos de un proyecto
   *
   * @memberof Product
   */
  updateData = (product) => {
    fetchUpdateProduct(product).then((response) => { return response.json() })
      .then((data) => {
        this.props.onUpdateProject(product);
        swal("Producto actualizado correctamente");
      }).catch(error => {
        console.log(error)
      })
  }

  /**
   * Cambia el estado del formulario 
   * true = formulario de registro
   * false = formulario de edición
   * @memberof Product
   */
  changeStateForm = (band) => {
    this.props.onChangeFormState(band);
  }

  getOrdersFromProduct = (id) => {
    fetchGetOrdersProject(id).then(response => response.json()).then(data => {
      this.setState({ reqFromProjects: data,isReady:true });
    }).catch(error => { console.log(error) })
  }
  



  /**
   * Renderiza el formulario según sea el caso
   *
   * @memberof Product
   */
  renderForm = () => {
    return (this.props.isCreate) ? <FormNew categories={this.props.categories} onAddedData={this.addData}></FormNew> : <FormUpdate onUpdatedData={this.updateData} onChangeFormState={this.changeStateForm} product={this.state.product} ></FormUpdate>;
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
            <TableProducts onOpenModal={this.changeStateModal} onDeleteData={this.deleteData} onEditData={this.editData} data={this.props.products}></TableProducts>
          </Col>    
        </Row>
      </div>
    );
  }
}



const mapDispatchToProps = (dispatch) => {
  return {    
    onDeleteProject: (id) => dispatch(deleteProduct(id)),
    onAddProject: (product) => dispatch(addProduct(product)),
    onChangeFormState: (isCreate) => dispatch(changeFormState(isCreate)),
    onChangeModalState: (isModalOpen) => dispatch(changeModalState(isModalOpen)),
    onUpdateProject: (product) => dispatch(updateProduct(product))

  }
}

const mapStateToProps = (state) => {
  return {
    products: state.productsReducer.products,
    categories : state.categoriesReducer.categories,
    isCreate: state.productsReducer.isCreate,
    isModalOpen: state.productsReducer.isModalOpen,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
