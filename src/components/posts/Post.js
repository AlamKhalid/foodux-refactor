import React, { useState, useEffect, useRef } from "react";
import { useSelector } from 'react-redux';
import $ from "jquery";
import Comment from "../post-components/Comment";
import AddComment from "../post-components/AddComment";
import PostButtons from "../post-components/PostButtons";
import { getPost } from "../../services/postService";
import { getHiddenComments } from "./../../services/userService";
import ReviewPost from "../post-type/ReviewPost";
import DealPost from "../post-type/DealPost";
import DiscountPost from "../post-type/DiscountPost";
import AnnouncementPost from "../post-type/AnnouncementPost";
import RecommendationAskPost from "../post-type/RecommendationAskPost";
import WhatPost from "../post-type/WhatPost";
import ImageInPosts from "../post-components/ImagesInPost";
import { getUser } from "../../store/slices/user";

const Post = ({post, liked, profile, setPostsTrigger}) => {
    const commentInputRef = useRef(null);
    const [comments, setComments] = useState([]); // stores the comments array on a single post
    const [hiddenComments, setHiddenComments] = useState([]); // stores the hidden comments ids for a single user
    const [likes, setLikes] = useState([]); // stores the likes array for a single post
    const [postTrigger, setPostTrigger] = useState(false);
    const {user} = useSelector(getUser);

  useEffect(() => {
    const { data: hiddenComments } = await getHiddenComments(user._id);
    setComments(post.comments);
    setLikes(post.likes);
    setHiddenComments(hiddenComments);
    $('[data-toggle="tooltip"]').tooltip({ html: true });
  }, []);

  useEffect(() => {
    const updatePost = async () => {
        // re-render the post if a user either likes it or comments on it to show real-time changes
        const { data: post } = await getPost(post._id);
        let hiddenComments = [];
        const { data } = await getHiddenComments(user._id);
        hiddenComments = data;
        setComments(post.comments);
        setLikes(post.likes);
        setHiddenComments(hiddenComments);
      };
      updatePost();
  }, [postTrigger]); 

  // function to get the names of all likers of a post, to show them as tooltip
  const getLikesName = () => {
    const { likes } = this.state;
    let likers = "",
      counter = 0;
    // only shows 5 likers, rest remaining as numbers
    this.state.likes.forEach(function (like) {
      if (counter < 5) {
        likers += like.name + "<br/>";
        counter++;
      }
    });
    if (likes.length > 5) likers += "and" + (likes.length - 5) + " more...";
    return likers;
  };

  // function to get the names of all commentators of a post, to show them as tooltip
  const getCommentsName = () => {
    const { comments } = this.state || [];
    let commentators = "",
      ids = [],
      counter = 0;
    // only shows 5 commentators, rest remaining as numbers
    comments.forEach(function (comment) {
      // show unique commentators names, by matching the ids
      if (ids.indexOf(comment.commentBy._id) === -1 && counter < 5) {
        commentators += comment.commentBy.name + "<br/>";
        ids.push(comment.commentBy._id);
        counter++;
      }
    });
    if (comments.length > 5 && counter >= 5)
      commentators += "and " + (comments.length - 5) + " more...";
    return commentators;
  };

 
    const likers = getLikesName();
    const commentators = getCommentsName();

    return (
      <div className="bg-light pt-3 px-3 pb-2 my-2 rounded-lg">
        {post.postType === "Review" && (
          <ReviewPost
            setPostsTrigger={setPostsTrigger}
            post={post} 
          />
        )}
        {post.postType === "Deal" && (
          <DealPost
            setPostsTrigger={setPostsTrigger}
            post={post}
          />
        )}
        {post.postType === "Discount" && (
          <DiscountPost
            setPostsTrigger={setPostsTrigger}
            post={post}
            
          />
        )}
        {post.postType === "Announcement" && (
          <AnnouncementPost
            setPostsTrigger={setPostsTrigger}
            post={post}
            
          />
        )}
        {post.postType === "Recommendation" && (
          <RecommendationAskPost
            setPostsTrigger={setPostsTrigger}
            post={post}
          />
        )}
        {post.postType === "What" && (
          <WhatPost
            setPostsTrigger={setPostsTrigger}
            post={post}   
          />
        )}
        <ImageInPosts images={post.images} />
        <div className="d-flex justify-content-between mb-2">
          <span
            className="text-muted postLikeComment"
            role="button"
            data-toggle="tooltip"
            data-placement="top"
            data-original-title={likers}
          >
            {likes.length} Likes
          </span>
          <span
            className="text-muted postLikeComment"
            role="button"
            data-toggle="tooltip"
            data-placement="top"
            data-original-title={commentators}
          >
            {comments.length} Comments
          </span>
        </div>
        <PostButtons
          commentInputRef={this.commentInputRef}
          postId={post._id}
          liked={liked}
          setPostTrigger={setPostTrigger}
        />
        {comments.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            post={post._id}
            hidden={hiddenComments.indexOf(comment._id) > -1 ? true : false}
            setPostTrigger={setPostTrigger}
          />
        ))}
        <AddComment
          commentInputRef={commentInputRef}
          postId={post._id}
          setPostTrigger={setPostTrigger}
          userPic={profile ? user.profilePic : user.pic}
        />
      </div>
    );
}

export default Post;
