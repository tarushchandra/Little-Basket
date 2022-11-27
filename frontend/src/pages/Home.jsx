import React from "react";
import Categories from "../components/Categories";
import Slider from "../components/Slider";
import TrendingProducts from "../components/TrendingProducts";

const Home = () => {
  return (
    <div className="home">
      <Slider />
      <Categories />
      <TrendingProducts />
    </div>
  );
};

export default Home;
