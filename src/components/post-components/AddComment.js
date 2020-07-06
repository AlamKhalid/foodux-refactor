import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { postComment } from "../../services/commentService";
import { getUser } from "../../store/slices/user";

const AddComment = ({ postId, commentInputRef, setPostTrigger, userPic }) => {
  const [enterCommentBtnClass, setEnterCommentBtnClass] = useState("d-none"); // specifies the class for enter comment button which is paper-plane
  const [commentBody, setCommentBody] = useState(""); // the comment that user enters in the comment textbox
  const { user } = useSelector(getUser);
  const handleFocus = () => {
    // to handle focus of comment textbox, displays the paper-plane button on focus
    let enterCommentBtnClass = "";
    setEnterCommentBtnClass(enterCommentBtnClass);
  };

  const handleBlur = () => {
    // to handle focusOut of comment textbox, paper-plane disappears if commentBody's length is equal to 0
    if (commentBody.length === 0) {
      const enterCommentBtnClass = "d-none";
      setEnterCommentBtnClass(enterCommentBtnClass);
    }
  };

  const handleKeyDown = (e) => {
    // for user's convenience, can also press enter to submit comment along with pressing paper-plane button
    if (e.key === "Enter") {
      handleClick();
    }
  };

  // handle submit comment event upon either clicking paper-plane or by pressing Enter button
  const handleClick = async () => {
    // checks for valid commentBody length
    if (commentBody.length > 0) {
      const comment = {
        commentBody: commentBody,
        postId: postId,
        userId: user._id,
      }; // defines the comment object with necessary keys to be send to backend server
      const response = await postComment(comment); // call backend to post comment
      if (response) {
        // updating the state and re-render the post
        const commentBody = "";
        const enterCommentBtnClass = "d-none";
        setCommentBody(commentBody);
        setEnterCommentBtnClass(enterCommentBtnClass);
        setPostTrigger((prevState) => !prevState);
        toast("Comment added successfully");
      } else {
        // toast any error if there is a problem submitting the comment
        toast.error("Error adding comment");
      }
    }
  };

  return (
    <div className="d-flex flex-row">
      <img className="commentPic" src={userPic} alt="" />
      <input
        className="commentField mr-2"
        ref={commentInputRef}
        type="text"
        name="commentBody"
        value={commentBody}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        placeholder="Add a comment..."
      />
      <i
        className={`mt-2 fa fa-paper-plane ${enterCommentBtnClass}`}
        onClick={handleClick}
      ></i>
    </div>
  );
};

export default AddComment;
