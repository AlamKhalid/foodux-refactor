import React from "react";

const LoadingButton = ({ label }) => {
  return (
    <button className="form-control foodux-btn" type="button" disabled>
      <span
        className="spinner-grow spinner-grow-sm mr-2"
        role="status"
        aria-hidden="true"
      ></span>
      {label}
    </button>
  );
};

export default LoadingButton;
