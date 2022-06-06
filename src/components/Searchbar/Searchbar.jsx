import { Component } from "react";

import s from "./Searchbar.module.css";
import SearchingForm from "./SearchingForm";

export default class Searchbar extends Component {
  render() {
    return (
      <header className={s.Searchbar}>
        <SearchingForm {...this.props} />
      </header>
    );
  }
}
