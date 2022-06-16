const express = require("express");
const router = express.Router();

const {getEmployeeUserById, getEmployeeById, createEmployee, getEmployee, getAllEmployees, updateEmployeeStatus, deleteEmployee, countEmployers, getEmployeeUserByEmail, getAllDeliveries, getCountDeliveries, getCountNewDeliveries, getEmployeeStatus} = require("../controllers/employee");
const {isSignedIn, isAuthenticated, isEmployee, isAdmin} = require("../controllers/auth");
const {getUserById, updateUserRole} = require("../controllers/user");

// middleware
router.param("userId", getUserById);
router.param("employeeUserId", getEmployeeUserById);
router.param("employeeUserEmail", getEmployeeUserByEmail);
router.param("employeeId", getEmployeeById);

// routes
// create employee
router.post("/employee/create/:employeeUserEmail/:userId", isSignedIn, isAuthenticated, isAdmin, updateUserRole, createEmployee);

// getEmployee
router.get("/employee/:employeeId/:userId", isSignedIn, isAuthenticated, isAdmin, getEmployee);

// getAllEmployees
router.get("/employees/:status/:userId", isSignedIn, isAuthenticated, isAdmin, getAllEmployees);

// updateEmployeeStatus
router.put("/employee/:employeeId/:userId", isSignedIn, isAuthenticated, isEmployee, updateEmployeeStatus);

// deleteEmployee
router.delete("/employee/:employeeId/:userId", isSignedIn, isAuthenticated, isAdmin, deleteEmployee);

// countEmployee
router.get("/employers/countemployers/:userId", isSignedIn, isAuthenticated, isAdmin, countEmployers);

// getAllDelveries
router.get("/employee/alldeliveries/:employeeUserId/:userId", isSignedIn, isAuthenticated, isEmployee, getAllDeliveries);

// getCountDeliveries
router.get("/employee/countdeliveries/:employeeUserId/:userId", isSignedIn, isAuthenticated, isEmployee, getCountDeliveries);

// getCountDeliveries
router.get("/employee/countnewdeliveries/:employeeUserId/:userId", isSignedIn, isAuthenticated, isEmployee, getCountNewDeliveries);

// getEmployeeStatus
router.get("/employee/status/:employeeUserId/:userId", isSignedIn, isAuthenticated, isEmployee, getEmployeeStatus);

module.exports = router;