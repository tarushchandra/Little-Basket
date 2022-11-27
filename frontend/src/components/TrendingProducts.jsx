import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { trendingProducts } from "../data/data";
import Product from "./Product";
import axios from "axios";

const TrendingProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data.slice(0, 8));
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, []);

  return (
    <div className="trending-products">
      <h1>Trending Products</h1>
      <div className="wrapper">
        <div className="products">
          {products?.map((item) => {
            return (
              <Link
                to={`products/${item._id}`}
                style={{ color: "black" }}
                key={item._id}
              >
                <Product
                  img={item.img}
                  title={item.title}
                  rating={item.rating}
                  price={item.price}
                />
              </Link>
            );
          })}
        </div>
      </div>
      <div className="see-more">
        <Link to="/products" style={{ color: "black", textDecoration: "none" }}>
          <p>View all Products</p>
        </Link>
      </div>
    </div>
  );
};

export default TrendingProducts;
