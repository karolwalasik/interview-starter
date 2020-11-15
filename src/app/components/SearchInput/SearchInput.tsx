import React from "react";
import styles from "./SearchInput.module.scss";

const SearchInput = ({ searchParam, setPageNumber, setSearchParam }) => {
  return (
    <div className={styles.SearchInputContainer}>
      <input
        className={styles.SearchInput}
        placeholder="Search"
        type="text"
        value={searchParam}
        onChange={(e) => {
          setSearchParam(e.target.value);
          setPageNumber(1);
        }}
      />
      <span className={styles.SearchIcon}></span>
    </div>
  );
};

export default SearchInput;
