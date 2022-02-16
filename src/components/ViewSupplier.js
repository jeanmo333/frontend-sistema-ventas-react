import React, { Component } from "react";
import SupplierService from "../services/SupplierService.js";

export default class ViewCustomer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      supplier: {},
    };
  }

  componentDidMount() {
    SupplierService.getSupplierById(this.state.id).then((res) => {
      this.setState({ supplier: res.data });
    });
  }

  back() {
    this.props.history.push("/suppliers");
  }

  render() {
    return (
      <div>
        <div className="card col-md-6 offset-md-3" style={{marginTop: "80px"}}>
          <h3 className="text-center">Detalle del Proveedor - {this.state.supplier.nombre}</h3>
          <div className="card-body">

            <div className="row mt-3">
              <label>Email</label>
              <div>{this.state.supplier.email}</div>
            </div>

            <div className="row mt-3">
              <label>Direccion</label>
              <div>{this.state.supplier.direccion}</div>
            </div>

            <div className="row mt-3">
              <label>Telefono</label>
              <div>{this.state.supplier.telefono}</div>
            </div>

            <div className="row mt-3">
              <label>Web</label>
              <div>{this.state.supplier.web}</div>
            </div>

            <div className="row mt-3">
              <button
                className="btn btn-info"
                onClick={this.back.bind(this)}
                style={{ marginLeft: "0px"}}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
