const express = require("express");

const router = express.Router();
//import middleware
const { authCheck, adminCheck } = require("../middleware/auth");
//import controller
const { upload, remove } = require("../controllers/S3");

router.post("/uploadimages", authCheck, adminCheck, upload);
router.post("/removeimages", authCheck, adminCheck, remove);

module.exports = router;
