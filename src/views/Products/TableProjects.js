import React, { Component } from 'react';
import {Button,Card, CardHeader, CardBody} from 'reactstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';

export default class TableProjects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            type: '',
            projects: [],
            idSelected: ''
        };
    }


     deleteRow = (next, dropRowKeys) => {
        const dropRowKeysStr = dropRowKeys.join(',');
        this.props.onDeleteData(dropRowKeysStr);            
      }
       
      selectRowProp = {
        mode: 'radio',
        clickToSelectAndEditCell: true
      };
    
      options = {
        noDataText: 'Listado sin proyectos encontrados',
        insertBtn: this.createCustomInsertButton,
        handleConfirmDeleteRow: this.deleteRow,
        sortIndicator: true,
        hideSizePerPage: true,
        paginationSize: 3,
        searchDelayTime: 100,
        hidePageListOnlyOnePage: false,
        clearSearch: false,
        alwaysShowAllBtns: false,
        withFirstAndLast: false,
        exportCSVText: 'Exportar CSV',        
        deleteText: 'Eliminar',
      
      };


      priceFormatter(cell, row) { 
        return `<i class='fa fa-money'></i> ${cell}`;
      }

      buttonReqFormatterShow=(cell,row)=>{
        return (<Button color="success" onClick={()=>{this.props.onOpenModal(true,row.id)}}>Ver Requerimientos</Button>);
      }      
      buttonReqFormatterEdit=(cell,row)=>{
        return (<Button color="info" onClick={()=>{this.props.onEditData(row)}}>Editar</Button>);
      }      

      enumFormatter(cell, row, enumObject) {
        return enumObject[cell];
      }

      qualityType = {        
        1: 'PRODUCTO',
        2: 'SERVICIO'
      };

    render() {
        return (
            <div className="animated">
              <Card>
                <CardHeader>
                  <i className="icon-menu"></i>Listado de Proyectos{' '}                  
                </CardHeader>
                <CardBody>
                  <BootstrapTable data={this.props.data} version="4" deleteRow={ true } exportCSV  searchPlaceholder='Buscar...' selectRow={ this.selectRowProp } striped hover pagination search options={this.options}>
                    <TableHeaderColumn dataField="id" hidden export={false} isKey>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField="name" filter={{type:'TextFilter',placeholder:''}} dataSort>Nombre</TableHeaderColumn>
                    <TableHeaderColumn dataField="type" filter={{type:'SelectFilter', options:{1: 'PRODUCTO', 2: 'SERVICIO'} ,placeholder:''}} dataFormat={this.enumFormatter} formatExtraData={ this.qualityType } datasort>Tipo</TableHeaderColumn>
                    <TableHeaderColumn dataField="cost" dataFormat={this.priceFormatter}  dataSort>Costo</TableHeaderColumn>
                    <TableHeaderColumn dataField="duration" dataSort>Duración</TableHeaderColumn>                    
                    <TableHeaderColumn dataField="" dataFormat={this.buttonReqFormatterShow}>Ver Requerimientos</TableHeaderColumn>
                    <TableHeaderColumn dataField="" dataFormat={this.buttonReqFormatterEdit}>Editar</TableHeaderColumn>
                  </BootstrapTable>
                </CardBody>
              </Card>
            </div>
          );         
    }
}

