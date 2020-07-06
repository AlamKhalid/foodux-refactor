import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { like, unlike } from "../../services/likeService";
import { getUser } from "../../store/slices/user";

const PostButtons = ({ liked, postId, setPostTrigger, commentInputRef }) => {
  const [likeBtnClass, setLikeBtnClass] = useState("");
  const { user } = useSelector(getUser);

  useEffect(() => {
    let likeBtnClass = "";
    if (liked) likeBtnClass = " app-color";
    else likeBtnClass = "-o";
    setLikeBtnClass(likeBtnClass);
  }, [liked]);

  const handleLike = async () => {
    setLikeBtnClass(likeBtnClass === "-o" ? " app-color" : "-o");
    let response;
    const body = {
      postId: postId,
      userId: user._id,
      isRestaurant: user.isRestaurant,
    };
    if (likeBtnClass === "-o") {
      response = await like(body);
      if (!response) toast.error("Error liking post");
    } else {
      response = await unlike(body);
      if (!response) toast.error("Error unliking post");
    }
    setPostTrigger((prevState) => !prevState);
  };

  const handleFocus = () => {
    commentInputRef.current.focus();
  };

  return (
    <div className="d-flex justify-content-around postBtns mb-2">
      <span className="postBtn" onClick={handleLike}>
        <i className={`fa mr-3 fa-heart${likeBtnClass}`}></i>Like
      </span>
      <span className="postBtn" onClick={handleFocus}>
        <i className="fa fa-comment-o mr-3"></i>Add on
      </span>
    </div>
  );
};

export default PostButtons;
