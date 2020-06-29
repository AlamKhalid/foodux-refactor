import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Spinner from "../components/common/Spinner";
import { logoutUser } from "../store/slices/user";

const Logout = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(logoutUser());
    setTimeout(() => history.replace("/"), 1000);
  }, [dispatch, history]);

  return <Spinner />;
};

export default Logout;
