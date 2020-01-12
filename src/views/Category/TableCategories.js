import React, { Component } from 'react';
import {Button,Card, CardHeader, CardBody,Badge} from 'reactstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';

export default class TableProjects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',            
            categories: [],
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
        noDataText: 'Listado sin categorías encontrados',
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
      buttonReqFormatterEdit=(cell,row)=>{
        return (<Button color="info" onClick={()=>{this.props.onEditData(row)}}>Editar</Button>);
      }      

    render() {
        return (
            <div className="animated">
              <Card>
                <CardHeader>
                  <i className="icon-menu"></i>Listado de Categorías              
                </CardHeader>
                <CardBody>
                  <BootstrapTable data={this.props.data} version="4" deleteRow={ true } exportCSV  searchPlaceholder='Buscar...' selectRow={ this.selectRowProp } striped hover pagination search options={this.options}>
                    <TableHeaderColumn dataField="id" hidden export={false} isKey>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField="name" filter={{type:'TextFilter',placeholder:''}} dataSort>Nombre</TableHeaderColumn>
                    <TableHeaderColumn dataField="created_at" dataSort>Creado</TableHeaderColumn>
                    <TableHeaderColumn dataField="" dataFormat={this.buttonReqFormatterEdit}>Editar</TableHeaderColumn>
                  </BootstrapTable>
                </CardBody>
              </Card>
            </div>
          );         
    }
}

