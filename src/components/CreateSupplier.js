import React, { Component } from "react";
import SupplierService from "../services/SupplierService.js";
import Swal from "sweetalert2";

export default class CreateSupplier extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      nombre: "",
      email: "",
      direccion: "",
      telefono: "",
      web: ""
    };
    this.changeNombreHandler = this.changeNombreHandler.bind(this);
    this.changeEmailHandler = this.changeEmailHandler.bind(this);
    this.changeDireccionHandler = this.changeDireccionHandler.bind(this);
    this.changeTelefonoHandler = this.changeTelefonoHandler.bind(this);
    this.changeWebHandler = this.changeWebHandler.bind(this);
    this.saveOrUpdateSupplier = this.saveOrUpdateSupplier.bind(this);
  }


  componentDidMount() {
    if (this.state.id === "_add") {
      return;
    } else {
      SupplierService.getSupplierById(this.state.id).then((res) => {
        let supplier = res.data;
        this.setState({
          nombre: supplier.nombre,
          email: supplier.email,
          direccion: supplier.direccion,
          telefono: supplier.telefono,
          web: supplier.web
        });
      });
    }
  }

  saveOrUpdateSupplier = (e) => {
    e.preventDefault();

    let supplier = {
      nombre: this.state.nombre,
      email: this.state.email,
      direccion: this.state.direccion,
      telefono: this.state.telefono,
      web: this.state.web
    };

    if (this.state.id === "_add") {
      SupplierService.createSupplier(supplier).then(() => {
        //the swetalert
        Swal.fire({
          position: "center",
          icon: "success",
          title: "agregado correctamente",
          showConfirmButton: false,
          timer: 1500,
        });

        //redirigir a la pagina customer
        this.props.history.push("/suppliers");
      });
    } else {
      SupplierService.updateSupplier(supplier, this.state.id).then((res) => {
        //the swetalert
        Swal.fire({
          position: "center",
          icon: "success",
          title: "modificado correctamente",
          showConfirmButton: false,
          timer: 1500,
        });
        //redirigir a la pagina customer
        this.props.history.push("/suppliers");
      });
    }
  };

  changeNombreHandler(e) {
    this.setState({ nombre: e.target.value });
  }


  changeEmailHandler(e) {
    this.setState({ email: e.target.value });
  }

  changeDireccionHandler(e) {
    this.setState({ direccion: e.target.value });
  }

  changeTelefonoHandler(e) {
    this.setState({ telefono: e.target.value });
  }

  changeWebHandler(e) {
    this.setState({ web: e.target.value });
  }

  cancel() {
    this.props.history.push("/suppliers");
  }

  getTitle() {
    if (this.state.id === "_add") {
      return <h3 className="text-center">Agregar Proveedor</h3>;
    } else {
      return <h3 className="text-center">Editar Proveedor</h3>;
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
                    <label style={{ marginTop: "10px" }}>Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={this.state.email}
                      onChange={this.changeEmailHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label style={{ marginTop: "10px" }}>Direccion</label>
                    <input
                      type="direccion"
                      name="direccion"
                      className="form-control"
                      value={this.state.direccion}
                      onChange={this.changeDireccionHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label style={{ marginTop: "10px" }}>Telefono</label>
                    <input
                      type="telefono"
                      name="telefono"
                      className="form-control"
                      value={this.state.telefono}
                      onChange={this.changeTelefonoHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label style={{ marginTop: "10px" }}>Web</label>
                    <input
                      type="text"
                      name="web"
                      className="form-control"
                      value={this.state.web}
                      onChange={this.changeWebHandler}
                    />
                  </div>

                  <button
                    className="btn btn-success"
                    onClick={this.saveOrUpdateSupplier}
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