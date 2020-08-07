import React from "react";
import LeftSidebar from "./../layouts/LeftSidebar";

const LeftSideOnly = (Component) => {
  return (props) => (
    <div className="container my-3">
      <div className="row">
        <div className="d-none d-lg-block col-lg-3">
          <LeftSidebar />
        </div>
        <div className="col-12 col-lg-9">
          <Component {...props} />
        </div>
      </div>
    </div>
  );
};

export default LeftSideOnly;
