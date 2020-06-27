import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import HeadingHome from "../components/home-components/HeadingHome";
import HomeCard from "../components/home-components/HomeCard";
import LandingPages from "../hoc/LandingPages";
import Spinner from "../components/common/Spinner";
import ResImg from "../assets/images/landing/res.png";
import { getHome, loadRestaurants } from "../store/slices/home";

const Restaurants = () => {
  const { loading, restaurants } = useSelector(getHome);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadRestaurants());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <React.Fragment>
      <img src={ResImg} alt="" className="nav-menu-pic" />
      <div className="container my-5 pt-5">
        <HeadingHome title="Restaurants" />
        <div className="row mt-4">
          {restaurants.map((r) => (
            <HomeCard title={r.name} label="" img={r.profilePic} />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default LandingPages(Restaurants);
