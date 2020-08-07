import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import OtherProfileCard from "../common/OtherProfileCard";
import { getFollowing } from "../../services/userService";
import { getUser } from "../../store/slices/user";

const FollowingNavOption = ({ userProfile, refreshProfile }) => {
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserFollowing, setCurrentUserFollowing] = useState([]);
  const [shortlisted, setShortlisted] = useState([]);
  const [searchVal, setSearchVal] = useState("");

  const { user } = useSelector(getUser);

  useEffect(() => {
    async function getData() {
      const { data: obj1 } = await getFollowing(userProfile._id);
      if (userProfile._id !== user._id) {
        const { data: obj2 } = await getFollowing(user._id);
        setCurrentUserFollowing(obj2.following);
      } else {
        setCurrentUserFollowing(obj1.following);
      }
      setFollowing(obj1.following);
      setLoading(false);
    }
    setLoading(true);
    getData();
  }, [userProfile, user]);

  useEffect(() => {
    if (searchVal.length > 0) {
      const condition = new RegExp(searchVal);
      setShortlisted(
        following.filter(function (el) {
          return condition.test(el.name);
        })
      );
    }
  }, [searchVal, following]);

  let useArray;
  if (searchVal.length > 0) useArray = shortlisted;
  else useArray = following;

  return loading ? (
    <div className="text-center mt-5">
      <div className="spinner-grow mb-2" role="status"></div>
      <div>Loading Followings...</div>
    </div>
  ) : (
    <React.Fragment>
      <input
        value={searchVal}
        onChange={({ target }) => setSearchVal(target.value)}
        type="text"
        className="search-icon mt-1 w-sm-100"
        placeholder="Search user..."
      />
      {useArray.length > 0 ? (
        <React.Fragment>
          <div className="row mx-2 mt-2">
            {useArray.map((follow) => (
              <OtherProfileCard
                key={follow._id}
                visitedUser={follow}
                refreshProfile={refreshProfile}
                following={currentUserFollowing.find(
                  (item) => item._id === follow._id
                )}
              />
            ))}
          </div>
        </React.Fragment>
      ) : searchVal.length > 0 ? (
        <p className="bg-light pt-3 px-3 pb-2 my-3 rounded-lg text-center text-muted">
          No such user found...
        </p>
      ) : (
        <p className="bg-light pt-3 px-3 pb-2 my-3 rounded-lg text-center text-muted">
          {userProfile._id === user._id
            ? "You are following 0 users"
            : `${userProfile.name} is following 0 users`}
        </p>
      )}
    </React.Fragment>
  );
};

export default FollowingNavOption;
