const express = require("express");

const router = express.Router();
//import middleware
const { authCheck, adminCheck } = require("../middleware/auth");
//import controller
const { createUpdateUser, currentUser } = require("../controllers/auth");
//create or update user
router.post("/createUpdateUser", authCheck, createUpdateUser);
//current user
router.post("/currentUser", authCheck, currentUser);

router.post("/currentAdmin", authCheck, adminCheck, currentUser);

module.exports = router;
