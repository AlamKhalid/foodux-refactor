import React from "react";
import LandingNavbar from "../layouts/LandingNavbar";
import Footer from "../layouts/Footer";

const LandingPages = (Component, isHome = false) => {
  return (props) => (
    <>
      <LandingNavbar isHome={isHome} />
      <Component {...props} />
      <Footer />
    </>
  );
};

export default LandingPages;
