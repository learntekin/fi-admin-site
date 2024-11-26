// ProtectedRoute.js
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from './authContext'; // You'll need to create an AuthContext

function ProtectedRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth(); // Use your AuthContext to get the current user

  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

export default ProtectedRoute;
