import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {AC_LIST_FAQ} from '../actions/contact'

import { TabTitle } from '../util/DynamicTab';
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
}
componentDidMount() {

    this.props.AC_LIST_FAQ();
   
}

  render() {
    TabTitle('Dashboard');
    // Get the data from the Reducer
    var Faq=this.props.faqsReducer.faqList;

    return (
      <div class="main-panel" >
        <div class="content-wrapper cw-main" style={{ background: 'white' }} >
          <div class="page-header">
            <h3 class="page-title">
              <span class="page-title-icon bg-gradient-primary text-white me-2">
                <i class="mdi mdi-home"></i>
              </span> Dashboard
            </h3>
            <nav aria-label="breadcrumb">
              <ul class="breadcrumb">
                <li class="breadcrumb-item active" aria-current="page">
                  <span></span>Overview <i class="mdi mdi-alert-circle-outline icon-sm text-primary align-middle"></i>
                </li>
              </ul>
            </nav>
          </div>
          <div class="row">
            <div class="col-md-4 stretch-card bck-color grid-margin">
              <Link to="/listFaq" style={{ textDecoration: 'none' }}>
                <div class="card bg-gradient-danger card-img-holder text-white">
                  <div class="card-body">
                    <img src="assets/images/dashboard/circle.svg" class="card-img-absolute" alt="circle-image" />
                    <h4 class="font-weight-normal mb-3">Contact Management <i class="mdi mdi-chart-line mdi-24px float-right"></i>
                    </h4>
                    <h2 class="mb-5">{Faq.length}</h2>
                  </div>
                </div>
              </Link>
            </div>
            </div>
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  console.log('map state', state);
  return {
      faqsReducer: state.FAQ_Reducer,
      
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({AC_LIST_FAQ}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);