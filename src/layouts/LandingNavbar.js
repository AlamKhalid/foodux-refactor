import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "../components/popups/Login";
import SignUp from "../components/popups/Signup";
import SignUpOptions from "../components/popups/SignupOptions";
import SignUpRes from "../components/popups/SignupRes";
import { getUser } from "../store/slices/user";

const LandingNavbar = ({ isHome }) => {
  const [navbarClasses, setNavbarClasses] = useState("navbar-transparent");
  const { isAuthenticated, user } = useSelector(getUser);

  useEffect(() => {
    const handleScroll = () => {
      if (document.documentElement.scrollTop <= 100)
        setNavbarClasses("navbar-transparent");
      else setNavbarClasses("navbar-black");
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <React.Fragment>
      <nav
        className={`navbar navbar-expand-lg fixed-top ${
          isHome ? navbarClasses : "navbar-black"
        }`}
      >
        <div className="container">
          <Link className="navbar-brand" to="/">
            FooDux
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="fa fa-bars text-white"></span>
          </button>
          <div
            className="collapse navbar-collapse d-lg-flex justify-content-lg-end"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav">
              <NavLink
                to="/"
                exact
                className="nav-item nav-link mr-3 fit-width"
              >
                Home
              </NavLink>
              <NavLink
                to="/about-us"
                className="nav-item nav-link mr-3 fit-width"
              >
                About Us
              </NavLink>
              <NavLink
                to="/restaurants"
                className="nav-item nav-link mr-3 fit-width"
              >
                Restaurants
              </NavLink>
              <NavLink to="/foods" className="nav-item nav-link mr-3 fit-width">
                Foods
              </NavLink>
              <NavLink
                to="/cities"
                className="nav-item nav-link mr-3 fit-width"
              >
                Cities
              </NavLink>
              {isAuthenticated ? (
                <React.Fragment>
                  <div className="dropdown show fit-width">
                    <Link
                      className="nav-item nav-link dropdown-toggle"
                      to="#"
                      id="dropdownMenuLink"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {user.name}
                    </Link>

                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuLink"
                    >
                      <NavLink className="dropdown-item" to="/newsfeed">
                        <i className="fa fa-newspaper-o mr-2"></i>Newsfeed
                      </NavLink>
                      <NavLink
                        className="dropdown-item"
                        to={`/user/${user._id}`}
                      >
                        {user.isRestaurant ? (
                          <i className="fa fa-university mr-2"></i>
                        ) : (
                          <i className="fa fa-user mr-2"></i>
                        )}
                        Profile
                      </NavLink>
                      <NavLink
                        className="dropdown-item"
                        to={`/user/${user._id}/settings`}
                      >
                        <i className="fa fa-cog mr-2"></i>Settings
                      </NavLink>
                      <div className="dropdown-divider"></div>
                      <NavLink className="dropdown-item" to="/logout">
                        <i className="fa fa-sign-out mr-2"></i>Logout
                      </NavLink>
                    </div>
                  </div>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <li>
                    <button
                      className="btn btn-outline-light mr-2 mb-3 mb-md-0"
                      data-toggle="modal"
                      data-target="#login"
                    >
                      Login
                    </button>
                  </li>
                  <li>
                    <button
                      className="btn btn-outline-light"
                      data-toggle="modal"
                      data-target="#choose-option"
                    >
                      Sign Up
                    </button>
                  </li>
                </React.Fragment>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <Login />
      <SignUpOptions />
      <SignUpRes />
      <SignUp />
    </React.Fragment>
  );
};

export default LandingNavbar;
