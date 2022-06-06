import React from "react";
import PropTypes from "prop-types";
// https://codepen.io/SofiaSergio/pen/aYqEQv
import s from "./SomethingWentWrong.module.css";

function SomethingWentWrong({ children }) {
  return (
    <div className={s.body}>
      <p className={s.text}>{children}</p>

      <div className={s.container}>
        <div className={s.bg}>
          <div className={s.light}></div>
        </div>
        <div className={s.ufo}>
          <div className={s.ufoBottom}></div>
          <div className={s.ufoTop}></div>
          <div className={s.ufoGlass}>
            {/* <div className={s.ufoGlass}> */}
            <div className={s.alien}>
              <div className={s.alienEye}></div>
            </div>
          </div>
        </div>
        <div className={s.bed}>
          <div className={s.mattress}></div>
        </div>
        <div className={s.man}>
          <div className={s.foot}></div>
          <div className={s.head}>
            <div className={s.face}></div>
            <div className={s.hair}></div>
          </div>
          <div className={s.manBody}></div>
          <div className={s.arm}></div>
        </div>
      </div>
      {/* <!-- //////////////// CREDIT //////////////// --> */}

      <p className={s.ref}>
        Background animation created by <b>Sergio</b>, see more animations on
        codepen{" "}
        <a
          href="https://codepen.io/SofiaSergio/"
          target="_blank"
          rel="noreferrer"
        >
          <i>@SofiaSergio</i>
        </a>
      </p>
    </div>
  );
}

SomethingWentWrong.propTypes = {
  children: PropTypes.node,
};

export default SomethingWentWrong;
