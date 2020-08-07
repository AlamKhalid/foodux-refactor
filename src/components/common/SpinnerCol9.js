import React from "react";
import DotLoader from "react-spinners/DotLoader";

const Spinner = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "85vh" }}
    >
      <DotLoader size={100} color={"#000"} loading={true} />
    </div>
  );
};

export default Spinner;
