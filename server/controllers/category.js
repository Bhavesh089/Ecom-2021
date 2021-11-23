const Category = require("../models/category");
const Product = require("../models/product");

const SubCat = require("../models/subCategory");
const slugify = require("slugify");

//create a catrgory
exports.create = async (req, res) => {
  try {
    //name of the category
    const { name, image } = req.body;
    const category = await new Category({
      name,
      slug: slugify(name),
      image,
    }).save();

    res.json(category);
  } catch (error) {
    console.log(error);
    res.status(400).send("Create category failed");
  }
};

//get list of category
exports.list = async (req, res) => {
  try {
    const getListCategory = await Category.find({})
      .sort({ createdAt: -1 })
      .exec();

    res.json({ getListCategory });
  } catch (error) {
    console.log(error);
    res.status(400).send("Could not get the list of category");
  }
};

//read category
exports.read = async (req, res) => {
  try {
    //name of the category
    const categoryName = req.params.slug;

    //fetch category
    const category = await Category.findOne({ slug: categoryName }).exec();

    const products = await Product.find({ category })
      .populate("category")
      .exec();
    res.json({ category, products });
  } catch (error) {
    console.log(error);
    res.status(400).send("couldn't able to fetch data");
  }
};

exports.update = async (req, res) => {
  try {
    //name of the category
    const { name, catImages } = req.body;

    console.log(catImages);

    //update the category
    const updateCategory = await Category.findOneAndUpdate(
      { slug: req.params.slug }, //find slug which is product name
      { name, slug: slugify(name), image: catImages }, //update the product name, getting from post request
      { new: true }
    );

    res.json(updateCategory);
  } catch (error) {
    console.log(error);
    res.status(400).send("Update category failed");
  }
};

//remove category
exports.remove = async (req, res) => {
  try {
    //name of the category
    const categoryName = req.params.slug;
    await Category.findOneAndDelete({ slug: categoryName });
    res.json(` ${categoryName} Category has been deleted `);
  } catch (error) {
    console.log(error);
    res.status(400).send("Unable to delete at this moment");
  }
};

exports.getSubs = async (req, res) => {
  try {
    //name of the category
    const subCats = await SubCat.find({ parent: req.params._id });
    res.status(200).json(subCats);
  } catch (error) {
    console.log(error);
    res.status(400).send("Unable to fetch all the subcategories");
  }
};
