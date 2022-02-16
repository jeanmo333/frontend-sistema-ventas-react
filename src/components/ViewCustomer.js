import React, { Component } from "react";
import CustomerService from "../services/CustomerService";

export default class ViewCustomer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      customer: {},
    };
  }

  componentDidMount() {
    CustomerService.getCustomerById(this.state.id).then((res) => {
      this.setState({ customer: res.data });
    });
  }

  back() {
    this.props.history.push("/customers");
  }

  render() {
    return (
      <div>
        <div className="card col-md-6 offset-md-3" style={{marginTop: "80px"}}>
          <h3 className="text-center">{ `Detalle del cliente: ${this.state.customer.nombre} - ${this.state.customer.apellido}`}</h3>
          <div className="card-body">

            <div className="row mt-3">
              <label>Email</label>
              <div>{this.state.customer.email}</div>
            </div>

            <div className="row mt-3">
              <label>Direccion</label>
              <div>{this.state.customer.direccion}</div>
            </div>

            <div className="row mt-3">
              <label>Telefono</label>
              <div>{this.state.customer.telefono}</div>
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
