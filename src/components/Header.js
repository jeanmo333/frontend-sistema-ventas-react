import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";

export default class Header extends Component {
  render() {
    return (
      <div>
        <Navbar
          className="fixed-top nav-bar"
          collapseOnSelect
          expand="lg"
          bg="dark"
          variant="dark"
        >
          <Container>
            <Navbar.Brand>BEL MAYORISTA</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">


                <Nav.Link as={Link} to="/home">
                  HOME
                </Nav.Link>

                <Nav.Link as={Link} to="/customers">
                  CLIENTES
                </Nav.Link>

                <Nav.Link as={Link} to="/products">
                  PRODUCTOS
                </Nav.Link>

                <Nav.Link as={Link} to="/suppliers">
                  PROVEEDORES
                </Nav.Link>

                <Nav.Link as={Link} to="/sales">
                  VENTA
                </Nav.Link>

                <Nav.Link as={Link} to="/settings">
                  CONFIG
                </Nav.Link>

                <Nav.Link as={Link} to="/users">
                  USUARIOS
                </Nav.Link>
              </Nav>

              <Nav>
              <Nav.Link as={Link} to="/">
                  Login
                </Nav.Link>

                <NavDropdown title="moril@jean" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}
