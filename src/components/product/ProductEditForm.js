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
		safeLocation: "",
		safes: [],
		containerId: "",
		containers: [],
		userId: "",
		productType: "",
		productTypes: [],
		loadingStatus: true,
		modal: false,
		activeUser: parseInt(sessionStorage.getItem("userId"))
	};

	handleFieldChange = evt => {
		const stateToChange = {};
		stateToChange[evt.target.id] = evt.target.value;
		this.setState(stateToChange);
	};

	updateExistingProduct = evt => {
		evt.preventDefault();
		this.setState({ loadingStatus: true });
		const editedProduct = {
			id: parseInt(this.props.productId),
			productName: this.state.productName,
			floorId: this.state.floorId,
			floors:this.state.floors,
			safeLocation: this.state.safeLocation,
			containerId: this.state.containerId,
			productType: this.state.productType,

			userId: this.state.activeUser
		};
		console.log(editedProduct)
		APIManager.update("product", editedProduct)
			.then(() => { this.props.getData() }
			);
	}


	componentDidMount() {
		return APIManager.get("products", this.props.productId)
			.then(
				product => {
					this.setState({
						productName: product.productName,
						floorId: product.floorId,
						safeLocation: product.safeLocation,
						containerId: product.containerId,
						productType: product.productType,
						loadingStatus: false,
					});
				});
	};
	toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }
	render() {
		const closeBtn = (
			<button className="close" onClick={this.toggle}>
				click me
			</button>
		);
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
									value={this.state.productName}
								/>

								<label htmlFor="floor">Floor Location:</label>
								<select value={this.state.floorId} id="floorId" onChange={this.handleSelectChange}>
									{this.state.floors.map(floor =>
										<FloorOptions key={floor.id} floor={floor} />
									)}
								</select>

								<label htmlFor="safe">Safe Location:</label>
								<select value={this.state.safeLocation} id="safeLocation" onChange={this.handleSelectChange}>
									{this.state.safes.map(safe =>
										<SafeOptions key={safe.id} safe={safe} />
									)}
								</select>

								<label htmlFor="container">Container Location:</label>
								<select value={this.state.containerId} id="containerId" onChange={this.handleSelectChange}>
									{this.state.containers.map(container =>
										<ContainerOptions key={container.id} container={container} />
									)}
								</select>

								<label htmlFor="productType">Product Type:</label>
								<select value={this.state.productType} id="productType" onChange={this.handleSelectChange}>
									{this.state.productTypes.map(productTypes =>
										<ProductTypeOptions key={productTypes.id} productType={productTypes} />
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
						type="button"
						disabled={this.state.loadingStatus}
						onClick={evt => {
							this.updateExistingProduct(evt);
							this.props.toggle();
						}}
						className="btn btn-primary"
					>
						Submit
					</Button>
					<Button className="cancel" onClick={this.props.toggle}>
						Cancel
					</Button>
				</ModalFooter>
				</Modal>
			</>
		);
	}
}
export default ProductEditForm;