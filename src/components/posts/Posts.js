import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Post from "./Post";
import { getAllLikedPosts } from "../../services/likeService";
import { getHiddenPosts, getAllUserPosts } from "../../services/userService";
import { getPosts } from "../../services/postService";
import { getUser } from "../../store/slices/user";

const Posts = ({ profile }) => {
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [hiddenPosts, setHiddenPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [postsTrigger, setPostsTrigger] = useState(false);
  const [loaded, setLoaded] = useState(true);

  const { user } = useSelector(getUser);

  useEffect(() => {
    const getData = async () => {
      const { data: posts } = await getPosts();
      const { data: hiddenPosts } = await getHiddenPosts(user._id);
      const { data: likedPosts } = await getAllLikedPosts(user._id);
      let userPosts = [];
      if (profile) {
        const { data } = await getAllUserPosts(user._id);
        userPosts = data;
      }
      if (loaded) {
        setHiddenPosts(hiddenPosts);
        setPosts(posts);
        setLikedPosts(likedPosts);
        setUserPosts(userPosts);
      }
    };
    getData();
    return () => setLoaded(false);
  }, [postsTrigger]);

  let toShowPosts = posts.filter(
    (post) => hiddenPosts.indexOf(post._id) === -1
  );
  if (profile) {
    toShowPostsPosts = toShowPosts.filter(
      (post) => userPosts.indexOf(post._id) > -1
    );
  }

  return toShowPosts.length > 0 ? (
    toShowPosts.map((post) => (
      <Post
        key={post._id}
        post={post}
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
