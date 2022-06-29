import React from "react";
import PropTypes from "prop-types";
import PixabayLogo from "../PixabayLogo/PixabayLogo";

function NothingFinded({ searchQuery }) {
  return (
    <div>
      <h1>Nothing finded...</h1>
      <p>
        by query "<b>{searchQuery}</b>" there are no matching images on pixabay
      </p>
      <PixabayLogo />
    </div>
  );
}

NothingFinded.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};

export default NothingFinded;
