import React from "react";
import WrapWithNav from "./../hoc/WrapWithNav";
import LeftSideOnly from "./../hoc/LeftSideOnly";

const DealsAndDiscounts = () => {
  return <h1>This will be featuring deals soon!</h1>;
};

export default WrapWithNav(LeftSideOnly(DealsAndDiscounts));
