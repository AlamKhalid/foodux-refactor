import React, { useEffect } from "react";
import $ from "jquery";
import { NavLink } from "react-router-dom";
import PostOptions from "../post-components/PostOptions";

const DealPost = ({ post, setPostsTrigger, saved }) => {
  useEffect(() => {
    $('[data-toggle="tooltip"]').tooltip({ html: true });
  }, []);

  const getItems = () => {
    let items = "";
    const useItems = post.dealItems.filter((i, ind) => ind !== 0);
    useItems.forEach(function (item) {
      items += item + "<br/>";
    });
    return items;
  };

  const items = getItems();

  return (
    <>
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <img
            className="displayPostPicture"
            src={post.postBy.profilePic}
            alt=""
          />
          <div className="d-flex flex-column align-items-start">
            <span>
              <NavLink
                className="userName"
                to={`/restaurant/${post.postBy._id}`}
              >
                {post.postBy.name}
              </NavLink>
              {` added a deal`}
            </span>
            <div className="d-flex justify-content-between">
              <span className="mr-3 postDetails text-muted">
                <i className="fa fa-bank"></i>
              </span>
              <span className="text-muted postDetails mr-3">
                <i className="fa fa-calendar mr-1"></i>
                {post.date}
              </span>
              <span className="text-muted postDetails mr-3">
                <i className="fa fa-clock-o mr-1"></i>
                {post.time}
              </span>
              <span className="postDetails text-muted mr-3">
                <i className="fa fa-money mr-1"></i>
                {post.dealPrice}
              </span>

              <span
                className="mr-3 postDetails text-muted"
                data-toggle="tooltip"
                data-placement="top"
                data-original-title={items}
              >
                <i className="fa fa-cutlery mr-1"></i>
                {post.dealItems[0]}
              </span>
            </div>
          </div>
        </div>
        <PostOptions
          post={post}
          setPostsTrigger={setPostsTrigger}
          id="addDeal"
          saved={saved}
        />
      </div>
      <div className="text-left postBody my-3">{post.postBody}</div>
      <div className="d-flex justify-content-between mb-2 flex-column flex-md-row">
        <span>
          <span className="font-weight-bold mr-2">
            <i className="fa fa-times mr-2"></i>Old Price:
          </span>
          Rs. {post.oldPrice}
        </span>
        <span>
          <span className="font-weight-bold mr-2">
            <i className="fa fa-check mr-2"></i>New Price:
          </span>
          Rs. {post.dealPrice}
        </span>
        <span>
          <span className="font-weight-bold mr-2">
            <i className="fa fa-bookmark-o mr-2"></i>Save
          </span>
          Rs. {post.oldPrice - post.dealPrice}
        </span>
      </div>
      <hr />
      <div>
        Valid on
        <span className="font-weight-bold ml-2">{post.validOn}</span>
      </div>
      <div className="mb-3">
        Valid Till
        <span className="font-weight-bold ml-2">{post.validTill}</span>
      </div>
    </>
  );
};

export default DealPost;
