import axios from "axios";

const url = "http://localhost:8080/api/sales";

class SaleService {
  getSales() {
    return axios.get(url);
  }

  createSale(sale) {
      return localStorage.setItem('sales',JSON.stringify(sale));
     // localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
  }

  getSaleById(SaleId) {
    return axios.get(url+ '/' + SaleId)
  }

  updateSale(sale, saleId) {
    return axios.put(url + '/' + saleId, sale);
  }

  deleteSale(saleId) {
    return axios.delete(url + '/' + saleId);
  }
  
}

export default new SaleService();