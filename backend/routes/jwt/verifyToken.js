const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const access_token = req.headers.access_token;

  // console.log("token -", access_token);

  if (!access_token)
    return res.status(401).json("You are not authenticated! (token not found)");

  jwt.verify(access_token, process.env.JWT_ACCESS, (err, user) => {
    if (err) return res.status(403).json("Token is not valid");

    // if everthing's okay.
    req.user = user;
    // console.log("user decoded - ", user);
    next();
  });
};

module.exports = { verifyToken };
