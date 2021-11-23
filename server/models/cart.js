const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const cartSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: "Product",
        },
        count: Number,
        color: String,
        price: {
          ind: Number,
          us: Number,
        },
        offerPrice: {
          ind: Number,
          us: Number,
        },
      },
    ],
    cartTotal: Number,
    totalAfterDiscount: Number,
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
    orderedBy: { type: ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
