import React from "react";
import { toast } from "react-toastify";
import ConfirmDeleteMarkup from "../markups/ConfirmDeleteMarkup";
import { deleteComment } from "../../services/commentService";
import ConfirmUpdateMarkupComment from "../markups/ConfirmUpdateMarkupComment";

const OwnCommentOptions = ({ comment, post, setPostTrigger, commentBody }) => {
  const handleDelete = async () => {
    const response = await deleteComment({
      commentId: comment,
      postId: post,
    });
    if (response) {
      toast("Comment has been deleted");
      setPostTrigger((prevState) => !prevState);
    } else {
      toast.error("Error deleting comment");
    }
  };

  // returns the own comment options
  return (
    <>
      <div
        className="dropdown-menu overflow-hidden"
        aria-labelledby="commentOptions"
      >
        <span
          className="dropdown-item"
          data-toggle="modal"
          data-target="#confirmUpdateComment"
        >
          <i className="fa fa-pencil mr-2"></i>Edit Comment
        </span>
        <div className="dropdown-divider"></div>
        <span
          className="dropdown-item"
          data-toggle="modal"
          data-target="#confirmDeleteComment"
        >
          <i className="fa fa-trash mr-2"></i>Delete Comment
        </span>
      </div>
      <ConfirmUpdateMarkupComment
        commentBody={commentBody}
        setPostTrigger={setPostTrigger}
        commentId={comment}
        post={post}
      />
      <ConfirmDeleteMarkup
        title="Delete Comment"
        message="Are you sure you want to delete it?"
        id="confirmDeleteComment"
        handleDelete={handleDelete}
      />
    </>
  );
};

export default OwnCommentOptions;
