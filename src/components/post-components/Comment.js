import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import $ from "jquery";
import { toast } from "react-toastify";
import OwnCommentOptions from "../comment-components/OwnCommentOptions";
import OtherCommentOptions from "../comment-components/OtherCommentOptions";
import { unhideComment } from "./../../services/userService";
import { getUser } from "../../store/slices/user";

const Comment = ({ hidden, setPostTrigger, comment, post }) => {
  const [commentOptionClass, setCommentOptionClass] = useState("d-none"); // hides the comment's options, show them only on hover
  const [hiddenCommentClass, setHiddenCommentClass] = useState(""); // shows hidden comments with low opacity
  const { user } = useSelector(getUser);

  useEffect(() => {
    $('[data-toggle-second="tooltip"]').tooltip(); // for data-toggle = tooltip
    const hiddenCommentClass = hidden ? "hidden-comment" : ""; // to show hidden comments as hidden
    setHiddenCommentClass(hiddenCommentClass);
  }, [hidden]);

  const showOptions = () => {
    // function to show comment's option on hover
    const commentOptionClass = "";
    setCommentOptionClass(commentOptionClass);
  };

  const hideOptions = () => {
    // function to hide comment's option on hover out
    const commentOptionClass = "d-none";
    setCommentOptionClass(commentOptionClass);
  };

  const reRenderComment = () => {
    setHiddenCommentClass("hidden-comment");
  };

  const handleUnhide = async () => {
    const response = await unhideComment({
      userId: user._id,
      commentId: comment._id,
    });
    if (response) {
      setPostTrigger((prevState) => !prevState);
      setHiddenCommentClass("");
      toast("Comment unhidden");
    } else {
      toast.error("Error unhiding comment");
    }
  };

  const { commentBy, commentBody, _id } = comment;

  return (
    <>
      <div className="d-flex">
        <div
          className={`d-flex flex-row mb-3 ${hiddenCommentClass}`}
          onMouseEnter={showOptions}
          onMouseLeave={hideOptions}
        >
          <img className="commentPic" src={commentBy.profilePic} alt="" />
          <div className="text-justify comment">
            <NavLink className="userName mr-2" to="/">
              {commentBy.name}
            </NavLink>
            <span>{commentBody}</span>
          </div>
          {!hidden && (
            <i
              className={`${commentOptionClass} fa fa-ellipsis-h my-auto ml-2`}
              id="commentOptions"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              data-toggle-second="tooltip"
              data-placement="top"
              title={
                commentBy._id === user._id
                  ? "Edit or delete comment"
                  : "Hide comment"
              }
            ></i>
          )}
          {commentBy._id === user._id ? (
            <OwnCommentOptions
              comment={_id}
              commentBody={commentBody}
              post={post}
              setPostTrigger={setPostTrigger}
            />
          ) : (
            <OtherCommentOptions
              setPostTrigger={setPostTrigger}
              reRenderComment={reRenderComment}
              commentId={_id}
              hidden={hidden}
            />
          )}
        </div>
        {hidden && (
          <div className="unhide ml-2 text-muted" onClick={handleUnhide}>
            Unhide
          </div>
        )}
      </div>
    </>
  );
};

export default Comment;
