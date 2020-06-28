import React from "react";
import Popup from "../../hoc/Popup";

const SignupOptions = () => {
  return (
    <>
      <button
        className="btn foodux-btn"
        data-dismiss="modal"
        aria-label="Close"
        data-toggle="modal"
        data-target="#signup"
      >
        Sign Up as User <i className="fa fa-user"></i>
      </button>
      <button
        className="btn foodux-btn"
        data-dismiss="modal"
        aria-label="Close"
        data-toggle="modal"
        data-target="#signup-res"
      >
        Sign Up as Restaurant <i className="fa fa-bank"></i>
      </button>
    </>
  );
};

export default Popup(
  SignupOptions,
  "choose option",
  "choose-option",
  "d-flex justify-content-around",
  false
);
