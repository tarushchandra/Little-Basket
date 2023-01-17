import React from "react";
import Slider from "../components/Slider";
import LazyLoad from "react-lazy-load";
import { CircularProgress } from "@mui/material";

const Categories = React.lazy(() => import("../components/Categories"));
const TrendingProducts = React.lazy(() =>
  import("../components/TrendingProducts")
);

const Home = () => {
  return (
    <div className="home">
      <Slider />
      {/* <React.Suspense
        fallback={
          <div className="loading">
            <CircularProgress style={{ color: "black" }} />
          </div>
        }
      > */}
      <LazyLoad threshold={0.2}>
        <Categories />
      </LazyLoad>
      <LazyLoad threshold={1}>
        <TrendingProducts />
      </LazyLoad>
      {/* </React.Suspense> */}
    </div>
  );
};

export default Home;
