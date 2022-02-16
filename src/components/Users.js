import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import UserService from "../services/UserService";
import { Card, Table,Pagination } from "react-bootstrap";
import Swal from "sweetalert2";

export default class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
    };
    this.addUser = this.addUser.bind(this);
    this.editUser = this.editUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  //delete one customer
  deleteUser(id) {
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
        UserService.deleteUser(id).then((res) => {
          this.setState({
            users: this.state.users.filter(
              (user) => user.id !== id
            ),
          });
        });
      }
    });
  }

  
  //view one specific customer
  viewUser(id) {
    this.props.history.push(`/view-user/${id}`);
  }

  //edit one specific customer
  editUser(id) {
    this.props.history.push(`/add-user/${id}`);
  }

  //get all users
  componentDidMount() {
   UserService.getUsers().then((res) => {
      this.setState({ users: res.data });
    });
  }

  addUser() {
    this.props.history.push("/add-user/_add");
  }

  render() {
    return (
      <div>
        <div className="container" style={{marginTop: "80px"}}>
          <div className="row mt-2">
          <Card >
          <Card.Body>

              <div className="card-header text-center">
                <h3>LISTADO DE USUARIOS</h3>
              </div>

                <button
                  className="btn btn-primary mb-2 mt-2"
                  onClick={this.addUser}
                >
                  Agregar Usuario
                </button>

                <Table striped bordered hover responsive="sm">
                  <thead>
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">NOMBRE</th>
                      <th scope="col">EMAIL</th>
                      <th scope="col">DIRECCION</th>
                      <th scope="col">TELEFONO</th>
                      <th scope="col">PASSWORD</th>
                      <th scope="col">ACCIONES</th>
                    </tr>
                  </thead>

                  <tbody>
                    {this.state.users.map((user) => (
                      <tr key={user.id}>
                        <th scope="row">{user.id}</th>
                        <td>{user.nombre}</td>
                        <td>{user.email}</td>
                        <td>{user.direccion}</td>
                        <td>{user.telefono}</td>
                        <td>{user.password}</td>
                        <td>
                          <button
                            onClick={() => this.editUser(user.id)}
                            className="btn btn-warning mb-2"
                            style={{ marginLeft: "10px" }}
                          >
                            Editar
                          </button>

                          <button
                            onClick={() => this.deleteUser(user.id)}
                            className="btn btn-danger mb-2"
                            style={{ marginLeft: "10px" }}
                          >
                            Eliminar
                          </button>

                          <button
                            onClick={() => this.viewUser(user.id)}
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
