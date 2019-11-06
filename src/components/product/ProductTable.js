import React, { Component } from "react";
import ProductEditForm from "./ProductEditForm"
import { Button } from "reactstrap";




class ProductTable extends Component {
  state = {
    floor: {},
    container: {},
    safe:{},
    productType:{},
    loadingStatus: true
  };
  componentDidMount() {
    let exampleVariable = this.props.floors.find(floor => floor.id === this.props.product.floorId)
    console.log("example variable", exampleVariable)
    const newState = {};
    newState.floor = this.props.floors.find(floor => floor.id === this.props.product.floorId)
    newState.container = this.props.containers.find(container => container.id === this.props.product.containerId)
    newState.safe = this.props.safes.find(safe => safe.id === this.props.product.safeId)
    newState.productType = this.props.productTypes.find(productType => productType.id === this.props.product.productTypeId)

    newState.loadingStatus = false
    this.setState(newState)
  }
  render() {
    return (

      <tr>
        <td>{this.props.product.name}</td>
        {this.state.loadingStatus === false ?
          <td>{this.state.floor.name} </td>
          : null}

        {this.state.loadingStatus === false ?
          <td>{this.state.safe.name} </td>
          : null}

        {this.state.loadingStatus === false ?
          <td>{this.state.container.name}</td>
          : null}
        {this.state.loadingStatus === false ?
          <td>{this.state.productType.name}</td>
          : null}
          <td><ProductEditForm getData={this.props.getData} product={this.props.product}/></td>
          <td><Button type="button" color="secondary" onClick={() => this.props.deleteProduct(this.props.product.id)}>Delete</Button></td>
      </tr>



    );
  }
}

export default ProductTable;