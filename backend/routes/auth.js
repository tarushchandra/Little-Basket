const router = require("express").Router();
const User = require("../models/User.js");
const CryptoJS = require("crypto-js");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("./jwt/generateToken.js");
const Token = require("../models/Token.js");
const { verifyToken } = require("./jwt/verifyToken.js");

// Register - Create User
router.post("/register", async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRET
    ).toString(),
    email: req.body.email,
  });

  try {
    await newUser.save();
    res.status(200).json("User added");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const foundUser = await User.findOne({ email: req.body.email });
    !foundUser && res.status(401).json("User not found");

    const decyrptedPassword = CryptoJS.AES.decrypt(
      foundUser.password,
      process.env.PASS_SECRET
    ).toString(CryptoJS.enc.Utf8);

    decyrptedPassword !== req.body.password &&
      res.status(401).json("Invalid Credentials");

    console.log("Logged in User - ", foundUser);

    const accessToken = generateAccessToken(foundUser);
    const refreshToken = generateRefreshToken(foundUser);

    const refreshTokenToDB = new Token({
      userId: foundUser._id,
      refreshToken: refreshToken,
    });
    await refreshTokenToDB.save();

    const { password, ...others } = foundUser._doc;

    res
      .cookie("access_token", accessToken, {
        secure: true,
        httpOnly: true,
        sameSite: "strict",
      })
      .status(200)
      .json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

// OAuth Login
router.post("/oAuth/login", async (req, res) => {
  try {
    const foundUser = await User.findOne({ email: req.body.email });
    !foundUser && res.status(401).json("User not found");

    // const decyrptedPassword = CryptoJS.AES.decrypt(
    //   foundUser.password,
    //   process.env.PASS_SECRET
    // ).toString(CryptoJS.enc.Utf8);

    // decyrptedPassword !== req.body.password &&
    //   res.status(401).json("Invalid Credentials");

    console.log("Logged in User - ", foundUser);

    const accessToken = generateAccessToken(foundUser);
    const refreshToken = generateRefreshToken(foundUser);

    const refreshTokenToDB = new Token({
      userId: foundUser._id,
      refreshToken: refreshToken,
    });
    await refreshTokenToDB.save();

    const { password, ...others } = foundUser._doc;

    res
      .cookie("access_token", accessToken, {
        expires: new Date(Date.now() + 48 * 60 * 60 * 1000),
      })
      .status(200)
      .json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Logout
router.get("/logout", verifyToken, async (req, res) => {
  try {
    await Token.deleteOne({ userId: req.user._id });
    res
      .clearCookie("access_token", { sameSite: "none", secure: true })
      .status(200)
      .json("You logged out successfully!");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
