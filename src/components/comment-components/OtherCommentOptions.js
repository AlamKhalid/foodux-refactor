import React from "react";
import ConfirmHideMarkup from "../markups/ConfirmHideMarkup";
import { toast } from "react-toastify";
import { hideComment } from "./../../services/userService";
import { useSelector } from "react-redux";
import { getUser } from "../../store/slices/user";

const OtherCommentOptions = ({
  commentId,
  hidden,
  reRenderComment,
  setPostTrigger,
}) => {
  const { user } = useSelector(getUser);

  const handleHide = async () => {
    const response = await hideComment({
      commentId: commentId,
      userId: user._id,
    });
    if (response) {
      setPostTrigger((prevState) => !prevState);
      reRenderComment();
      toast("Comment hidden");
    } else {
      toast.error("Error hiding comment");
    }
  };

  return (
    !hidden && (
      <React.Fragment>
        <div
          className="dropdown-menu overflow-hidden"
          aria-labelledby="commentOptions"
        >
          <span
            className="dropdown-item"
            data-toggle="modal"
            data-target="#confirmHideComment"
          >
            <i className="fa fa-times mr-2"></i>Hide Comment
          </span>
        </div>
        <ConfirmHideMarkup
          title="Hide Comment"
          message="Are you sure you want to hide it?"
          label="Comment"
          handleHide={handleHide}
        />
      </React.Fragment>
    )
  );
};

export default OtherCommentOptions;
