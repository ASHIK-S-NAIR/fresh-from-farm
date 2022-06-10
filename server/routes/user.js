const express = require("express");
const router = express.Router();

const {getUserById, getUser, getAllUsers, updateUser, deleteUser, addToUserCart,  updateFromUserCart, deleteFromUserCart, changePassword, getUserCart, updateQuantity, countCustomers, getUserOrders} = require("../controllers/user");
const {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth");

// params
router.param('userId', getUserById);

// routes
// getUser
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);

// getUserCart
router.get("/user/cart/:userId", isSignedIn, isAuthenticated, getUserCart);

// getAllUsers
router.get("/user/allusers/:userId", isSignedIn, isAuthenticated, isAdmin, getAllUsers);

// updateUser
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);

// changePassword
router.put("/user/password/:userId", isSignedIn, isAuthenticated, changePassword);

// deleteUser
router.delete("/user/:userId", isSignedIn, isAuthenticated, deleteUser);

// countCustomers
router.get("/users/countcustomers/:userId", isSignedIn, isAuthenticated, isAdmin, countCustomers);

// addtousercart
router.post("/user/addtocart/:userId", isSignedIn, isAuthenticated, addToUserCart);

// updateusercart
// router.put("/user/cart/:userId", isSignedIn, isAuthenticated, updateQuantity)

// updateFromUserCart
router.post("/user/updatecart/:userId", isSignedIn, isAuthenticated, updateFromUserCart);

// deleteFromUserCart
router.post("/user/deletecart/:userId", isSignedIn, isAuthenticated, deleteFromUserCart);

// getUserOrders
router.get("/user/orders/:userId", isSignedIn, isAuthenticated, getUserOrders);



module.exports = router;