import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import Cross from "../icons/cross-black.svg";
import { updateOrderStatus } from "../user";

const PaymentStatusUpdate = ({ setOrderUpdateActive, order }) => {
  const [status, setStatus] = useState(order.Ostatus);
  
  const {user, token} = isAuthenticated();

const handleUpdate = (userId, token, orderId, status) => {
  try {
    const data = updateOrderStatus(userId, token, orderId, status);
    if(data.error){
      return console.log(data.error)
    }else{
      return setOrderUpdateActive("");
    }
  } catch (error) {
    return console.log(error)
  }
}
  return (
    <section className="orderUpdate-section">
      <div className="black-background">
        <div className="popup-small-sec">
          <div className="popup-group">
            <div className="popup-head-sec">
              <h1 className="popup-header orderUpdate-popup-header">
                Update Order Status
              </h1>
              <div
                className="cross-sec"
                onClick={() => setOrderUpdateActive(null)}
              >
                <img src={Cross} alt="" className="cross-img" />
              </div>
            </div>
            <div className="popup-form">
              <div className="popup-form-single-group">
                <div className="popup-form-group">
                  <label className="popup-form-label">Order ID</label>
                  <p className="popup-form-value">{order._id}</p>
                </div>
              </div>
              <div className="popup-form-single-group">
                <div className="popup-form-group">
                  <label className="popup-form-label">Order Status</label>
                  <select
                    name="orderStatus"
                    id="orderStatus"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className= "popup-form-value"
                  >
                    <option value="Ordered">Ordered</option>
                    <option value="Not-Confirmed">Not-Confirmed</option>
                    <option value="Processing">Processing</option>
                    <option value="Picking-Up">Picking-Up</option>
                    <option value="Out-For-Delivery">Out-For-Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              <button className="popup-form-btn" onClick={() =>  handleUpdate(user._id, token, order._id, status)}>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentStatusUpdate;
