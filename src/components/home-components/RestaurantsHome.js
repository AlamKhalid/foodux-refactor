import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import HeadingHome from "./HeadingHome";
import HomeCard from "./HomeCard";
import { loadRestaurants, getHome } from "../../store/slices/home";

const RestaurantsHome = () => {
  const { loading, restaurants } = useSelector(getHome);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadRestaurants());
  }, [dispatch]);

  return loading ? null : (
    <div className="mt-5 pt-5">
      <HeadingHome title="Restaurants" />
      <p className="text-center mt-4 px-3 lead">
        Enjoy your favourite meal with over 100+ restaurants along with
        exclusive deals
      </p>
      <div className="container mt-5">
        <section className="text-center">
          <div className="row">
            {restaurants.map((r) => (
              <HomeCard
                key={r._id}
                title={r.name}
                label=""
                img={r.profilePic}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default RestaurantsHome;
