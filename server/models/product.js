const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 32,
      text: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      unique: true,
      maxlength: 2000,
      text: true,
    },
    orginalPrice: {
      type: Number,
      trim: true,
      maxlength: 32,
    },
    offerPrice: {
      ind: {
        type: Number,
        trim: true,
        maxlength: 32,
      },
    },
    price: {
      ind: {
        type: Number,
        trim: true,
        maxlength: 32,
      },
      us: {
        type: Number,
        trim: true,
        maxlength: 32,
      },
    },
    category: {
      type: ObjectId,
      ref: "Category",
    },

    subCat: [
      {
        type: ObjectId,
        ref: "subCat",
      },
    ],
    quantity: { type: Number, trim: true, maxlength: 32 },
    sold: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
    },
    shipping: {
      type: String,
      enum: ["Yes", "No"],
    },
    color: {
      type: String,
      enum: ["Black", "Grey", "Silver", "Gold", "Blue"],
    },
    brand: {
      type: String,
      enum: ["Abeoz"],
    },
    // rating: [
    //   {
    //     star: Number,
    //     postedBy: { type: Object, ref: "User" },
    //   },
    // ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
