const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "Name is required",
      trim: true,
      minlength: [3, "too short"],
      maxlength: [32, "too long"],
    },
    slug: {
      type: String,
      unique: true,
      lowercaseL: true,
      index: true,
    },
    image: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
