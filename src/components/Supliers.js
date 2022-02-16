import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SupplierService from "../services/SupplierService.js";
import { Card, Table, Pagination } from "react-bootstrap";
import Swal from "sweetalert2";

export default class Suppliers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      suppliers: [],
    };
    this.addSupplier = this.addSupplier.bind(this);
    this.editSupplier = this.editSupplier.bind(this);
    this.deleteSupplier = this.deleteSupplier.bind(this);
  }

  //delete one supplier
  deleteSupplier(id) {
    //Agregar el swetalert
    Swal.fire({
      title: "seguro eliminar proveedor",
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
        SupplierService.deleteSupplier(id).then((res) => {
          this.setState({
            suppliers: this.state.suppliers.filter(
              (supplier) => supplier.id !== id
            ),
          });
        });
      }
    });
  }

  //view one specific customer
  viewSupplier(id) {
    this.props.history.push(`/view-supplier/${id}`);
  }

  //edit one specific supplier
  editSupplier(id) {
    this.props.history.push(`/add-supplier/${id}`);
  }

  //get all customers
  componentDidMount() {
    SupplierService.getSuppliers().then((res) => {
      this.setState({ suppliers: res.data });
    });
  }

  addSupplier() {
    this.props.history.push("/add-supplier/_add");
  }

  render() {
    return (
      <div>
        <div className="container" style={{ marginTop: "80px" }}>
          <div className="row mt-2">
            <Card>
              <Card.Body>
                <div className="card-header text-center">
                  <h3>LISTADO DE PROVEEDORES</h3>
                </div>

                <button
                  className="btn btn-primary mt-2 mb-2 m-0"
                  onClick={this.addSupplier}
                >
                  Agregar Proveedor
                </button>

                {/*
                    <div className="col col-3">
                    <input
                      placeholder="Buscar proveedor"
                      type="text"
                      name="buscar"
                      className="form-control mt-2 mb-2"
                      value={this.state.nombre}
                      onChange={this.changeNombreHandler}
                    />
                  </div>
                  */}

                <Table striped bordered hover responsive="sm">
                  <thead className="dark">
                    <tr>
                      <th>ID</th>
                      <th>NOMBRE</th>
                      <th>EMAIL</th>
                      <th>DIRECCION</th>
                      <th>TELEFONO</th>
                      <th>WEB</th>
                      <th>ACCIONES</th>
                    </tr>
                  </thead>

                  <tbody>
                    {this.state.suppliers.map((supplier) => (
                      <tr key={supplier.id}>
                        <td>{supplier.id}</td>
                        <td>{supplier.nombre}</td>
                        <td>{supplier.email}</td>
                        <td>{supplier.direccion}</td>
                        <td>{supplier.telefono}</td>
                        <td>{supplier.web}</td>
                        <td>
                          <button
                            onClick={() => this.editSupplier(supplier.id)}
                            className="btn btn-warning mb-2"
                            style={{ marginLeft: "6px" }}
                          >
                            Editar
                          </button>

                          <button
                            onClick={() => this.deleteSupplier(supplier.id)}
                            className="btn btn-danger mb-2"
                            style={{ marginLeft: "6px" }}
                          >
                            Eliminar
                          </button>

                          <button
                            onClick={() => this.viewSupplier(supplier.id)}
                            className="btn btn-success mb-2"
                            style={{ marginLeft: "6px" }}
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
