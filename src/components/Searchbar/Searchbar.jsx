import s from "./Searchbar.module.css";
import SearchingForm from "./SearchingForm";

function Searchbar(props) {
  return (
    <header className={s.Searchbar}>
      <SearchingForm {...props} />
    </header>
  );
}

export default Searchbar;
