import React, { Component } from "react";
import APIManager from "../../modules/APIManager";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import FloorOptions from './FloorOptions'
import SafeOptions from './SafeOptions'
import ContainerOptions from './ContainerOptions'
import ProductTypeOptions from './ProductTypeOptions'

class ProductEditForm extends Component {
	//set the initial state
	state = {
		productName: "",
		floorId: "",
		floors: [],
		safeId: "",
		safes: [],
		containerId: "",
		containers: [],
		userId: "",
		productTypeId: "",
		productTypes: [],
		product:{},
		isSold: null,
		loadingStatus: true,
		modal: false,
		activeUser: parseInt(sessionStorage.getItem("userId"))
	};

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

	updateExistingProduct = evt => {
		evt.preventDefault();
		this.setState({ loadingStatus: true });
		const editedProduct = {
			name: this.state.productName,
			floorId: parseInt(this.state.floorId),
			safeId: parseInt(this.state.safeId),
			containerId: parseInt(this.state.containerId),
			productTypeId: parseInt(this.state.productTypeId),
			isSold: this.state.isSold,
			userId: this.state.activeUser
		};
		console.log(editedProduct)
		APIManager.update("products", editedProduct, this.state.product.id)
			.then(() => this.props.getData());
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

	componentDidMount() {
		// const myNewState ={}
		APIManager.get("products", this.props.product.id)
			.then(
				product => {
					console.log("something infort of it",product)
					this.setState({
						product: product,
						productName: product.name,
						floorId: product.floorId,
						safeId: product.safeId,
						containerId: product.containerId,
						productTypeId: product.productTypeId,
						isSold: product.isSold,
						loadingStatus: false,
					});
				}).then(()=>this.getFloors())
				.then(()=>this.getSafes())
				.then(()=>this.getContainers())
				.then(()=>this.getProductTypes());
	};
	toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
	}
	handleIsSold = (evt) => {
		const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.checked;
        this.setState(stateToChange);
    }
	render() {
		const closeBtn = (
			<button className="close" onClick={this.toggle}>
				x
			</button>
		);
		console.log(this.state.floorId)
		return (
			<>

                <Button className="addProduct" onClick={this.toggle}>
                    Edit</Button>
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
									defaultValue={this.state.productName}
								/>

								<label htmlFor="floor">Floor Location:</label>
								{this.state.floors ? <select value={this.state.floorId} id="floorId" onChange={this.handleSelectChange}>
									{this.state.floors.map(floor =>
										<FloorOptions key={floor.id} floor={floor} />
									)}
								</select>
								: ""}

								<label htmlFor="safe">Safe Location:</label>
								{this.state.safes ? <select defaultValue={this.state.safeId} id="safeId" onChange={this.handleSelectChange}>
									{this.state.safes.map(safe =>
										<SafeOptions key={safe.id} safe={safe} />
									)}
								</select>
								: ""}

								<label htmlFor="container">Container Location:</label>
								{this.state.containers ? <select defaultValue={this.state.containerId} id="containerId" onChange={this.handleSelectChange}>
									{this.state.containers.map(container =>
										<ContainerOptions key={container.id} container={container} />
									)}
								</select>
								: ""}

								<label htmlFor="productType">Product Type:</label>
								{this.state.productTypes ? <select defaultValue={this.state.productTypeId} id="productTypeId" onChange={this.handleSelectChange}>
									{this.state.productTypes.map(productTypes =>
										<ProductTypeOptions key={productTypes.id} productType={productTypes} />
									)}
								</select>
								: ""}

							<input type="checkbox" id="isSold" onChange={this.handleIsSold}></input>
							</div>
							<div className="alignRight">
							</div>

						</fieldset>
					</form>
				</ModalBody>
				<ModalFooter>
					<Button
						type="button"
						disabled={this.state.loadingStatus}
						onClick={evt => {
							this.updateExistingProduct(evt);
							this.toggle();
						}}
						className="btn btn-primary"
					>
						Submit
					</Button>
					<Button className="cancel" onClick={this.toggle}>
						Cancel
					</Button>
				</ModalFooter>
				</Modal>
			</>
		);
	}
}
export default ProductEditForm;