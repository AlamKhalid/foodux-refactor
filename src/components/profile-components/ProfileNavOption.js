import React from "react";
import ProfileAbout from "./ProfileAbout";
import CreatePost from "../posts/CreatePost";
import Posts from "../posts/Posts";
import ProfileRestaurantVisited from "./ProfileRestaurantVisited";
import { useSelector } from "react-redux";
import { getUser } from "../../store/slices/user";

const ProfileNavOption = ({ userProfile }) => {
  const { user } = useSelector(getUser);
  return (
    userProfile._id && (
      <div className="row">
        <div className="d-none col-lg-4 d-lg-flex flex-column">
          <ProfileAbout userProfile={userProfile} />
          <ProfileRestaurantVisited userProfile={userProfile} />
        </div>
        <div className="col-12 col-lg-8">
          {userProfile._id === user._id && <CreatePost />}
          <Posts userProfile={userProfile} profile={true} />
        </div>
      </div>
    )
  );
};

export default ProfileNavOption;
