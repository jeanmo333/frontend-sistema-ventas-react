import axios from "axios";

const url = "http://localhost:8080/api/costomers";

class CustomerService {
  getCustomers() {
    return axios.get(url);
  }

  createCustomer(customer) {
      return axios.post(url, customer)
  }

  getCustomerById(customerId) {
    return axios.get(url+ '/' + customerId)
  }

  updateCustomer(customer, customerId) {
    return axios.put(url + '/' + customerId, customer)
  }

  deleteCustomer(customerId) {
    return axios.delete(url + '/' + customerId);
  }
  
}

export default new CustomerService();