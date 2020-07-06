import React from "react";
import { toast } from "react-toastify";
import ConfirmDeleteMarkup from "../markups/ConfirmDeleteMarkup";
import { deletePost } from "../../services/postService";
import { useSelector } from "react-redux";
import { getUser } from "../../store/slices/user";

const OwnPostOptions = ({ post, setPostsTrigger, id }) => {
  const { user } = useSelector(getUser);

  const handleDelete = async () => {
    let response;

    response = await deletePost({
      userId: user._id,
      postId: post._id,
    });

    if (response) {
      toast("Post has been deleted");
      setPostsTrigger((prevState) => !prevState);
    } else {
      toast.error("Error deleting post");
    }
  };

  return (
    <>
      <div
        className="dropdown-menu overflow-hidden"
        aria-labelledby="postOptions"
      >
        <span
          className="dropdown-item"
          data-toggle="modal"
          data-target={`#${id}`}
          onClick={() => localStorage.setItem("post", JSON.stringify(post))}
        >
          <i className="fa fa-pencil mr-2"></i>Edit Post
        </span>
        <div className="dropdown-divider"></div>
        <span
          className="dropdown-item"
          data-toggle="modal"
          data-target="#confirmDeletePost"
        >
          <i className="fa fa-trash mr-2"></i>Delete Post
        </span>
      </div>
      <ConfirmDeleteMarkup
        title="Delete Post"
        message="Are you sure you want to delete it?"
        id="confirmDeletePost"
        handleDelete={handleDelete}
      />
    </>
  );
};

export default OwnPostOptions;
