const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      index: true,
    },
    role: {
      type: String,
      default: "Subscriber",
    },
    cart: {
      type: Array,
      default: [],
    },
    shipping: [
      {
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
    ],
    wishlist: [{ type: ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
