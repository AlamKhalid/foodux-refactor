import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { updateComment } from "../../services/commentService";

const ConfirmUpdateMarkupComment = ({
  commentBody,
  post,
  setPostTrigger,
  commentId,
}) => {
  const [comment, setComment] = useState("");
  const [editedComment, setEditedComment] = useState("");

  useEffect(() => {
    setComment(commentBody);
    setEditedComment(commentBody);
  }, [commentBody]);

  const handleUpdate = async () => {
    if (editedComment.length > 0) {
      const comment = {
        commentId: commentId,
        postId: post,
        commentBody: editedComment,
      };
      const response = await updateComment(comment);
      if (response) {
        toast("Comment has been updated");
        setComment(editedComment);
        setPostTrigger((prevState) => !prevState);
      } else {
        toast.error("Error editing comment");
      }
    } else {
      toast.error("Comment's length cannot be zero");
    }
  };

  const handleDisable = () => {
    const { editedComment, comment } = this.state;
    if (editedComment === comment) return true;
    if (editedComment.length === 0) return true;
    return false;
  };

  const restoreState = () => {
    setEditedComment(comment);
  };

  return (
    <div
      className="modal fade"
      id="confirmUpdateComment"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="confirmUpdateCommentTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              Edit Comment
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={restoreState}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <textarea
              className="create-post-body h-auto"
              name="editedComment"
              value={editedComment}
              onChange={({ target }) => setEditedComment(target.value)}
            ></textarea>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={restoreState}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-warning"
              data-dismiss="modal"
              disabled={handleDisable()}
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmUpdateMarkupComment;
