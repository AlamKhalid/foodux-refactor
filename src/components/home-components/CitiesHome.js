import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import HeadingHome from "./HeadingHome";
import HomeCard from "./HomeCard";
import { getHome, loadCities } from "../../store/slices/home";

const CityHome = () => {
  const { loading, cities } = useSelector(getHome);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCities());
  }, [dispatch]);

  return loading ? null : (
    <div className="mt-5 pt-5">
      <HeadingHome title="Cities" />
      <p className="text-center mt-4 px-3 lead">
        Reviews available for restaurants in 10+ cities
      </p>
      <div className="container mt-5">
        <section className="text-center">
          <div className="row">
            {cities.map((c) => (
              <HomeCard
                key={c._id}
                title={c.name}
                label=""
                img={c.profilePic || c.pic}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CityHome;
