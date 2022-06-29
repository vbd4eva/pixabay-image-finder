import { useContext } from "react";
import PropTypes from "prop-types";
import { RotatingLines } from "react-loader-spinner";

import s from "./Btn.module.css";

import statusContext from "../../../../context/status/context";

function BtnSubmit({ type = "button", text, children }) {
  const { checkStatus, PENDING } = useContext(statusContext);

  return (
    <button type={type} title={text} className={s.submit}>
      {checkStatus(PENDING) ? (
        <RotatingLines width="100%" strokeColor="currentColor" />
      ) : (
        children
      )}

      {text && <span className={s.submitLabel}>{text}</span>}
    </button>
  );
}

BtnSubmit.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.node,
};

export default BtnSubmit;
