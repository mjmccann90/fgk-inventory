import React, { Component } from "react";
import APIManager from "../../modules/APIManager";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import FloorOptions from './FloorOptions'
import SafeOptions from './SafeOptions'
import ContainerOptions from './ContainerOptions'
import ProductTypeOptions from './ProductTypeOptions'


class AddProductForm extends Component {


    //set the initial state
    state = {
        productName: "",
        floorId: "",
        floors: [],
        safeLocation: "",
        safes: [],
        containerId: "",
        containers: [],
        userId: "",
        productType: "",
        productTypes: [],
        loadingStatus: true,
        modal: false
    };

    activeUserId = parseInt(sessionStorage.getItem("userId"))

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }


    getFloors = () => {
        APIManager.getAll("floors").then((floors) => this.setState({floors:floors
        }))
    }
    getSafes = () => {
        APIManager.getAll("safes").then((safes) => this.setState({safes:safes
        }))
    }
    getContainers = () => {
        APIManager.getAll("containers").then((containers) => this.setState({containers:containers
        }))
    }
    getProductTypes = () => {
        APIManager.getAll("productTypes").then((productTypes) => this.setState({productTypes:productTypes
        }))
    }
    componentDidMount (){
        this.getFloors()
        this.getSafes()
        this.getContainers()
        this.getProductTypes()
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };
    handleSelectChange = evt => {
        // console.log(evt)
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    addProduct = evt => {
        // console.log("floorId",this.state.floorId)
        evt.preventDefault();
        this.toggle();
        if (this.state.productName === "" || this.state.floorId === "") {
            window.alert("Please input a product");
        } else {
            this.setState({ loadingStatus: true });
            const addedProduct = {
                userId: null,
                name: this.state.productName,
                floorId: parseInt(this.state.floorId),
                safeId: parseInt(this.state.safeLocation),
                containerId: parseInt(this.state.containerId),
                productTypeId: parseInt(this.state.productType),
                isSold: false
            };
// console.log("addedProducts", addedProduct)
            APIManager.post("products", addedProduct)
                .then(() => { this.props.getData("products") }
                );
        };
    }
    render() {
        const closeBtn = (
            <button className="close" onClick={this.toggle}>
                &times;
				</button>
        );
        return (
            <>
                {" "}
                <Button className="addProduct" onClick={this.toggle}>
                    Add Product</Button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.props.className}
                >
                    <ModalHeader toggle={this.toggle} close={closeBtn}>
                        Create Product
					</ModalHeader>
                    <ModalBody>
                        <form>
                            <fieldset>
                                <div className="formgrid">
                                    <label htmlFor="productName">
                                        Product Name:
									</label>
                                    <input
                                        type="text"
                                        required
                                        className="form-control"
                                        onChange={this.handleFieldChange}
                                        id="productName"
                                        value={this.state.productName}
                                    />

                                    <label htmlFor="floor">Floor Location:</label>
                                    <select value={this.state.floorId} id="floorId" onChange={this.handleSelectChange}>
                                        {this.state.floors.map(floor =>
                                            <FloorOptions key={floor.id} floor={floor}/>
                                        )}
                                    </select>

                                    <label htmlFor="safe">Safe Location:</label>
                                    <select value={this.state.safeLocation} id="safeLocation" onChange={this.handleSelectChange}>
                                        {this.state.safes.map(safe =>
                                            <SafeOptions key={safe.id} safe={safe}/>
                                        )}
                                    </select>

                                    <label htmlFor="container">Container Location:</label>
                                    <select value={this.state.containerId}id="containerId"onChange={this.handleSelectChange}>
                                        {this.state.containers.map(container =>
                                            <ContainerOptions key={container.id} container={container}/>
                                        )}
                                    </select>

                                    <label htmlFor="productType">Product Type:</label>
                                    <select value={this.state.productType} id="productType"onChange={this.handleSelectChange}>
                                        {this.state.productTypes.map(productTypes =>
                                            <ProductTypeOptions key={productTypes.id} productType={productTypes}/>
                                        )}
                                    </select>


                                </div>
                                <div className="alignRight">
                                </div>
                            </fieldset>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button
className="add"
                            onClick={this.addProduct}
                        >
                            Add
						</Button>{" "}
                        <Button className="cancel" onClick={this.toggle}>
                            Cancel
						</Button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}

export default AddProductForm;