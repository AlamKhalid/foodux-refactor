import React from "react";
import { useSelector } from 'react-redux';
import OtherPostOptions from "../post-components/OthersPostOptions";
import OwnPostOptions from "../post-components/OwnPostOptions";
import { getUser } from "../../store/slices/user";

const PostOptions = ({post, setPostsTrigger, id}) => {

    const {user} = useSelector(getUser);
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
          <OwnPostOptions
            post={post}
            setPostsTrigger={setPostsTrigger}
            id={id}
          />
        ) : (
          <OtherPostOptions
            postId={post._id}
            setPostsTrigger={setPostsTrigger}
          />
        )}
      </div>
    );
  }
}

export default PostOptions;
