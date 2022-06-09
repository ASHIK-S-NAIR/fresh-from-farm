import React, { useState, useEffect } from "react";
import moment from "moment";
import CartIcon from "../icons/cart.svg";
import ProductIcon from "../icons/product.svg";
import EmployerIcon from "../icons/employer.svg";
import CustomerIcon from "../icons/customer.svg";
import ViewIcon from "../icons/view.svg";
import EditIcon from "../icons/Edit.svg";
import { isAuthenticated } from "../auth";
import {
  getAllOrders,
  getCountCustomers,
  getCountEmployers,
  getCountOrders,
  getCountProducts,
} from "../user";
import OrderDetails from "../user/OrderDetails";
import OrderUpdate from "./OrderUpdate";

const Dashboard = () => {
  const [statusValues, setStatusValues] = useState({
    orderStatus: "",
    productStatus: "",
    employerStatus: "",
    customerStatus: "",
  });
  const [pendingOrders, setPendingOrders] = useState();
  const [orderActive, setOrderActive] = useState("");
  const [order, setOrder] = useState({});
  const [orderUpdateActive, setOrderUpdateActive] = useState("");

  const { user, token } = isAuthenticated();

  const { orderStatus, productStatus, employerStatus, customerStatus } =
    statusValues;

  const loadStatusValues = async (userId, token) => {
    try {
      const orderStatus = await getCountOrders(userId, token);
      const productStatus = await getCountProducts(userId, token);
      const employerStatus = await getCountEmployers(userId, token);
      const customerStatus = await getCountCustomers(userId, token);

      if (
        orderStatus.error ||
        productStatus.error ||
        employerStatus.error ||
        customerStatus.error
      ) {
        return console.log("status update error occured");
      } else {
        return setStatusValues({
          ...statusValues,
          orderStatus: orderStatus,
          productStatus: productStatus,
          employerStatus: employerStatus,
          customerStatus: customerStatus,
        });
      }
    } catch (error) {
      return console.log(error);
    }
  };

  const loadPendingOrders = async (userId, token) => {
    try {
      const data = await getAllOrders(userId, token, "pending");
      if (data.error) {
        return console.log(data.error);
      } else {
        return setPendingOrders(data);
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

  useEffect(() => {
    loadStatusValues(user._id, token);
  }, []);

  useEffect(() => {
    loadPendingOrders(user._id, token);
  }, []);
  return (
    <section className="adminDashPanel-right-section dashboard-section">
      <div className="adminDashPanel-right-subsection dashboard-subSection">
        <div className="dashboard-status-sec dashboard-status-sec-orders">
          <p className="dashboard-status-tag">Orders</p>
          <h1 className="dashboard-status-value">{orderStatus}</h1>
          <img src={CartIcon} alt="" className="dashboard-status-img" />
        </div>
        <div className="dashboard-status-sec dashboard-status-sec-products">
          <p className="dashboard-status-tag">Products</p>
          <h1 className="dashboard-status-value">{productStatus}</h1>
          <img src={ProductIcon} alt="" className="dashboard-status-img" />
        </div>
        <div className="dashboard-status-sec dashboard-status-sec-employers">
          <p className="dashboard-status-tag">Employers</p>
          <h1 className="dashboard-status-value">{employerStatus}</h1>
          <img src={EmployerIcon} alt="" className="dashboard-status-img" />
        </div>
        <div className="dashboard-status-sec dashboard-status-sec-customers">
          <p className="dashboard-status-tag">Customers</p>
          <h1 className="dashboard-status-value">{customerStatus}</h1>
          <img src={CustomerIcon} alt="" className="dashboard-status-img" />
        </div>
      </div>

      <h1 className="adminDashPanel-right-header">Pending Orders</h1>
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
            {pendingOrders &&
              pendingOrders.map((order, index) => {
                return (
                  <tr
                    key={index}
                    className="adminDashPanel-right-table-body-tr "
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
                      {order.OemployeeId ? order.OemployeeId : "Not Assigned"}
                    </td>
                    <td className="adminDashPanel-right-table-body-value">
                      <button onClick={() => handlePreview(order)}>
                        <img
                          src={ViewIcon}
                          alt=""
                          className="adminDashPanel-right-table-icon vie"
                        />
                      </button>
                      <button onClick={() => handleEdit(order)}>
                        <img
                          src={EditIcon}
                          alt=""
                          className="adminDashPanel-right-table-icon vie"
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
    </section>
  );
};

export default Dashboard;
