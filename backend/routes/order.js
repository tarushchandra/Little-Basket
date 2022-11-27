const Order = require("../models/Order");
const { verifyToken } = require("./jwt/verifyToken");

const router = require("express").Router();

// Create Order
router.post("/", verifyToken, async (req, res) => {
  const order = new Order(req.body);
  try {
    await order.save();
    res.status(200).json("Order created successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update Order
router.post("/:id", verifyToken, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedOrder);
    } catch (err) {
      res.status(500).json();
    }
  } else {
    res.status(403).json("You are not authorized to do that!");
  }
});

// Delete Order
router.delete("/:id", verifyToken, async (req, res) => {
  if (req.user._id === req.params.id || req.user.isAdmin) {
    try {
      await Order.deleteOne({ paymentId: req.body.paymentId });
      res.status(200).json("Order has been deleted successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not authorized to do that!");
  }
});

// Get User Orders
router.get("/:id", verifyToken, async (req, res) => {
  if (req.user._id === req.params.id) {
    try {
      const orders = await Order.find({ userId: req.params.id }).sort({
        createdAt: -1,
      });
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not authorized to do that!");
  }
});

// Get all users orders
router.get("/", verifyToken, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not authorized to do that!");
  }
});

// Get Admin's Monthly Income
router.get("/stats/income", verifyToken, async (req, res) => {
  if (req.user.isAdmin) {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(date.setMonth(lastMonth.getMonth() - 1));

    try {
      const data = await Order.aggregate([
        {
          $match: { createdAt: { $gte: previousMonth } },
        },
        {
          $project: {
            month: { $month: "$createdAt" },
            sales: "$amount",
          },
        },
        {
          $group: {
            _id: "$month",
            totalSales: { $sum: "$sales" },
          },
        },
      ]);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not authorized to do that!");
  }
});

module.exports = router;
