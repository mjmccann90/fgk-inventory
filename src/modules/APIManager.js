/* You're going to eliminate the possibility of duplicate code by making a module
whose sole responsibility is to interact with the API.*/

const remoteURL = "http://localhost:5002"

export default {
    get(resource, id) {
      return fetch(`${remoteURL}/${resource}/${id}`).then(result => result.json())
    },
    getAllProducts(resource) {
      return fetch(`${remoteURL}/${resource}?_sort=timeStamp&isSold=false`).then(result => result.json())
    },
    getAllUnsoldProducts(resource) {
      return fetch(`${remoteURL}/${resource}?isSold=false`).then(result => result.json())
    },
    getAllSoldProducts(resource) {
      return fetch(`${remoteURL}/${resource}?isSold=true&&_expand=user`).then(result => result.json())
    },
    getAllMySoldProducts(resource, userId) {
      return fetch(`${remoteURL}/${resource}?userId=${userId}&isSold=true&_expand=user`).then(result => result.json())
    },
    getAll(resource) {
      return fetch(`${remoteURL}/${resource}`).then(result => result.json())
    },
    getWithProducts(id) {
      return fetch(`${remoteURL}/products/${id}?_embed=users`)
              .then(result => result.json())
  },

    getAllUsers(resource){
        console.log(resource)
      return fetch (`${remoteURL}/${resource}`).then(result => result.json())
    },

    delete(resource ,id) {
      return fetch(`http://localhost:5002/${resource}/${id}`, {
        method: "DELETE"
    })
      .then(result => result.json())
  },
  post(resource, newResource) {
    return fetch(`${remoteURL}/${resource}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newResource)
    }).then(data => data.json())
  },
  update(resource, editedResource, productId) {
    console.log("app fetch", productId)
    return fetch(`${remoteURL}/${resource}/${productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedResource)
    }).then(data => data.json());
  }
  }