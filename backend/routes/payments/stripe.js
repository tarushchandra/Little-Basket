const Order = require("../../models/Order");

const router = require("express").Router();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

router.post("/create-checkout-session", async (req, res) => {
  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.userId,
      products: JSON.stringify(req.body.purchasedProducts),
    },
  });

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer: customer.id,
      shipping_address_collection: { allowed_countries: ["IN"] },
      discounts: [
        {
          coupon: "8bcGLpaA",
        },
      ],
      line_items: req.body.products.map((item) => {
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: item.title,
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        };
      }),
      success_url: "https://littlebasket.netlify.app/checkout/success",
      cancel_url: "https://littlebasket.netlify.app/checkout/failed",
    });
    res.status(200).json(session);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/webhook", async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = await stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_END_SECRET
    );
    console.log("webhook verified");
  } catch (err) {
    console.log("webhook error -", err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  const data = event.data.object;
  const eventType = event.type;

  // Handle the event
  if (eventType === "checkout.session.completed") {
    stripe.customers
      .retrieve(data.customer)
      .then(async (customer) => {
        console.log("customer -", customer);
        const order = new Order({
          userId: customer.metadata.userId,
          products: JSON.parse(customer.metadata.products),
          subtotal_amount: data.amount_subtotal,
          total_amount: data.amount_total,
          address: data.customer_details.address,
          payment_status: data.payment_status,
          paymentId: data.payment_intent,
        });
        try {
          await order.save();
          res.status(200).json("order created");
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => console.log(err.message));
  }
});

module.exports = router;
