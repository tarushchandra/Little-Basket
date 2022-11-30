import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosIntercept } from "../api/axios";
import {
  addProduct,
  getProducts,
  getQuantity,
} from "../redux/features/cartSlice";
import Cookies from "js-cookie";

const Product = () => {
  const id = useLocation().pathname.split("/")[2];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");

  const totalCartQuantity = useSelector(getQuantity);
  const totalCartProducts = useSelector(getProducts);
  const currentUser = useSelector((state) => state.user.currentUser);

  console.log("Current product -", product);

  function handleSize(e) {
    setSize(([e.target.name] = e.target.value));
  }

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(
          `https://little-basket.onrender.com/api/products/find/${id}`
        );
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, [id]);

  function handleQuantity(op) {
    if (op === "plus") {
      setQuantity(quantity + 1);
    } else if (op === "minus") {
      setQuantity(quantity > 1 ? quantity - 1 : quantity);
    }
  }

  const addToCart = async () => {
    if (currentUser) {
      if (totalCartQuantity === 0) {
        try {
          const res = await axiosIntercept.post(
            "https://little-basket.onrender.com/api/cart",
            {
              userId: currentUser._id,
              productId: product._id,
              quantity: quantity,
              size,
            },
            {
              headers: {
                access_token: localStorage.getItem("access_token"),
              },
            }
          );
          console.log(res);
          dispatch(addProduct({ ...product, quantity, size }));
        } catch (err) {
          console.log(err);
        }
      } else if (totalCartQuantity > 0) {
        totalCartProducts.map((item) => {
          if (item._id === product._id) {
            alert("Product already added in the Cart.");
            return;
          }
        });
        try {
          const res = await axiosIntercept.post(
            `https://little-basket.onrender.com/api/cart/addProduct/${currentUser._id}`,
            {
              productId: product._id,
              quantity: quantity,
              size,
            },
            {
              headers: {
                access_token: localStorage.getItem("access_token"),
              },
            }
          );
          console.log("Updated Product -", res);
          dispatch(addProduct({ ...product, quantity, size }));
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="product-page">
      <div className="image">
        <img src={product.img} />
      </div>
      <div className="content">
        <h2>{product.title}</h2>
        <div className="info">
          <div className="rating-container">
            <h3 className="rating">{product.rating}</h3>
            <i className="fa-solid fa-star"></i>
          </div>
          <div className="quantity-size-container">
            <div className="quantity-container">
              <h3>Quantity:</h3>
              <div>
                <i
                  onClick={() => handleQuantity("minus")}
                  className="fa-solid fa-minus"
                ></i>
                <div>{quantity}</div>
                <i
                  onClick={() => handleQuantity("plus")}
                  className="fa-solid fa-plus"
                ></i>
              </div>
            </div>
            {product.categories?.[0] === "apparels" && (
              <div className="size-container">
                <h3>Size:</h3>
                <select name="size" onChange={handleSize}>
                  <option disabled selected>
                    Size?
                  </option>
                  {product.size?.map((s, i) => {
                    return <option key={i}>{s}</option>;
                  })}
                </select>
              </div>
            )}
          </div>
          <h2>₹{product.price}</h2>
          <div className="buying-options">
            <div onClick={addToCart} className="first">
              <i className="fa-solid fa-cart-shopping"></i>Add to Cart
            </div>
            <div className="second">
              <i className="fa-solid fa-money-bill"></i>Buy now
            </div>
          </div>
          <div className="desc">
            <h3>Description</h3>
            <p>{product.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
