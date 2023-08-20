import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Sidebar from './components/layouts/sidebar';
import Navbar from './components/layouts/navbar'
// import Footer from './components/layouts/footer';
import Dashboard from './components/layouts/dashboard';

//Login Component
// import Login from './components/login/login';

// Faq Management
import listContact from './components/Contact/listContact';
import addContact from './components/Contact/addContact';
import viewContact from './components/Contact/viewContact';
import editContact from './components/Contact/editContact';

// Dynamic Tab Changes

import {TabTitle} from './components/util/DynamicTab'
class App extends React.Component {
  constructor(props) {
    super(props);
   
  }
  render(){
    TabTitle('Admin Panel');
  return (
    <Router>
    <div class="container-scroller">
      <Navbar/>
      <div class="container-fluid page-body-wrapper">
      <Sidebar/>
      <Switch>
      <Route exact path="/" component={Dashboard}/>
      
      <Route exact path="/addContact" component={addContact}/>
      <Route exact path="/listContact" component={listContact}/>
      <Route exact path='/eidtContact/:id' component={editContact}/>
      <Route exact path='/viewContact/:id' component={viewContact}/>

      <Route exact path="/" component={Dashboard}/>
      </Switch>
      </div>
      {/* <Footer/> */}
    </div>
    </Router>
  );
    }
}
export default App;
