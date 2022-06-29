import React from "react";
import PropTypes from "prop-types";
import s from "./LoadMoreBtn.module.css";
import { RotatingLines } from "react-loader-spinner";
import { checkStatus, PENDING } from "../../controllers/status";

function LoadMoreBtn({ onClick }) {
  const clickHandler = () => {
    if (checkStatus(PENDING)) return;
    onClick();
  };
  return (
    <button onClick={clickHandler} className={s.btn}>
      {checkStatus(PENDING) ? (
        <RotatingLines width="24" strokeColor="currentColor" />
      ) : (
        <span>load more</span>
      )}
    </button>
  );
}

LoadMoreBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default LoadMoreBtn;
