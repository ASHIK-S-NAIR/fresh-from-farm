const Order = require("../models/order");
const User = require("../models/user");
const crypto = require("crypto");
const Razorpay = require("razorpay");

// getOrderById - Middleware
exports.getOrderById = async (req, res, next, id) => {
  try {
    const order = await Order.findById({ _id: id }).populate(
      "Ouser Oproducts.product"
    );
    req.order = order;
    next();
  } catch (error) {
    return res.status(400).json({
      message: "failed to get id from DB",
    });
  }
};

// createOrder
exports.createOrder = async (req, res) => {
  try {
    const response = await User.findById(
      { _id: req.profile._id },
      "cart"
    ).populate("cart.product");
    cart = response.cart;

    const { shippingAddress, paymentMode } = req.body;
    // console.log("Order Controller ShippingAddress", shippingAddress);

    if (!(shippingAddress || paymentMode || cart)) {
      return res.status(400).json({
        message: "Invalid Order request",
      });
    }

    // console.log(
    //   `Order Controller ShippingAddress , ${shippingAddress_houseName} ${shippingAddress_streetName}`
    // );

    var totalPrice = 0;
    var Oproducts = [];

    cart.map((cartItem) => {
      totalPrice = totalPrice + cartItem.product.pPrice * cartItem.quantity;

      Oproducts.push({
        pId: cartItem.product._id,
        pName: cartItem.product.pName,
        pDescription: cartItem.product.pDescription,
        pCategory: cartItem.product.pCategory,
        pPrice: cartItem.product.pPrice,
        pQuantity: cartItem.quantity,
        pAmount: cartItem.product.pPrice * cartItem.quantity,
      });
    });

    // console.log("Order Controller ShippingAddress", shippingAddress);

    const order = await Order.create({
      Ouser: req.profile._id,
      Oproducts: Oproducts,
      OtotalPrice: totalPrice,
      Oaddress: {
        houseName: shippingAddress.shippingAddress_houseName,
        streetName: shippingAddress.shippingAddress_streetName,
      },
      Ostatus: "Not-Confirmed",
      OpaymentMode: paymentMode,
      OpaymentStatus: "Pending",
    });

    // console.log(order);

    order.save();

    await User.findByIdAndUpdate(
      { _id: req.profile._id },
      { $set: { cart: [] } },
      { new: true, useFindAndModify: false }
    );

    const OrdersResponse = await User.findById(
      { _id: req.profile._id },
      "orders"
    );

    const orders = OrdersResponse.orders;

    orders.push(order._id);

    await User.findByIdAndUpdate(
      { _id: req.profile._id },
      { $set: { orders } },
      { new: true, useFindAndModify: false }
    );

    return res.json({ order, message: "created order succesfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      message: "Failed to create order in DB",
    });
  }
};

// plcae orders at razor pay
exports.razorPayOrder = async (req, res) => {
  try {
    var instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // var totalPrice = 0;
    console.log("reached at razorPayOrder");

    // const cart = req.body.cart;

    console.log("Req body", req.body);

    const options = {
      // amount: totalPrice * 100,
      amount: req.body.total * 100,
      currency: "INR",
      receipt: Date.now(),
    };

    instance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Something Went Wrong" });
      }
      res.status(200).json({ data: order });
    });
  } catch (error) {
    console.log("Error Message", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// payment verfiy
exports.paymentVerify = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body.response;
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      await Order.findByIdAndUpdate(
        { _id: req.body.order._id },
        {
          $set: {
            Ostatus: "Ordered",
            OpaymentStatus: "Paid",
            OpaymentId: razorpay_payment_id,
            OrazorPayOrderId: razorpay_order_id,
          },
        },
        { new: true, useFindAndModify: false }
      );
      return res.status(200).json({ message: "Payment verified successfully" });
    } else {
      return res.status(400).json({ message: "invalid signature sent!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// getOrder
exports.getOrder = (req, res) => {
  req.order.Ouser.encry_password = undefined;
  req.order.Ouser.salt = undefined;
  req.order.Ouser.createdAt = undefined;
  req.order.Ouser.updatedAt = undefined;
  return res.json(req.order);
};

// getAllOrders
exports.getAllOrders = async (req, res) => {
  try {
    const user = await Order.find();

    return res.json(user);
  } catch (error) {
    return res.status(400).json({
      message: "No orders found in DB",
    });
  }
};

// deleteOrder
exports.deleteOrder = async (req, res) => {
  try {
    await Order.deleteOne(req.order._id);
    return res.json({
      message: "Order deletion successfull",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Deleting order failed",
    });
  }
};

// updateOrder
exports.updateOrder = async (req, res) => {
  try {
    await Order.findByIdAndUpdate(
      { _id: req.order._id },
      { $set: req.body },
      { new: true, useFindAndModify: false }
    );

    res.json({
      message: "Order updated successfully",
    });
  } catch (error) {
    return res.json({
      message: "Updating order failed",
    });
  }
};
