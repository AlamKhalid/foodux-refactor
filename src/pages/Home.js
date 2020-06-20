import React from "react";
import LandingPages from "../hoc/LandingPages";
import ImageSlider from "./../components/home-components/ImageSlider";
import AboutHome from "./../components/home-components/AboutHome";

const Home = () => {
  return (
    <>
      <ImageSlider />
      <div className="container mt-5">
        <AboutHome />
        {/* <RestaurantsHome />
        <FoodsHome />
        <CityHome /> */}
      </div>
    </>
  );
};

export default LandingPages(Home, true);
