import React from "react";
import LandingPages from "../hoc/LandingPages";
import ImageSlider from "./../components/home-components/ImageSlider";
import AboutHome from "./../components/home-components/AboutHome";
import FoodsHome from "./../components/home-components/FoodsHome";
import RestaurantsHome from "./../components/home-components/RestaurantsHome";
import CityHome from "./../components/home-components/CitiesHome";

const Home = () => {
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
