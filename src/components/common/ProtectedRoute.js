import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUser } from "../../store/slices/user";

const ProtectedRoute = (Component) => {
  const { isAuthenticated } = useSelector(getUser);
  if (!isAuthenticated) return <Redirect to="/" />;

  return (props) => <Component {...props} />;
};

export default ProtectedRoute;
