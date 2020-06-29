import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import LandingPages from "../hoc/LandingPages";
import ImageSlider from "./../components/home-components/ImageSlider";
import AboutHome from "./../components/home-components/AboutHome";
import FoodsHome from "./../components/home-components/FoodsHome";
import RestaurantsHome from "./../components/home-components/RestaurantsHome";
import CityHome from "./../components/home-components/CitiesHome";
import { loadCategories } from "../store/slices/home";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadCategories());
  });

  return (
    <>
      <ImageSlider />
      <div className="container mt-5">
        <AboutHome />
        <RestaurantsHome />
        <FoodsHome />
        <CityHome />
      </div>
    </>
  );
};

export default LandingPages(Home, true);
