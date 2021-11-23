const express = require("express");

const router = express.Router();
//import middleware
const { authCheck, adminCheck } = require("../middleware/auth");
//import controller
const { create, read, update, remove, list } = require("../controllers/subCat");

router.post("/subcat", authCheck, adminCheck, create);
router.get("/subcats", list);
router.get("/subcat/:slug", read);
router.put("/subcat/:slug", authCheck, adminCheck, update);
router.delete("/subcat/:slug", authCheck, adminCheck, remove);

module.exports = router;
