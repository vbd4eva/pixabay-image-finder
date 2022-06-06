import React from "react";
import PropTypes from "prop-types";
import s from "./LoadMoreBtn.module.css";
import { RotatingLines } from "react-loader-spinner";
import statuses from "../../json/statuses.json";

function LoadMoreBtn({ onClick, status }) {
  const clickHandler = () => {
    if (status === statuses.PENDING) return;
    onClick();
  };
  return (
    <button onClick={clickHandler} className={s.btn}>
      {status === statuses.PENDING ? (
        <RotatingLines width="24" strokeColor="currentColor" />
      ) : (
        <span>load more</span>
      )}
    </button>
  );
}

LoadMoreBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
};

export default LoadMoreBtn;
