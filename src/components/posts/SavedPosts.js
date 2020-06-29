import React from "react";
import HorizontalMenu from "../common/horizontalMenu";

const SavedPosts = ({ user }) => {
  return (
    <div
      id="collapseFour"
      className="collapse"
      aria-labelledby="saved-posts"
      data-parent="#accordion"
    >
      <div className="card-body">
        <HorizontalMenu
          id="saved-posts-items"
          items={user.savedPosts}
          label="saved"
        />
      </div>
    </div>
  );
};

export default SavedPosts;
