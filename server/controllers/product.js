const Product = require("../models/product");
const User = require("../models/user");
// const multer = require("multer");
const fs = require("fs");
const path = require("path");

// createProduct
exports.createProduct = async (req, res) => {
  try {
    var obj = {
      pName: req.body.pName,
      pDescription: req.body.pDescription,
      pPrice: req.body.pPrice,
      pStock: req.body.pStock,
      pCategory: req.body.pCategory,
      pStatus: req.body.pStatus,
      pImg: {
        data: fs.readFileSync(
          // path.join(__dirname + "/uploads/" + req.file.filename)
          path.join(process.cwd() + "/uploads/" + req.file.filename)
        ),
        contentType: "image/jpeg",
      },
    };
    const product = await Product.create(obj);
    await product.save();

    return res.json(product);
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      message: "Failed to create a product in DB",
    });
  }
};

// getProductById
exports.getProductById = async (req, res, next, id) => {
  try {
    const product = await Product.findById({ _id: id });
    req.product = product;
    next();
  } catch (error) {
    return res.status(400).json({
      message: "Failed to find the product from DB",
    });
  }
};

// getProduct
exports.getProduct = async (req, res) => {
  try {
    await res.json(req.product);
  } catch (error) {
    return res.status(400).json({
      message: "Failed to get the product from DB",
    });
  }
};

// updateProduct
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      { _id: req.product._id },
      { $set: req.body },
      { new: true, useFindAndModify: false }
    );
    await product.save();
    return res.json({
      message: "Product updation successfull",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Failed to update the product from DB",
    });
  }
};

// deleteProduct
exports.deleteProduct = async (req, res) => {
  try {
    await Product.deleteOne({ _id: req.product._id });

    return res.json({
      message: "Product deleted successfully from Db",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Failed to Delete product from DB",
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.json(products);
  } catch (error) {
    return res.json({
      message: "No users found in DB",
    });
  }
};

exports.getAllCategoryProducts = async (req, res) => {
  try {
    const products = await Product.find({ pCategory: req.product.pCategory });
    return res.json(products);
  } catch (error) {
    return res.json({
      message: "No products found in DB",
    });
  }
};

// updateStock-middleware
exports.updateStock = async (req, res, next) => {
  const response = await User.findById(
    { _id: req.profile._id },
    "cart"
  ).populate("cart.product");
  cart = response.cart;

  console.log("cart", cart);

  let myoperations = cart.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod.product },
        update: { $inc: { pStock: -prod.quantity, pSold: +prod.quantity } },
      },
    };
  });

  Product.bulkWrite(myoperations, {}, (err, products) => {
    if (err) {
      return res.status(400).json({
        error: "Bulk operation failed",
      });
    }
    next();
  });
};

// middleware
exports.photo = (req, res, next) => {
  if (req.product.pImg.data) {
    res.set("Content-Type", req.product.pImg.contentType);
    return res.send(req.product.pImg.data);
    next();
  }
};
