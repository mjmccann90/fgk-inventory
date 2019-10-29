import React, { Component } from "react";

class ProductTable extends Component {
  state = {
    floor: {},
    container: {},
    safe:{},
    loadingStatus: true
  };
  componentDidMount() {
    const newState = {};
    newState.floor = this.props.floors.find(floor => floor.id === this.props.product.floorId)
    console.log(newState.floor)
    newState.container = this.props.containers.find(container => container.id === this.props.product.containerId)
    newState.safe = this.props.safes.find(safe => safe.id === this.props.product.safeId)

    console.log("this is props.floorId",this.props.product)
    newState.loadingStatus = false
    console.log(newState)
    this.setState(newState)
    console.log("this is state.floor", this.state.floor)
  }
  render() {
    return (

      <tr>
        <td>{this.props.product.name}</td>
        {this.state.loadingStatus === false ?
          <td>{this.state.floor.name}</td>
          : null}

        {this.state.loadingStatus === false ?
          <td>{this.state.safe.name}</td>
          : null}

        {this.state.loadingStatus === false ?
          <td>{this.state.container.name}</td>
          : null}
      </tr>



    );
  }
}

export default ProductTable;