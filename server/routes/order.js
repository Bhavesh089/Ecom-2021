const express = require("express");

const router = express.Router();
const { authCheck, adminCheck } = require("../middleware/auth");

const {
  getOrder,
  updateOrder,
  getOrders,
  orders,
  orderStatus,
} = require("../controllers/order");

router.get("/user/order/:orderId", authCheck, getOrder);
router.put("/user/order", authCheck, updateOrder);
router.get("/user/orders", authCheck, getOrders);

//for admin
router.get("/admin/orders", authCheck, adminCheck, orders);
router.put("/admin/order-status", authCheck, adminCheck, orderStatus);

module.exports = router;
