import React, { Component } from "react";
import APIManager from "../../modules/APIManager";
import MySoldProductTable from "./MySoldProductTable"
import { Table } from 'reactstrap';



class MySoldProductList extends Component {
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
    getData = () => APIManager.getAllMySoldProducts("products")
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
        const getAllProducts = APIManager.getAllMySoldProducts("products", this.activeUserId).then(products => {
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
                <div className="my-sold-products-container">
                    <div className="my-sold-products-intro">
                        <h1>My Sold Products</h1>
                    </div>
          <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>User that Sold the Product</th>
            <th>Product Type</th>
          </tr>
        </thead>
        <tbody>
          {this.state.products.map((product, index) => {
              console.log(product)
            return (
                this.state.loadingStatus === false ?
                    <MySoldProductTable getData={this.getData} key={product.id} product={product} users={this.state.users}productTypes={this.state.productTypes} />
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

export default MySoldProductList;