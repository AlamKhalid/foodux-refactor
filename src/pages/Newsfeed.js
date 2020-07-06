import React from "react";
import CreatePost from "../components/posts/CreatePost";
import BothSide from "./../hoc/BothSide";
import WrapWithNav from "./../hoc/WrapWithNav";
import Posts from "../components/posts/Posts";

const Newsfeed = () => {
  return (
    <>
      <CreatePost />
      <Posts profile={false} />
    </>
  );
};

export default WrapWithNav(BothSide(Newsfeed));
