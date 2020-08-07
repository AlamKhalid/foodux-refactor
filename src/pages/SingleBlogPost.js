import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import HeadingHome from "../components/home-components/HeadingHome";
import WrapWithNav from "./../hoc/WrapWithNav";
import LeftSideOnly from "./../hoc/LeftSideOnly";
import { getSinglePost } from "./../services/blogPostService";
import Spinner from "./../components/common/SpinnerCol9";

const SingleBlogPost = () => {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const getPost = async () => {
      const { data: post } = await getSinglePost(id);
      setPost(post);
      setLoading(false);
    };
    getPost();
  }, [id]);

  return loading ? (
    <Spinner />
  ) : (
    <div className="p-4 bg-white rounded-lg">
      <HeadingHome title={post.title} />
      <br />
      <div className="d-flex justify-content-between w-100">
        <div>
          <span>Posted On: </span>
          <span className="font-weight-bolder foodux-link">{post.date}</span>
        </div>
        <div>
          <span>Posted By: </span>
          <span className="font-weight-bolder foodux-link">
            {post.postedBy.name}
          </span>
        </div>
      </div>
      <hr />
      {ReactHtmlParser(post.body, {
        transform: (node) => {
          if (node.name === "img") {
            return null;
          }
        },
      })}
    </div>
  );
};

export default WrapWithNav(LeftSideOnly(SingleBlogPost));
