import React, { useRef } from "react";
import { useOnClickOutside } from "hooks/useOnClickOutside";
import styles from './Popup.module.scss'

const Popup = (props: any) => {
  const modalRef = useRef(null);
  useOnClickOutside(modalRef, () => props.setPopupActive(false));

  return (
    <div ref={modalRef} className={styles.Popup}>
      <button className={styles.closeButton} onClick={() => props.setPopupActive(false)}></button>
      <div className={styles.imageContainer}><img srcSet={props.popupData.image} /></div>
      
      <p className={styles.productName}>{props.popupData.name}</p>
      <p className={styles.productDescription}>{props.popupData.description}</p>
    </div>
  );
};

export default Popup;
