import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const SearchBox = ({ classes }) => {
  const [searchVal, setSearchVal] = useState("");
  const history = useHistory();

  const handleSearch = () => {
    if (searchVal.length > 0) {
      history.push("/search?value=" + searchVal);
    }
  };

  return (
    <form className={classes}>
      <input
        type="text"
        className="search-box"
        placeholder="Search"
        value={searchVal}
        onChange={({ target }) => setSearchVal(target.value)}
      />
      <button type="submit" className="search-btn" onClick={handleSearch}>
        <i className="fa fa-search"></i>
      </button>
    </form>
  );
};

export default SearchBox;
