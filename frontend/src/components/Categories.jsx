import React from "react";
import { categories } from "../data/data";
import Category from "./Category";

const Categories = () => {
  return (
    <div className="categories">
      <h1>Categories</h1>
      <div className="container">
        {categories.map((item) => {
          return <Category key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
};

export default Categories;
