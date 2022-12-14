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
  const qRating = parseInt(req.query.rating);
  const limit = parseInt(req.query.limit);
  const page = parseInt(req.query.page);
  const qSort = parseInt(req.query.sort);
  const result = {};

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  console.log(startIndex, endIndex);

  if (startIndex > 0) {
    result.prev_page = page - 1;
  }

  try {
    // When Category and Rating, both are present
    if (qCategory && qRating) {
      qSort
        ? (result.products = await Product.find({
            rating: qRating,
            categories: { $in: [qCategory] },
          })
            .limit(limit)
            .skip(startIndex)
            .sort({ price: qSort }))
        : (result.products = await Product.find({
            rating: qRating,
            categories: { $in: [qCategory] },
          })
            .limit(limit)
            .skip(startIndex));

      const totalProducts = await Product.find({
        rating: qRating,
        category: qCategory,
      }).count();

      if (endIndex < totalProducts) {
        result.next_page = page + 1;
      }
    }
    // When only Category is present
    else if (qCategory) {
      qSort
        ? (result.products = await Product.find({
            categories: { $in: [qCategory] },
          })
            .limit(limit)
            .skip(startIndex)
            .sort({ price: qSort }))
        : (result.products = await Product.find({
            categories: { $in: [qCategory] },
          })
            .limit(limit)
            .skip(startIndex));

      const totalProducts = await Product.find({
        categories: { $in: [qCategory] },
      }).count();

      if (endIndex < totalProducts) {
        result.next_page = page + 1;
      }
    }
    // When only Rating is present
    else if (qRating) {
      qSort
        ? (result.products = await Product.find({ rating: qRating })
            .limit(limit)
            .skip(startIndex)
            .sort({ price: qSort }))
        : (result.products = await Product.find({ rating: qRating })
            .limit(limit)
            .skip(startIndex));

      const totalProducts = await Product.find({ rating: qRating }).count();
      if (endIndex < totalProducts) {
        result.next_page = page + 1;
      }
    }
    // Fetch all Products
    else {
      qSort
        ? (result.products = await Product.find()
            .limit(limit)
            .skip(startIndex)
            .sort({ price: qSort }))
        : (result.products = await Product.find()
            .limit(limit)
            .skip(startIndex));

      const totalProducts = await Product.find().count();
      if (endIndex < totalProducts) {
        result.next_page = page + 1;
      }
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
