import React, { Component } from 'react';
import {Button,Card, CardHeader, CardBody,Badge} from 'reactstrap';
import {BootstrapTable, TableHeaderColumn,SizePerPageDropDown} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';

export default class TableCustomers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            type: '',
            state:'',
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
      
      onToggleDropDown = (toggleDropDown) => {        
        console.log('toggle dropdown');
        toggleDropDown();
      }
    
      renderSizePerPageDropDown = (props) => {
        return (
          <SizePerPageDropDown
            className='my-size-per-page'
            btnContextual='btn-warning'
            variation='dropup'
            onClick={ () => this.onToggleDropDown(props.toggleDropDown) }/>
        );
      }

      renderSizePerPageDropDown2 = props => {
        return (
          <div className='btn-group'>
            {
              [ 10, 25, 50 ].map((n, idx) => {
                const isActive = (n === props.currSizePerPage) ? 'active' : null;
                return (
                  <button key={ idx } type='button' className={ `btn btn-info ${isActive}` } onClick={ () => props.changeSizePerPage(n) }>{ n }</button>
                );
              })
            }
          </div>
        );
      }

      buttonReqFormatterEdit=(cell,row)=>{
        return (<Button color="info" onClick={()=>{this.props.onEditData(row)}}>Editar</Button>);
      }   

      customerName(cell, row) { 
        return `${row.name} ${row.lastName}`;
      }

      stockFormatter(cell,row){
        return (cell>20?<h4><Badge color="primary">{cell}</Badge></h4>:<h4><Badge color="danger">{cell}</Badge></h4>)
      } 

    render() {
      const options = {
        // sizePerPage: 30,
        sizePerPageDropDown: this.renderSizePerPageDropDown2,
        noDataText: 'Listado sin clientes encontrados',        
        handleConfirmDeleteRow: this.deleteRow,
        sortIndicator: true,
        hideSizePerPage: true,
        paginationSize: 3,
        searchDelayTime: 0,
        hidePageListOnlyOnePage: false,
        clearSearch: false,
        alwaysShowAllBtns: false,
        withFirstAndLast: false,
        exportCSVText: 'Exportar CSV',        
        deleteText: 'Eliminar',
      
      };

        return (
            <div className="animated">
              <Card>
                <CardHeader>
                  <i className="icon-menu"></i>Listado de Clientes              
                </CardHeader>
                <CardBody>
                  <BootstrapTable data={this.props.data || []} version="4" deleteRow={ true } exportCSV  searchPlaceholder='Buscar...' selectRow={ this.selectRowProp } striped hover pagination search options={options}>
                    <TableHeaderColumn row='0' rowSpan='2' dataField="id" hidden export={false} isKey>ID</TableHeaderColumn>
                    <TableHeaderColumn row='0' colSpan='3' dataSort csvHeader='Cliente' headerAlign='center'>Cliente</TableHeaderColumn>
                    <TableHeaderColumn row='1' dataAlign='center'  dataField="name"   dataSort>Nombre</TableHeaderColumn>
                    <TableHeaderColumn row='1' dataAlign='center'  width='175'  dataField="lastName" dataSort>Apellidos</TableHeaderColumn>                                                        
                    <TableHeaderColumn row='1' dataAlign='center' dataField="dni"  width='100' dataSort>DNI</TableHeaderColumn>                                                        
                    <TableHeaderColumn row='0' dataAlign='center' rowSpan='2' dataField="phone" dataSort>Nº Celular</TableHeaderColumn>                    
                    <TableHeaderColumn row='0' dataAlign='center' rowSpan='2' dataField="email"  datasort>Correo Electrónico</TableHeaderColumn>
                    <TableHeaderColumn row='0' dataAlign='center' rowSpan='2' dataField="address"  dataSort>Dirección</TableHeaderColumn>
                    <TableHeaderColumn row='0' width='120' dataAlign='center' rowSpan='2' dataField="birthday" dataSort>Fecha de Nac.</TableHeaderColumn>                    
                    {/* <TableHeaderColumn dataField="" dataFormat={this.buttonReqFormatterShow}>Ver Requerimientos</TableHeaderColumn> */}
                    {/* <TableHeaderColumn dataField="created_at" dataSort>Creado</TableHeaderColumn> */}
                    <TableHeaderColumn row='0'  dataAlign='center' width='100' rowSpan='2' dataField="" dataFormat={this.buttonReqFormatterEdit}>Editar</TableHeaderColumn>
                  </BootstrapTable>
                </CardBody>
              </Card>
            </div>
          );         
    }
}

