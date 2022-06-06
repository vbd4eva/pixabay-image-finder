import PropTypes from "prop-types";
import { Component } from "react";

import s from "./SearchingForm.module.css";
import statuses from "../../../json/statuses.json";
import BtnSubmit from "./BtnSubmit/BtnSubmit";
import { GrFormSearch } from "react-icons/gr";
import { GrFormClose } from "react-icons/gr";

export default class SearchingForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    status: PropTypes.string.isRequired,
  };

  state = {
    inputText: "",
  };

  #showSubmitBtn = false;

  componentDidUpdate(prevProps, prevState) {}

  inputChangeHandler = (e) => {
    const inputText = e.target.value;
    this.setState({ inputText });
    if (!this.#showSubmitBtn) this.#showSubmitBtn = true;
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.props.status === statuses.PENDING) return;
    const searchQuery = this.state.inputText.toLocaleLowerCase().trim();
    searchQuery && this.props.onSubmit(searchQuery);
    this.#showSubmitBtn = false;
  };

  onReset = (e) => {
    this.setState({ inputText: "" });
  };

  render() {
    const showResetBtn = Boolean(this.state.inputText);
    const showSubmitBtn = this.#showSubmitBtn;
    return (
      <>
        <form
          className={s.form}
          onSubmit={this.onSubmit}
          onReset={this.onReset}
        >
          {showSubmitBtn && (
            <BtnSubmit status={this.props.status} text="Search" type="submit">
              <GrFormSearch size="2.5em" />
            </BtnSubmit>
          )}

          <input
            className={s.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.inputText}
            onChange={this.inputChangeHandler}
          />
          {showResetBtn && (
            <BtnSubmit
              status={this.props.status}
              text="Reset form"
              type="reset"
            >
              <GrFormClose size="1.5em" />
            </BtnSubmit>
          )}
        </form>
      </>
    );
  }
}
