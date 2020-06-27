import React from "react";

// importing the images for slider
import city from "../../assets/images/home/city.jpeg";
import restaurant from "../../assets/images/home/restaurant.jpeg";
import food from "../../assets/images/home/food.jpeg";

const ImageSlider = () => {
  return (
    <div id="imageSlider" className="carousel slide" data-ride="carousel">
      <div className="overlay"></div>
      <ol className="carousel-indicators">
        <li
          data-target="#imageSlider"
          data-slide-to="0"
          className="active"
        ></li>
        <li data-target="#imageSlider" data-slide-to="1"></li>
        <li data-target="#imageSlider" data-slide-to="2"></li>
      </ol>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img className="d-block w-100 landing-img" src={restaurant} alt="" />
          <div className="carousel-caption d-none d-md-block">
            <h5 style={{ color: "white" }}>Restaurants</h5>
            <p>Eat in over 1000+ cafes with exclusive discounts and reviews</p>
          </div>
        </div>
        <div className="carousel-item">
          <img className="d-block w-100 landing-img" src={food} alt="" />
          <div className="carousel-caption d-none d-md-block">
            <h5 style={{ color: "white" }}>Food</h5>
            <p>Grab on to your favourite food in reasonable price</p>
          </div>
        </div>
        <div className="carousel-item">
          <img className="d-block w-100 landing-img" src={city} alt="" />
          <div className="carousel-caption d-none d-md-block">
            <h5 style={{ color: "white" }}>City</h5>
            <p>
              Find anything to eat around the city with any amount in your
              pocket
            </p>
          </div>
        </div>
      </div>
      <a
        className="carousel-control-prev"
        href="#imageSlider"
        role="button"
        data-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href="#imageSlider"
        role="button"
        data-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
};

export default ImageSlider;
