import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { GrClose } from "react-icons/gr";

import s from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

function Modal({ onClose, children }) {
  const memoizedCloseModal = useCallback(closeModal, [onClose]);

  useEffect(() => {
    window.addEventListener("keydown", memoizedCloseModal);

    return () => {
      window.removeEventListener("keydown", memoizedCloseModal);
    };
  }, [memoizedCloseModal]);

  function closeModal(e) {
    if (e.code === "Escape") onClose();
    if (e.target === e.currentTarget) onClose();
    if (e.currentTarget.dataset?.modalClose) onClose();
  }

  return createPortal(
    <div className={s.backdrop} onClick={closeModal}>
      <div className={s.content}>{children}</div>
      <button
        className={s.closeModal}
        data-modal-close
        onClick={closeModal}
        aria-label="close modal"
      >
        <GrClose className={s.closeModalIcon} />
      </button>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
