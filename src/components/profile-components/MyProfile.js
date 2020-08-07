import React, { useState, useEffect } from "react";
import $ from "jquery";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import FollowButton from "../common/FollowButton";
import ConfirmUnfollowUser from "../common/ConfirmUnfollowUser";
import { getFollowing } from "../../services/userService";
import { getUser } from "../../store/slices/user";

const MyProfile = ({ userProfile, profile, refreshProfile }) => {
  const [settingsClass, setSettingsClass] = useState("text-muted");
  const [following, setFollowing] = useState(false);

  const history = useHistory();

  const { user } = useSelector(getUser);

  useEffect(() => {
    $('[data-toggle="tooltip"]').tooltip({ trigger: "hover" });
  }, []);

  useEffect(() => {
    const updateUser = async () => {
      const { data: obj } = await getFollowing(user._id);
      if (obj.following.find((item) => item._id === userProfile._id)) {
        setFollowing(true);
      }
    };
    updateUser();
  }, [userProfile, following, settingsClass, user._id]);

  const handleClick = () => {
    history.push(
      user.isRestaurant
        ? `/restaurant/${userProfile._id}/settings`
        : `/user/${userProfile._id}/settings`
    );
  };

  const handleFocus = () => {
    const settingsClass = "";
    setSettingsClass(settingsClass);
  };

  const handleBlur = () => {
    const settingsClass = "text-muted";
    setSettingsClass(settingsClass);
  };

  const isUserEmpty = _.isEmpty(userProfile);
  return (
    <>
      <div className="d-flex justify-content-between bg-light rounded-lg p-3 mb-2">
        <div className="d-flex">
          <div className="profile-pic-div">
            <img className="profile-pic" src={userProfile.profilePic} alt="" />
          </div>
          <div className="d-flex flex-column ml-4">
            <span className="profile-name">
              {isUserEmpty ? "" : userProfile.name}
            </span>
            <span>Posts: {isUserEmpty ? 0 : userProfile.posts.length}</span>
            <span>
              Followers: {isUserEmpty ? 0 : userProfile.followers.length}
            </span>
            <span className="mb-2">
              Following: {isUserEmpty ? 0 : userProfile.following.length}
            </span>
            {profile && (
              <FollowButton
                following={following}
                visitedUser={userProfile}
                refreshProfile={refreshProfile}
              />
            )}
          </div>
        </div>
        {!profile && (
          <i
            className={`fa fa-cog fa-2x mr-4 ${settingsClass}`}
            onMouseEnter={handleFocus}
            onMouseLeave={handleBlur}
            data-toggle="tooltip"
            data-placement="top"
            title="Settings"
            onClick={handleClick}
          ></i>
        )}
      </div>
      {profile && (
        <ConfirmUnfollowUser
          visitedUser={userProfile}
          refreshProfile={refreshProfile}
        />
      )}
    </>
  );
};

export default MyProfile;
