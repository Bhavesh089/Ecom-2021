const express = require("express");

const router = express.Router();
const { authCheck, adminCheck } = require("../middleware/auth");

const {
  userCart,
  getUserCart,
  emptyCart,
  saveShipping,
  getShipping,
  applyCouponToUserCart,
  selectShipping,
  addToWishlist,
  wishlist,
  removeFromWishlist,
} = require("../controllers/user");

// router.get("/user", (req, res) => {
//   res.send("hey your hitting api");
// });

router.post("/user/shipping", authCheck, saveShipping);
router.get("/user/shipping", authCheck, getShipping);
router.post("/user/selectshipping", authCheck, selectShipping);
router.post("/user/cart", authCheck, userCart);
router.get("/user/cart", authCheck, getUserCart);
router.delete("/user/cart", authCheck, emptyCart);

//coupon
router.post("/user/cart/coupon", authCheck, applyCouponToUserCart);
module.exports = router;

//whishlist

router.post("/user/wishlist", authCheck, addToWishlist);
router.get("/user/wishlist", authCheck, wishlist);
router.put("/user/wishlist/:productId", authCheck, removeFromWishlist);
