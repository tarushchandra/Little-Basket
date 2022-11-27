import React from "react";

const Product = ({ img, title, rating, price }) => {
  return (
    <div className="product">
      <img src={img} alt="" />
      <div className="icons">
        <div className="icon">
          <i className="fa-solid fa-plus"></i>
        </div>
        <div className="icon">
          <i className="fa-regular fa-heart"></i>
        </div>
        <div className="icon">
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>
      <div className="white-background">
        <h2>{title}</h2>
        <div className="rating-container">
          <h3 className="rating">{rating}</h3>
          <i className="fa-solid fa-star"></i>
        </div>
        <h3>₹{price}</h3>
      </div>
    </div>
  );
};

export default Product;
