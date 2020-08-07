import React, { useState, useEffect } from "react";
import WrapWithNav from "./../hoc/WrapWithNav";
import LeftSideOnly from "./../hoc/LeftSideOnly";
import { getDeals } from "../services/userService";
import { useHistory } from "react-router-dom";

const DealsAndDiscounts = () => {
  const [res, setRes] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const getRes = async () => {
      const { data } = await getDeals();
      setRes(data);
    };
    getRes();
  }, []);

  return res.map((r) =>
    r.posts.length > 0 ? (
      <div className="bg-light px-3 py-4 rounded-lg mb-3">
        <div className="mb-3 d-flex align-items-center">
          <img src={r.profilePic} alt="" className="displayPostPicture" />
          <h5
            className="foodux-link"
            onClick={() => history.push("/restaurant/" + r._id)}
          >
            {r.name}
          </h5>
        </div>
        <Menu items={r.posts} />
      </div>
    ) : null
  );
};

const Menu = ({ items }) => {
  const id = "deals-discounts";
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
  return (
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
                  <img className="card-img-top" src={item.images[0]} alt="" />
                  <div className="card-body">
                    <div className="d-flex">
                      {item.postType === "Deal" ? (
                        <p>
                          Deal on:{" "}
                          <span className="font-weight-bold">
                            {item.dealItems.toString()}
                          </span>{" "}
                          <br />
                          <i className="fa fa-times mr-2"></i>
                          Old Price:{" "}
                          <span className="font-weight-bold">
                            Rs.{item.oldPrice}
                          </span>{" "}
                          <br />
                          <i className="fa fa-check mr-2"></i>New Price:{" "}
                          <span className="font-weight-bold">
                            Rs.{item.dealPrice}
                          </span>{" "}
                          <br />
                          <i className="fa fa-bookmark-o mr-2"></i>Save:{" "}
                          <span className="font-weight-bold">
                            Rs.{item.oldPrice - item.dealPrice}
                          </span>{" "}
                          <br />
                          <span className="font-weight-bold label-2 text-danger">
                            <em>Expires: {item.validTill}</em>
                          </span>
                        </p>
                      ) : (
                        <p>
                          Flat{" "}
                          <span className="font-weight-bold">
                            {item.discount}%
                          </span>{" "}
                          off on{" "}
                          <span className="font-weight-bold">
                            {item.dealItems.toString()}
                          </span>{" "}
                          <br />
                          <span className="font-weight-bold label-2 text-danger">
                            <em>Expires: {item.validTill}</em>
                          </span>
                        </p>
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
  );
};

export default WrapWithNav(LeftSideOnly(DealsAndDiscounts));
