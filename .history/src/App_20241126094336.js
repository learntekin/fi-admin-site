import React from "react";
import "./App.css";
import Home from "./components/Home/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { AuthProvider } from "./components/auth/authContext";
import Contact from "./components/Contact/Contact";
import ProtectedRoute from "./components/auth/protectedRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Contact Route */}
            <Route path="/contact" element={<Contact />} />

            {/* Protected Routes */}
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
