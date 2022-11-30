import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { axiosIntercept } from "../api/axios";
import "../styles.scss";
import Cookies from "js-cookie";
import axios from "axios";

const OrderList = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [orderedProducts, setOrderedProducts] = useState([]);
  const [products, setProducts] = useState([]);

  const token = localStorage.getItem("access_token");
  console.log("token -", token);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axiosIntercept.get(
          `http://localhost:5000/api/orders/${currentUser._id}`,
          {
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
          }
        );
        console.log("ordered product - ", res.data);
        setOrderedProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, [currentUser]);

  useEffect(() => {
    orderedProducts.map((item) => {
      item.products.map(async (product) => {
        try {
          const res = await axios.get(
            `http://localhost:5000/api/products/find/${product._id}`
          );
          console.log("payment id -", item.paymentId, res.data);
          setProducts((prev) => [
            ...prev,
            {
              paymentId: item.paymentId,
              quantity: product.quantity,
              size: product.size,
              ...res.data,
            },
          ]);
        } catch (err) {
          console.log(err);
        }
      });
    });
  }, [orderedProducts]);

  // const handleDelete = async (paymentId) => {
  //   try {
  //     const res = await axiosIntercept.delete(
  //       `http://localhost:5000/api/orders/${currentUser._id}`,
  //       { paymentId },
  //       {
  //         headers: {
  //           access_token: Cookies.get("access_token"),
  //         },
  //       }
  //     );
  //     console.log("order deleted -", res.data);
  //     orderedProducts.filter((item) => item.paymentId !== paymentId);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  console.log("Products array -", products);

  const groupedProducts = products.reduce((result, key) => {
    if (!result[key.paymentId]) result[key.paymentId] = [];
    result[key.paymentId].push(key);
    return result;
  }, {});

  console.log("groupedProducts -", groupedProducts);

  // {
  //   Object.keys(groupedProducts).map((key) => {
  //     console.log("key -", key);
  //     console.log("value -", groupedProducts[key]);
  //   });
  // }

  return (
    <div className="order-list">
      <h1>Your Orders</h1>
      <div className="content">
        {orderedProducts.length === 0 ? (
          <h1>No orders to show</h1>
        ) : (
          <div className="items">
            {orderedProducts.map((item) => {
              return (
                <div key={item._id} className="item">
                  <div className="top">
                    <div className="left">
                      <div className="order-placed">
                        <h3>Order Placed</h3>
                        <p>{item.createdAt.split("T")[0]}</p>
                      </div>
                      <div className="sub-total">
                        <h3>Subtotal</h3>
                        <p>₹{item.subtotal_amount / 100}</p>
                      </div>
                      <div className="total">
                        <h3>Total (after discounts)</h3>
                        <p>₹{item.total_amount / 100}</p>
                      </div>
                      <div className="shipment">
                        <h3>Shipment</h3>
                        <p>Pending</p>
                      </div>
                    </div>
                    <div className="right">
                      <div className="order-id">
                        <h3>Order ID</h3>
                        <p>{item.paymentId}</p>
                      </div>
                    </div>
                  </div>
                  <div className="middle">
                    <div className="left">
                      {Object.keys(groupedProducts).map((key) => {
                        if (item.paymentId === key) {
                          return groupedProducts[key].map((product) => {
                            return (
                              <div key={product._id} className="product">
                                <img src={product.img} />
                                <div>
                                  <h4>{product.title}</h4>
                                  <p>₹{product.price}</p>
                                  <p>{product.quantity}</p>
                                </div>
                              </div>
                            );
                          });
                        }
                      })}
                    </div>
                    <div className="right">
                      <div className="address">
                        <h3>Address</h3>
                        <p>{item.address.line1}</p>
                        <p>
                          {item.address.city}, {item.address.state},{" "}
                          {item.address.country} - {item.address.postal_code}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* <div
                  onClick={() => handleDelete(item.paymentId)}
                  className="bottom"
                >
                  <h2>Delete Order</h2>
                </div> */}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderList;
