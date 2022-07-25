import React, { useState, useEffect } from "react";
import CartIcon from "../assets/svg/cart.svg";
import ProductIcon from "../assets/svg/product.svg";
import EmployerIcon from "../assets/svg/employer.svg";
import ViewIcon from "../assets/svg/view.svg";
import EditIcon from "../assets/svg/Edit.svg";
import { isAuthenticated } from "../setup/auth";
import {
  getAllDeliveries,
  getCountDeliveries,
  getCountNewDeliveries,
  getEmployeeStatus,
} from "../user";
import OrderDetails from "./OrderDetails";
import OrderUpdate from "./OrderUpdate";
import PaymentStatusUpdate from "./PaymentStatusUpdate";

const Dashboard = () => {
  const [statusValues, setStatusValues] = useState({
    totalDeliveries: "",
    NewDeliveries: "",
    EmployeeStatus: "",
  });
  const [newDeliveries, setNewDeliveires] = useState([]);
  const [order, setOrder] = useState({});
  const [orderActive, setOrderActive] = useState("");
  const [orderUpdateActive, setOrderUpdateActive] = useState("");
  const [orderUpdatePayment, setOrderUpdatePayment] = useState("");

  const { totalDeliveries, NewDeliveries, EmployeeStatus } = statusValues;

  const { user, token } = isAuthenticated();

  const loadStatusValues = async (userId, token) => {
    try {
      const totalDeliveries = await getCountDeliveries(userId, token);
      const NewDeliveries = await getCountNewDeliveries(userId, token);
      const EmployeeStatus = await getEmployeeStatus(userId, token);

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
    return setOrderUpdateActive("orderUpdateActive"), setOrder(order);
  };

  const handlePaymentStatus = (order) => {
    return setOrderUpdatePayment("orderUpdatePayment"), setOrder(order);
  };

  useEffect(() => {
    loadNewDelivery(user._id, token);
  }, [orderUpdateActive, orderUpdatePayment]);

  useEffect(() => {
    loadStatusValues(user._id, token);
  }, [orderUpdateActive, orderUpdatePayment]);

  return (
    <section className="employeeBoard-section">
      <div className="-right-subsection dashboard-subSection">
        {/* <div className="employeeBoard-dashboard-status-sec dashboard-status-sec-TotalDeliveries">
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
        </div> */}

        <div className="employeeBoard-dashboard-status-sec dashboard-status-sec-TotalDeliveries">
          <div className="adminDashPanel-dashboard-status-left">
            <p className="dashboard-status-tag">Orders</p>
            <h1 className="dashboard-status-value">{totalDeliveries}</h1>
            {/* <p className="dashboard-status-comment dashboard-status-comment-orders">
              {orderCommentValue} orders
              not delivered
            </p> */}
          </div>
          <div className="adminDashPanel-dashboard-status-right">
            <div className="dashboard-status-img-sec">
              <img src={CartIcon} alt="" className="dashboard-status-img" />
            </div>
          </div>
        </div>

        <div className="employeeBoard-dashboard-status-sec dashboard-status-sec-DeliveryStatus">
          <div className="adminDashPanel-dashboard-status-left">
            <p className="dashboard-status-tag">Products</p>
            <h1 className="dashboard-status-value">{NewDeliveries}</h1>
            {/* <p className="dashboard-status-comment dashboard-status-comment-products">
              {productCommentValue} products out of Stock
            </p> */}
          </div>
          <div className="adminDashPanel-dashboard-status-right">
            <div className="dashboard-status-img-sec">
              <img src={ProductIcon} alt="" className="dashboard-status-img" />
            </div>
          </div>
        </div>

        <div className="employeeBoard-dashboard-status-sec dashboard-status-sec-EmpoyeeStatus">
          <div className="adminDashPanel-dashboard-status-left">
            <p className="dashboard-status-tag">Employers</p>
            <h1 className="dashboard-status-value">{EmployeeStatus}</h1>
            {/* <p className="dashboard-status-comment dashboard-status-comment-employers">
              {employeeCommentValue} Employees available
            </p> */}
          </div>
          <div className="adminDashPanel-dashboard-status-right">
            <div className="dashboard-status-img-sec">
              <img src={EmployerIcon} alt="" className="dashboard-status-img" />
            </div>
          </div>
        </div>

 

        {/* <div className="adminDashPanel-dashboard-status-sec dashboard-status-sec-customers">
          <div className="adminDashPanel-dashboard-status-left">
            <p className="dashboard-status-tag">Customers</p>

            <h1 className="dashboard-status-value">{customerStatus}</h1>
            <p className="dashboard-status-comment dashboard-status-comment-customers">
              {customerCommentValue} Customer order pending
            </p>
          </div>
          <div className="adminDashPanel-dashboard-status-right">
            <div className="dashboard-status-img-sec">
              <img src={CustomerIcon} alt="" className="dashboard-status-img" />
            </div>
          </div>
        </div> */}
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
                        {order.EorderId.OpaymentStatus === "Paid" ? (
                          order.EorderId.OpaymentStatus
                        ) : (
                          <button
                            className="adminDashPanel-right-table-body-value-btn"
                            onClick={() => handlePaymentStatus(order.EorderId)}
                          >
                            Pending
                          </button>
                        )}
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
                        <button onClick={() => handleEdit(order.EorderId)}>
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
      {orderUpdateActive === "orderUpdateActive" && (
        <OrderUpdate
          setOrderUpdateActive={setOrderUpdateActive}
          order={order}
        />
      )}
      {orderUpdatePayment === "orderUpdatePayment" && (
        <PaymentStatusUpdate
          setOrderUpdatePayment={setOrderUpdatePayment}
          order={order}
        />
      )}
    </section>
  );
};

export default Dashboard;
