import React from "react";
import { toast } from "react-toastify";
import { hidePost } from "../../services/userService";
import ConfirmHideMarkup from "../markups/ConfirmHideMarkup";
import { useSelector } from "react-redux";
import { getUser } from "../../store/slices/user";

const OthersPostOptions = ({ postId, setPostTrigger }) => {
  const { user } = useSelector(getUser);

  const handleHide = async () => {
    const body = { userId: user._id, postId: postId };
    const response = await hidePost(body);
    if (response) {
      setPostTrigger((prevState) => !prevState);
      toast.info("Post hidden successfully");
    } else {
      toast.error("Error hiding post");
    }
  };

  // returns the post options that are posted by others

  return (
    <>
      <div
        className="dropdown-menu overflow-hidden"
        aria-labelledby="postOptions"
      >
        <span className="dropdown-item">
          <i className="fa fa-bookmark-o mr-2"></i>Save Post
        </span>
        <span
          className="dropdown-item"
          data-toggle="modal"
          data-target="#confirmHidePost"
        >
          <i className="fa fa-eye-slash mr-2"></i>Hide Post
        </span>
        <div className="dropdown-divider"></div>
        <span className="dropdown-item">
          <i className="fa fa-ban mr-2"></i>Unfollow User
        </span>
      </div>
      <ConfirmHideMarkup
        title="Hide Post"
        message="Are you sure you want to hide it?"
        handleHide={handleHide}
        label="Post"
      />{" "}
    </>
  );
};

export default OthersPostOptions;
