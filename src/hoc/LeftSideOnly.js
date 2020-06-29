import React from "react";
import LeftSidebar from "./../layouts/LeftSidebar";

const LeftSideOnly = (Component) => {
  return (props) => (
    <div className="container my-3">
      <div className="row">
        <div className="col-3">
          <LeftSidebar />
        </div>
        <div className="col-9">
          <Component {...props} />
        </div>
      </div>
    </div>
  );
};

export default LeftSideOnly;
