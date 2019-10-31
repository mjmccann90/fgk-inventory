// import React, { Component } from 'react'
// import APIManager from '../../modules/APIManager'
// import AnimalCard from '../animal/AnimalCard'

class UserWithProducts extends Component {
    state = {
      user: {},
      products: []
    }

    componentDidMount(){
        //got here now make call to get employee with animal
        APIManager.getWithProducts(this.props.match.params.userId)
            .then((APIResult) => {
            this.setState({
              employee: APIResult,
              products: APIResult.products,
            })
        })
    }

    render(){
        return (
          <div className="card">
            <p>Employee: {this.state.employee.name}</p>
            {this.state.animals.map(animal =>
              <AnimalCard
                key={animal.id}
                animal={animal}
                {...this.props}
              />
            )}
          </div>
        )
      }
    }

export default UserWithProducts;