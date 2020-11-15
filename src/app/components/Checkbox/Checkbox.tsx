import React from "react";
import styles from "./Checkbox.module.scss";

const Checkbox = ({ id, name, handler, labelText }) => {
  return (
    <>
      <input
        className={styles.checkboxInput}
        role="checkbox-input"
        type="checkbox"
        id={id}
        name={name}
        onChange={(event) => {
          handler(event.target.checked);
        }}
      />
      <label htmlFor={id}>{labelText}</label>
    </>
  );
};

export default Checkbox;
