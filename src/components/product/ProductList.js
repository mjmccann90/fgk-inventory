import React, { Component } from "react";
import APIManager from "../../modules/APIManager";
import AddProductForm from "./AddProductForm"
import ProductTable from "./ProductTable"
import { Table } from 'reactstrap';



class ProductList extends Component {
    //define what this component needs to render
    state = {
        products: [],
        floors: [],
        containers: [],
        safes: [],
        productTypes: [],
        loadingStatus: true,
        modal: false
    };
    activeUserId = parseInt(sessionStorage.getItem("userId"))


    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    };

    deleteProduct = id => {
        APIManager.delete("products", id).then(() => {
            APIManager.getAllUnsoldProducts("products").then(newProducts => {
                this.setState({
                    products: newProducts
                });
            });
        });
    };
    formatProductWithSafeName = (products, safes) => {
        const newProducts = products.map(product => {
            safes.map(safe => {
                if (product.safeId === safe.id) {
                    product.safeName = safe.name;
                }
            })
        })
        this.setState({
            products: newProducts
        })
        // console.log(this.state.products)
    }
    formatProductWithFloorName = (products, floors) => {
        const newProducts = products.map(product => {
            floors.map(floor => {
                if (product.floorId === floor.id) {
                    product.floorName = floor.name;
                }
            })
        })
        this.setState({
            products: newProducts
        })
        // console.log(this.state.products)
    }
    formatProductWithContainerName = (products, containers) => {
        const newProducts = products.map(product => {
            containers.map(container => {
                if (product.containerId === container.id) {
                    product.containerName = container.name;
                }
            })
        })
        this.setState({
            products: newProducts
        })
        // console.log(this.state.products)
    }
    formatProductWithProductTypeName = (products, productTypes) => {
        const newProducts = products.map(product => {
            productTypes.map(productType => {
                if (product.productTypeId === productType.id) {
                    product.productTypeName = productType.name;
                }
            })
        })
        this.setState({
            products: newProducts
        })
        // console.log(this.state.products)
    }
    getData = () => APIManager.getAllUnsoldProducts("products")
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
        const getAllProducts = APIManager.getAllProducts("products", this.activeUserId).then(products => {
            newState.products = products
        })
        const getAllSafes = APIManager.getAll("safes").then(safes => {
            newState.safes = safes
        })
        const getAllContainers = APIManager.getAll("containers").then(containers => {
            newState.containers = containers
        })
        const getAllFloors = APIManager.getAll("floors").then(floors => {
            newState.floors = floors
            console.log(floors)
        })
        const getAllProductTypes = APIManager.getAll("productTypes").then(productTypes => {
            newState.productTypes = productTypes
        })
        Promise.all([getAllProducts, getAllSafes, getAllContainers, getAllFloors, getAllProductTypes])
        .then(() => {
            newState.loadingStatus = false
            this.setState(newState)

        })

    }

    render() {
        return (
            <>
                <div className="products-container">
                    <div className="products-intro">
                        <h1>All Products</h1>
                    </div>
                    <AddProductForm {...this.props} getData={this.getData}  />
          <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Floor Location</th>
            <th>Safe Name</th>
            <th>Container Name</th>
            <th>Product Type</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {this.state.products.map((product, index) => {
              console.log(product)
            return (
                this.state.loadingStatus === false ?
                    <ProductTable getData={this.getData} key={product.id} product={product} safes={this.state.safes} containers={this.state.containers} floors={this.state.floors} productTypes={this.state.productTypes} deleteProduct={this.deleteProduct}/>
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

export default ProductList;