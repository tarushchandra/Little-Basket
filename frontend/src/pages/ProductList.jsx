import React from "react";
import Product from "../components/Product.jsx";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "../components/Pagination.jsx";

const ProductList = () => {
  const query = useLocation();
  const category = query.search.split("=")[1];
  const [productTitle, setProductTitle] = useState("All Products");

  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [sortValue, setSortValue] = useState(null);
  const [rating, setRating] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
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
      setIsLoading(true);
      try {
        // const res = await axios.get(
        //   category || rating
        //     ? `https://little-basket.onrender.com/api/products?rating=${rating}&page=${page}&limit=8`
        //     : `https://little-basket.onrender.com/api/products?page=${page}&limit=8`
        // );
        let res;
        if (category && rating) {
          res = await axios.get(
            `https://little-basket.onrender.com/api/products?category=${category}&rating=${rating}&sort=${sortValue}`
          );
        } else if (category) {
          res = await axios.get(
            `https://little-basket.onrender.com/api/products?category=${category}&page=${page}&limit=8&sort=${sortValue}`
          );
        } else if (rating) {
          res = await axios.get(
            `https://little-basket.onrender.com/api/products?rating=${rating}&page=${page}&limit=8&sort=${sortValue}`
          );
        } else {
          res = await axios.get(
            `https://little-basket.onrender.com/api/products?page=${page}&limit=8&sort=${sortValue}`
          );
        }
        console.log("pagination -", res.data);
        setNextPage(res.data.next_page);
        setPrevPage(res.data.prev_page);
        setProducts(res.data.products);
        setIsLoading(false);
        // window.scrollTo(0, 0);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [category, page, rating, sortValue]);

  useEffect(() => {
    setFilteredProducts(
      products.filter((item) =>
        Object.entries(filters).every(([key, value]) =>
          item[key].includes(value)
        )
      )
    );
  }, [filters, products]);

  // useEffect(() => {
  //   setFilteredProducts(
  //     products.filter((item) => {
  //       return item.rating === parseInt(rating?.split(" ")[0]);
  //     })
  //   );
  // }, [rating]);

  const handleFilters = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleRating = (e) => {
    e.preventDefault();
    setRating(([e.target.name] = e.target.value.split(" ")[0]));
  };

  // Handling Sort Functionality
  const handleSort = (e) => {
    console.log("handleSort -", e);
    setSort(([e.target.name] = e.target.value));
  };

  useEffect(() => {
    if (sort === "Low to High") {
      setSortValue(1);
    } else if (sort === "High to Low") {
      setSortValue(-1);
    }
  }, [sort]);

  // console.log(filteredProducts);
  // console.log("next page -", nextPage);
  // console.log("prev page -", prevPage);
  // console.log("rating -", rating);
  // console.log("category -", category);
  console.log("Sort -", sort);
  console.log("sortValue -", sortValue);

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
              <select name="sort" onChange={handleSort}>
                <option disabled selected>
                  Price
                </option>
                <option id="asc">Low to High</option>
                <option id="desc">High to Low</option>
              </select>
            </div>
          </div>
        </div>
        <div className="products">
          {isLoading ? (
            <div className="loading">
              <CircularProgress style={{ color: "black" }} />
            </div>
          ) : (
            <>
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
              <Pagination
                page={page}
                setPage={setPage}
                nextPage={nextPage}
                prevPage={prevPage}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
