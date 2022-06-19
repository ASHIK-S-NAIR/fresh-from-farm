import React, { useState, useEffect } from "react";
// import moment from "moment";
import CartIcon from "../icons/cart.svg";
import ProductIcon from "../icons/product.svg";
import EmployerIcon from "../icons/employer.svg";
// import CustomerIcon from "../icons/customer.svg";
import ViewIcon from "../icons/view.svg";
import EditIcon from "../icons/Edit.svg";
import { isAuthenticated } from "../auth";
import {
  getAllDeliveries,
  getCountDeliveries,
  getCountNewDeliveries,
  getEmployeeStatus,
} from "../user";
import OrderDetails from "./OrderDetails";

const Dashboard = () => {
  const [statusValues, setStatusValues] = useState({
    totalDeliveries: "",
    NewDeliveries: "",
    EmployeeStatus: "",
  });
  const [newDeliveries, setNewDeliveires] = useState([]);
  const [order, setOrder] = useState({});
  const [orderActive, setOrderActive] = useState("");

  const { totalDeliveries, NewDeliveries, EmployeeStatus } = statusValues;

  const { user, token } = isAuthenticated();

  const loadStatusValues = async (userId, token) => {
    try {
      const totalDeliveries = await getCountDeliveries(userId, token);
      const NewDeliveries = await getCountNewDeliveries(userId, token);
      const EmployeeStatus = await getEmployeeStatus(userId, token);

      // console.log("totalDeliveries", totalDeliveries);
      // console.log("NewDeliveries", NewDeliveries);
      // console.log("EmployeeStatus", EmployeeStatus);

      if (
        totalDeliveries.error ||
        NewDeliveries.error ||
        EmployeeStatus.error
      ) {
        return console.log("status update error occured");
      } else {
        return setStatusValues({
          ...statusValues,
          totalDeliveries: totalDeliveries,
          NewDeliveries: NewDeliveries,
          EmployeeStatus: EmployeeStatus,
        });
      }
    } catch (error) {
      return console.log(error);
    }
  };

  const loadNewDelivery = async (userId, token) => {
    try {
      const data = await getAllDeliveries(userId, token, "pending");
      // console.log("data", data);
      if (data.error) {
        return console.log(data.error);
      } else {
        return setNewDeliveires(data.Eorders);
      }
    } catch (error) {
      return console.log(error);
    }
  };

  const handlePreview = (order) => {
    return setOrderActive("orderDetails"), setOrder(order);
  };

  const handleEdit = (order) => {
    //
  };

  useEffect(() => {
    loadNewDelivery(user._id, token);
  }, []);

  useEffect(() => {
    loadStatusValues(user._id, token);
  }, []);

  return (
    <section className="employeeBoard-section">
      <div className="-right-subsection dashboard-subSection">
        <div className="employeeBoard-dashboard-status-sec dashboard-status-sec-TotalDeliveries">
          <p className="dashboard-status-tag">Total Deliveries</p>
          <h1 className="dashboard-status-value">{totalDeliveries}</h1>
          <img src={CartIcon} alt="" className="dashboard-status-img" />
        </div>
        <div className="employeeBoard-dashboard-status-sec dashboard-status-sec-DeliveryStatus">
          <p className="dashboard-status-tag">New Deliveries</p>
          <h1 className="dashboard-status-value">{NewDeliveries}</h1>
          <img src={ProductIcon} alt="" className="dashboard-status-img" />
        </div>
        <div className="employeeBoard-dashboard-status-sec dashboard-status-sec-EmpoyeeStatus">
          <p className="dashboard-status-tag">My Status</p>
          <h1 className="dashboard-status-value">{EmployeeStatus}</h1>
          <img src={EmployerIcon} alt="" className="dashboard-status-img" />
        </div>
      </div>

      <h1 className="employeeBoard-right-header">New Delivery</h1>

      <div className="employeeBoard-right-subsection">
        <table className="employeeBoard-right-table">
          <thead className="employeeBoard-right-table-head-sec">
            <tr>
              <th className="employeeBoard-right-table-head-value">Order ID</th>
              <th className="employeeBoard-right-table-head-value">Status</th>
              <th className="employeeBoard-right-table-head-value">Total</th>
              <th className="employeeBoard-right-table-head-value">
                Payment Mode
              </th>
              <th className="employeeBoard-right-table-head-value">
                Payment Status
              </th>
              <th className="employeeBoard-right-table-head-value">Address</th>
              <th className="employeeBoard-right-table-head-value">Action</th>
            </tr>
          </thead>
          <tbody className="employeeBoard-right-table-body-sec">
            {newDeliveries &&
              newDeliveries.map((order, index) => {
                {/* console.log("Order", order); */}
                return (
                  order.EorderId.Ostatus !== ("Delivered" || "Cancelled") && (
                    <tr
                      key={index}
                      className="employeeBoard-right-table-body-tr "
                    >
                      <td className="employeeBoard-right-table-body-value">
                        {order.EorderId._id}
                      </td>
                      <td className="employeeBoard-right-table-body-value">
                        <div
                          className={`employeeBoard-right-table-body-div ${order.EorderId.Ostatus}`}
                        >
                          {order.EorderId.Ostatus}
                        </div>
                      </td>
                      <td className="employeeBoard-right-table-body-value">
                        {order.EorderId.OtotalPrice}
                      </td>
                      <td className="employeeBoard-right-table-body-value">
                        {order.EorderId.OpaymentMode}
                      </td>
                      <td className="employeeBoard-right-table-body-value">
                        <div
                          className={`employeeBoard-right-table-body-div ${order.EorderId.OpaymentStatus}`}
                        >
                          {order.EorderId.OpaymentStatus}
                        </div>
                      </td>
                      <td className="employeeBoard-right-table-body-value">
                        {order.EorderAddress.houseName}
                        <br />
                        {order.EorderAddress.streetName}
                      </td>
                      <td className="employeeBoard-right-table-body-value">
                        <button onClick={() => handlePreview(order)}>
                          <img
                            src={ViewIcon}
                            alt=""
                            className="employeeBoard-right-table-icon vie"
                          />
                        </button>
                        <button onClick={() => handleEdit(order)}>
                          <img
                            src={EditIcon}
                            alt=""
                            className="employeeBoard-right-table-icon vie"
                          />
                        </button>
                      </td>
                    </tr>
                  )
                );
              })}
          </tbody>
        </table>
      </div>
      {orderActive === "orderDetails" && (
        <OrderDetails setOrderActive={setOrderActive} order={order} />
      )}
    </section>
  );
};

export default Dashboard;
