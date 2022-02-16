import axios from "axios";

const url = "http://localhost:8080/api/products";

class ProductService {
  getProducts() {
    return axios.get(url);
  }

  createProduct(product) {
      return axios.post(url, product);
  }

  getProductById(productId) {
    return axios.get(url+ '/' + productId)
  }

  updateProduct(product, productId) {
    return axios.put(url + '/' + productId, product);
  }

  deleteProduct(productId) {
    return axios.delete(url + '/' + productId);
  }
  
}

export default new ProductService();