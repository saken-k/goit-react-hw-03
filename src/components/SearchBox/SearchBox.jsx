import css from "./SearchBox.module.css";

const SearchBox = ({ value, onSearch }) => {
  return (
    <div className={css.search}>
      <p className={css.p}>Find contacts by name</p>
      <input
        className={css.input}
        type="text"
        value={value}
        onChange={(evt) => onSearch(evt.target.value)}
      ></input>
    </div>
  );
};
export default SearchBox;
