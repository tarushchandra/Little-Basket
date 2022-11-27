const router = require("express").Router();
const Razorpay = require("razorpay");

const instance = new Razorpay({
  key_id: process.env.RAZOR_ID,
  key_secret: process.env.RAZOR_SECRET,
});

router.post("/checkout", async (req, res) => {
  const options = req.body.products.map((item) => {
    return {
      title: item.title,
      amount: item.price,
      currency: "INR",
    };
  });
  try {
    const order = await instance.orders.create(options);
    res.json(order);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
