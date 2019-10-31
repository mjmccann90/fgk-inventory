import React, { Component } from "react";



class MySoldProductTable extends Component {
  state = {
    user: {},
    productType:{},
    loadingStatus: true
  };
  componentDidMount() {
    let exampleVariable = this.props.users.find(user => user.id === this.props.product.userId)
    console.log("example variable", exampleVariable)
    const newState = {};
    newState.productType = this.props.productTypes.find(productType => productType.id === this.props.product.productTypeId)
    newState.loadingStatus = false
    this.setState(newState)
  }
  render() {
    return (

      <tr>
        <td>{this.props.product.name}</td>
        {this.state.loadingStatus === false ?
          <td>{this.props.product.user.name} </td>
          : null}
        {this.state.loadingStatus === false ?
          <td>{this.state.productType.name}</td>
          : null}
      </tr>
    );
  }
}

export default MySoldProductTable;