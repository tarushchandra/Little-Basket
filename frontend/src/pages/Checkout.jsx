import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { getProducts } from "../redux/features/cartSlice";

const Payment = () => {
  const products = useSelector(getProducts);
  console.log(products);

  const stripe = async () => {
    try {
      const res = await axios.post(
        "https://little-basket.onrender.com/api/checkout/stripe/create-checkout-session",
        { products }
      );
      window.location = res.data.url;
    } catch (err) {
      console.log(err);
    }
  };

  const razorpay = async (req, res) => {
    try {
      const res = await axios.post(
        "https://little-basket.onrender.com/api/checkout/razorpay/checkout",
        { products }
      );
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="checkout-page">
      <div className="headings">
        <h1>Checkout</h1>
        <h2>Choose your preferred payment method</h2>
      </div>
      <div className="container">
        <div className="payment-methods">
          <div onClick={stripe}>
            <i className="fa-brands fa-stripe-s"></i>
            <h3>Stripe</h3>
          </div>
          <div onClick={razorpay}>
            <h3>RazorPay</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
