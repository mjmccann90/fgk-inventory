import React, { Component } from "react";

class ContainerOptions extends Component {
    render(){
        return (
            <option value={this.props.container.id}>{this.props.container.name}</option>
        )
    }
}

export default ContainerOptions;