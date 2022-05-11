const User = require("../models/user");

// getUserById- Middleware
exports.getUserById = async (req, res, next, id) => {
  try {
    const user = await User.findById({ _id: id });
    req.profile = user;
    next();
  } catch (error) {
    return res.status(400).json({
      message: "User by this id not found in the DB",
    });
  }
};

// updateUserRole- Middleware
exports.updateUserRole = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.employeeUser._id },
      { $set: { role: req.body.role } },
      { new: true, useFindAndModify: false }
    );
    await user.save();
    next();
  } catch (error) {
    return res.status(400).json({
      message: "Updating user role failed",
    });
  }
};

// addToUserCart
exports.addToUserCart = async (req, res) => {
  try {
    const response = await User.findById({ _id: req.profile._id }, "cart");

    cart = response.cart;

    if (cart.length == 0) {
      cart.push({ product: req.body.productId, quantity: req.body.quantity });
      await User.findByIdAndUpdate(
        { _id: req.profile._id },
        { $set: { cart: cart } },
        { new: true, useFindAndModify: false }
      );
      return res.json({
        message: "Successfully added to cart",
      });
    }

    const cartItem = cart.find(
      (cartItem) => cartItem.product == req.body.productId
    );

    if (cartItem) {
      cart.map((cartItem) => {
        if (cartItem.product == req.body.productId) {
          cartItem.quantity =
            parseInt(cartItem.quantity) + parseInt(req.body.quantity);
        }
      });

      await User.findByIdAndUpdate(
        { _id: req.profile._id },
        { $set: { cart } },
        { new: true, useFindAndModify: false }
      );

      return res.json({
        message: "Successfully added to cart",
      });
    }

    cart.push({
      product: req.body.productId,
      quantity: req.body.quantity,
    });

    await User.findByIdAndUpdate(
      { _id: req.profile._id },
      { $set: { cart } },
      { new: true, useFindAndModify: false }
    );

    return res.json({
      message: "Successfully added to cart",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Adding to cart failed",
    });
  }
};

// updateFromUserCart
exports.updateFromUserCart = async (req, res) => {
  try {
    response = await User.findById({ _id: req.profile._id }, "cart");

    cart = response.cart;

    cart.map((cartItem) => {
      if (cartItem.product == req.body.productId) {
        cartItem.quantity = req.body.quantity;
      }
    });

    await User.findByIdAndUpdate(
      { _id: req.profile._id },
      { $set: { cart } },
      { new: true, useFindAndModify: false }
    );

    return res.json({
      message: "Successfully updated from cart",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Updating from cart failed",
    });
  }
};

// deleteFromUserCart
exports.deleteFromUserCart = async (req, res) => {
  try {
    response = await User.findById({ _id: req.profile._id }, "cart");

    cart = response.cart;

    cart = cart.filter((cartItem) => cartItem.product != req.body.productId);

    await User.findByIdAndUpdate(
      { _id: req.profile._id },
      { $set: { cart } },
      { new: true, useFindAndModify: false }
    );

    return res.json({
      message: "Successfully deleted from cart",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Deleting from cart failed",
    });
  }
};

// getUser
exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;

  return res.json(req.profile);
};

// getUserCart
exports.getUserCart = async (req, res) => {
  try {
    var response = await User.findById(
      { _id: req.profile._id },
      { cart: 1, _id: 0 }
    ).populate("cart.product");
    // console.log(typeof response);
    // response = response.cart.map((cartItem) => {
    //   delete cartItem.product["pImg"];
    //   return cartItem;
    // });

    for(i =0;  i<response.cart.length; i++){
      // console.log(response.cart[i].product.pName);
      delete response.cart[i].product.pImg
    }
    // console.log(response);
    res.json(response);
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      message: "Fetching cart failed",
    });
  }
};

// getAllUsers
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (error) {
    return res.json({
      message: "No users found in DB",
    });
  }
};

// updateUser
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.profile._id },
      { $set: req.body },
      { new: true, useFindAndModify: false }
    );
    await user.save();
    return res.json({
      message: "User updation successfull",
    });
  } catch (error) {
    return res.status(400).json({
      message: "User updation failed",
    });
  }
};

// changePassword
exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findOne({ email: req.profile.email });

    if (!user) {
      return res.status(400).json({
        error: "Invalid email or password",
      });
    }

    if (!(await user.authenticate(oldPassword))) {
      return res.status(400).json({
        error: "Invalid old Password",
      });
    }

    const updatedPassordEncry = await user.securePassword(newPassword);
    if (updatedPassordEncry) {
      const userDetail = await User.findByIdAndUpdate(
        { _id: req.profile._id },
        { $set: { encry_password: updatedPassordEncry } },
        { new: true, useFindAndModify: false }
      );
      await userDetail.save();
      return res.json({
        message: "Password updation successfull",
      });
    }

    return res.status(400).json({
      error: "Password updation failed",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      error: "Invalid request",
    });
  }
};

// deleteUser
exports.deleteUser = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.profile._id });

    return res.json({
      message: "User successfully deleted from DB",
    });
  } catch (error) {
    return res.status(400).json({
      message: "User deletion failed",
    });
  }
};
