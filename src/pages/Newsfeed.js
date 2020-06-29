import React from "react";
import CreatePost from "../components/posts/CreatePost";
import BothSide from "./../hoc/BothSide";
import WrapWithNav from "./../hoc/WrapWithNav";
// import Posts from "./posts";

const Newsfeed = () => {
  return (
    <>
      <CreatePost />
      {/* <Posts user={user} profile={false} /> */}
    </>
  );
};

export default WrapWithNav(BothSide(Newsfeed));
