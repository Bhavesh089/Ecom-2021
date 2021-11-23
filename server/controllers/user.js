const User = require("../models/user");
const Product = require("../models/product");
const Cart = require("../models/cart");
const Coupon = require("../models/coupon");

exports.userCart = async (req, res) => {
  // console.log(req.body)
  const { cart } = req.body;

  let products = [];

  const user = await User.findOne({ email: req.user.email }).exec();

  //check if cart with logged in user id already exist
  let cartExistByThisUser = await Cart.findOne({ orderedBy: user._id }).exec();

  if (cartExistByThisUser) {
    cartExistByThisUser.remove();
    console.log("removed cart");
  }
  for (let i = 0; i < cart.length; i++) {
    let object = {};
    object.product = cart[i]._id;
    object.count = cart[i].count;
    object.color = cart[i].color;
    //get price for creating total
    let productFromDb = await Product.findById(cart[i]._id)
      .select("price.ind offerPrice.ind")
      .exec();
    console.log(productFromDb, "------->");
    if (productFromDb.offerPrice.ind !== null && productFromDb.offerPrice.ind) {
      object.offerPrice = productFromDb.offerPrice;
      products.push(object);
    } else {
      object.price = productFromDb.price;
      products.push(object);
    }
  }
  console.log("products----> ", products);
  let cartTotal = 0;
  for (let i = 0; i < products.length; i++) {
    if (products[i].offerPrice) {
      cartTotal = cartTotal + products[i].offerPrice.ind * products[i].count;
    } else {
      cartTotal = cartTotal + products[i].price.ind * products[i].count;
    }
  }
  console.log("cartTotal", cartTotal);

  let newCart = await new Cart({
    products,
    cartTotal,
    orderedBy: user._id,
  }).save();
  console.log(newCart);
  res.json({ ok: true });
};

//get User cart
exports.getUserCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();

  let cart = await Cart.findOne({ orderedBy: user._id })
    .populate("products.product", "_id title price totalAfterDiscount")
    .exec();

  const { products, cartTotal, totalAfterDiscount } = cart;
  res.json({ products, cartTotal, totalAfterDiscount });
};

//get User cart
exports.emptyCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();

  let cart = await Cart.findOneAndRemove({ orderedBy: user._id }).exec();

  res.json(cart);
};

//get User cart
exports.saveShipping = async (req, res) => {
  const shippingDetails = await User.findOne({ email: req.user.email }).exec();

  let shippingData = shippingDetails.shipping;

  if (shippingData === []) {
    await User.findOneAndUpdate(
      { email: req.user.email },
      { shipping: req.body.shippingAddress }
    );
  } else {
    shippingData.push(req.body.shippingAddress);

    await User.findOneAndUpdate(
      { email: req.user.email },
      { shipping: shippingData }
    );
  }

  // console.log(shipping);

  res.json({ ok: true });
};

//get User cart
exports.getShipping = async (req, res) => {
  const { shipping } = await User.findOne({ email: req.user.email }).exec();

  console.log(shipping, "shippingDetails");

  res.json({ shipping });
};

//get User cart
exports.selectShipping = async (req, res) => {
  console.log(req.body.shippingAddress, "reuest body------>");

  const user = await User.findOne({ email: req.user.email }).exec();

  const shippingSelected = await Cart.findOneAndUpdate(
    { orderedBy: user._id },
    { toAddress: req.body.shippingAddress },
    { new: true }
  );

  console.log(shippingSelected, "Selected Shipping");

  res.json({ shippingSelected });
};

exports.applyCouponToUserCart = async (req, res) => {
  const { coupon } = req.body;
  console.log("COUPON", coupon);
  const user = await User.findOne({ email: req.user.email }).exec();

  const validCoupon = await Coupon.findOne({ name: coupon }).exec();
  if (validCoupon === null) {
    await Cart.findOneAndUpdate(
      { orderedBy: user._id },
      { totalAfterDiscount: 0 },
      { new: true }
    );

    return res.json({
      err: "Invalid coupon",
    });
  }
  console.log("VALID COUPON");

  let { products, cartTotal } = await Cart.findOne({
    orderedBy: user._id,
  })
    .populate("products.product", "_id title price")
    .exec();

  console.log("Carttotal", cartTotal, "discount", validCoupon.discount);

  //total calculate
  let totalAfterDiscount = (
    cartTotal -
    (cartTotal * validCoupon.discount) / 100
  ).toFixed(2);

  //updateCart
  await Cart.findOneAndUpdate(
    { orderedBy: user._id },
    { totalAfterDiscount },
    { new: true }
  );

  res.json({ totalAfterDiscount });
};

//wishList
//get User cart
exports.addToWishlist = async (req, res) => {
  const { productId } = req.body;

  const user = await User.findOneAndUpdate(
    { email: req.user.email },
    { $addToSet: { wishlist: productId } },
    { new: true }
  ).exec();

  res.json({ ok: true });
};

exports.wishlist = async (req, res) => {
  const list = await User.findOne({ email: req.user.email })
    .select("wishlist")
    .populate("wishlist")
    .exec();

  res.json(list);
};

exports.removeFromWishlist = async (req, res) => {
  const { productId } = req.params;

  const list = await User.findOneAndUpdate(
    { email: req.user.email },
    { $pull: { wishlist: productId } }
  ).exec();

  res.json({ ok: true });
};
