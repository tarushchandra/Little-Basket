const { verifyToken } = require("./jwt/verifyToken");
const CryptoJS = require("crypto-js");
const User = require("../models/User");

const router = require("express").Router();

// Update User
router.put("/:id", verifyToken, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SECRET
      ).toString();
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not authorized!");
  }
});

// Delete User
router.delete("/:id", verifyToken, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not authorized!");
  }
});

// Get User
router.get("/find/:id", verifyToken, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const foundUser = await User.findById(req.params.id);
      const { password, ...others } = foundUser._doc;
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not authorized!");
  }
});

// Get all Users
router.get("/", verifyToken, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const foundUsers = await User.find();
      res.status(200).json(foundUsers);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not authorized");
  }
});

// Get User Stats
router.get("/stats", verifyToken, async (req, res) => {
  if (req.user.isAdmin) {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
      const data = await User.aggregate([
        {
          $match: { createdAt: { $gte: lastYear } },
        },
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            totalUsers: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not authorized");
  }
});

module.exports = router;
