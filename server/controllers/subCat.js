const subCat = require("../models/subCategory");
const slugify = require("slugify");
const Product = require("../models/product");
//create a subCategory
exports.create = async (req, res) => {
  try {
    //name of the category
    const { name, parent } = req.body;
    const createsubCat = await new subCat({
      name,
      parent,
      slug: slugify(name),
    }).save();

    res.json(createsubCat);
  } catch (error) {
    console.log(error);
    res.status(400).send("Create category failed");
  }
};

//get list of category
exports.list = async (req, res) => {
  try {
    const getListsubCat = await subCat.find({}).sort({ createdAt: -1 }).exec();

    res.json({ getListsubCat });
  } catch (error) {
    console.log(error);
    res.status(400).send("Could not get the list of category");
  }
};

//read category
exports.read = async (req, res) => {
  try {
    //name of the category
    const subCatName = req.params.slug;

    //fetch category
    const subsCat = await subCat.findOne({ slug: subCatName }).exec();

    const products = await Product.find({ subCat: subsCat })
      .populate("category")
      .exec();
    res.json({ subsCat, products });

    res.json(subCat, products);
  } catch (error) {
    console.log(error);
    res.status(400).send("couldn't able to fetch data");
  }
};

exports.update = async (req, res) => {
  try {
    //name of the category
    const { name, parent } = req.body;
    //update the category
    const updatesubCat = await subCat.findOneAndUpdate(
      { slug: req.params.slug }, //find slug which is subcat name
      { name, slug: slugify(name), parent }, //update the subcat name, getting from post request

      { new: true }
    );

    res.json(updatesubCat);
  } catch (error) {
    console.log(error);
    res.status(400).send("Update sub category failed");
  }
};

//remove product
exports.remove = async (req, res) => {
  try {
    //name of the category
    const subCatName = req.params.slug;
    await subCat.findOneAndDelete({ slug: subCatName });
    res.json(` ${subCatName} subCategory has been deleted `);
  } catch (error) {
    console.log(error);
    res.status(400).send("Unable to delete at this moment");
  }
};
