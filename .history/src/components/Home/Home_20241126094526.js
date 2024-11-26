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
