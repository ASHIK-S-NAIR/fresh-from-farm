import React, { useState, useEffect } from "react";
import moment from "moment";
import { getAllOrders } from "../user";
import { isAuthenticated } from "../auth";
import ViewIcon from "../icons/view.svg";
import EditIcon from "../icons/Edit.svg";
import OrderDetails from "../user/OrderDetails";
import OrderUpdate from "./OrderUpdate";
import EmployeeUpdate from "./EmployeeUpdate";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [orderActive, setOrderActive] = useState("");
  const [orderUpdateActive, setOrderUpdateActive] = useState("");
  const [order, setOrder] = useState({});
  const [status, setStatus] = useState("all");
  const [orderEmployeeAssignActive, setOrderEmployeeAssignActive] =
    useState("");

  const { user, token } = isAuthenticated();

  const loadOrders = async (userId, token, status) => {
    try {
      const data = await getAllOrders(userId, token, status);
      if (data.error) {
        return console.log(data.error);
      } else {
        return setOrders(data);
      }
    } catch (error) {
      return console.log(error);
    }
  };

  const handlePreview = async (order) => {
    return setOrderActive("orderDetails"), setOrder(order);
  };

  const handleEdit = async (order) => {
    return setOrderUpdateActive("orderUpdateActive"), setOrder(order);
  };

  const handleEmployeeAssign = async (order) => {
    return (
      setOrderEmployeeAssignActive("orderEmployeeAssignActive"), setOrder(order)
    );
  };

  useEffect(() => {
    loadOrders(user._id, token, status);
  }, [orderActive, orderUpdateActive, status, orderEmployeeAssignActive]);

  return (
    <section className="adminDashPanel-right-section order-section">
      <h1 className="adminDashPanel-right-header">Orders</h1>
      <div className="adminDashPanel-right-subsection orders-filter-subSection">
        <button
          className={`orders-filter-btn ${status === "all" ? "active" : ""}`}
          onClick={() => setStatus("all")}
        >
          All
        </button>
        <button
          className={`orders-filter-btn ${
            status === "Not-Confirmed" ? "active" : ""
          }`}
          onClick={() => setStatus("Not-Confirmed")}
        >
          Not-Confirmed
        </button>
        <button
          className={`orders-filter-btn ${
            status === "Ordered" ? "active" : ""
          }`}
          onClick={() => setStatus("Ordered")}
        >
          Ordered
        </button>
        <button
          className={`orders-filter-btn ${
            status === "Processing" ? "active" : ""
          }`}
          onClick={() => setStatus("Processing")}
        >
          Processing
        </button>
        <button
          className={`orders-filter-btn ${
            status === "Picking-Up" ? "active" : ""
          }`}
          onClick={() => setStatus("Picking-Up")}
        >
          Picking-Up
        </button>
        <button
          className={`orders-filter-btn ${
            status === "Out-For-Delivery" ? "active" : ""
          }`}
          onClick={() => setStatus("Out-For-Delivery")}
        >
          Out-For-Delivery
        </button>
        <button
          className={`orders-filter-btn ${
            status === "Delivered" ? "active" : ""
          }`}
          onClick={() => setStatus("Delivered")}
        >
          Delivered
        </button>
        <button
          className={`orders-filter-btn ${
            status === "Cancelled" ? "active" : ""
          }`}
          onClick={() => setStatus("Cancelled")}
        >
          Cancelled
        </button>
      </div>
      <div className="adminDashPanel-right-subsection">
        <table className="adminDashPanel-right-table">
          <thead className="adminDashPanel-right-table-head-sec">
            <tr>
              <th className="adminDashPanel-right-table-head-value">
                Order ID
              </th>
              <th className="adminDashPanel-right-table-head-value">Status</th>
              <th className="adminDashPanel-right-table-head-value">Total</th>
              <th className="adminDashPanel-right-table-head-value">
                Ordered On
              </th>
              <th className="adminDashPanel-right-table-head-value">
                Payment Mode
              </th>
              <th className="adminDashPanel-right-table-head-value">
                Payment Status
              </th>
              <th className="adminDashPanel-right-table-head-value">
                Delivery Boy
              </th>
              <th className="adminDashPanel-right-table-head-value">Action</th>
            </tr>
          </thead>
          <tbody className="adminDashPanel-right-table-body-sec">
            {orders &&
              orders.map((order, index) => {
                return (
                  <tr
                    key={index}
                    className="adminDashPanel-right-table-body-tr"
                  >
                    <td className="adminDashPanel-right-table-body-value">
                      {order._id}
                    </td>
                    <td className="adminDashPanel-right-table-body-value">
                      <div
                        className={`adminDashPanel-right-table-body-div ${order.Ostatus}`}
                      >
                        {order.Ostatus}
                      </div>
                    </td>
                    <td className="adminDashPanel-right-table-body-value">
                      {order.OtotalPrice}
                    </td>
                    <td className="adminDashPanel-right-table-body-value">
                      {moment(order.createdAt).format("DD-MMM-yyyy")}
                    </td>
                    <td className="adminDashPanel-right-table-body-value">
                      {order.OpaymentMode}
                    </td>
                    <td className="adminDashPanel-right-table-body-value">
                      <div
                        className={`adminDashPanel-right-table-body-div ${order.OpaymentStatus}`}
                      >
                        {order.OpaymentStatus}
                      </div>
                    </td>
                    <td className="adminDashPanel-right-table-body-value">
                      {order.OemployeeName ? (
                        order.OemployeeName
                      ) : (
                        <button
                          className="adminDashPanel-right-table-body-value-btn"
                          onClick={() => handleEmployeeAssign(order)}
                        >
                          Not Assigned
                        </button>
                      )}
                    </td>
                    <td className="adminDashPanel-right-table-body-value">
                      <button onClick={() => handlePreview(order)}>
                        <img
                          src={ViewIcon}
                          alt=""
                          className="adminDashPanel-right-table-icon "
                        />
                      </button>
                      <button onClick={() => handleEdit(order)}>
                        <img
                          src={EditIcon}
                          alt=""
                          className="adminDashPanel-right-table-icon "
                        />
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      {orderActive === "orderDetails" && (
        <OrderDetails setOrderActive={setOrderActive} order={order} />
      )}
      {orderUpdateActive === "orderUpdateActive" && (
        <OrderUpdate
          setOrderUpdateActive={setOrderUpdateActive}
          order={order}
        />
      )}
      {orderEmployeeAssignActive === "orderEmployeeAssignActive" && (
        <EmployeeUpdate
          setOrderEmployeeAssignActive={setOrderEmployeeAssignActive}
          order={order}
        />
      )}
    </section>
  );
};

export default Order;
