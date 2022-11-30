import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../styles.scss";
import { useEffect } from "react";
import { axiosIntercept } from "../api/axios";
import { deleteAllProducts } from "../redux/features/cartSlice";
import Cookies from "js-cookie";

const PaymentSuccessful = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const removeAllProducts = async () => {
      try {
        const res = await axiosIntercept.delete(
          `https://little-basket.onrender.com/api/cart/${currentUser._id}`,
          { headers: { access_token: localStorage.getItem("access_token") } }
        );
        console.log("Deleted Cart -", res);
        dispatch(deleteAllProducts());
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } catch (err) {
        console.log(err);
      }
    };
    removeAllProducts();
  }, [dispatch, currentUser, navigate]);

  return (
    <div className="payment-success">
      <div>
        <i className="fa-solid fa-circle-check"></i>
        <h1>Transaction Successful</h1>
      </div>
      <p>Redirecting to Homepage...</p>
    </div>
  );
};

export default PaymentSuccessful;
