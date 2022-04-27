const Order = require("../models/order");
const User = require("../models/user");

// getOrderById - Middleware
exports.getOrderById = async(req, res, next, id) => {
    try{
        const order = await Order.findById({_id: id}).populate("Ouser Oproducts.product");
        req.order = order;
        next();       
    }catch(error){
        return res.status(400).josn({
            message: "failed to get id from DB"
        })
    }
}

// createOrder
exports.createOrder = async (req, res) => {
  try {
    const response = await User.findById({ _id: req.profile._id }, "cart").populate('cart.product');
    cart = response.cart;

    var totalPrice = 0;
    
    cart.map(cartItem => {
        totalPrice = totalPrice + (cartItem.product.pPrice * cartItem.quantity)
    })

    const order = await Order.create({
        Ouser: req.profile._id,
        Oproducts: cart,
        OtotalPrice: totalPrice,
        Oaddress: req.body.address
    });

    order.save();

    await User.findByIdAndUpdate(
        { _id: req.profile._id },
        { $set: {cart: []} },
        { new: true, useFindAndModify: false }
      );


    const Ordersresponse = await User.findById({_id: req.profile._id}, "orders");

    const orders = Ordersresponse.orders;

    orders.push(order._id);

    await User.findByIdAndUpdate(
      {_id: req.profile._id},
      {$set: {orders}},
      {new: true, useFindAndModify: false});


    return res.json({
        message: "created order succesfully"
    })
  } catch (error) {
    console.log(error.message)
    return res.status(400).json({
      message: "Failed to create order in DB",
    });
  }
};

// getOrder
exports.getOrder = (req, res) => {
    req.order.Ouser.encry_password = undefined;
    req.order.Ouser.salt = undefined;
    req.order.Ouser.createdAt = undefined;
    req.order.Ouser.updatedAt = undefined;
    return res.json(req.order);
}

// getAllOrders
exports.getAllOrders = async (req, res) => {
  try{

    const user = await Order.find();

    return res.json(user)

  }catch(error){
    return res.status(400).json({
      message: "No orders found in DB"
    })
  }
}

// deleteOrder
exports.deleteOrder = async (req, res) => {
  try{
    await Order.deleteOne(req.order._id);
    return res.json({
      message: "Order deletion successfull"
    })
  }catch(error){
    return res.status(400).json({
      message: "Deleting order failed"
    })
  }
}

// updateOrderStatus
exports.updateOrderStatus = async (req, res) => {
  try{
    await Order.findByIdAndUpdate(
      {_id: req.order._id},
      {$set: {Ostatus: req.body.status}},
      {new: true, useFindAndModify: false}
    )

    res.json({
      message: "Order updated successfully"
    })
  }catch(error){
    return res.json({
      message: "Updating order failed"
    })
  }
}