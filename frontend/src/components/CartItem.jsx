import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosIntercept } from "../api/axios";
import {
  deleteProduct,
  getProducts,
  getQuantity,
  updateProduct,
} from "../redux/features/cartSlice";
import Cookies from "js-cookie";
import { useEffect } from "react";

const CartItem = ({ cartProduct }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const totalCartQuantity = useSelector(getQuantity);

  const [quantity, setQuantity] = useState(cartProduct.quantity);

  console.log("cart item quanity -", quantity);

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const updateQuantityRes = await axiosIntercept.post(
          `https://littlebasket.herokuapp.com/api/cart/updateQuantity/${currentUser._id}`,
          { productId: cartProduct._id, quantity: quantity },
          {
            headers: {
              access_token: Cookies.get("access_token"),
            },
          }
        );
        console.log(updateQuantityRes);
      } catch (err) {
        console.log(err);
      }
    };
    makeRequest();
  }, [quantity]);

  const handleQuantity = (id, op) => {
    dispatch(updateProduct({ id, op, price: cartProduct.price }));

    if (op === "plus") {
      setQuantity(cartProduct.quantity + 1);
    } else if (op === "minus") {
      setQuantity(cartProduct.quantity - 1);
    }
  };

  const handleDelete = async (productId) => {
    if (totalCartQuantity > 1) {
      try {
        const res = await axiosIntercept.post(
          `https://littlebasket.herokuapp.com/api/cart/deleteProduct/${currentUser._id}`,
          { productId },
          {
            headers: {
              access_token: Cookies.get("access_token"),
            },
          }
        );
        console.log("Deleted Product -", res);
        dispatch(
          deleteProduct({
            productId,
            price: cartProduct.price,
            quantity: cartProduct.quantity,
          })
        );
      } catch (err) {
        console.log(err);
      }
    } else if (totalCartQuantity === 1) {
      try {
        const res = await axiosIntercept.delete(
          `https://littlebasket.herokuapp.com/api/cart/${currentUser._id}`,
          { headers: { access_token: Cookies.get("access_token") } }
        );
        console.log("Deleted Cart - ", res);
        dispatch(
          deleteProduct({
            productId,
            price: cartProduct.price,
            quantity: cartProduct.quantity,
          })
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  // console.log("total cart quantity - ", cartProduct.quantity);
  console.log("Current Item in CartItem -", cartProduct);

  return (
    <div className="item">
      <img src={cartProduct.img} />
      <div className="desc">
        <h2>{cartProduct.title}</h2>
        <div className="color">
          <h3>Color:</h3>
          <div style={{ backgroundColor: `${cartProduct.color[0]}` }} />
        </div>
        {cartProduct.categories.includes("apparels") && (
          <h3>Size: {cartProduct.size}</h3>
        )}
      </div>
      <div className="price-quantity">
        <h2>₹{cartProduct.price * cartProduct.quantity}</h2>
        <div>
          <i
            onClick={() => handleQuantity(cartProduct._id, "minus")}
            className="fa-solid fa-minus"
          ></i>
          <div>{cartProduct.quantity}</div>
          <i
            onClick={() => handleQuantity(cartProduct._id, "plus")}
            className="fa-solid fa-plus"
          ></i>
        </div>
      </div>
      <i
        onClick={() => handleDelete(cartProduct._id)}
        className="fa-solid fa-xmark trash"
      ></i>
    </div>
  );
};

export default CartItem;
