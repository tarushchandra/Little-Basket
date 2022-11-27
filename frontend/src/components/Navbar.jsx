import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addProduct,
  deleteAllProducts,
  getQuantity,
  updateCartQuantity,
} from "../redux/features/cartSlice";
import { logoutSuccess } from "../redux/features/userSlice";
import Cookies from "js-cookie";
import { axiosIntercept } from "../api/axios";
import axios from "axios";

const Navbar = () => {
  const { quantity } = useSelector((state) => state.cart);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  // axiosIntercept.interceptors.response.use(
  //   (response) => {
  //     console.log("response from interceptor - ", response);
  //     return response;
  //   },
  //   async (err) => {
  //     console.log("error from response -", err);
  //     if (err.response.status === 403) {
  //       const data = await getRefreshToken();
  //       console.log("data in intercept - ", data);
  //       err.config.headers["access_token"] = data.accessToken;
  //     }
  //   }
  // );

  useEffect(() => {
    const requestCart = async () => {
      try {
        const res = await axiosIntercept.get(
          `https://littlebasket.herokuapp.com/api/cart/find/${currentUser._id}`,
          {
            headers: {
              access_token: Cookies.get("access_token"),
            },
          }
        );
        console.log("cart info -", res.data);
        res.data.products.map(async (item) => {
          const getProduct = await axios.get(
            `https://littlebasket.herokuapp.com/api/products/find/${item.productId}`
          );
          // console.log("get product - ", getProduct.data);
          dispatch(
            addProduct({
              ...getProduct.data,
              quantity: item.quantity,
              size: item.size,
            })
          );
        });
      } catch (err) {
        console.log(err);
      }
    };
    requestCart();
  }, [dispatch, currentUser]);

  // const logout = async () => {
  //   try {
  //     const res = await axiosIntercept.get(
  //       "https://littlebasket.herokuapp.com/api/auth/logout",
  //       {
  //         headers: {
  //           access_token: Cookies.get("access_token"),
  //         },
  //       }
  //     );
  //     if (res.status === 200) {
  //       Cookies.remove("access_token");
  //       dispatch(deleteAllProducts());
  //       dispatch(logoutSuccess());
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const logout = () => {
    dispatch(logoutSuccess());
  };

  return (
    <div className="navbar">
      {/* <div className="top">
        <p>Summer Sale!!! Check out the coupons at checkout.</p>
      </div> */}
      <div className="bottom">
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1>Little Basket.</h1>
        </Link>
        {/* <div className="search">
          <input placeholder="Search..." />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div> */}
        <div className="user-info">
          {currentUser ? (
            <h3>
              Hello, <span>{currentUser?.name}</span>
            </h3>
          ) : (
            <Link
              to="/login"
              style={{ color: "black", textDecoration: "none" }}
            >
              <h3 className="sign-in">Sign in</h3>
            </Link>
          )}
          {currentUser && (
            <Link
              to="/orders"
              style={{ color: "black", textDecoration: "none" }}
            >
              <h3 className="sign-in">Your Orders</h3>
            </Link>
          )}
          {currentUser ? (
            <Link to="/" style={{ color: "black", textDecoration: "none" }}>
              <h3 onClick={logout} className="sign-in">
                Log out
              </h3>
            </Link>
          ) : (
            <Link
              to="/register"
              style={{ color: "black", textDecoration: "none" }}
            >
              <h3 className="sign-in">Register</h3>
            </Link>
          )}
          {currentUser ? (
            <Link to="/cart" style={{ color: "black", textDecoration: "none" }}>
              <div className="cart">
                <i className="fa-solid fa-cart-shopping"></i>
                {quantity > 0 && <span>{quantity}</span>}
              </div>
            </Link>
          ) : (
            <Link
              to="/login"
              style={{ color: "black", textDecoration: "none" }}
            >
              <div className="cart">
                <i className="fa-solid fa-cart-shopping"></i>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
