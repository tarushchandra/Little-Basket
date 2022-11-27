const Cart = require("../models/Cart");
const { verifyToken } = require("./jwt/verifyToken");

const router = require("express").Router();

// Create Cart
router.post("/", verifyToken, async (req, res) => {
  const cart = new Cart({
    userId: req.body.userId,
    products: [
      {
        productId: req.body.productId,
        quantity: req.body.quantity,
        size: req.body.size,
      },
    ],
  });
  try {
    await cart.save();
    res.status(200).json("Cart created successfully!");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update Cart
// (add a product)
router.post("/addProduct/:id", verifyToken, async (req, res) => {
  if (req.user._id === req.params.id) {
    console.log("cart found");
    try {
      const updatedCart = await Cart.updateOne(
        {
          $and: [
            { userId: req.params.id },
            { "products.productId": { $ne: req.body.productId } },
          ],
        },
        {
          $push: {
            products: {
              productId: req.body.productId,
              quantity: req.body.quantity,
              size: req.body.size,
            },
          },
        },
        { new: true }
      );
      console.log("product added");
      res.status(200).json(updatedCart);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not authorized! (user not found)");
  }
});

// (delete a product)
router.post("/deleteProduct/:id", verifyToken, async (req, res) => {
  if (req.user._id === req.params.id) {
    try {
      const updatedCart = await Cart.updateOne(
        {
          userId: req.params.id,
        },
        { $pull: { products: { productId: req.body.productId } } },
        { new: true }
      );
      res.status(200).json(updatedCart);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not authorized! (user not found)");
  }
});

// (update quantity)
router.post("/updateQuantity/:id", verifyToken, async (req, res) => {
  if (req.user._id === req.params.id) {
    try {
      const updatedCart = await Cart.updateOne(
        {
          $and: [
            { userId: req.params.id },
            { "products.productId": req.body.productId },
          ],
        },
        {
          $set: { "products.$.quantity": req.body.quantity },
        }
      );
      res.status(200).json(updatedCart);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not authorized! (user not found)");
  }
});

// Delete a Cart
router.delete("/:id", verifyToken, async (req, res) => {
  if (req.user.isAdmin || req.user._id === req.params.id) {
    try {
      await Cart.deleteOne({ userId: req.user._id });
      res.status(200).json("Cart deleted successfully");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not authorized to do that!");
  }
});

// Get User Cart
router.get("/find/:id", verifyToken, async (req, res) => {
  if (req.user._id === req.params.id) {
    try {
      const foundCart = await Cart.findOne({ userId: req.params.id });
      res.status(200).json(foundCart);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not authorized to do that!");
  }
});

// Get all User Carts
router.get("/", verifyToken, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const carts = await Cart.find();
      res.status(200).json(carts);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not authorized to do that!");
  }
});

module.exports = router;
