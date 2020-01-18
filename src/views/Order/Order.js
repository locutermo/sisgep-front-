import React, { Component } from 'react';
import { Col, Row, Button } from 'reactstrap';
import FormNew from './FormNew';
import TableOrders from './TableOrders'



import swal from 'sweetalert'
import { connect } from 'react-redux';
import { fetchAddOrder, fetchUpdateOrder } from '../../services/api/orders'


import {addOrder, updateOrder,updateProduct } from '../../store/actions'

class Order extends Component {

  state = {
    order: [],
    isModalOpen: false,    
    reqFromOrders: [],
    isReady: false
  }

  /**
   * Agregar Pedido
   *
   * @memberof Order
   */
  addData = (order) => {
    fetchAddOrder(order).then((response) => {      
      return response.json()
    }).then((data) => {
      console.log("DATA:",data);
      if(data.response==="success"){
        this.props.onAddOrder(data.order);
        this.props.onUpdateProduct(data.productUpdated);
        swal("Operación exitosa!",data.message,data.response);
      }else{
        swal("Operación fallida!",data.message,data.response);
      }
      

    }).catch(error => {
      console.error(error)
    });
  }
  
  /**
   * Actualiza los datos de un proyecto
   *
   * @memberof Order
   */
  updateData = (order) => {
    fetchUpdateOrder(order).then((response) => { return response.json() })
      .then((data) => {
        if(data.response==="success"){
          this.props.onUpdateOrder(order);
          swal("Operación exitosa!",data.message,data.response);
        }else{
          swal("Operación fallida!",data.message,data.response);
        }
        
      }).catch(error => {
        console.log(error)
      })
  }
  
 
  componentDidMount(){
    console.log(this.props)
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="4">
            <FormNew onAddedData={this.addData} customers={this.props.customers} products={this.props.products}></FormNew>  
          </Col>          
          <Col xs="12" sm="8">
            <TableOrders onOpenModal={this.changeStateModal} onDeleteData={this.deleteData} onUpdateData={this.updateData} data={this.props.orders}></TableOrders>
          </Col>    
        </Row>        
      </div>
    );
  }
}



const mapDispatchToProps = (dispatch) => {
  return {        
    onAddOrder: (order) => dispatch(addOrder(order)),    
    onUpdateOrder: (order) => dispatch(updateOrder(order)),
    onUpdateProduct: (product) => dispatch(updateProduct(product))

  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.ordersReducer.orders,
    customers : state.customersReducer.customers,
    products: state.productsReducer.products,
    isCreate: state.ordersReducer.isCreate,    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);
