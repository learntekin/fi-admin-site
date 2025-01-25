import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import "../../App.css";
import NAVIE from "./Navbar";
import Sidebar from "./Sidebar/Sidebar";
import { Navigate } from "react-router";
import Contact from "../Contact/Contact";
import Careers from "../Contact/Careers";
import FAQ from "../FAQ/FAQ";
import { fetchCounts } from "../../components/actions/actions"; // Action to fetch the counts

class Home extends Component {
  componentDidMount() {
    const { fetchCounts } = this.props;
    fetchCounts(); // Fetch counts for Careers, Contact, and FAQ
  }

  render() {
    const { user, counts } = this.props;

    if (!user) {
      return <Navigate to="/login" />;
    }

    return (
      <div className="home-layout">
        <Helmet>
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
          {/* Display the data counts in a grid */}
          
          <div className="grid-container">
            
            <div className="grid-item">
              <h3>Careers</h3>
              <p>{counts.careersCount}</p>
            </div>
            <div className="grid-item">
              <h3>Contact</h3>
              <p>{counts.contactCount}</p>
            </div>
            <div className="grid-item">
              <h3>FAQ</h3>
              <p>{counts.faqCount}</p>
            </div>
          </div>

          {/* Routing for different pages */}
          <Switch>
            <Route path="/contact" component={Contact} />
            <Route path="/careers" component={Careers} />
            <Route path="/FAQ" component={FAQ} />
      
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  counts: state.home.counts, // Map the counts from Redux state
});

const mapDispatchToProps = (dispatch) => ({
  fetchCounts: () => dispatch(fetchCounts()), // Dispatch action to fetch counts
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
