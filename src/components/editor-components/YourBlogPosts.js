import React from "react";
import { toast } from "react-toastify";
import ReactHtmlParser from "react-html-parser";
import { deleteBlogPost } from "../../services/blogPostService";

const YourBlogPosts = ({ post, setBody, setEdit, setTitle, setId }) => {
  const handleDelete = async (id) => {
    try {
      await deleteBlogPost(id);
      window.location.reload();
    } catch (ex) {
      toast.error("Error deleting post");
    }
  };

  return (
    <div className="card mb-4">
      <img
        className="card-img-top"
        src={
          post.img
            ? post.img
            : "https://res.cloudinary.com/blogpedia/image/upload/default.png"
        }
        alt=""
      />
      <div className="card-body">
        <h5 className="card-title mb-0">{post.title}</h5>
        <div className="card-text mt-0">
          <span className="label-2 text-muted">Posted on: {post.date}</span>
          <hr />
          {ReactHtmlParser(post.body, {
            transform: (node) => {
              if (node.name === "img") {
                return null;
              }
            },
          })}
          <div className="d-flex w-100 justify-content-between">
            <button
              className="btn btn-warning w-50 br-0 btn-sm"
              onClick={() => {
                setBody(post.body);
                setEdit(true);
                setTitle(post.title);
                setId(post._id);
              }}
            >
              <i className="fa fa-pencil mr-2"></i>
              Edit
            </button>
            <button
              className="btn btn-danger w-50 bl-0 btn-sm"
              onClick={() => handleDelete(post._id)}
            >
              <i className="fa fa-trash mr-2"></i>Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourBlogPosts;
