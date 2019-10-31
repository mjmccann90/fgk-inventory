import React, { Component } from "react";

class SafeOptions extends Component {
    render(){
        return (
            <option value={this.props.safe.id}>{this.props.safe.name}</option>
        )
    }
}

export default SafeOptions;