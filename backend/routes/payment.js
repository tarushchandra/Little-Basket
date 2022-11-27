const router = require("express").Router();
const stripeRoute = require("./payments/stripe.js");

router.post("/", stripeRoute);

module.exports = router;
