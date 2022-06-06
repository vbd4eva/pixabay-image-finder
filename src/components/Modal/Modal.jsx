import { Component } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { GrClose } from "react-icons/gr";

import s from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.closeModal);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.closeModal);
  }

  closeModal = (e) => {
    if (e.code === "Escape") this.props.onClose();
    if (e.target === e.currentTarget) this.props.onClose();
    if (e.currentTarget.dataset?.modalClose) this.props.onClose();
  };

  render() {
    // const { src, alt } = this.props;
    return createPortal(
      <div className={s.backdrop} onClick={this.closeModal}>
        <div className={s.content}>{this.props.children}</div>
        <button
          className={s.closeModal}
          data-modal-close
          onClick={this.closeModal}
          aria-label="close modal"
        >
          <GrClose className={s.closeModalIcon} />
        </button>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  // src: PropTypes.string.isRequired,
  // alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
