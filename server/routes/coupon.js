const express = require("express");

const router = express.Router();
//import middleware
const { authCheck, adminCheck } = require("../middleware/auth");
//import controller
const { create, remove, list } = require("../controllers/coupon");

router.post("/coupon", authCheck, adminCheck, create);
router.get("/coupons", list);
router.delete("/coupons/:couponId", authCheck, adminCheck, remove);

module.exports = router;
