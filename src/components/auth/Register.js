import React from "react";
import firebase from "../../firebase";
import { Link } from "react-router-dom";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: null,
    };
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleRegister = () => {
    const { email, password } = this.state;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Registration successful
        const user = userCredential.user;
        // Additional logic or database operations
      })
      .catch((error) => {
        // Registration failed
        const errorCode = error.code;
        const errorMessage = error.message;
        this.setState({ error: errorMessage });
      });
  };

  render() {
    const { email, password, confirmPassword,error } = this.state;

    return (
      <div className="container-fluid" style={{margin:"10rem"}}>
        <h2>Register</h2>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            className="form-control"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={this.handleInputChange}
          />
        </div>
        <button className="btn btn-primary" onClick={this.handleRegister}>
          Register
        </button>
        {error && <p className="text-danger">{error}</p>}
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    );
  }
}

export default Register;
