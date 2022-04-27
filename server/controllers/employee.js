const Employee = require("../models/employee");
const User = require("../models/user");

exports.getEmployeeUserById = async (req, res, next, id) => {
  try {
    const employeeUser = await User.findById({ _id: id });
    req.employeeUser = employeeUser;
    // console.log("employee user", employeeUser);
    next();
  } catch (error) {
    return res.status(400).json({
      message: "Failed to find employeeUser Id from DB",
    });
  }
};

exports.getEmployeeById = async (req, res, next, id) => {
  try {
    const employee = await Employee.findById({ _id: id }).populate({
      path: "Euser",
      select: "name email phoneNumber role address",
    });
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
    const employees = await Employee.find();
    return res.json(employees);
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
    console.log(error.message)
    return res.status(400).json({
      message: "Failed to update employee status in DB",
    });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.employee.Euser});
    await Employee.findByIdAndUpdate(
      {_id: req.employee._id},
      {$set: {Estatus: "Deleted"}},
      {new: true, useFindAndModify: false}
      )

    return res.json({
      message: "Employee deleted from Database successfully",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Failed to delete employee from DB",
    });
  }
};
