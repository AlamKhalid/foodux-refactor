import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import HeadingHome from "../components/home-components/HeadingHome";
import HomeCard from "../components/home-components/HomeCard";
import LandingPages from "../hoc/LandingPages";
import Spinner from "../components/common/Spinner";
import FoodImg from "../assets/images/landing/food.png";
import { getHome, loadFoods } from "../store/slices/home";

const Foods = () => {
  const { loading, foods } = useSelector(getHome);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadFoods());
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
      <img src={FoodImg} alt="" className="nav-menu-pic" />
      <div className="container my-5 pt-5">
        <HeadingHome title="Foods" />
        <div className="row mt-4">
          {foods.map((f) => (
            <HomeCard title={f.name} label="" img={f.profilePic} />
          ))}
        </div>
      </div>
    </>
  );
};

export default LandingPages(Foods);
