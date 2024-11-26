 
import './App.css';
import Home from './components/Home/Home';
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import { AuthProvider } from "./components/auth/authContext";
import ProtectedRoute from "./components/auth/protectedRoute";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import cont
   function App() {
    return (
      <div classname="App">
        <AuthProvider>
          <Router>
            <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <ProtectedRoute path="/home" component={Home} />
            <ProtectedRoute path="/" component={Home} />

            </Switch>
          </Router>
        </AuthProvider>
      
 
      </div>
      );
   }

  export default App;
 
