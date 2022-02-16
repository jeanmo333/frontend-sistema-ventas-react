import React, { Component } from "react";
import { Navbar } from "react-bootstrap";

export default class Footer extends Component {
  render() {
    return (
      <div>
        <Navbar className="fixed-bottom" expand="lg" bg="dark" variant="dark">
          <footer className="footer">
            <span className="text-muted">todo derecho reservado 2022</span>
          </footer>
        </Navbar>
      </div>
    );
  }
}
