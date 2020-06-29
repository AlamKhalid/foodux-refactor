import React from "react";

const SearchBox = ({ classes }) => {
  return (
    <form className={classes}>
      <input type="text" className="search-box" placeholder="Search" />
      <button type="submit" className="search-btn">
        <i className="fa fa-search"></i>
      </button>
    </form>
  );
};

export default SearchBox;
