 
import './App.css';
import Home from './components/Home/Home';
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import { AuthProvider } from "./components/auth/authContext";
import Contact from './components/Contact/Contact';
import ProtectedRoute from "./components/auth/protectedRoute";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
   function App() {
    return (
      <div classname="App">
        <AuthProvider>
          <Router>
            <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
  
 
            <ProtectedRoute path="/contact" component={Contact} />

            </Switch>
          </Router>
        </AuthProvider>
      
 
      </div>
      );
   }

  export default App;
 
