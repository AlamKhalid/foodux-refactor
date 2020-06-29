import React from "react";
import Navbar from "./../layouts/Navbar";

const WrapWithNav = (Component) => {
  return (props) => (
    <>
      <Navbar />
      <Component {...props} />
    </>
  );
};

export default WrapWithNav;
