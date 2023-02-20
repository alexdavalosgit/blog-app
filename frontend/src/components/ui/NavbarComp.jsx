import React, { useState, useContext } from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authcontext/AuthContext";
import { baseAPI } from "../../utils";

export default function NavbarComp() {
  const { user, dispatch } = useContext(AuthContext);

  const handleLogout = async () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>Blog App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            {user ? (
              <Nav.Link as={Link} to="/write">
                Write
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>
            )}
            {user ? (
              <Nav.Link disabled>
                <span>{user["username"]}</span>
              </Nav.Link>
            ) : (
              ""
            )}
            {user ? (
              <Button variant="dark" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button as={Link} to="/login" variant="dark">
                Login
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
