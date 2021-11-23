const express = require("express");

const router = express.Router();
const { authCheck, adminCheck } = require("../middleware/auth");

const { createPayment, verifyPayment } = require("../controllers/payment");

router.post("/user/payment", authCheck, createPayment);
router.post("/user/payment/callback", verifyPayment);

module.exports = router;
