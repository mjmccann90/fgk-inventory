import React, { Component } from "react";
import APIManager from "../../modules/APIManager";
import { Button, ModalBody, ModalFooter} from "reactstrap";

class ProductEditForm extends Component {
	//set the initial state
	state = {
		productName: "",
        floorLocation: "",
        floors: [],
        safeLocation: "",
        safes: [],
        containerLocation: "",
        containers: [],
        userId: "",
        productTypeId: [],
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
			floorLocation: this.state.floorLocation,
            safeLocation: this.state.safeLocation,
            containerLocation: this.state.containerLocation,

			userId: this.state.activeUser
		};
		console.log(editedNews)
		APIManager.update("news", editedNews)
			.then(() => { this.props.getData() }
			);
	}


	componentDidMount() {
		return APIManager.get("news", this.props.newsId)
			.then(
				news => {
					this.setState({
						articleTitle: news.articleTitle,
						articleURL: news.articleURL,
						createDate: news.createDate,
						loadingStatus: false,
					});
				});
	};

	render() {
		// const closeBtn = (
		// 	<button className="close" onClick={this.toggle}>
		// 		&times;
		// 	</button>
		// );
		return (
			<>
				<ModalBody>
					<form>
						<fieldset>
							<div className="formgrid">
								<input
									type="text"
									required
									className="form-control"
									onChange={this.handleFieldChange}
									id="articleTitle"
									value={this.state.articleTitle}
								/>
								<label htmlFor="articleTitle">
									Name of Article
								</label>

								<input
									type="url"
									required
									className="form-control"
									onChange={this.handleFieldChange}
									id="articleURL"
									value={this.state.articleURL}
								/>
								<label htmlFor="articleURL">
									URL of Article
								</label>

								<input
									type="date"
									required
									className="form-control"
									onChange={this.handleFieldChange}
									id="createDate"
									value={this.state.createDate}
								/>
								<label htmlFor="createDate">Today's Date</label>
							</div>
							<div className="alignRight"></div>
						</fieldset>
					</form>
				</ModalBody>
				<ModalFooter>
					<Button
						type="button"
						disabled={this.state.loadingStatus}
						onClick={evt => {
							this.updateExistingNews(evt);
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
				{/* </Modal> */}
			</>
		);
	}
}
export default EditNewsForm;