const Product = require("../models/Product");
const { verifyToken } = require("./jwt/verifyToken");

const router = require("express").Router();

// Create Product
router.post("/", verifyToken, async (req, res) => {
  if (req.user.isAdmin) {
    const product = new Product(req.body);
    try {
      await product.save();
      res.status(200).json("Product added successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not authorized to do that!");
  }
});

// Update Product
router.put("/:id", verifyToken, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedProduct = await Product(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not authorized to do that!");
  }
});

// Delete Product
router.delete("/:id", verifyToken, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json("Product deleted successfully");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not authorized to do that!");
  }
});

// Get Product
router.get("/find/:id", async (req, res) => {
  try {
    const foundProduct = await Product.findById(req.params.id);
    res.status(200).json(foundProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get All Products
router.get("/", async (req, res) => {
  const qCategory = req.query.category;
  try {
    let products;
    if (qCategory) {
      products = await Product.find({ categories: { $in: [qCategory] } });
    } else {
      products = await Product.find();
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
