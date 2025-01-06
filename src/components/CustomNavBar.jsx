import React, { useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const CustomNavBar = () => {
  const [expanded, setExpanded] = useState(false);

  const closeNav = () => setExpanded(false);

  return (
    <Navbar
      expand="lg"
      className="custom-navbar"
      variant="dark"
      expanded={expanded}
      sticky="top"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="nav-title" onClick={closeNav}>
          Pixelloop
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="navbarNav"
          onClick={() => setExpanded(!expanded)}
          className="custom-toggler"
        />
        <Navbar.Collapse id="navbarNav">
          <Nav className="me-auto">
            <Link to="/" className="custom-nav-link" onClick={closeNav}>
              Inicio
            </Link>
            <Link to="/categorias" className="custom-nav-link" onClick={closeNav}>
              Categorías
            </Link>
            <Link to="/favoritos" className="custom-nav-link" onClick={closeNav}>
              Favoritos
            </Link>
            <Link to="/contacto" className="custom-nav-link" onClick={closeNav}>
              Contacto
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavBar;
