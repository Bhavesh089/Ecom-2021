const Coupon = require("../models/coupon");

exports.create = async (req, res) => {
  try {
    let { name, expiry, discount } = req.body.coupon;
    console.log(name, expiry, discount, "----------------->");
    res.json(await new Coupon({ name, expiry, discount }).save());
  } catch (error) {
    console.log(error);
    res.status(400).send({
      err: err.message,
    });
  }
};

exports.remove = async (req, res) => {
  try {
    res.json(await Coupon.findByIdAndDelete(req.params.couponId).exec());
  } catch (error) {
    console.log(error);
  }
};

exports.list = async (req, res) => {
  try {
    res.json(await Coupon.find({}).sort({ createdAt: -1 }).exec());
  } catch (error) {
    console.log(error);
  }
};
