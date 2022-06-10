const express = require('express');
const router = express.Router();

const {getOrderById, createOrder, getOrder, getAllOrders, deleteOrder, updateOrder, razorPayOrder, paymentVerify, countOrders, testRouteFunction, updateOrderStatus} = require('../controllers/order');
const {getUserById} = require('../controllers/user');
const {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth");
const {updateStock} = require("../controllers/product");

// param
router.param("userId", getUserById);
router.param("orderId", getOrderById);

// routes
// create order
router.post("/order/create/:userId", isSignedIn, isAuthenticated, updateStock, createOrder);

// getOrder
router.get("/order/:orderId/:userId", isSignedIn, isAuthenticated, getOrder);

// getAllOrders
router.get("/orders/:status/:userId", isSignedIn, isAuthenticated, isAdmin, getAllOrders);



// deleteOrder
router.delete("/order/:orderId/:userId", isSignedIn, isAuthenticated, isAdmin, deleteOrder);

// updateOrderStatus
router.put("/order/updatestatus/:orderId/:userId", isSignedIn, isAuthenticated, isAdmin, updateOrderStatus);

// updateOrderConfirmation
router.put("/order/orderconfirmation/:orderId/:userId", isSignedIn, isAuthenticated, updateOrder);

// countOrders
// router.get("/orders/countorders/:userId", isSignedIn, isAuthenticated, isAdmin, countOrders);
router.get("/orders/countorders/:userId", isSignedIn, isAuthenticated, isAdmin, testRouteFunction);

// razorPayOrder
router.post("/order/razorpayorder", razorPayOrder);

// payment Verify
router.post("/order/verify", paymentVerify);

module.exports = router;