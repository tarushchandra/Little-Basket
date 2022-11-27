import React from "react";
import { Link } from "react-router-dom";
import { categories } from "../data/data";

const Categories = () => {
  return (
    <div className="categories">
      <h1>Categories</h1>
      <div className="container">
        {categories.map((item) => {
          return (
            <Link to={`/products?category=${item.cat}`} key={item.id}>
              <div className="category-item">
                <img src={item.img} />
                <h2>{item.title}</h2>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
