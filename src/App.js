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
import addFaqs from './components/Contact/addContact';
import ListFaq from './components/Contact/listContact';
import editFaq from './components/Contact/editContact';
import viewFaq from './components/Contact/viewContact';


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
      
      <Route exact path="/addFaq" component={addFaqs}/>
      <Route exact path="/listFaq" component={ListFaq}/>
      <Route exact path='/editFaq/:id' component={editFaq}/>
      <Route exact path='/viewFaq/:id' component={viewFaq}/>

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
