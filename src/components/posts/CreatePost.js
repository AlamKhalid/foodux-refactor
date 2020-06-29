import React from "react";
import { useSelector } from "react-redux";
import AddReview from "../popups/AddReview";
import AddDeal from "../popups/AddDeal";
import AddAnnouncement from "../popups/AddAnnouncement";
import AskRecommendation from "../popups/AskRecommendation";
import WhatYouCanEat from "../popups/WhatYouCanEat";
import { getUser } from "../../store/slices/user";

const CreatePost = () => {
  const { user } = useSelector(getUser);

  return user.isRestaurant ? (
    <>
      <div className="bg-light p-2 rounded-lg">
        <h6 className="text-left text-muted py-1 pl-2">Add Post</h6>
        <div className="create-post-body d-flex align-items-center justify-content-around">
          <span
            className="foodux-link"
            data-toggle="modal"
            data-target="#addDeal"
          >
            Add a Deal/Discount
          </span>
          <span>|</span>
          <span
            className="foodux-link"
            data-toggle="modal"
            data-target="#addAnnouncement"
          >
            Make Announcement
          </span>
        </div>
      </div>
      <AddDeal />
      <AddAnnouncement />
    </>
  ) : (
    <>
      <div className="bg-light p-2 rounded-lg">
        <h6 className="text-left text-muted py-1 pl-2">Create Post</h6>
        <div className="create-post-body d-flex align-items-center justify-content-between">
          <span
            className="foodux-link"
            data-toggle="modal"
            data-target="#addReview"
          >
            Add Review
          </span>
          <span>|</span>
          <span
            className="foodux-link"
            data-toggle="modal"
            data-target="#addRecommendation"
          >
            Ask Recommendations
          </span>
          <span>|</span>
          <span
            className="foodux-link"
            data-toggle="modal"
            data-target="#addWhat"
          >
            What you can eat in?
          </span>
        </div>
      </div>
      <AddReview />
      <AskRecommendation />
      <WhatYouCanEat />
    </>
  );
};

export default CreatePost;
