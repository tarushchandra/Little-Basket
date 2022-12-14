const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  return jwt.sign(
    { _id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_ACCESS,
    {
      expiresIn: "1m",
    }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { _id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_REFRESH
  );
};

module.exports = { generateAccessToken, generateRefreshToken };
