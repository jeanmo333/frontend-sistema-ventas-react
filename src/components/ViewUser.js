


import React, { Component } from "react";
import UserService from "../services/UserService.js";

export default class ViewUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      user: {},
    };
  }

  componentDidMount() {
    UserService.getUserById(this.state.id).then((res) => {
      this.setState({ user: res.data });
    });
  }

  back() {
    this.props.history.push("/users");
  }

  render() {
    return (
      <div>
        <div className="card col-md-6 offset-md-3" style={{marginTop: "80px"}}>
          <h3 className="text-center">Detalle del Usuario - {this.state.user.nombre}</h3>
          <div className="card-body">

            <div className="row mt-3">
              <label>Email</label>
              <div>{this.state.user.email}</div>
            </div>

            <div className="row mt-3">
              <label>Direccion</label>
              <div>{this.state.user.direccion}</div>
            </div>

            <div className="row mt-3">
              <label>Telefono</label>
              <div>{this.state.user.telefono}</div>
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
