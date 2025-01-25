import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import "../../App.css";
import NAVIE from "./Navbar";
import Sidebar from "./Sidebar/Sidebar";
import { Navigate } from "react-router";
import Contact from "../Contact/Contact"; // Import the Contact component
import Careers from "../Contact/Careers";
import FAQ from "../FAQ/FAQ";

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
          {/* Use Switch to render different components based on the route */}
          <Switch>
            <Route path="/contact" component={Contact} />
            <Route path="/careers" component={Careers} />
Q" component={FAQ} />
            <Route path="/" render={() => <h1>Welcome to Home Page</h1>} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Home);
