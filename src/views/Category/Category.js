import React, { Component } from 'react';
import { Col, Row, Button } from 'reactstrap';
import FormNew from './FormNew';
import FormUpdate from './FormUpdate'
import TableCategories from './TableCategories'



import swal from 'sweetalert'
import { connect } from 'react-redux';
import { fetchAddCategory,fetchDeleteCategory, fetchUpdateCategory } from '../../services/api/categories'


import {deleteCategory,addCategory,changeFormStateCategory, updateCategory } from '../../store/actions'

class Category extends Component {

  state = {
    category: [],
    isModalOpen: false,    
    reqFromCategorys: [],
    isReady: false
  }

  /**
   * Agregar Categoría
   *
   * @memberof Category
   */
  addData = (category) => {
    fetchAddCategory(category).then((response) => {
      swal("Operación exitosa!", "Categoría registrada correctamente!", "success");
      return response.json()
    }).then((data) => {
      this.props.onAddCategory(data)
    }).catch(error => {
      console.error(error)
    });
  }

  /**
   * Eliminar un proyecto
   *
   * @memberof Category
   */
  deleteData = (id) => {
    swal({
      title: "¿Está seguro de eliminar la Categoría?",
      text: "Una vez eliminado, no podrá recuperarlo!! ",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetchDeleteCategory(id).then((response) => {
          swal("Poof! La Categoría ha sido eliminado!", { icon: "success", });
          this.props.onDeleteCategory(id)
          return response.json()
        }).then((data) => {
          console.log(data);
        }).catch((error) => { console.log() })

      } else {
        swal("Tu Categoría está seguro!");
      }
    });
  }

  /**
   * Obtiene los datos del proyecto que se va a editar
   *
   * @memberof Category
   */
  editData = (category) => {
    //Cambiando estado de formulario antes de editar    
    this.changeStateForm(false)
    //Cargando datos 
    this.setState({ category: category });

  }

  /**
   * Actualiza los datos de un proyecto
   *
   * @memberof Category
   */
  updateData = (category) => {
    fetchUpdateCategory(category).then((response) => { return response.json() })
      .then((data) => {
        this.props.onUpdateCategory(category);
        swal("Categoría actualizado correctamente");
      }).catch(error => {
        console.log(error)
      })
  }

  /**
   * Cambia el estado del formulario 
   * true = formulario de registro
   * false = formulario de edición
   * @memberof Category
   */
  changeStateForm = (band) => {
    this.props.onChangeFormState(band);
  }


  /**
   * Renderiza el formulario según sea el caso
   *
   * @memberof Category
   */
  renderForm = () => {
    return (this.props.isCreate) ? <FormNew onAddedData={this.addData}></FormNew> : <FormUpdate onUpdatedData={this.updateData} onChangeFormState={this.changeStateForm} category={this.state.category} ></FormUpdate>;
  }


  componentDidMount(){
    console.log(this.props)
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6">{this.renderForm()}</Col>          
          <Col xs="12" sm="6">
            <TableCategories onOpenModal={this.changeStateModal} onDeleteData={this.deleteData} onEditData={this.editData} data={this.props.categories}></TableCategories>
          </Col>    
        </Row>        
      </div>
    );
  }
}



const mapDispatchToProps = (dispatch) => {
  return {    
    onDeleteCategory: (id) => dispatch(deleteCategory(id)),
    onAddCategory: (category) => dispatch(addCategory(category)),
    onChangeFormState: (isCreate) => dispatch(changeFormStateCategory(isCreate)),
  
    onUpdateCategory: (category) => dispatch(updateCategory(category))

  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categoriesReducer.categories,
    isCreate: state.categoriesReducer.isCreate,
    isModalOpen: state.categoriesReducer.isModalOpen,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);
