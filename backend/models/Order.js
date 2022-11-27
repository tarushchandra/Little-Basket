const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: { type: String },
        price: { type: Number },
        quantity: { type: Number, default: 1 },
        size: { type: String },
      },
    ],
    subtotal_amount: { type: Number, required: true },
    total_amount: { type: Number, required: true },
    address: { type: Object, required: true },
    payment_status: { type: String, required: true },
    paymentId: { type: String, required: true },
    shippingStatus: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
