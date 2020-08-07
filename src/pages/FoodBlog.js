import React, { useState, useEffect } from "react";
import WrapWithNav from "./../hoc/WrapWithNav";
import LeftSideOnly from "./../hoc/LeftSideOnly";
import BlogPost from "../components/posts/BlogPost";
import Spinner from "../components/common/SpinnerCol9";
import { getPosts } from "../services/blogPostService";

const FoodBlog = () => {
  const [loading, setLoading] = useState(true);
  const [blogPosts, setBlogPosts] = useState([]);
  const [array, setArray] = useState([]);
  const [sub, setSub] = useState([]);

  useEffect(() => {
    const outerWrapper =
      blogPosts.length / 3 !== 1
        ? Math.ceil(blogPosts.length / 3)
        : blogPosts.length / 3;
    const array = [];
    const subitems = [];
    for (let i = 0; i < outerWrapper; i++) {
      array.push(i);
    }
    for (let i = 0; i < blogPosts.length; i += 3) {
      subitems.push(blogPosts.slice(i, i + 3));
    }
    setArray(array);
    setSub(subitems);
  }, [blogPosts]);

  useEffect(() => {
    async function getData() {
      const { data: posts } = await getPosts();
      setBlogPosts(posts);
      setLoading(false);
    }
    getData();
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    array.map((a, i) => (
      <div key={i} className="card-deck mb-3">
        {sub[i].map((s) => (
          <BlogPost key={s._id} post={s} />
        ))}
      </div>
    ))
  );
};

export default WrapWithNav(LeftSideOnly(FoodBlog));
