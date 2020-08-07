import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Post from "./Post";
import { getAllLikedPosts } from "../../services/likeService";
import {
  getHiddenPosts,
  getAllUserPosts,
  getSavedPosts,
} from "../../services/userService";
import { getPosts } from "../../services/postService";
import { getUser } from "../../store/slices/user";
import LoadingSpinner from "./../common/LoadingSpinner";

const Posts = ({ profile, userProfile }) => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [hiddenPosts, setHiddenPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [postsTrigger, setPostsTrigger] = useState(false);

  const { user } = useSelector(getUser);

  useEffect(() => {
    const getData = async () => {
      const { data: posts } = await getPosts();
      const { data: hiddenPosts } = await getHiddenPosts(user._id);
      const { data: savedPosts } = await getSavedPosts(user._id);
      const { data: likedPosts } = await getAllLikedPosts(user._id);
      let userPosts = [];
      if (profile) {
        const { data } = await getAllUserPosts(userProfile._id);
        userPosts = data;
      }
      setSavedPosts(savedPosts);
      setHiddenPosts(hiddenPosts);
      setPosts(posts);
      setLikedPosts(likedPosts);
      setUserPosts(userPosts);
      setLoading(false);
    };
    setLoading(true);
    getData();
  }, [postsTrigger, profile, user, userProfile]);

  let toShowPosts = posts.filter(
    (post) => hiddenPosts.indexOf(post._id) === -1
  );
  if (profile) {
    toShowPosts = toShowPosts.filter(
      (post) => userPosts.indexOf(post._id) > -1
    );
  }

  return loading ? (
    <LoadingSpinner />
  ) : toShowPosts.length > 0 ? (
    toShowPosts.map((post) => (
      <Post
        key={post._id}
        post={post}
        saved={savedPosts.indexOf(post._id) > -1 ? true : false}
        liked={likedPosts.indexOf(post._id) > -1 ? true : false}
        setPostsTrigger={setPostsTrigger}
        profile={profile}
      />
    ))
  ) : (
    <p className="bg-light pt-3 px-3 pb-2 my-2 rounded-lg text-center text-muted">
      No posts to show
    </p>
  );
};

export default Posts;
