import PropTypes from "prop-types";
import { useState, useRef } from "react";

import s from "./SearchingForm.module.css";
import statuses from "../../../json/statuses.json";
import Btn from "./Btn/Btn";
import { GrFormSearch } from "react-icons/gr";
import { GrFormClose } from "react-icons/gr";

function SearchingForm({ onSubmit, status }) {
  const [inputText, setInputText] = useState("");

  const showSubmitBtn = useRef(false);
  const showResetBtn = Boolean(inputText);
  const isSubmitBtnNeedToRender = () => showResetBtn && showSubmitBtn.current;

  const submitForm = (e) => {
    e.preventDefault();
    if (status === statuses.PENDING) return;
    const searchQuery = inputText.toLocaleLowerCase().trim();
    searchQuery && onSubmit(searchQuery);
    showSubmitBtn.current = false;
  };

  const resetForm = () => {
    setInputText("");
  };

  const inputChangeHandler = (e) => {
    const inputText = e.target.value;
    setInputText(inputText);
    if (!showSubmitBtn.current) showSubmitBtn.current = true;
  };

  return (
    <form className={s.form} onSubmit={submitForm} onReset={resetForm}>
      {isSubmitBtnNeedToRender() && (
        <Btn status={status} text="Search" type="submit">
          <GrFormSearch size="2.5em" />
        </Btn>
      )}

      <input
        className={s.input}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
        value={inputText}
        onChange={inputChangeHandler}
      />
      {showResetBtn && (
        <Btn status={status} text="Reset form" type="reset">
          <GrFormClose size="1.5em" />
        </Btn>
      )}
    </form>
  );
}

SearchingForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
};

export default SearchingForm;
