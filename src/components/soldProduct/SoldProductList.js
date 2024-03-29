import React, { Component } from "react";
import APIManager from "../../modules/APIManager";
import SoldProductTable from "./SoldProductTable"
import { Table } from 'reactstrap';



class SoldProductList extends Component {
    //define what this component needs to render
    state = {
        products: [],
        productTypes: [],
        users: [],
        loadingStatus: true,

    };
    activeUserId = parseInt(sessionStorage.getItem("userId"))


    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    };
    formatProductWithProductTypeName = (products, productTypes) => {
        const soldProducts = products.map(product => {
            productTypes.map(productType => {
                if (product.productTypeId === productType.id) {
                    product.productTypeName = productType.name;
                }
            })
        })
        this.setState({
            products: soldProducts
        })
        // console.log(this.state.products)
    }
    getData = () => APIManager.getAllSoldProducts("products")
        .then(things => {
            console.log("RUNNING",things)
            const newState = {};
            newState["products"] = things;
            this.setState(newState)
            // console.log('this.state',this.state)

        });

    componentDidMount() {
        const newState = {};
        //getAll from APIManager and hang on to that data; put it in state
        const getAllProducts = APIManager.getAllSoldProducts("products", this.activeUserId).then(products => {
            newState.products = products
        })
        const getAllProductTypes = APIManager.getAll("productTypes").then(productTypes => {
            newState.productTypes = productTypes
        })
        Promise.all([getAllProducts, getAllProductTypes])
        .then(() => {
            newState.loadingStatus = false
            this.setState(newState)

        })

    }

    render() {
        return (
            <>
                <div className="sold-products-container">
                    <div className="sold-products-intro">
                        <h1>All Sold Products</h1>
                    </div>
          <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>User who sold the item</th>
            <th>Product Type</th>
          </tr>
        </thead>
        <tbody>
          {this.state.products.map((product, index) => {
              console.log(product)
            return (
                this.state.loadingStatus === false ?
                    <SoldProductTable getData={this.getData} key={product.id} product={product} users={this.state.users}productTypes={this.state.productTypes} />
                    : null

            )
          })}
        </tbody>
      </Table>

                </div>
            </>
        );
    }
}

export default SoldProductList;