import axios from "axios";

const url = "http://localhost:8080/api/suppliers";

class SupplierService {
  getSuppliers() {
    return axios.get(url);
  }

  createSupplier(supplier) {
      return axios.post(url, supplier)
  }

  getSupplierById(supplierId) {
    return axios.get(url+ '/' + supplierId)
  }

  updateSupplier(supplier, supplierId) {
    return axios.put(url + '/' + supplierId, supplier)
  }

  deleteSupplier(supplierId) {
    return axios.delete(url + '/' + supplierId);
  }
  
}

export default new SupplierService();