import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductService from "../services/ProductService.js";
import { Card, Table,Pagination } from "react-bootstrap";
import Swal from "sweetalert2";

export default class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
    };
    this.addProduct = this.addProduct.bind(this);
    this.editProduct = this.editProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  //delete one supplier
  deleteProduct(id) {
    //Agregar el swetalert
    Swal.fire({
      title: "seguro eliminar producto",
      text: "Este Accion no puede dehacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Eliminado',
        )
        //eliminado de la base de datos
        //rest api call
        ProductService.deleteProduct(id).then((res) => {
          this.setState({
            products: this.state.products.filter(
              (product) => product.id !== id
            ),
          });
        });
      }
    });
  }
  
  //view one specific customer
  viewProduct(id) {
    this.props.history.push(`/view-product/${id}`);
  }



  //edit one specific supplier
  editProduct(id) {
    this.props.history.push(`/add-product/${id}`);
  }

  //get all customers
  componentDidMount() {
    ProductService.getProducts().then((res) => {
      this.setState({ products: res.data });
    });
  }

  addProduct() {
    this.props.history.push("/add-product/_add");
  }

  render() {
    return (
      <div>
        <div className="container" style={{marginTop: "80px"}}>
          <div className="row mt-2">
            <Card >
              <Card.Body>
                <div className="card-header text-center">
                  <h3>LISTADO DE PRODUCTOS</h3>
                </div>

                <button
                  className="btn btn-primary mt-2 mb-2"
                  onClick={this.addProduct}
                >
                  Agregar Producto
                </button>

                

                <Table striped bordered hover responsive="sm">
                  <thead className="dark">
                    <tr>
                      <th>ID</th>
                      <th>NOMBRE</th>
                      <th>PRECIO</th>
                      <th>CANTIDAD</th>
                      <th>ESTADO</th>
                      <th>ACCIONES</th>
                    </tr>
                  </thead>

                  <tbody>
                    {this.state.products.map((product) => (
                      <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.nombre}</td>
                        <td>{product.precio}</td>
                        <td>{product.cantidad}</td>
                        <td>{product.estado}</td>
                        <td>
                          <button
                            onClick={() => this.editProduct(product.id)}
                            className="btn btn-warning mb-2"
                            style={{ marginLeft: "10px" }}
                          >
                            Editar
                          </button>

                          <button
                            onClick={() => this.deleteProduct(product.id)}
                            className="btn btn-danger mb-2"
                            style={{ marginLeft: "10px" }}
                          >
                            Eliminar
                          </button>

                          <button
                            onClick={() => this.viewProduct(product.id)}
                            className="btn btn-success mb-2"
                            style={{ marginLeft: "10px" }}
                          >
                            Ver Mas
                          </button>

                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

                <div className="card-footer text-center mb-5">
                  <Pagination>
                    <Pagination.First />
                    <Pagination.Prev />
                    <Pagination.Item>{1}</Pagination.Item>
                    <Pagination.Item active>{2}</Pagination.Item>
                    <Pagination.Item>{3}</Pagination.Item>
                    <Pagination.Item disabled>{4}</Pagination.Item>
                    <Pagination.Next />
                    <Pagination.Last />
                  </Pagination>
                 
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}