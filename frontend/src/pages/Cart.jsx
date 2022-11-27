import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import Coupon from "../components/Coupon";
import axios from "axios";
import { deleteAllProducts } from "../redux/features/cartSlice";
import { axiosIntercept } from "../api/axios";
import Cookies from "js-cookie";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const currentUser = useSelector((state) => state.user.currentUser);
  let purchasedProducts = [];

  cart.products.map(async (item) => {
    console.log("item - ", item);
    const { _id, quantity, price, size } = item;
    purchasedProducts.push({
      _id,
      quantity,
      price,
      size,
    });
  });
  console.log("Purchased Products - ", purchasedProducts);

  const stripe = async () => {
    try {
      const res = await axios.post(
        "https://littlebasket.herokuapp.com/api/checkout/stripe/create-checkout-session",
        {
          products: cart.products,
          userId: currentUser._id,
          purchasedProducts,
        }
      );
      window.location = res.data.url;
    } catch (err) {
      console.log(err);
    }
  };

  const removeAllProducts = async () => {
    try {
      const res = await axiosIntercept.delete(
        `https://littlebasket.herokuapp.com/api/cart/${currentUser._id}`,
        { headers: { access_token: Cookies.get("access_token") } }
      );
      console.log("Deleted Cart -", res);
      dispatch(deleteAllProducts());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      <div className="sub-head">
        <div className="continue-shopping">
          <i className="fa-solid fa-angle-left"></i>
          <h2>Continue Shopping</h2>
        </div>
        <div className="total-items">
          <h3>Your Cart Items ({cart.quantity})</h3>
          <div />
          <h3>Your Wishlist (0)</h3>
        </div>
        <button onClick={removeAllProducts}>Remove all Products</button>
      </div>
      <div className="content">
        <div className="items">
          {cart.products.map((item) => {
            return <CartItem key={item._id} cartProduct={item} />;
          })}
        </div>
        <div className="checkout">
          <div className="payment-checkout">
            <h2>Order Summary</h2>
            <div className="info">
              <div>
                <h3>Subtotal</h3>
                <h3>₹{cart.totalPrice}</h3>
              </div>
              <div>
                <h3>Shipping Charges</h3>
                <h3>₹5</h3>
              </div>
              <div>
                <h3>Promotions</h3>
                <h3>-₹5</h3>
              </div>
            </div>
            <div className="total">
              <h3>Total</h3>
              <h3>₹{cart.totalPrice}</h3>
            </div>
            <button onClick={stripe}>Checkout Now!</button>
          </div>
          <div className="promotions">
            <h3>Promotions</h3>
            <div>
              <div className="coupons">
                <Coupon />
                <Coupon />
                <Coupon />
              </div>
              <div className="enter-coupon">
                <input type="text" placeholder="Enter Coupon" />
                <button>Apply</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
