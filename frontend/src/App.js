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
import { useSelector } from "react-redux";
import OrderList from "./pages/OrderList";

function App() {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <div className="app">
      <BrowserRouter>
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
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/" /> : <Register />}
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
