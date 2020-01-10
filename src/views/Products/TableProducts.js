import React, { Component } from 'react';
import {Button,Card, CardHeader, CardBody,Badge} from 'reactstrap';
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
        noDataText: 'Listado sin productos encontrados',
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
        return `S/${cell}`;
      }

      stockFormatter(cell,row){
        return (cell>20?<Badge color="primary">{cell}</Badge>:<Badge color="danger">{cell}</Badge>)
      }

      // buttonReqFormatterShow=(cell,row)=>{
      //   return (<Button color="success" onClick={()=>{this.props.onOpenModal(true,row.id)}}>Ver Requerimientos</Button>);
      // }      

      buttonReqFormatterEdit=(cell,row)=>{
        return (<Button color="info" onClick={()=>{this.props.onEditData(row)}}>Editar</Button>);
      }      

      enumFormatter(cell, row, enumObject) {
        return enumObject[cell];
      }

      stateType = {        
        1: 'DISPONIBLE',
        2: 'NO DISPONIBLE',
        3: 'VACÍO'
      };

      category = {
        1: "Verduras",
        2: "Frutas",
        3: "Golosinas",        
      }
      
      type = {
        1: "Unidad",
        2: "Kg"
      }

    render() {
        return (
            <div className="animated">
              <Card>
                <CardHeader>
                  <i className="icon-menu"></i>Listado de Productos              
                </CardHeader>
                <CardBody>
                  <BootstrapTable data={this.props.data} version="4" deleteRow={ true } exportCSV  searchPlaceholder='Buscar...' selectRow={ this.selectRowProp } striped hover pagination search options={this.options}>
                    <TableHeaderColumn dataField="id" hidden export={false} isKey>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField="name" filter={{type:'TextFilter',placeholder:''}} dataSort>Nombre</TableHeaderColumn>
                    <TableHeaderColumn dataField="price" dataFormat={this.priceFormatter} dataSort>Precio</TableHeaderColumn>                    
                    <TableHeaderColumn dataField="stock" dataFormat={this.stockFormatter} dataSort>Stock</TableHeaderColumn>                    
                    <TableHeaderColumn dataField="state" filter={{type:'SelectFilter', options:{1: 'DISPONIBLE', 2: 'NO DISPONIBLE',3:'VACÍO'} ,placeholder:''}} dataFormat={this.enumFormatter} formatExtraData={ this.stateType } datasort>Estado</TableHeaderColumn>
                    <TableHeaderColumn dataField="type"  dataFormat={this.enumFormatter} formatExtraData={ this.type }  dataSort>Tipo de Unidad</TableHeaderColumn>
                    <TableHeaderColumn dataField="category"  dataFormat={this.enumFormatter} formatExtraData={ this.category }  dataSort>Categoría</TableHeaderColumn>                    
                    {/* <TableHeaderColumn dataField="" dataFormat={this.buttonReqFormatterShow}>Ver Requerimientos</TableHeaderColumn> */}
                    <TableHeaderColumn dataField="created_at" dataSort>Creado</TableHeaderColumn>
                    <TableHeaderColumn dataField="" dataFormat={this.buttonReqFormatterEdit}>Editar</TableHeaderColumn>
                  </BootstrapTable>
                </CardBody>
              </Card>
            </div>
          );         
    }
}

