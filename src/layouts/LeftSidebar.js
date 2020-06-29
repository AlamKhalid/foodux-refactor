import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { getHome } from "./../store/slices/home";

const LeftSidebar = () => {
  const { categories } = useSelector(getHome);

  return (
    <div className="list-group fixed">
      {categories.map((category) => (
        <NavLink
          to={category.to}
          className="list-group-item list-group-item-action"
          activeClassName="active-side"
          key={category._id}
        >
          {category.name}
        </NavLink>
      ))}
    </div>
  );
};

export default LeftSidebar;
