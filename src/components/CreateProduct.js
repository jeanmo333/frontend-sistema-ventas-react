import React, { Component } from "react";
import ProductService from "../services/ProductService.js";
import Swal from "sweetalert2";

export default class CreateProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      nombre: "",
      precio: "",
      cantidad: "",
      estado: "",
    };
    this.changeNombreHandler = this.changeNombreHandler.bind(this);
    this.changePrecioHandler = this.changePrecioHandler.bind(this);
    this.changeCantidadHandler = this.changeCantidadHandler.bind(this);
    this.changeEstadoHandler = this.changeEstadoHandler.bind(this);
    this.saveOrUpdateProduct = this.saveOrUpdateProduct.bind(this);
  }

 componentDidMount() {
    if (this.state.id === "_add") {
      return;
    } else {
      ProductService.getProductById(this.state.id).then((res) => {
        let product = res.data;
        this.setState({
          nombre: product.nombre,
          precio: product.precio,
          cantidad: product.cantidad,
          estado: product.estado
        });
      });
    }
  }

  saveOrUpdateProduct = (e) => {
    e.preventDefault();

    let product = {
      nombre: this.state.nombre,
      precio: this.state.precio,
      cantidad: this.state.cantidad,
      estado: this.state.estado
    };

    if (this.state.id === "_add") {
      ProductService.createProduct(product).then(() => {
        //the swetalert
        Swal.fire({
          position: "center",
          icon: "success",
          title: "agregado correctamente",
          showConfirmButton: false,
          timer: 1500,
        });

        //redirigir a la pagina productos
        this.props.history.push("/products");
      });
    } else {
      ProductService.updateProduct(product, this.state.id).then((res) => {
        //the swetalert
        Swal.fire({
          position: "center",
          icon: "success",
          title: "modificado correctamente",
          showConfirmButton: false,
          timer: 1500,
        });
        //redirigir a la pagina customer
        this.props.history.push("/products");
      });
    }
  };

  changeNombreHandler(e) {
    this.setState({ nombre: e.target.value });
  }

  changePrecioHandler(e) {
    this.setState({ precio: e.target.value });
  }

  changeCantidadHandler(e) {
    this.setState({ cantidad: e.target.value });
  }

  changeEstadoHandler(e) {
    this.setState({ estado: e.target.value });
  }



  cancel() {
    this.props.history.push("/products");
  }

  getTitle() {
    if (this.state.id === "_add") {
      return <h3 className="text-center">Agregar Producto</h3>;
    } else {
      return <h3 className="text-center">Editar Producto</h3>;
    }
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row mt-5">
            <div className=" card col-md-6 offset-md-3 offset-md-3 mt-3 ">
              {this.getTitle()}
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label>Nombre</label>
                    <input
                      type="text"
                      name="nombre"
                      className="form-control"
                      value={this.state.nombre}
                      onChange={this.changeNombreHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label style={{ marginTop: "10px" }}>Precio</label>
                    <input
                      type="number"
                      name="precio"
                      className="form-control"
                      value={this.state.precio}
                      onChange={this.changePrecioHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label style={{ marginTop: "10px" }}>Cantidad</label>
                    <input
                      type="number"
                      name="cantidad"
                      className="form-control"
                      value={this.state.cantidad}
                      onChange={this.changeCantidadHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label style={{ marginTop: "10px" }}>Estado</label>
                    <input
                      type="text"
                      name="estado"
                      className="form-control"
                      value={this.state.estado}
                      onChange={this.changeEstadoHandler}
                    />
                  </div>


                  <button
                    className="btn btn-success"
                    onClick={this.saveOrUpdateProduct}
                    style={{ marginTop: "10px" }}
                  >
                    Guardar
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: "10px", marginTop: "10px" }}
                  >
                    Volver
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}