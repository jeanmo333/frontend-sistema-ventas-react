import React, { Component } from "react";
import ProductService from "../services/ProductService.js";

export default class ViewProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      product: {},
    };
  }

  componentDidMount() {
    ProductService.getProductById(this.state.id).then((res) => {
      this.setState({ product: res.data });
    });
  }

  back() {
    this.props.history.push("/products");
  }

  render() {
    return (
      <div>
        <div className="card col-md-6 offset-md-3" style={{marginTop: "80px"}}>
          <h3 className="text-center">{ `Detalle del producto: ${this.state.product.nombre}`}</h3>
          <div className="card-body">

            <div className="row mt-3">
              <label>Precio</label>
              <div>{this.state.product.precio}</div>
            </div>

            <div className="row mt-3">
              <label>Stock</label>
              <div>{this.state.product.cantidad}</div>
            </div>

            <div className="row mt-3">
              <label>Estado</label>
              <div>{this.state.product.estado}</div>
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
