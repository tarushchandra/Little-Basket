import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Newsletter from "./components/Newsletter";
import ProductList from "./pages/ProductList";
import Home from "./pages/Home";
import "./styles.scss";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import PaymentFailed from "./pages/PaymentFailed";
import PaymentSuccessful from "./pages/PaymentSuccessful";
import { useDispatch, useSelector } from "react-redux";
import OrderList from "./pages/OrderList";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { logoutSuccess } from "./redux/features/userSlice";
import ScrollToTop from "./utilities/scrollToTop";

function App() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const accessToken = localStorage.getItem("access_token");
  const dispatch = useDispatch();

  console.log("access token in app -", accessToken);

  useEffect(() => {
    // window.location = "/";
    if (!accessToken) {
      dispatch(logoutSuccess());
    }
  }, [dispatch, accessToken]);

  return (
    <div className="app">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route
            element={
              <>
                <Navbar />
                <Outlet />
                <Newsletter />
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
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/success" element={<PaymentSuccessful />} />
          <Route path="/checkout/failed" element={<PaymentFailed />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
