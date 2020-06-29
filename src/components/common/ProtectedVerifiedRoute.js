import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUser } from "../../store/slices/user";
import { detailsFilled } from "../../services/userService";
import Spinner from "./Spinner";

const ProtectedVerifiedRoute = ({ component: Component, render, ...rest }) => {
  const [isDetails, setIsDetails] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, user } = useSelector(getUser);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    async function verifyUser() {
      if (isAuthenticated) {
        const { data: detail } = await detailsFilled(user._id);
        if (isMounted) {
          setIsDetails(detail);
          setLoading(false);
        }
      } else {
        if (isMounted) setLoading(false);
      }
    }
    verifyUser();
  }, [isAuthenticated, user._id, isMounted]);

  if (!isAuthenticated) return <Redirect to="/" />;

  return loading ? (
    <Spinner />
  ) : isDetails ? (
    <Route
      {...rest}
      render={(props) => (Component ? <Component {...props} /> : render(props))}
    />
  ) : (
    <Redirect to="/verify" />
  );
};

export default ProtectedVerifiedRoute;
