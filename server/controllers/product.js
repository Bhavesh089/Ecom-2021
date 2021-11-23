const slugify = require("slugify");
const product = require("../models/product");
const Product = require("../models/product");

exports.create = async (req, res) => {
  try {
    req.body.product.slug = slugify(req.body.product.title);
    console.log(req.body);
    const newProduct = await new Product(req.body.product).save();
    res.status(201).send(newProduct);
  } catch (err) {
    console.log(err);
    console.log(req.body);
    res.status(400).send({
      err: err.message,
    });
  }
};

exports.listAll = async (req, res) => {
  try {
    let products = await Product.find({})
      .limit(parseInt(req.params.count))
      .populate("category")
      .populate("subCat")
      .sort([["createdAt", "desc"]])
      .exec();
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    console.log(req.body);
    res.status(400).send({
      err: err.message,
    });
  }
};

//remove category
exports.remove = async (req, res) => {
  try {
    //name of the category
    const productName = req.params.slug;
    await Product.findOneAndDelete({ slug: productName });
    res.json(` ${productName} Product has been deleted `);
  } catch (error) {
    console.log(error);
    res.status(400).send("Unable to delete at this moment");
  }
};

exports.read = async (req, res) => {
  try {
    let products = await Product.findOne({ slug: req.params.slug })
      .limit(parseInt(req.params.count))
      .populate("category")
      .populate("subCat")
      .exec();
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    console.log(req.body);
    res.status(400).send({
      err: err.message,
    });
  }
};

exports.update = async (req, res) => {
  try {
    //update the category
    console.log(req.body.product);
    const updateProduct = await Product.findOneAndUpdate(
      { slug: req.params.slug }, //find slug which is product name
      req.body.product, //update the product name, getting from post request
      { new: true }
    );

    res.json(updateProduct);
  } catch (error) {
    console.log(error);
    res.status(400).send("Update product failed");
  }
};

//new arrival without pagination
exports.list = async (req, res) => {
  try {
    const { sort, order, limit } = req.body;

    const products = await Product.find({})
      .populate("category")
      .populate("subs")
      .sort([[sort, order]])
      .limit(limit)
      .exec();

    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(400).send("Update product failed");
  }
};

//new arrival with pagination
// exports.list = async (req, res) => {
//   try {
//     const { sort, order, page } = req.body;
//     const currentPage = page || 1;
//     const perPage = 4;

//     const products = await Product.find({})
//       .skip((currentPage - 1) * perPage)
//       .populate("category")
//       .populate("subs")
//       .sort([[sort, order]])
//       .limit(perPage)
//       .exec();

//     res.json(products);
//   } catch (error) {
//     console.log(error);
//     res.status(400).send("Update product failed");
//   }
// };

//best seller
exports.productsCount = async (req, res) => {
  try {
    const products = await Product.find({}).estimatedDocumentCount().exec();
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(400).send("error occured");
  }
};

// //best realted
// exports.listRelated = async (req, res) => {
//   try {

//     const products = await Product.findById(req.params.productId).exec();

//     const related = await Product.find({
//       id: { $ne: products._id },
//       category: products.category,
//     })
//       .limit(3)
//       .populate("category")
//       .populate("subCat")
//       .populate("postedBy")
//       .exec();
//     res.json(related);
//   } catch (error) {
//     console.log(error);
//     res.status(400).send("error occured");
//   }
// };

//best related without pagination
exports.listRelated = async (req, res) => {
  try {
    const { limit } = req.body;

    const products = await Product.findById(req.params.productId).exec();

    const related = await Product.find({
      _id: { $ne: products._id },
      category: products.category,
    })
      .limit(limit)
      .populate("category")
      .populate("subCat")
      .populate("postedBy")
      .exec();
    res.json(related);
  } catch (error) {
    console.log(error);
    res.status(400).send("error occured");
  }
};

//best realted with pagination
// exports.listRelated = async (req, res) => {
//   try {
//     const { page } = req.body;
//     const currentPage = page || 1;
//     const perPage = 4;

//     const products = await Product.findById(req.params.productId).exec();

//     const related = await Product.find({
//       _id: { $ne: products._id },
//       category: products.category,
//     })
//       .skip((currentPage - 1) * perPage)
//       .limit(perPage)
//       .populate("category")
//       .populate("subCat")
//       .populate("postedBy")
//       .exec();
//     res.json(related);
//   } catch (error) {
//     console.log(error);
//     res.status(400).send("error occured");
//   }
// };

//best realted count
exports.listRelatedCount = async (req, res) => {
  try {
    const products = await Product.findById(req.params.productId).exec();

    const related = await Product.find({
      _id: { $ne: products._id },
      category: products.category,
    })
      .count()
      .exec();
    res.json(related);
  } catch (error) {
    console.log(error);
    res.status(400).send("error occured");
  }
};

const handleQuery = async (req, res, query) => {
  const searchProducts = await Product.find({ $text: { $search: query } })
    .populate("category", "_id name")
    .populate("subCat", "_id name")
    .exec();

  res.json(searchProducts);
};

const handleCategory = async (req, res, category) => {
  try {
    let products = await Product.find({ category })
      .populate("category", "_id name")
      .populate("subCat", "_id name")
      .exec();

    res.json(searchProducts);
  } catch (error) {
    console.log(err);
  }
};

//search filter

exports.searchFilters = async (req, res) => {
  const { query, category } = req.body;

  if (query) {
    console.log("query", query);
    await handleQuery(req, res, query);
  }
  if (category) {
    console.log("category ---->", category);
    await handleCategory(req, res, category);
  }
};
