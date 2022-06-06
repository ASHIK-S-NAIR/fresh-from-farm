import React, { useState, useEffect } from "react";
import { getUser } from "./index";
import { isAuthenticated } from "../auth";

const OrderDetails = ({ setOrderActive, order }) => {
  const [userDetails, setUserDetails] = useState();

  const { user, token } = isAuthenticated();

  const loadUserDetails = (userId, token) => {
    try {
      const data = getUser(userId, token);
      if (data.error) {
        return console.log(data.error);
      } else {
        console.log("userDetails", data);
        setUserDetails(data);
      }
    } catch (error) {
      return console.log(error);
    }
  };

  useEffect(() => {
    loadUserDetails(user._id, token);
  }, []);
  return (
    <section className="orderDetails-section">
      <div className="black-background">
        <div className="popup-big-sec">
          <div className="popup-group">
            <div className="popup-head-sec">
              <h1 className="popup-header orderDetails-popup-header">
                Order #{order._id}
              </h1>
              <div className="cross-sec" onClick={() => setOrderActive(null)}>
                <div className="cross-one"></div>
                <div className="cross-two"></div>
              </div>
            </div>
            <table className="popup-table">
              <thead className="popup-table-head-sec">
                <tr>
                  <th className="popup-table-head-value">Products</th>
                  <th className="popup-table-head-value">Category</th>
                  <th className="popup-table-head-value">Quantity</th>
                  <th className="popup-table-head-value">Price</th>
                  <th className="popup-table-head-value popup-table-head-value-amount">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="popup-table-body-sec">
                {order.Oproducts.map((product, key) => {
                  return (
                    <tr index={key}>
                      <td className="popup-table-body-value popup-table-body-value-name">
                        {product.pName}
                        <br />
                        <span>{product.pDescription}</span>
                      </td>
                      <td className="popup-table-body-value">
                        {product.pCategory}
                      </td>
                      <td className="popup-table-body-value">
                        {product.pQuantity} Kg
                      </td>
                      <td className="popup-table-body-value">
                        {product.pPrice}
                      </td>
                      <td className="popup-table-body-value popup-table-body-value-amount">
                        {product.pAmount}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="popup-form-single-group orderDetails-total-sec">
              <p className="popup-form-label">
                <span> Total :</span> {order.OtotalPrice}
              </p>
            </div>
            <div className="popup-form-double-group orderDetails-info-sec">
              <div className="orderDetails-info-left">
                <div className="orderDetails-info-subsec">
                  <p className="popup-form-label">Order ID</p>
                  {order._id}
                </div>
                <div className="orderDetails-info-subsec">
                  <p className="popup-form-label">Order Status</p>
                  {order.Ostatus}
                </div>
                <div className="orderDetails-info-subsec">
                  <p className="popup-form-label">Payment Mode</p>
                  {order.OpaymentMode}
                </div>
                <div className="orderDetails-info-subsec">
                  <p className="popu?-form-label">Delivery By</p>
                  {order.OemployeeId || "Not Assigned"}
                </div>
              </div>
              <div className="orderDetails-info-right">
                <div className="orderDetails-info-subsec">
                  <p className="popup-form-label">Ordered By</p>
                  {order._id}
                </div>
                <div className="orderDetails-info-subsec">
                  <p className="popup-form-label">Delivery Address</p>
                  {order.Oaddress}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetails;
