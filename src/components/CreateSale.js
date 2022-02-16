import React, { Component } from "react";
import SaleService from "../services/SaleService.js";
import Swal from "sweetalert2";

export default class CreateSale extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      nombre_cli: "",
      nombre_pro: "",
      precio: "",
      cantidad: ""
    };
    this.changeNombre_cliHandler = this.changeNombre_cliHandler.bind(this);
    this.changeNombre_proHandler = this.changeNombre_proHandler.bind(this);
    this.changePrecioHandler = this.changePrecioHandler.bind(this);
    this.changeCantidadHandler = this.changeCantidadHandler.bind(this);
    this.saveOrUpdateSale = this.saveOrUpdateSale.bind(this);
  }

 componentDidMount() {
    if (this.state.id === "_add") {
      return;
    } else {
      SaleService.getSaleById(this.state.id).then((res) => {
        let sale = res.data;
        this.setState({
          nombre_cli: sale.nombre_cli,
          nombre_pro: sale.nombre_pro,
          precio: sale.precio,
          cantidad: sale.cantidad,
        });
      });
    }
  }

  saveOrUpdateSale = (e) => {
    e.preventDefault();

    let sale = {
      nombre_cli: this.state.nombre_cli,
      nombre_pro: this.state.nombre_pro,
      precio: this.state.precio,
      cantidad: this.state.cantidad
    };

    if (this.state.id === "_add") {
      SaleService.createSale(sale).then(() => {
        //the swetalert
        Swal.fire({
          position: "center",
          icon: "success",
          title: "agregado correctamente",
          showConfirmButton: false,
          timer: 1500,
        });

        //redirigir a la pagina customer
        this.props.history.push("/sales");
      });
    } else {
      SaleService.updateSale(sale, this.state.id).then((res) => {
        //the swetalert
        Swal.fire({
          position: "center",
          icon: "success",
          title: "modificado correctamente",
          showConfirmButton: false,
          timer: 1500,
        });
        //redirigir a la pagina customer
        this.props.history.push("/sales");
      });
    }
  };

  changeNombre_cliHandler(e) {
    this.setState({ nombre_cli: e.target.value });
  }

  changeNombre_proHandler(e) {
    this.setState({ nombre_pro: e.target.value });
  }

  changePrecioHandler(e) {
    this.setState({ precio: e.target.value });
  }

  changeCantidadHandler(e) {
    this.setState({ cantidad: e.target.value });
  }



  cancel() {
    this.props.history.push("/sales");
  }

  getTitle() {
    if (this.state.id === "_add") {
      return <h3 className="text-center">Agregar Venta</h3>;
    } else {
      return <h3 className="text-center">Editar Venta</h3>;
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
                    <label>Nombre Cliente</label>
                    <input
                      type="text"
                      name="nombre_cli"
                      className="form-control"
                      value={this.state.nombre_cli}
                      onChange={this.changeNombre_cliHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label>Nombre Producto</label>
                    <input
                      type="text"
                      name="nombre_pro"
                      className="form-control"
                      value={this.state.nombre_pro}
                      onChange={this.changeNombre_proHandler}
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


                  <button
                    className="btn btn-success"
                    onClick={this.saveOrUpdateSale}
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