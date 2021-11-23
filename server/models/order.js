const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: "Product",
        },
        count: Number,
        color: String,
      },
    ],
    PaymentDetails: {},
    orderStatus: {
      type: String,
      default: "Not Processed",
      enum: [
        "Not Processed",
        "Processing",
        "Dispatched",
        "Cancelled",
        "Completed",
      ],
    },
    orderedBy: {
      type: ObjectId,
      ref: "User",
    },
    toAddress: {
      name: {
        type: String,
      },
      phoneNumber: {
        type: String,
      },
      pincode: {
        type: Number,
      },
      address: {
        type: String,
      },
      landmark: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
