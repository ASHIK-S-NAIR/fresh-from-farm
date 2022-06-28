const express = require("express");
const router = express.Router();
const multer = require("multer");
// const uuid = require("uuid");
// const { v4 } = uuid;


const {
  getProductById,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  photo,
  countProducts,
} = require("../controllers/product");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

var upload = multer({ dest: "uploads/" });

// param
router.param("userId", getUserById);
router.param("productId", getProductById);

// routes
// createProduct
router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  upload.single("pImg"),
  createProduct
);

// getProduct
router.get("/product/:productId", getProduct);

// updateProduct
router.put(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);

// deleteProduct
router.delete(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteProduct
);

// getAllProducts
router.get("/products/:category", getAllProducts);

// getAllCategoryProducts
// router.get("/categoryproducts/:productId", getAllCategoryProducts);

// getProductPhoto
router.get("/product/photo/:key", photo);

// countProducts
router.get(
  "/products/countproducts/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  countProducts
);

module.exports = router;
