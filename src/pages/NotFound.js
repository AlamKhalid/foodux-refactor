import React from "react";
import { useHistory } from "react-router-dom";

const NotFound = () => {
  const history = useHistory();
  return (
    <div className="container mt-5 text-center">
      <h1 className="text-uppercase mb-3 font-weight-bolder">page not found</h1>
      <p>Sorry! It seems that page you are looking for does not exist.</p>
      <button
        className="btn foodux-btn btn-lg"
        onClick={() => history.push("/")}
      >
        <i className=" fa fa-chevron-left mr-2"></i>Home
      </button>
    </div>
  );
};

export default NotFound;
