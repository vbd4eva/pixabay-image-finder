import React from "react";
import PropTypes from "prop-types";
import s from "./FullScreenCenterWrapper.module.css";

function FullScreenCenterWrapper({ children }) {
  return (
    <div className={s.wrapper}>
      <div className={s.content}>{children}</div>
    </div>
  );
}

FullScreenCenterWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FullScreenCenterWrapper;
