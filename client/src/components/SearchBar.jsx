import React from "react";
import PropTypes from "prop-types";

const SearchBar = ({ onSearch }) => {
  return (
    <div className="form-field">
      <input
        type="text"
        placeholder="Search products..."
        onChange={(e) => onSearch(e.target.value)}
        aria-label="Search products"
      />
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;