import React, { Component } from 'react';
import {Button,Card, CardHeader, CardBody,Badge} from 'reactstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';

export default class TableOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',            
            categories: [],
            idSelected: ''
        };
    }   
       
      selectRowProp = {
        mode: 'radio',
        clickToSelectAndEditCell: true
      };
    
      options = {
        noDataText: 'Listado sin categorías encontrados',
        insertBtn: this.createCustomInsertButton,        
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
        if(row.state==2){
          return (<Button color="primary" onClick={()=>{this.props.onUpdateData(row)}}>Pagar</Button>);
        }
        
      }      
    
      priceFormatter(cell, row) { 
        return `S/${cell}`;
      }

      stateType = {        
        1: <h4><Badge color="primary">PAGADO</Badge></h4>,
        2: <h4><Badge color="success">DEBE</Badge></h4>,        
      };

      enumFormatter(cell, row, enumObject) {
        return enumObject[cell];
      }

    render() {
        return (
            <div className="animated">
              <Card>
                <CardHeader>
                  <i className="icon-menu"></i>Listado de Pedidos              
                </CardHeader>
                <CardBody>
                  <BootstrapTable data={this.props.data} version="4" exportCSV  searchPlaceholder='Buscar...' striped hover pagination search options={this.options}>
                    <TableHeaderColumn dataField="id" hidden export={false} isKey>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField="productName" dataSort>Producto</TableHeaderColumn>
                    <TableHeaderColumn dataField="userName" dataSort>Cliente</TableHeaderColumn>                    
                    <TableHeaderColumn dataField="amount" dataFormat={this.priceFormatter} dataSort>Monto</TableHeaderColumn>
                    <TableHeaderColumn dataField="quantity" dataSort>Cantidad</TableHeaderColumn>
                    <TableHeaderColumn dataField="date"  dataSort>Fecha</TableHeaderColumn>
                    <TableHeaderColumn dataField="state" dataFormat={this.enumFormatter} formatExtraData={ this.stateType } dataSort>Estado</TableHeaderColumn>
                    <TableHeaderColumn dataField="" dataFormat={this.buttonReqFormatterEdit}></TableHeaderColumn>
                  </BootstrapTable>
                </CardBody>
              </Card>
            </div>
          );         
    }
}

