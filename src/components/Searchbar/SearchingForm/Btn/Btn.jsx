import PropTypes from "prop-types";
import { RotatingLines } from "react-loader-spinner";

import s from "./Btn.module.css";
import statuses from "../../../../json/statuses.json";

function BtnSubmit({ type = "button", text, status, children }) {
  return (
    <button type={type} title={text} className={s.submit}>
      {status === statuses.PENDING ? (
        <RotatingLines width="100%" strokeColor="currentColor" />
      ) : (
        children
      )}

      {text && <span className={s.submitLabel}>{text}</span>}
    </button>
  );
}

BtnSubmit.propTypes = {
  status: PropTypes.string.isRequired,
  text: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.node,
};

export default BtnSubmit;
