const express = require("express");

const router = express.Router();
//import middleware
const { authCheck, adminCheck } = require("../middleware/auth");
//import controller
const {
  create,
  listAll,
  remove,
  read,
  update,
  list,
  productsCount,
  listRelated,
  listRelatedCount,
  searchFilters,
} = require("../controllers/product");

router.post("/product", authCheck, adminCheck, create);
router.get("/products/total", productsCount);
router.get("/products/:count", listAll);
router.delete("/product/:slug", authCheck, adminCheck, remove);
router.get("/product/:slug", read);
router.put("/product/:slug", authCheck, adminCheck, update);
router.post("/products", list);
//related
router.post("/product/related/:productId", listRelated);
router.get("/product/relatedcount/:productId", listRelatedCount);

//search
router.post("/search/filters", searchFilters);
module.exports = router;
