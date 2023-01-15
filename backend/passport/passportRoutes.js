const passport = require("passport");
const { generateAccessToken } = require("../routes/jwt/generateToken");
const router = require("express").Router();

router.get("/login/success", (req, res) => {
  console.log("sending user -", req.user);

  const accessToken = generateAccessToken(req.user);
  if (req.user) {
    res.status(200).json({ ...req.user, accessToken });
  } else {
    res.status(500).json("Not authenticated");
  }
});

// Google Authentication
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000",
    failureRedirect: "http://localhost:3000/login",
  })
);

module.exports = router;
