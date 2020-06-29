import React from "react";
import LeftSidebar from "./../layouts/LeftSidebar";
import RightSidebar from "./../layouts/RightSidebar";

const BothSide = (Component) => {
  return (props) => (
    <div className="container-fluid container-lg my-3">
      <div className="row">
        <div className="d-none d-lg-block col-lg-3">
          <LeftSidebar />
        </div>
        <div className="col-12 col-md-8 col-lg-6">
          <Component {...props} />
        </div>
        <div className="d-none d-md-block col-md-4 col-lg-3">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};

export default BothSide;
