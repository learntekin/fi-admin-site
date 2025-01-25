import React from "react";
import firebase from "../../firebase";
import { Link } from "react-router-dom";
import { Button, Input, Form } from "antd";
import "./Register.css"; // Optional: for custom styling

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      error: null,
    };
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleRegister = () => {
    const { email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      this.setState({ error: "Passwords do not match!" });
      return;
    }

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
        const errorMessage = error.message;
        this.setState({ error: errorMessage });
      });
  };

  render() {
    const { email, password, confirmPassword, error } = this.state;

    return (
      <div className="register-container">
        <div className="register-form">
          <h2 className="register">Register</h2>
          <Form
            layout="vertical"
            onFinish={this.handleRegister}
            style={{ maxWidth: 400, margin: "0 auto" }}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please enter a valid email!",
                },
              ]}
            >
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={this.handleInputChange}
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter your password!",
                },
              ]}
            >
              <Input.Password
                type="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={this.handleInputChange}
              />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
              ]}
            >
              <Input.Password
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={this.handleInputChange}
              />
            </Form.Item>

            {error && <p className="text-danger">{error}</p>}

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button type="primary" htmlType="submit" style={{      width: "6rem", // Make button width responsive
                padding: "0px 0px",}}>
                Register
              </Button>
              <Link to="/login">
                <Button
                  type="default"
                  style={{       width: "6rem", // Make button width responsive
                    padding: "0px 0px",}}
                >
                  Login
                </Button>
              </Link>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default Register;
