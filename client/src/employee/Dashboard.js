import React, { useState, useEffect } from "react";
import moment from "moment";
import CartIcon from "../icons/cart.svg";
import ProductIcon from "../icons/product.svg";
import EmployerIcon from "../icons/employer.svg";
import CustomerIcon from "../icons/customer.svg";
import ViewIcon from "../icons/view.svg";
import EditIcon from "../icons/Edit.svg";
import { isAuthenticated } from "../auth";
import { getAllDeliveries, getCountDeliveries, getCountNewDeliveries, getEmployeeStatus } from "../user";

const Dashboard = () => {
  const [statusValues, setStatusValues] = useState({
    totalDeliveries: "",
    NewDeliveries: "",
   EmployeeStatus: "",
  });
  const [newDeliveries, setNewDeliveires] = useState([]);

  const { totalDeliveries, NewDeliveries, EmpoyeeStatus } = statusValues;

  const { user, token } = isAuthenticated();

  const loadStatusValues = async (userId, token) => {
    try {
      const totalDeliveries = await getCountDeliveries(userId, token);
      const NewDeliveries = await getCountNewDeliveries(userId, token);
      const EmployeeStatus = await getEmployeeStatus(userId, token);

      console.log("totalDeliveries", totalDeliveries);
      console.log("NewDeliveries", NewDeliveries);
      console.log("EmployeeStatus", EmployeeStatus);

      //   if (totalDeliveries.error || NewDeliveries.error || EmpoyeeStatus.error) {
      //     return console.log("status update error occured");
      //   } else {
      //     return setStatusValues({
      //       ...statusValues,
      //       totalDeliveries: totalDeliveries,
      //       NewDeliveries: NewDeliveries,
      //       EmpoyeeStatus: EmpoyeeStatus,
      //     });
      //   }
    } catch (error) {
      return console.log(error);
    }
  };

  const loadNewDelivery = async (userId, token) => {
    try {
      const data = await getAllDeliveries(userId, token, "pending");
      console.log("data", data);
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
    //
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
      <div className="employeeBoard-right-subsection dashboard-subSection">
        <div className="dashboard-status-sec dashboard-status-sec-TotalDeliveries">
          <p className="dashboard-status-tag">Total Deliveries</p>
          <h1 className="dashboard-status-value">{totalDeliveries}</h1>
          <img src={CartIcon} alt="" className="dashboard-status-img" />
        </div>
        <div className="dashboard-status-sec dashboard-status-sec-DeliveryStatus">
          <p className="dashboard-status-tag">New Deliveries</p>
          <h1 className="dashboard-status-value">{NewDeliveries}</h1>
          <img src={ProductIcon} alt="" className="dashboard-status-img" />
        </div>
        <div className="dashboard-status-sec dashboard-status-sec-EmpoyeeStatus">
          <p className="dashboard-status-tag">My Status</p>
          <h1 className="dashboard-status-value">{EmpoyeeStatus}</h1>
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
              <th className="employeeBoard-right-table-head-value">Address</th>
              <th className="employeeBoard-right-table-head-value">Action</th>
            </tr>
          </thead>
          <tbody className="employeeBoard-right-table-body-sec">
            {newDeliveries &&
              newDeliveries.map((order, index) => {
                return (
                  order.Ostatus === "Processing" && (
                    <tr
                      key={index}
                      className="employeeBoard-right-table-body-tr "
                    >
                      <td className="employeeBoard-right-table-body-value">
                        {order._id}
                      </td>
                      <td className="employeeBoard-right-table-body-value">
                        <div
                          className={`employeeBoard-right-table-body-div ${order.Ostatus}`}
                        >
                          {order.Ostatus}
                        </div>
                      </td>
                      <td className="employeeBoard-right-table-body-value">
                        {order.OtotalPrice}
                      </td>
                      <td className="employeeBoard-right-table-body-value">
                        {order.OpaymentMode}
                      </td>
                      <td className="employeeBoard-right-table-body-value">
                        <div
                          className={`employeeBoard-right-table-body-div ${order.OpaymentStatus}`}
                        >
                          {order.OpaymentStatus}
                        </div>
                      </td>
                      <td className="employeeBoard-right-table-body-value">
                        {order.Oaddress.houseName}
                        <br />
                        {order.Oaddress.streetName}
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
    </section>
  );
};

export default Dashboard;
