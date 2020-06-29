import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUser } from "../../store/slices/user";

const ProtectedRoute = ({ component: Component, render, ...rest }) => {
  const { isAuthenticated } = useSelector(getUser);

  if (!isAuthenticated) return <Redirect to="/" />;

  return (
    <Route
      {...rest}
      render={(props) => (Component ? <Component {...props} /> : render(props))}
    />
  );
};

export default ProtectedRoute;
