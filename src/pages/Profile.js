import React, { useState, useEffect } from "react";
import _ from "lodash";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MyProfile from "../components/profile-components/MyProfile";
import ProfileNavOption from "../components/profile-components/ProfileNavOption";
import ProfileNav from "../components/profile-components/ProfileNav";
import { getUser } from "../services/userService";
import AboutNavOption from "../components/profile-components/AboutNavOption";
import FollowersNavOption from "../components/profile-components/FollowersNavOption";
import FollowingNavOption from "../components/profile-components/FollowingNavOption";
import Spinner from "../components/common/SpinnerCol9";
import * as obtain from "../store/slices/user";
import WrapWithNav from "../hoc/WrapWithNav";
import LeftSideOnly from "./../hoc/LeftSideOnly";

const Profile = () => {
  const [userProfile, setUserProfile] = useState({});
  const [navProfileActive, setNavProfileActive] = useState(1);
  const [loaded, setLoaded] = useState(true);

  const { user } = useSelector(obtain.getUser);

  const { id } = useParams();

  useEffect(() => {
    const getFullUser = async () => {
      const { data } = await getUser(id);
      if (loaded) setUserProfile(data);
    };
    getFullUser();
    return () => setLoaded(false);
  }, [id, loaded]);

  const refreshProfile = async (id) => {
    const user = userProfile;
    if (id === -1) {
      const { data: userProfile } = await getUser(user._id);
      setUserProfile(userProfile);
    } else if (id !== user._id) {
      const { data: userProfile } = await getUser(id);
      if (loaded) {
        setUserProfile(userProfile);
        setNavProfileActive(1);
      }
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const changeNav = (index) => {
    if (loaded) setNavProfileActive(index);
  };

  let toShow;

  switch (navProfileActive) {
    case 0:
      toShow = (
        <AboutNavOption
          userProfile={userProfile}
          refreshProfile={refreshProfile}
        />
      );
      break;
    case 1:
      toShow = (
        <ProfileNavOption
          userProfile={userProfile}
          refreshProfile={refreshProfile}
        />
      );
      break;
    case 2:
      toShow = (
        <FollowersNavOption
          userProfile={userProfile}
          refreshProfile={refreshProfile}
        />
      );
      break;
    case 3:
      toShow = (
        <FollowingNavOption
          userProfile={userProfile}
          refreshProfile={refreshProfile}
        />
      );
      break;
    default:
  }

  return (
    <>
      {_.isEmpty(userProfile) ? (
        <Spinner />
      ) : (
        <>
          <MyProfile
            userProfile={userProfile}
            profile={userProfile._id === user._id ? false : true}
            refreshProfile={refreshProfile}
          />
          <ProfileNav active={navProfileActive} changeNav={changeNav} />
          {toShow}
        </>
      )}
    </>
  );
};

export default WrapWithNav(LeftSideOnly(Profile));
