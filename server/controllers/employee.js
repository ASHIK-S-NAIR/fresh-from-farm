const Employee = require("../models/employee");
const User = require("../models/user");
const Order = require("../models/order");

exports.getEmployeeUserById = async (req, res, next, id) => {
  try {
    const employeeUser = await User.findById({ _id: id });
    req.employeeUser = employeeUser;
    next();
  } catch (error) {
    return res.status(400).json({
      message: "Failed to find employeeUser Id from DB",
    });
  }
};

exports.getEmployeeUserByEmail = async (req, res, next, email) => {
  try {
    const employeeUser = await User.findOne({ email: email });
    req.employeeUser = employeeUser;
    next();
  } catch (error) {
    return res.status(400).json({
      message: "Failed to find employeeUser email from DB",
    });
  }
};

exports.getEmployeeById = async (req, res, next, id) => {
  try {
    const employee = await Employee.findById({ _id: id }).populate({
      path: "Euser",
      select: "name email phoneNumber role address _id",
    });
    console.log("EmployeeId", employee._id);
    req.employee = employee;
    next();
  } catch (error) {
    return res.status(400).json({
      message: "Failed to find employeeId from DB",
    });
  }
};

exports.createEmployee = async (req, res) => {
  try {
    const employee = await Employee.create({
      Euser: req.employeeUser._id,
    });
    await employee.save();
    return res.json({
      message: "Employee creation successfull",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Employee creation Failed",
    });
  }
};

exports.getEmployee = (req, res) => {
  return res.json(req.employee);
};

exports.getAllEmployees = async (req, res) => {
  try {
    const { status } = req.params;
    if (status == "all") {
      const employees = await Employee.find({}).populate("Euser");
      return res.json(employees);
    } else {
      const employees = await Employee.find({ Estatus: status }).populate(
        "Euser"
      );
      return res.json(employees);
    }
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      message: "NO employees found in DB",
    });
  }
};

exports.updateEmployeeStatus = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      { _id: req.employee._id },
      { $set: { Estatus: req.body.Estatus } },
      { new: true, useFindAndModify: false }
    );

    await employee.save();

    return res.json({
      message: "Status updated successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      message: "Failed to update employee status in DB",
    });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.employee.Euser });
    await Employee.deleteOne({ _id: req.employee._id });

    return res.json({
      message: "Employee deleted from Database successfully",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Failed to delete employee from DB",
    });
  }
};

// countEmployers
exports.countEmployers = async (req, res) => {
  try {
    const count = await Employee.countDocuments({});
    return res.json(count);
  } catch (error) {
    return res.status(400).json("Failed to count Employers");
  }
};

// getAllDeleveries
exports.getAllDeliveries = async (req, res) => {
  try {
    const deliveries = await Employee.findOne({
      Euser: req.employeeUser._id,
    }).select("Eorders");
    return res.json(deliveries);
  } catch (error) {
    console.log("error Message", error.message);
    return res.status(400).json("Failed to find Employee Deliveries");
  }
};

// getCountDeliveries
exports.getCountDeliveries = async (req, res) => {
  try {
    const deliveries = await Employee.findOne({
      Euser: req.employeeUser._id,
    }).select("Eorders");
    return res.json(deliveries.Eorders.length);
  } catch (error) {
    console.log("error Message", error.message);
    return res.status(400).json("Failed to find Employee Deliveries");
  }
};

// getCountDeliveries
exports.getCountNewDeliveries = async (req, res) => {
  try {
    const deliveries = await Employee.findOne({
      Euser: req.employeeUser._id,
    })
      .populate("Eorders.EorderId")
      .select("Eorders");
    const countNewDeliveries = deliveries.Eorders.filter((order) => {
      return order.Ostatus === "Processing";
    });
    console.log(countNewDeliveries.length);
    return res.json(countNewDeliveries.length);
  } catch (error) {
    console.log("error Message", error.message);
    return res.status(400).json("Failed to find Employee Deliveries");
  }
};

// getEmployeeStatus
exports.getEmployeeStatus = async (req, res) => {
  try {
    const status = await Employee.findOne({
      Euser: req.employeeUser._id,
    }).select("Estatus");
    console.log(status);
    return res.json(status.Estatus);
  } catch (error) {
    console.log("error Message", error.message);
    return res.status(400).json("Failed to find Employee Deliveries");
  }
};

exports.addEmplyeeOrder = async (req, res) => {
  console.log("Happy employee controller")
  try {
    const order = await Order.findById(req.order._id).populate("Ouser");
    const employee = await Employee.findById(req.employee._id);
    var Eorders = employee.Eorders;
    Eorders.push({
      EorderId: order._id,
      EorderTotal: order.OtotalPrice,
      EorderPhoneNumber: order.Ouser.phoneNumber,
      EorderAddress: order.Oaddress,
    });

    await Employee.findByIdAndUpdate(
      { _id: req.employee._id },
      { $set: { Eorders: Eorders } },
      { new: true, useFindAndModify: false }
    );

    return res.json("Employee order updated successfully")
  } catch (error) {
    console.log("ErrorMessageEmployee", error.message)
    return res.status(400).json("Failed to add employee Order");
  }
};
