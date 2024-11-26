import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import "../../App.css";
import NAVIE from "./Navbar";
import Sidebar from "./Sidebar/Sidebar";
import { Navigate } from "react-router";

class Home extends Component {
  render() {
    const { user } = this.props;

    if (!user) {
      return <Navigate to="/login" />;
    }

    return (
      <div className="home-layout">
        <Helmet>
          {/* Add your script tags here */}
          <script src="assets/vendor/purecounter/purecounter.js"></script>
          <script src="assets/vendor/aos/aos.js"></script>
          <script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
          <script src="assets/vendor/glightbox/js/glightbox.min.js"></script>
          <script src="assets/vendor/isotope-layout/isotope.pkgd.min.js"></script>
          <script src="assets/vendor/swiper/swiper-bundle.min.js"></script>
          <script src="assets/vendor/php-email-form/validate.js"></script>
          <script src="assets/js/main.js" type="text/javascript"></script>
        </Helmet>
        <Sidebar />
        <NAVIE />
        <div className="main-content">
         
          <h1>Welcome to Home Page</h1>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

import './App.css';
import React from "react";
import Home from './components/Home/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Contact from './components/Contact/Contact';
import { AuthProvider } from "./components/auth/authContext";
import ProtectedRoute from "./components/auth/protectedRoute";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Switch>
            {/* Public Routes */}
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/contact" component={Contact} />

            {/* Protected Routes */}
            <ProtectedRoute path="/home" component={Home} />
            <ProtectedRoute path="/" component={Home} />
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
export default connect(mapStateToProps)(Home);
