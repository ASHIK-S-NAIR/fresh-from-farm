import React, { useState, useEffect } from "react";
import moment from "moment";
import { isAuthenticated } from "../auth";
import { getAllDeliveries } from "../user";
import ViewIcon from "../icons/view.svg";
import EditIcon from "../icons/Edit.svg";

const Deliveries = () => {
  const [deliveries, setDeliveires] = useState([]);

  const { user, token } = isAuthenticated();

  const loadDelivery = async (userId, token) => {
    try {
      const data = await getAllDeliveries(userId, token, "pending");
      console.log("data", data);
      if (data.error) {
        return console.log(data.error);
      } else {
        return setDeliveires(data.Eorders);
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
    loadDelivery(user._id, token);
  }, []);

  return (
    <section className="employeeBoard-section">

      <h1 className="employeeBoard-right-header">Deliveries</h1>

      <div className="employeeBoard-right-subsection">
        <table className="employeeBoard-right-table">
          <thead className="employeeBoard-right-table-head-sec">
            <tr>
              <th className="employeeBoard-right-table-head-value">Order ID</th>
              <th className="employeeBoard-right-table-head-value">Status</th>
              <th className="employeeBoard-right-table-head-value">Total</th>
              <th className="employeeBoard-right-table-head-value">Payment Mode</th>
              <th className="employeeBoard-right-table-head-value">Payment Status</th>
              <th className="employeeBoard-right-table-head-value">Address</th>
              <th className="employeeBoard-right-table-head-value">Action</th>
            </tr>
          </thead>
          <tbody className="employeeBoard-right-table-body-sec">
            {deliveries &&
              deliveries.map((order, index) => {
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
}

export default Deliveries