import React from "react";
import Product from "../components/Product.jsx";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const ProductList = () => {
  const query = useLocation();
  const category = query.search.split("=")[1];
  const [productTitle, setProductTitle] = useState("All Products");

  const [rating, setRating] = useState(null);
  const [filters, setFilters] = useState({});
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (category === "apparels") {
      setProductTitle("Apparels");
    } else if (category === "tech") {
      setProductTitle("Tech Stacks");
    } else if (category === "instruments") {
      setProductTitle("Instruments");
    } else if (category === "books") {
      setProductTitle("Books");
    } else if (category === "") {
      setProductTitle("All Products");
    }
  }, [category]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          category
            ? `http://localhost:5000/api/products?category=${category}`
            : "http://localhost:5000/api/products"
        );
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [category]);

  useEffect(() => {
    setFilteredProducts(
      products.filter((item) =>
        Object.entries(filters).every(([key, value]) =>
          item[key].includes(value)
        )
      )
    );
  }, [filters, products]);

  useEffect(() => {
    setFilteredProducts(
      products.filter((item) => {
        return item.rating === parseInt(rating?.split(" ")[0]);
      })
    );
  }, [rating]);

  const handleFilters = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleRating = (e) => {
    setRating(([e.target.name] = e.target.value));
  };

  console.log(filteredProducts);

  return (
    <div className="trending-products">
      <h1>{productTitle}</h1>
      <div className="wrapper">
        <div className="products-controller">
          <div className="filter">
            <h2>Filter Products:</h2>
            <div>
              <select name="rating" onChange={handleRating}>
                <option disabled selected>
                  Rating
                </option>
                <option>5 Stars</option>
                <option>4 Stars</option>
                <option>3 Stars</option>
                <option>2 Stars</option>
                <option>1 Star</option>
              </select>
              {category === "apparels" && (
                <select name="size" onChange={handleFilters}>
                  <option disabled selected>
                    Size
                  </option>
                  <option>S</option>
                  <option>M</option>
                  <option>L</option>
                </select>
              )}
              {category === "tech" && (
                <select name="device" onChange={handleFilters}>
                  <option disabled selected>
                    Devices
                  </option>
                  <option>Smartphones</option>
                  <option>Laptops</option>
                  <option>TVs</option>
                </select>
              )}
            </div>
          </div>
          <div className="sort">
            <h2>Sort Products:</h2>
            <div>
              <select>
                <option disabled selected>
                  Price
                </option>
                <option>Low to High</option>
                <option>High to Low</option>
              </select>
            </div>
          </div>
        </div>
        <div className="products">
          {filteredProducts.map((item) => {
            return (
              <Link to={`${item._id}`} style={{ color: "black" }}>
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
    </div>
  );
};

export default ProductList;
