import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import FillDetails from "./FillDetails";
import Spinner from "./../common/Spinner";
import { getUser } from "../../store/slices/user";
import { detailsFilled } from "./../../services/userService";

const Verified = () => {
  const [loading, setLoading] = useState(true);
  const [fillDetails, setFillDetails] = useState(false);
  const [showDetailsPage, setShowDetailsPage] = useState(false);

  const { user } = useSelector(getUser);

  useEffect(() => {
    async function checkDetailsFilled() {
      const { data: response } = await detailsFilled(user._id);
      setFillDetails(response);
      setLoading(false);
    }
    checkDetailsFilled();
  });

  return loading ? (
    <Spinner />
  ) : (
    <>
      {showDetailsPage ? (
        <FillDetails />
      ) : (
        <>
          <div className="text-center">
            <i
              style={{ color: "#7aed7d" }}
              className="fa fa-check-circle i-lg"
            ></i>
            <h2 className="text-uppercase">your email has been verified</h2>
          </div>
          <br />
          {fillDetails ? (
            <div className="text-center">
              <NavLink className="btn foodux-btn" to="/newsfeed">
                Newsfeed<i className="fa fa-chevron-right ml-3"></i>
              </NavLink>
            </div>
          ) : (
            <h5
              className="text-center text-uppercase foodux-link"
              onClick={() => {
                setShowDetailsPage(true);
              }}
            >
              click here to get started
            </h5>
          )}
        </>
      )}
    </>
  );
};

export default Verified;
