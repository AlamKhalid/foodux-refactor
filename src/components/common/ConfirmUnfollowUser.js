import React from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { stopFollowing } from "./../../services/userService";
import { getUser } from "../../store/slices/user";

const ConfirmUnfollowUser = ({ visitedUser }) => {
  const { user } = useSelector(getUser);

  const handleUnfollow = async () => {
    const response = await stopFollowing(user._id, {
      userId: visitedUser._id,
    });
    if (response) {
      window.location.reload();
    } else {
      toast.error("Error unfollowing the user");
    }
  };

  return (
    <div
      className="modal fade"
      id="confirmUnfollow"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="confirmUnfollowTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{`Unfollowing ${visitedUser.name}`}</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            Are you sure you want to unfollow
            <span className="font-weight-bold">{` ${visitedUser.name}?`}</span>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-warning"
              data-dismiss="modal"
              onClick={handleUnfollow}
            >
              Unfollow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmUnfollowUser;
