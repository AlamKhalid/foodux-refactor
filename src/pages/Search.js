import React, { useState, useEffect } from "react";
import _ from "lodash";
import WrapWithNav from "./../hoc/WrapWithNav";
import LeftSideOnly from "./../hoc/LeftSideOnly";
import { useLocation, NavLink } from "react-router-dom";
import { getSearchResult } from "../services/postService";
import Spinner from "./../components/common/SpinnerCol9";

const Search = () => {
  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const value = location.search.substring(1).split("=");

  useEffect(() => {
    const getResult = async () => {
      const { data } = await getSearchResult(value[1]);
      setResult(data);
      setLoading(false);
    };
    getResult();
  }, [value]);

  return loading ? (
    <Spinner />
  ) : !_.isEmpty(result) ? (
    <>
      <div className="bg-light px-3 py-4 rounded-lg mb-3">
        <h4 className="foodux-link text-center mb-5">Users</h4>
        <Menu items={result.users} id="search-users" type="user" />
      </div>
      <div className="bg-light px-3 py-4 rounded-lg mb-3">
        <h4 className="foodux-link text-center mb-5">Posts</h4>
        <Menu items={result.posts} id="search-posts" type="post" />
      </div>
    </>
  ) : null;
};

const Menu = ({ items, id, type }) => {
  const outerWrapper =
    items.length / 4 !== 1 ? Math.ceil(items.length / 4) : items.length / 4;
  const array = [];
  const subitems = [];
  for (let i = 0; i < outerWrapper; i++) {
    array.push(i);
  }
  for (let i = 0; i < items.length; i += 4) {
    subitems.push(items.slice(i, i + 4));
  }

  return items.length > 0 ? (
    <div
      id={id}
      className="carousel slide carousel-multi-item"
      data-ride="carousel"
    >
      <div className="carousel-inner" role="listbox">
        {array.map((i) => (
          <div className={`carousel-item${i === 0 ? " active" : ""}`} key={i}>
            {subitems[i].map((item) => (
              <div
                className="col-md-3"
                key={item._id}
                style={{ float: "left" }}
              >
                <div className="card mb-2">
                  <img
                    className="card-img-top"
                    src={item.profilePic || item.images[0]}
                    alt=""
                  />
                  <div className="card-body">
                    <div className="d-flex">
                      {type === "user" ? (
                        <div>
                          <h5 className="card-title">{item.name}</h5>
                          <i
                            className={`mr-3 text-small fa fa-${
                              item.isRestaurant ? "bank" : "user"
                            }`}
                          ></i>
                          <NavLink
                            className="foodux-link"
                            to={`/user/${item._id}`}
                          >
                            View Profile
                          </NavLink>
                        </div>
                      ) : (
                        <div>
                          <div className="d-flex align-items-center">
                            <img
                              src={item.postBy.profilePic}
                              alt=""
                              className="displayPostPicture"
                            />
                            <span className="userName">{item.postBy.name}</span>
                          </div>
                          <br />
                          <div className="text-center">
                            <NavLink
                              className="foodux-link"
                              to={`/post/${item._id}`}
                            >
                              View Post
                            </NavLink>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      {items.length > 4 && (
        <div className="mt-3 text-center controls-top">
          <a className="mr-4" href={`#${id}`} data-slide="prev">
            <i className="fa fa-chevron-left"></i>
          </a>
          <a className="" href={`#${id}`} data-slide="next">
            <i className="fa fa-chevron-right"></i>
          </a>
        </div>
      )}
    </div>
  ) : (
    <p className="text-center">No {type}s found.</p>
  );
};

export default WrapWithNav(LeftSideOnly(Search));
