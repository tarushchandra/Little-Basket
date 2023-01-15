import React from "react";
import "./styles.scss";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import ScrollToTop from "./utilities/scrollToTop";
import { CircularProgress } from "@mui/material";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import LazyLoad from "react-lazy-load";

const ProductList = React.lazy(() => import("./pages/ProductList"));
const Cart = React.lazy(() => import("./pages/Cart"));
const OrderList = React.lazy(() => import("./pages/OrderList"));
const Product = React.lazy(() => import("./pages/Product"));
const PaymentSuccessful = React.lazy(() => import("./pages/PaymentSuccessful"));
const PaymentFailed = React.lazy(() => import("./pages/PaymentFailed"));
const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));
const Newsletter = React.lazy(() => import("./components/Newsletter"));

function App() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const accessToken = localStorage.getItem("access_token");

  console.log("access token in app -", accessToken);
  console.log("current user -", currentUser);

  return (
    <div className="app">
      <BrowserRouter>
        <ScrollToTop />
        <React.Suspense
          fallback={
            <div className="loading">
              <CircularProgress style={{ color: "black" }} />
            </div>
          }
        >
          <Routes>
            <Route
              element={
                <>
                  <Navbar />
                  <React.Suspense
                    fallback={
                      <div className="loading">
                        <CircularProgress style={{ color: "black" }} />
                      </div>
                    }
                  >
                    <Outlet />
                  </React.Suspense>
                  <LazyLoad threshold={0.95}>
                    <Newsletter />
                  </LazyLoad>
                  <Footer />
                </>
              }
            >
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/:id" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/orders" element={<OrderList />} />
            </Route>
            <Route
              path="/login"
              element={currentUser ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="/register"
              element={currentUser ? <Navigate to="/" /> : <Register />}
            />
            <Route path="/checkout/success" element={<PaymentSuccessful />} />
            <Route path="/checkout/failed" element={<PaymentFailed />} />
          </Routes>
        </React.Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
