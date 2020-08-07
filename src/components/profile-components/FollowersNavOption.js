import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import OtherProfileCard from "../common/OtherProfileCard";
import { getFollowers, getFollowing } from "../../services/userService";
import { getUser } from "../../store/slices/user";

const FollowersNavOption = ({ userProfile, refreshProfile }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [followers, setFollowers] = useState([]);
  const [currentUserFollowing, setCurrentUserFollowing] = useState([]);
  const [shortlisted, setShortlisted] = useState([]);
  const [searchVal, setSearchVal] = useState("");

  const { user } = useSelector(getUser);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    async function getData() {
      if (isMounted) {
        const { data: obj1 } = await getFollowers(userProfile._id);
        const { data: obj2 } = await getFollowing(user._id);
        setFollowers(obj1.followers);
        setCurrentUserFollowing(obj2.following);
        setLoading(false);
      }
    }
    setLoading(true);
    getData();
  }, [userProfile, user, isMounted]);

  useEffect(() => {
    if (searchVal.length > 0) {
      const condition = new RegExp(searchVal);
      setShortlisted(
        followers.filter(function (el) {
          return condition.test(el.name);
        })
      );
    }
  }, [searchVal, followers]);

  let useArray;
  if (searchVal.length > 0) useArray = shortlisted;
  else useArray = followers;

  return loading ? (
    <div className="text-center mt-5">
      <div className="spinner-grow mb-3" role="status"></div>
      <div>Loading Followers...</div>
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
            {useArray.map((follower) => (
              <OtherProfileCard
                key={follower._id}
                visitedUser={follower}
                refreshProfile={refreshProfile}
                following={currentUserFollowing.find(
                  (item) => item._id === follower._id
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
          No followers to show
        </p>
      )}
    </React.Fragment>
  );
};

export default FollowersNavOption;
