import React from "react";
import { useSelector } from "react-redux";
import OtherPostOptions from "./OtherPostOptions";
import OwnPostOptions from "./OwnPostOptions";
import { getUser } from "../../store/slices/user";

const PostOptions = ({ post, setPostsTrigger, id, saved }) => {
  const { user } = useSelector(getUser);
  const { postBy } = post;

  return (
    <div>
      <i
        className="fa fa-ellipsis-v text-muted"
        id="postOptions"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      ></i>
      {postBy._id === user._id ? (
        <OwnPostOptions post={post} setPostsTrigger={setPostsTrigger} id={id} />
      ) : (
        <OtherPostOptions
          postId={post._id}
          setPostsTrigger={setPostsTrigger}
          saved={saved}
        />
      )}
    </div>
  );
};

export default PostOptions;
