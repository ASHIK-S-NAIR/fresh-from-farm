const User = require("../models/user");
const jwt = require("jsonwebtoken");
const expressJWT = require("express-jwt");

exports.signup = async (req, res) => {
  try {
    const user = await User.create(req.body);
    await user.save();
    user.encry_password = undefined;
    user.createdAt = undefined;
    user.updatedAt = undefined;
    return res.json(user);
  } catch (error) {
    return res.status(400).json({
      message: "Failed to create a user in DB",
    });
  }
};

exports.login = async (req, res) => {
  // try {
  //   if (!req.body.email) {
  //     return res.status(400).json({
  //       message: "Email not found",
  //     });
  //   }

  //   const user = await User.findOne({ email: req.body.email });

  //   if (!user) {
  //     return res.status(400).json({
  //       error: "User with this email not found",
  //     });
  //   }

  //   if (!req.body.password) {
  //     return res.status(400).json({
  //       error: "Password not found",
  //     });
  //   }

  //   if (!user.authenticate(req.body.password)) {
  //     return res.status(400).json({
  //       error: "Email and password does not match",
  //     });
  //   }

  //   const token = jwt.sign({ _id: user._id }, process.env.SECRET);
  //   res.cookie("token", token, { expire: new Date() + 9999 });

  //   const {_id, name, email, role} = user;

  //   return res.json({ token, user: { _id, name, email, role } });
  // } catch (error) {
  //   console.log(error.message);
  //   return res.status(400).json({
  //     error: "Failed to Login In",
  //   });
  // }

  try {
  const { email, password } = req.body;

  const user = await User.findOne({ email })

  if (!user) {
    return res.status(400).json({
      error: "Invalid email or password",
    });
  }

  if ( await user.authenticate(password)) {
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    res.cookie("token", token, { expire: new Date() + 9999 });

    const { _id, name, email, role } = user;

    return res.json({ token, user: { _id, name, email, role } });
  }

  return res.status(400).json({
    error: "Invalid email or password",
  });
} catch (error) {
  console.log(error.message)
  return res.status(400).json({
    error: "Invalid email or password, reached here",
  });
}
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({
    message: "Logged out successfully",
  });
};

// isSignedIN
exports.isSignedIn = expressJWT({
  secret: process.env.SECRET,
  algorithms: ["HS256"],
});

// isAuthenticated
exports.isAuthenticated = (req, res, next) => {
  const checker = req.profile && req.user && req.profile._id == req.user._id;
  if (!checker) {
    return res.status(403).json({
      message: "Authentication failed",
    });
  }
  next();
};

// isAdmin
exports.isAdmin = (req, res, next) => {
  if (req.profile.role !== 2) {
    return res.status(403).json({
      message: "You are not admin, Access denied",
    });
  }
  next();
};

// isEmployee
exports.isEmployee = (req, res, next) => {
  if (req.profile.role !== 1) {
    return res.status(403).json({
      message: "You are not employee, Access denied",
    });
  }
  next();
};

// isCustomer
exports.isCustomer = (req, res, next) => {
  if (req.profile.role !== 0) {
    return res.status(403).json({
      message: "You are not custoer, Access denied",
    });
  }
  next();
};
