import React from "react";

const LoadingButton = ({ label }) => {
  return (
    <button class="form-control foodux-btn" type="button" disabled>
      <span
        class="spinner-grow spinner-grow-sm mr-2"
        role="status"
        aria-hidden="true"
      ></span>
      {label}
    </button>
  );
};

export default LoadingButton;
