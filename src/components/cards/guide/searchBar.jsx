import React, { Fragment } from "react";

const SearchBar = ({ children }) => {
  return (
    <Fragment>
      <div id="search-bar-guide">
        <img
          className="icon"
          alt={"search"}
          src={require("../../../assets/img/search.svg")}
        />
        <p>Tap your search here</p>
      </div>
    </Fragment>
  );
};
export default SearchBar;
