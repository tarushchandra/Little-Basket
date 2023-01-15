const Token = require("../../models/Token");
const jwt = require("jsonwebtoken");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("./generateToken");
const router = require("express").Router();

router.post("/refresh", async (req, res) => {
  try {
    const token = await Token.findOne({ userId: req.body._id });
    if (!token) return res.status(401).json("You are not authenticated!");

    jwt.verify(
      token.refreshToken,
      process.env.JWT_REFRESH,
      async (err, user) => {
        if (err) return res.status(404).json(err);

        await Token.deleteOne();
        // console.log("user in refresh -", user);

        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);

        const refreshTokenToDB = new Token({
          userId: user._id,
          refreshToken: newRefreshToken,
        });
        await refreshTokenToDB.save();

        res.status(200).json({ accessToken: newAccessToken });
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
