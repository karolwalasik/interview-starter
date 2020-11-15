import React from "react";
import shape from "../../assets/icons/Shape.png";
import path from "../../assets/icons/Path.png";
import styles from './Product.module.scss';

const Product = (props) => {
  const drawStars = (rating, name) => {
    let stars: string[] = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(path);
      } else {
        stars.push(shape);
      }
    }
    return stars.map((star, index) => {
      return <img src={star} className={styles.singleStar} key={`${name}${index}`} />;
    });
  };

  return (
    <div className={styles.SingleProduct}>
      <div className={styles.imageWrapper}>
        {!!props.product.promo && <div className={styles.promoSign}>Promo</div>}
      <img srcSet={props.product.image} />
      </div>
      <div className={styles.ProductDetails}>
      <p className={styles.ProductName}>{props.product.name}</p>
      <p className={styles.ProductDescription}>{props.product.description}</p>
      <div className={styles.starsContainer}>
      {drawStars(props.product.rating, props.product.name)}
      </div>
      <button
      className={styles.showDetailsButton}
        onClick={() => {
          props.handlers.handleSetPopupActive(true);
          props.handlers.setPopupData(props.product);
        }}
      >
        Show details
      </button>
    </div>
    </div>
  );
};

export default Product;
