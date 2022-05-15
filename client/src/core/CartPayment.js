import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { isAuthenticated } from "../auth";
// import { API } from "../backend";
import {
  getUserCart,
  createOrder,
  getUser,
  razorPayOrder,
  paymentVerify,
} from "../user";

export const CartPayment = () => {
  const { userId } = useParams();

  const location = useLocation();
  const shippingAddress = location.state;
  // console.log(state);

  // const [paymentMode, setPaymentMode] = useState("RazorPay");
  // const [total, setTotal] = useState(0);
  // const [userDetails, setUserDetails] = useState();
  const [values, setValues] = useState({
    paymentMode: "RazorPay",
    total: "",
    userDetails: "",
    cart: "",
  });

  const { paymentMode, total, userDetails, cart } = values;

  const { user, token } = isAuthenticated();

  const isRadioSelected = (value) => {
    if (paymentMode === value) {
      return true;
    } else {
      return false;
    }
  };

  // var cart = [];
  // var userDetails;
  // var total = 0;

  const preLoadCart = async (userId, token) => {
    try {
      const data = await getUserCart(userId, token);
      if (data.error) {
        console.log(data.error);
      } else {
        return setValues({ ...values, cart: data.cart });
      }
      // cart = data.cart;

      // const tempTotal = 0;
      // cart.map(
      //   (cartItem) =>
      //     (tempTotal = tempTotal + cartItem.product.pPrice * cartItem.quantity)
      // );

      // console.log(total);

      // return setTotal(tempTotal);
    } catch (error) {
      console.log(error);
    }
  };

  const preLoadUser = async (userId, token) => {
    try {
      const data = await getUser(userId, token);
      if (data.error) {
        console.log(data.error);
      } else {
        // return (userDetails = data);
        return setValues({ ...values, userDetails: data });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    preLoadCart(userId, token);
  }, []);

  useEffect(() => {
    preLoadUser(userId, token);
  }, []);

  useEffect(() => {
    const tempTotal = 0;
    cart.map(
      (cartItem) =>
        (tempTotal = tempTotal + cartItem.product.pPrice * cartItem.quantity)
    );
    setValues({ ...values, total: tempTotal });
  }, [cart]);

  useEffect(() => {
    console.log("PaymentMode", paymentMode);
  }, [paymentMode]);

  // useEffect(() => {
  //   var total = 0;
  //   cart.map(
  //     (cartItem) =>
  //       (total = total + cartItem.product.pPrice * cartItem.quantity)
  //   );
  //   console.log("total", total)
  // }, [cart])

  const handleOrder = async (userId, token) => {
    try {
      const data = await createOrder(userId, token, {
        shippingAddress,
        paymentMode,
      });
      if (data.error) {
        console.log(data.error);
      } else {
        if (paymentMode === "RazorPay") {
          await handlePayment();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const initPayment = (data) => {
    const options = {
      key: process.env.RAZORPAY_KEY_SECRET,
      amount: data.amount,
      currency: data.currency,
      name: "Fruits and Veggies",
      order_id: data.id,
      prefill: {
        name: userDetails.name,
        email: userDetails.email,
        contact: userDetails.phoneNumber,
      },
      handler: async (response) => {
        try {
          // const verifyUrl = "http://localhost:8000/verify";
          // const {data} = await axios.post(verifyUrl, response);
          const data = paymentVerify(userId, token, response);
          if (data.error) {
            return console.log(data.error);
          }
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async () => {
    try {
      //  const orderUrl = "http://localhost:8000/orders";
      //  const {data} = await axios.post(orderUrl, {amount: book.price});
      console.log(total);
      const data = razorPayOrder(userId, token, total);
      if (data.error) {
        return console.log(data.error);
      } else {
        console.log(data);
        initPayment(data.data);
      }
    } catch (error) {
      console.log();
    }
  };
  return (
    <section className="cardPayment-section">
      <div className="wrap cardPayment-wrap">
        <div className="cardPayment-info-sec">
          <div className="cardPayment-delivery-details-sec">
            <h2 className="cardpayment-delivery-details-header">
              Delivery Details
            </h2>
            <div className="cardPayment-delivery-details">
              <div className="cardPayment-delivery-details-single-group">
                <div className="cardPayment-delivery-details-group">
                  <label className="cardPayment-delivery-details-label">
                    Name
                  </label>
                  <p className="cardPayment-delivery-details-value">name</p>
                </div>
              </div>
              <div className="cardPayment-delivery-details-double-group">
                <div className="cardPayment-delivery-details-group">
                  <label className="cardPayment-delivery-details-label">
                    Email
                  </label>
                  <p className="cardPayment-delivery-details-value">email</p>
                </div>
                <div className="cardPayment-delivery-details-group">
                  <label className="cardPayment-delivery-details-label">
                    Phone
                  </label>
                  <p className="cardPayment-delivery-details-value">
                    phoneNumber
                  </p>
                </div>
              </div>
              <h3 className="cardPayment-delivery-details-subheader">
                Shipping Address
              </h3>
              <div className="cardPayment-delivery-details-double-group">
                <div className="cardPayment-delivery-details-group">
                  <label className="cardPayment-delivery-details-label">
                    House Name
                  </label>
                  <p className="cardPayment-delivery-details-value">
                    houseName
                  </p>
                </div>
                <div className="cardPayment-delivery-details-group">
                  <label className="cardPayment-delivery-details-label">
                    Street Name
                  </label>
                  <p className="cardPayment-delivery-details-value">
                    streetName
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="cardPayment-payment-details-sec">
            <h2 className="cardPayment-payment-details-header">Payment Mode</h2>
            <div className="cardPayment-payment-details-form">
              <div className="cardPayment-payment-details-group">
                <input
                  type="radio"
                  name="payment_mode"
                  id="RazorPay"
                  value="RazorPay"
                  checked={isRadioSelected("RazorPay")}
                  onChange={(e) => setPaymentMode(e.target.value)}
                />
                <label
                  htmlFor="RazorPay"
                  className="cardPayment-payment-details-label"
                >
                  Make Payment Online (RazorPay)
                </label>
              </div>

              <div className="cardPayment-payment-details-group">
                <input
                  type="radio"
                  name="payment_mode"
                  id="CashOnDelivery"
                  value="CashOnDelivery"
                  checked={isRadioSelected("CashOnDelivery")}
                  onChange={(e) => setPaymentMode(e.target.value)}
                />
                <label
                  htmlFor="CashOnDelivery"
                  className="cardPayment-payment-details-label"
                >
                  Cash On Delivery
                </label>
              </div>
              <button
                className="cardPayment-payment-details-btn"
                onClick={() => handleOrder(userId, token)}
              >
                Make Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
