import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomerService from "../services/CustomerService";
import { Card, Table,Pagination } from "react-bootstrap";
import Swal from "sweetalert2";

export default class Customers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customers: [],
    };
    this.addCustomer = this.addCustomer.bind(this);
    this.editCustomer = this.editCustomer.bind(this);
    this.deleteCustomer = this.deleteCustomer.bind(this);
  }

  //delete one customer
  deleteCustomer(id) {
    //Agregar el swetalert
    Swal.fire({
      title: "seguro eliminar cliente",
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
        CustomerService.deleteCustomer(id).then((res) => {
          this.setState({
            customers: this.state.customers.filter(
              (customer) => customer.id !== id
            ),
          });
        });
      }
    });
  }

  
  //view one specific customer
  viewCustomer(id) {
    this.props.history.push(`/view-customer/${id}`);
  }

  //edit one specific customer
  editCustomer(id) {
    this.props.history.push(`/add-customer/${id}`);
  }

  //get all customers
  componentDidMount() {
    CustomerService.getCustomers().then((res) => {
      this.setState({ customers: res.data });
    });
  }

  addCustomer() {
    this.props.history.push("/add-customer/_add");
  }

  render() {
    return (
      <div>
        <div className="container" style={{marginTop: "80px"}}>
          <div className="row mt-2">
          <Card >
          <Card.Body>

              <div className="card-header text-center">
                <h3>LISTADO DE CLIENTES</h3>
              </div>

                <button
                  className="btn btn-primary mb-2 mt-2"
                  onClick={this.addCustomer}
                >
                  Agregar Cliente
                </button>

                <Table striped bordered hover responsive="sm">
                  <thead>
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">NOMBRE</th>
                      <th scope="col">APELLIDO</th>
                      <th scope="col">EMAIL</th>
                      <th scope="col">DIRECCION</th>
                      <th scope="col">TELEFONO</th>
                      <th scope="col">ACCIONES</th>
                    </tr>
                  </thead>

                  <tbody>
                    {this.state.customers.map((customer) => (
                      <tr key={customer.id}>
                        <th scope="row">{customer.id}</th>
                        <td>{customer.nombre}</td>
                        <td>{customer.apellido}</td>
                        <td>{customer.email}</td>
                        <td>{customer.direccion}</td>
                        <td>{customer.telefono}</td>
                        <td>
                          <button
                            onClick={() => this.editCustomer(customer.id)}
                            className="btn btn-warning mb-2"
                            style={{ marginLeft: "10px" }}
                          >
                            Editar
                          </button>

                          <button
                            onClick={() => this.deleteCustomer(customer.id)}
                            className="btn btn-danger mb-2"
                            style={{ marginLeft: "10px" }}
                          >
                            Eliminar
                          </button>

                          <button
                            onClick={() => this.viewCustomer(customer.id)}
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
