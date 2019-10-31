import React, { Component } from "react";

class FloorOptions extends Component {
    render(){
        return (
            <option value={this.props.floor.id}>{this.props.floor.name}</option>
        )
    }
}

export default FloorOptions;