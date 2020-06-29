import React, { useState, useEffect } from "react";
import $ from "jquery";
import { useSelector } from "react-redux";
import { NavLink, Link, useHistory } from "react-router-dom";
import SearchBox from "../components/common/SearchBox";
import { getUser } from "../store/slices/user";

const Navbar = () => {
  const [sidebarClasses, setSidebarClasses] = useState("d-none");
  const { user } = useSelector(getUser);
  const history = useHistory();

  useEffect(() => {
    $('[data-toggle-second="tooltip"]').tooltip({ trigger: "hover" });
    $('[data-toggle-second="tooltip"]').on("click", function () {
      $(this).tooltip("hide");
    });
  });

  const handleClick = () => {
    const sidebarClasses =
      this.state.sidebarClasses === "d-none" ? "d-lg-none" : "d-none";
    setSidebarClasses(sidebarClasses);
  };

  // refresh profile...

  return (
    <>
      <div className={`${sidebarClasses} sidebar shadow-lg bg-light`}>
        <div className="mx-4 mt-3 w-100">
          <h3 className="sidebar-brand pb-2" onClick={() => history.push("/")}>
            FooDux
          </h3>
          <SearchBox classes="d-block d-sm-none form-inline my-3" />
          <NavLink
            to="/newsfeed"
            className="sidebar-item"
            activeClassName="sidebar-item-active"
          >
            Newsfeed
          </NavLink>
          <NavLink
            to="/foodblog"
            className="sidebar-item"
            activeClassName="sidebar-item-active"
          >
            Food Blog
          </NavLink>
          <NavLink
            to="/deals-and-discounts"
            className="sidebar-item"
            activeClassName="sidebar-item-active"
          >
            Deals & Discounts
          </NavLink>
        </div>
      </div>
      <nav className="navbar sticky-top navbar-expand navbar-black">
        <div className="container-fluid container-lg">
          <div className="d-flex">
            <NavLink className="d-none d-lg-block initial mr-3" exact to="/">
              FD
            </NavLink>
            <button
              className="d-lg-none btn btn-outline-light mr-3"
              onClick={handleClick}
            >
              <i className="fa fa-bars"></i>
            </button>
            <input
              type="text"
              className="d-none d-sm-block d-md-none expand search-icon my-auto"
            />
            <SearchBox classes="d-none d-md-block form-inline mt-1" />
          </div>
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                className="nav-link b-right py-0 px-1 px-sm-3"
                to="/newsfeed"
                data-toggle-second="tooltip"
                data-placement="bottom"
                title="Newsfeed"
                activeClassName=""
              >
                Newsfeed
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link b-right py-0 px-1 px-sm-3"
                to={
                  user.isRestaurant
                    ? `/restaurant/${user._id}`
                    : `/user/${user._id}`
                }
                data-toggle-second="tooltip"
                data-placement="bottom"
                title="Profile"
                activeClassName=""
                // onClick={() => {
                //   if (refreshProfile) refreshProfile(user._id);
                // }}
              >
                {user.name}
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link b-right py-0 px-1 px-sm-3"
                to="#"
                role="button"
                id="notifications"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                data-toggle-second="tooltip"
                data-placement="bottom"
                title="Recent Activity"
              >
                Notifications
              </Link>
              <div className="dropdown-menu" aria-labelledby="notifications">
                <span className="dropdown-item">1 Notifications</span>
              </div>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle py-0 px-1 px-sm-3"
                to="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              ></Link>
              <div
                className="dropdown-menu dropdown-menu-right"
                aria-labelledby="navbarDropdown"
              >
                <NavLink
                  className="dropdown-item"
                  to={
                    user.isRestaurant
                      ? `/restaurant/${user._id}/settings`
                      : `/user/${user._id}/settings`
                  }
                >
                  <i className="fa fa-cog mr-2"></i>Settings
                </NavLink>
                {user.isEditor && (
                  <NavLink className="dropdown-item" to="/editor">
                    <i className="fa fa-pencil mr-2"></i>Editor
                  </NavLink>
                )}
                <div className="dropdown-divider"></div>
                <NavLink className="dropdown-item" to="/logout">
                  <i className="fa fa-sign-out mr-2"></i>Logout
                </NavLink>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
