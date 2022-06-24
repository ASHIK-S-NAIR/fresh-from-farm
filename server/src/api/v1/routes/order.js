const express = require("express");
const router = express.Router();

const {
  getOrderById,
  createOrder,
  getOrder,
  getAllOrders,
  deleteOrder,
  updateOrder,
  razorPayOrder,
  paymentVerify,
  countOrders,
  testRouteFunction,
  updateOrderStatus,
  updatePaymentStatus,
} = require("../controllers/order");
const { getUserById } = require("../controllers/user");
const {
  isSignedIn,
  isAuthenticated,
  isAdmin,
  isEmployee,
} = require("../controllers/auth");
const { updateStock } = require("../controllers/product");

// param
router.param("userId", getUserById);
router.param("orderId", getOrderById);

// routes
// create order
router.post(
  "/order/create/:userId",
  isSignedIn,
  isAuthenticated,
  updateStock,
  createOrder
);

// getOrder
router.get("/order/:orderId/:userId", isSignedIn, isAuthenticated, getOrder);

// getAllOrders
router.get(
  "/orders/:status/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAllOrders
);

// deleteOrder
router.delete(
  "/order/:orderId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteOrder
);

// AdminUpdateOrderStatus
router.put(
  "/order/adminupdateorderstatus/:orderId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateOrderStatus
);

// AdminUpdatePaymentStatus
router.put(
  "/order/adminupdatepaymentstatus/:orderId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updatePaymentStatus
);

// EmployeeUpdateOrderStatus
router.put(
  "/order/employeeupdateorderstatus/:orderId/:userId",
  isSignedIn,
  isAuthenticated,
  isEmployee,
  updateOrderStatus
);

// EmployeeUpdatePaymentStatus
router.put(
  "/order/employeeupdatepaymentstatus/:orderId/:userId",
  isSignedIn,
  isAuthenticated,
  isEmployee,
  updatePaymentStatus
);

// updateOrderConfirmation
router.put(
  "/order/orderconfirmation/:orderId/:userId",
  isSignedIn,
  isAuthenticated,
  updateOrder
);

// countOrders
router.get(
  "/order/orders/countorders/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  countOrders
);

// razorPayOrder
router.post("/order/razorpayorder", razorPayOrder);

// payment Verify
router.post("/order/verify", paymentVerify);

module.exports = router;
