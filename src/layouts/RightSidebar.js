import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getFeaturedRestaurants } from "./../services/userService";

const RightSidebar = () => {
  const [res, setRes] = useState([]);

  useEffect(() => {
    const getRes = async () => {
      const { data } = await getFeaturedRestaurants();
      setRes(data);
    };
    getRes();
  }, []);

  return (
    <div className="fixed">
      <h6 className="text-center right-box">Featured Restaurants</h6>
      <div className="d-flex flex-column w-100">
        {res.map((r) => (
          <RestaurantCard
            src={r.profilePic}
            text={`Serves: ${r.serves.map((s, i) => `${s.name}`)}`}
            key={r._id}
            link={`/restaurant/${r._id}`}
          />
        ))}
      </div>
    </div>
  );
};

const RestaurantCard = ({ src, text, link }) => {
  const history = useHistory();

  return (
    <div className="card rounded-lg mb-3">
      <img className="card-img-top" src={src} alt="" />
      <div className="card-body">
        <p className="card-text">{text}</p>
        <span
          className="foodux-link font-weight-bold"
          onClick={() => history.push(link)}
        >
          Visit Restaurant
        </span>
      </div>
    </div>
  );
};

export default RightSidebar;
