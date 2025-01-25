import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import firebase from "../../firebase";
import "./nabar.css";

const NAVIE = () => {
  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Logout successful
        console.log("Logout successful");
      })
      .catch((error) => {
        // Handle logout errors
        console.error("Logout error:", error);
      });
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg "
        bg="dark"
        variant="dark"
        fixed="top"
      >
        <Container className="container-fluid">
          <Nav.Link href="#hero">
            {" "}
            <Navbar.Brand>
              <Link to="/" className="navbar-brand">
                <img
                  src=".\assets\img\logo.png"
                  width="50"
                  height="50"
                  style={{
                    position: "relative",
                    right: "1rem",
                    top: "-0.3rem",
                  }}
                  className="d-inline-block align-top ml-8"
                  alt="React Bootstrap logo"
                />
              </Link>
            </Navbar.Brand>
          </Nav.Link>

          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            className="ms-auto m-2 float-sm-left  float-md-left float-lg-left float-xl-left"
          />

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#hero" className="logo">
                <Link className="nav-link" to="/">
                  <h1 className="logo">
                    <Link className="nav-link" to="/">
                      <h6>
                        Finance Frenzy <br />{" "}
                        <span
                          style={{
                            fontSize: "6.5px",
                            color: "white",
                            fontWeight: "bolder",
                          }}
                        >
                          We help build your Dream!
                        </span>{" "}
                      </h6>{" "}
                    </Link>
                  </h1>
                </Link>
              </Nav.Link>

              <Nav.Link href="#logout">
                <Link className="nav-link" onClick={handleLogout} to="/logout">
                  <h5>Logout</h5>
                </Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <></>
    </>
  );
};

export default NAVIE;
