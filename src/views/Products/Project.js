import React, { Component } from 'react';
import { Col, Row, Button } from 'reactstrap';
import FormNew from './FormNew';
import FormUpdate from './FormUpdate'
import TableProjects from './TableProjects'
import RequirementsModal from './RequirementsModal'


import swal from 'sweetalert'
import { connect } from 'react-redux';
import { fetchAddProject,fetchDeleteProject, fetchUpdateProject, fetchGetRequirementsProject } from '../../services/api/projects'


import { deleteProject, addProject, changeFormState, updateProject, changeModalState } from '../../store/actions/'

class Project extends Component {

  state = {
    project: [],
    isModalOpen: false,    
    reqFromProjects: [],
    isReady: false
  }
 

  changeStateModal = (band, id = null) => {
    this.props.onChangeModalState(band);
    if(!band)this.setState({isReady:false});
    if (id != null) this.getRequirementsFromProject(id);

  }

  /**
   * Agregar Proyecto
   *
   * @memberof Project
   */
  addData = (project) => {
    fetchAddProject(project).then((response) => {
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
   * @memberof Project
   */
  deleteData = (id) => {
    swal({
      title: "¿Está seguro de eliminar el proyecto?",
      text: "Una vez eliminado, no podrá recuperarlo!! ",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetchDeleteProject(id).then((response) => {
          swal("Poof! Tu proyecto ha sido eliminado!", { icon: "success", });
          this.props.onDeleteProject(id)
          return response.json()
        }).then((data) => {
          console.log(data);
        }).catch((error) => { console.log() })

      } else {
        swal("Tu proyecto está seguro!");
      }
    });
  }

  /**
   * Obtiene los datos del proyecto que se va a editar
   *
   * @memberof Project
   */
  editData = (project) => {
    //Cambiando estado de formulario antes de editar    
    this.changeStateForm(false)
    //Cargando datos 
    this.setState({ project: project });

  }

  /**
   * Actualiza los datos de un proyecto
   *
   * @memberof Project
   */
  updateData = (project) => {
    fetchUpdateProject(project).then((response) => { return response.json() })
      .then((data) => {
        this.props.onUpdateProject(project);
        swal("Proyecto actualizado correctamente");
      }).catch(error => {
        console.log(error)
      })
  }

  /**
   * Cambia el estado del formulario 
   * true = formulario de registro
   * false = formulario de edición
   * @memberof Project
   */
  changeStateForm = (band) => {
    this.props.onChangeFormState(band);
  }

  getRequirementsFromProject = (id) => {
    fetchGetRequirementsProject(id).then(response => response.json()).then(data => {
      this.setState({ reqFromProjects: data,isReady:true });
    }).catch(error => { console.log(error) })
  }
  



  /**
   * Renderiza el formulario según sea el caso
   *
   * @memberof Project
   */
  renderForm = () => {
    return (this.props.projects.isCreate) ? <FormNew onAddedData={this.addData}></FormNew> : <FormUpdate onUpdatedData={this.updateData} onChangeFormState={this.changeStateForm} project={this.state.project} ></FormUpdate>;
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6">{this.renderForm()}</Col>
          <Col xs="12" sm="6">
            <RequirementsModal onCloseModal={this.changeStateModal} isReady={this.state.isReady} requirements={this.state.reqFromProjects} isModalOpen={this.props.isModalOpen}></RequirementsModal>
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="12">
            <TableProjects onOpenModal={this.changeStateModal} onDeleteData={this.deleteData} onEditData={this.editData} data={this.props.projects.projects}></TableProjects>
          </Col>    
        </Row>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {    
    onDeleteProject: (id) => dispatch(deleteProject(id)),
    onAddProject: (project) => dispatch(addProject(project)),
    onChangeFormState: (isCreate) => dispatch(changeFormState(isCreate)),
    onChangeModalState: (isModalOpen) => dispatch(changeModalState(isModalOpen)),
    onUpdateProject: (project) => dispatch(updateProject(project))

  }
}

const mapStateToProps = (state) => {
  return {
    projects: state.projects,
    isCreate: state.isCreate,
    isModalOpen: state.projects.isModalOpen,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Project);
