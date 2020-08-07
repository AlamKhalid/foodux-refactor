import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import FollowButton from "./FollowButton";
import ConfirmUnfollowUser from "./ConfirmUnfollowUser";
import { getUser } from "../../store/slices/user";

const OtherProfileCard = ({ following, visitedUser, refreshProfile }) => {
  const { user } = useSelector(getUser);

  return (
    <React.Fragment>
      <div className="col-6 col-md-3 card">
        <img
          className="card-img-top mt-2"
          src={visitedUser.profilePic}
          alt=""
        />
        <div className="card-body text-center">
          <h5 className="card-title">{visitedUser.name}</h5>
          {user._id !== visitedUser._id && (
            <FollowButton
              following={following}
              visitedUser={visitedUser}
              refreshProfile={refreshProfile}
            />
          )}
          <br />
          <NavLink
            className="foodux-link"
            to={`/user/${visitedUser._id}`}
            onClick={() => {
              refreshProfile(user._id);
            }}
          >
            View Profile
          </NavLink>
        </div>
      </div>
      <ConfirmUnfollowUser
        visitedUser={visitedUser}
        refreshProfile={refreshProfile}
      />
    </React.Fragment>
  );
};

export default OtherProfileCard;
