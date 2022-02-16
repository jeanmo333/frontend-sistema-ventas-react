import React, { Component } from "react";
import CustomerService from "../services/CustomerService";
import Swal from "sweetalert2";

export default class CreateCustomer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      nombre: "",
      apellido: "",
      email: "",
      direccion: "",
      telefono: "",
    };
    this.changeNombreHandler = this.changeNombreHandler.bind(this);
    this.changeApellidoHandler = this.changeApellidoHandler.bind(this);
    this.changeEmailHandler = this.changeEmailHandler.bind(this);
    this.changeDireccionHandler = this.changeDireccionHandler.bind(this);
    this.changeTelefonoHandler = this.changeTelefonoHandler.bind(this);
    this.saveOrUpdateCustomer = this.saveOrUpdateCustomer.bind(this);
  }

 componentDidMount() {
    if (this.state.id === "_add") {
      return;
    } else {
      CustomerService.getCustomerById(this.state.id).then((res) => {
        let customer = res.data;
        this.setState({
          nombre: customer.nombre,
          apellido: customer.apellido,
          email: customer.email,
          direccion: customer.direccion,
          telefono: customer.telefono,
        });
      });
    }
  }

  saveOrUpdateCustomer = (e) => {
    e.preventDefault();

    let customer = {
      nombre: this.state.nombre,
      apellido: this.state.apellido,
      email: this.state.email,
      direccion: this.state.direccion,
      telefono: this.state.telefono,
    };

    if (this.state.id === "_add") {
      CustomerService.createCustomer(customer).then(() => {
        //the swetalert
        Swal.fire({
          position: "center",
          icon: "success",
          title: "agregado correctamente",
          showConfirmButton: false,
          timer: 1500,
        });

        //redirigir a la pagina customer
        this.props.history.push("/customers");
      });
    } else {
      CustomerService.updateCustomer(customer, this.state.id).then((res) => {
        //the swetalert
        Swal.fire({
          position: "center",
          icon: "success",
          title: "modificado correctamente",
          showConfirmButton: false,
          timer: 1500,
        });
        //redirigir a la pagina customer
        this.props.history.push("/customers");
      });
    }
  };

  changeNombreHandler(e) {
    this.setState({ nombre: e.target.value });
  }

  changeApellidoHandler(e) {
    this.setState({ apellido: e.target.value });
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

  cancel() {
    this.props.history.push("/customers");
  }

  getTitle() {
    if (this.state.id === "_add") {
      return <h3 className="text-center">Agregar Cliente</h3>;
    } else {
      return <h3 className="text-center">Editar Cliente</h3>;
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
                    <label style={{ marginTop: "10px" }}>Apellido</label>
                    <input
                      type="text"
                      name="apellido"
                      className="form-control"
                      value={this.state.apellido}
                      onChange={this.changeApellidoHandler}
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

                  <button
                    className="btn btn-success"
                    onClick={this.saveOrUpdateCustomer}
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
