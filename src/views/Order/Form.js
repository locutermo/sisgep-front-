import React, { Component } from 'react';
import FormUpdate from './FormUpdate'
import FormNew from './FormNew'

class Form extends Component {
  constructor(props) {
    super(props);  
  };
  

  render(){
    return (this.props.isCreate) ? <FormNew onAddedData={this.props.onAddedData}></FormNew> : <FormUpdate project={this.props.projectForUpdate} ></FormUpdate>;
  }
}

export default Form; 