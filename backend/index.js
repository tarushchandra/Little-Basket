const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/user.js");
const authRoutes = require("./routes/auth.js");
const oauthRoutes = require("./passport/passportRoutes.js");
const productRoutes = require("./routes/product.js");
const cartRoutes = require("./routes/cart.js");
const orderRoutes = require("./routes/order.js");
const jwtRefresh = require("./routes/jwt/refresh.js");
const stripeRoute = require("./routes/payments/stripe.js");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
require("./passport/passport.js");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const app = express();

// app.set("trust proxy", 1);

// Functional Middlewares
app.use(
  cors({
    // origin: "http://localhost:3000",
    origin: "https://littlebasket.netlify.app",
    credentials: true,
  })
);
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
  })
);
app.use("/api/checkout/stripe/webhook", express.raw({ type: "*/*" }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

// All Routes
app.use("/api/jwt", jwtRefresh);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/oauth", oauthRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout/stripe", stripeRoute);

// Listening on Port
app.listen(process.env.PORT || 5000, () => {
  console.log("Connected to backend");
});
