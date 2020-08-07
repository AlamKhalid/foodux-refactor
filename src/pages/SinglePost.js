import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Post from "../components/posts/Post";
import { getPost } from "../services/postService";
import Spinner from "../components/common/SpinnerCol9";
import WrapWithNav from "./../hoc/WrapWithNav";
import LeftSideOnly from "./../hoc/LeftSideOnly";
import { getSavedPosts } from "./../services/userService";
import AddReview from "../components/popups/AddReview";
import AddDeal from "../components/popups/AddDeal";
import AddAnnouncement from "../components/popups/AddAnnouncement";
import AskRecommendation from "../components/popups/AskRecommendation";
import WhatYouCanEat from "../components/popups/WhatYouCanEat";
import { useSelector } from "react-redux";
import { getUser } from "../store/slices/user";
import { getAllLikedPosts } from "./../services/likeService";

const SinglePost = () => {
  const [loading, setLoading] = useState(true);
  const [savedPosts, setSavedPost] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [trigger, setTrigger] = useState(true);
  const [post, setPost] = useState({});

  const { id } = useParams();
  const { user } = useSelector(getUser);

  useEffect(() => {
    const getData = async () => {
      const { data } = await getPost(id);
      const { data: sPosts } = await getSavedPosts(user._id);
      const { data: lPosts } = await getAllLikedPosts(user._id);
      setPost(data);
      setSavedPost(sPosts);
      setLikedPosts(lPosts);
      setLoading(false);
    };
    getData();
  }, [id, trigger, user._id]);

  return loading ? (
    <Spinner />
  ) : (
    <>
      <Post
        post={post}
        saved={savedPosts.indexOf(post._id) > -1 ? true : false}
        liked={likedPosts.indexOf(post._id) > -1 ? true : false}
        setPostsTrigger={() => setTrigger((t) => !t)}
        profile={false}
      />
      {user.isRestaurant ? (
        <>
          <AddDeal />
          <AddAnnouncement />{" "}
        </>
      ) : (
        <>
          {" "}
          <AddReview />
          <AskRecommendation />
          <WhatYouCanEat />
        </>
      )}
    </>
  );
};

export default WrapWithNav(LeftSideOnly(SinglePost));
