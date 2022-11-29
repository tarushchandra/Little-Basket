const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/user.js");
const authRoutes = require("./routes/auth.js");
const productRoutes = require("./routes/product.js");
const cartRoutes = require("./routes/cart.js");
const orderRoutes = require("./routes/order.js");
const jwtRefresh = require("./routes/jwt/refresh.js");
const stripeRoute = require("./routes/payments/stripe.js");
const razorpayRoute = require("./routes/payments/razorpay.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use("/api/checkout/stripe/webhook", express.raw({ type: "*/*" }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/jwt", jwtRefresh);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout/stripe", stripeRoute);
// app.use("/api/checkout/razorpay", razorpayRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Connected to backend");
});
