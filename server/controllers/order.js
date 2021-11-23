const Order = require("../models/order");
const User = require("../models/user");
const Cart = require("../models/cart");
const Product = require("../models/product");

exports.getOrder = async (req, res) => {
  try {
    let order = await Order.findById(req.params.orderId);

    console.log(order, "order ------> ");
    res.json(order);
  } catch (err) {
    console.log(err);
    console.log(req.body);
    res.status(400).send({
      err: err.message,
    });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    //create_order
    const user = await User.findOne({ email: req.user.email }).exec();

    console.log(user, "user-->");
    const { products, toAddress } = await Cart.findOne({
      orderedBy: user._id,
    }).exec();

    console.log(products, "--------> products");
    let order = await Order.findByIdAndUpdate(
      req.body.orderId,
      {
        products,
        orderedBy: user._id,
        toAddress,
      },
      { new: true }
    );

    // decrement quantity and increment sold
    let bulkOption = products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product._id }, //item.product
          update: { $inc: { quantity: -item.count }, sold: +item.count },
        },
      };
    });

    let updated = Product.bulkWrite(bulkOption, {});

    console.log("PRODUCT", updated);

    console.log(order, "order ------> ");
    res.json(order);
  } catch (err) {
    console.log(err);
    console.log(req.body);
    res.status(400).send({
      err: err.message,
    });
  }
};

exports.getOrders = async (req, res) => {
  let user = await User.findOne({ email: req.user.email }).exec();

  let userOrders = await Order.find({ orderedBy: user._id })
    .populate("products.product")
    .sort("-createdAt")
    .exec();

  res.json(userOrders);
};

exports.orders = async (req, res) => {
  let allOrders = await Order.find({})
    .populate("products.product")
    .populate("orderedBy")
    .sort("-createdAt")
    .exec();

  res.json(allOrders);
};

exports.orderStatus = async (req, res) => {
  const { orderId, orderStatus } = req.body;

  let updated = await Order.findByIdAndUpdate(
    orderId,
    { orderStatus },
    { new: true }
  ).exec();

  res.json(updated);
};
