import React, { Component } from "react";

class ProductTypeOptions extends Component {
    render(){
        return (
            <option value={this.props.productType.id}>{this.props.productType.name}</option>
        )
    }
}

export default ProductTypeOptions;