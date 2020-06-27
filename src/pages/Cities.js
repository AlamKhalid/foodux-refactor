import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import HeadingHome from "../components/home-components/HeadingHome";
import HomeCard from "../components/home-components/HomeCard";
import LandingPages from "../hoc/LandingPages";
import Spinner from "../components/common/Spinner";
import CityImg from "../assets/images/landing/city.png";
import { getHome, loadCities } from "../store/slices/home";

const Cities = () => {
  const { loading, cities } = useSelector(getHome);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCities());
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
    <>
      <img src={CityImg} alt="" className="nav-menu-pic" />
      <div className="container my-5 pt-5">
        <HeadingHome title="Cities" />
        <div className="row mt-4">
          {cities.map((c) => (
            <HomeCard title={c.name} label="" img={c.pic} />
          ))}
        </div>
      </div>
    </>
  );
};

export default LandingPages(Cities);
