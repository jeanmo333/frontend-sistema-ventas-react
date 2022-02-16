import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SaleService from "../services/SaleService.js";
import { Card, Table} from "react-bootstrap";
import Swal from "sweetalert2";

export default class Sale extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sales : []     
    };
    this.addSale = this.addSale.bind(this);
    this.editSale = this.editSale.bind(this);
    this.deleteSale = this.deleteSale.bind(this);
   
  }


  //delete one sale
  deleteSale(id) {
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
        SaleService.deleteSale(id).then((res) => {
          this.setState({
            sales: this.state.sales.filter((sale) => sale.id !== id),
          });
        });
      }
    });
  }

  //view one specific sale
  viewSale(id) {
    this.props.history.push(`/view-sale/${id}`);
  }

  //edit one specific sale
  editSale(id) {
    this.props.history.push(`/add-sale/${id}`);
  }

  //get all sales
  componentDidMount() {
      this.setState({ sales: JSON.parse(localStorage.getItem('sales'))});
    
  }

  addSale() {
    this.props.history.push("/add-sale/_add");
  }

  render() {
    return (

        <div className="container" style={{ marginTop: "80px" }}>
          <div className="row mt-2">
{/**
 *    <div className="col-3">
              <Card>
                <Card.Body>
                  <div className="card-header text-center">
                    <h3>Datos De La Venta</h3>
                  </div>

                  <button
                    className="btn btn-primary mt-2 mb-3"
                    onClick={this.addSale}
                  >
                    Agregar Venta
                  </button>

                  <form>
                  <div className="form-group">
                    <label>Nombre Cliente</label>
                    <input
                      type="text"
                      name="nombreCli"
                      className="form-control"
                      value={this.state.nombre_pli}
                      onChange={this.changeNombre_proHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label>Nombre Producto</label>
                    <input
                      type="text"
                      name="nombre"
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
                    className="btn btn-info"
                    onClick={this.reset}
                    style={{ marginTop: "10px" }}
                  >
                    Limpiar
                  </button>
                
                </form>
                </Card.Body>
              </Card>
            </div>
 */}
       



            <div className="col-12">
              <Card>
                <Card.Body>
                  <div className="card-header text-center">
                    <h3>LISTADO DE VENTA</h3>
                  </div>

                  <button
                    className="btn btn-primary mt-2 mb-2"
                    onClick={this.addSale}
                  >
                    Agregar Venta
                  </button>

                  <Table striped bordered hover responsive="sm">
                    <thead className="dark">
                      <tr>
                        <th>ID</th>
                        <th>NOMBRE CLIENTE</th>
                        <th>NOMBRE PRODUCTO</th>
                        <th>PRECIO</th>
                        <th>CANTIDAD</th>
                        <th>ACCIONES</th>
                      </tr>
                    </thead>

                    <tbody>
                      {this.state.sales.forEach((sale) => (

                        <tr>
                          <td>{sale.item}</td>
                          <td>{sale.nombre_cli}</td>
                          <td>{sale.nombre_pro}</td>
                          <td>{sale.precio}</td>
                          <td>{sale.cantidad}</td>
                          <td>
                            <button
                              onClick={() => this.editSale(sale.id)}
                              className="btn btn-warning mb-2"
                              style={{ marginLeft: "10px" }}
                            >
                              Editar
                            </button>

                            <button
                              onClick={() => this.deleteSale(sale.id)}
                              className="btn btn-danger mb-2"
                              style={{ marginLeft: "10px" }}
                            >
                              Eliminar
                            </button>

                            <button
                              onClick={() => this.viewSale(sale.id)}
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

                  <button
                    className="btn btn-primary mt-2 mb-2"
                    //onClick={this.addSale}
                  >
                    General Venta
                  </button>
                </Card.Body>
              </Card>
            </div>
      
          </div>
        </div>
    );
  }
}
