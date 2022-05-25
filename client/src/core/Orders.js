import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { getUserOrders } from "../user";
import { getProduct } from "./helper/productDetailHelper";

const Orders = () => {
  const { userId } = useParams();

  const navigate = useNavigate();

  const [orders, setOrders] = useState();

  const { user, token } = isAuthenticated();

  const getUserOrderDetails = async (userId, token) => {
    try {
      const data = await getUserOrders(userId, token);
      if (data.error) {
        return console.log(data.error);
      } else {
        // console.log("typeof", typeof data);
        console.log("Data", data);
        return setOrders(data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getUserOrderDetails(userId, token);
  }, []);

  const getProductDetails = async (productId) => {
    try {
      const data = await getProduct(productId);
      if (data.error) {
        return console.log(data.error);
      } else {
        return data.pName;
      }
    } catch (error) {
      return console.log(error);
    }
  };

  const getProductsToString = (productArray) => {
    var productNames = " malik";
    productArray.map(async (product) => {
      try {
        const data = await getProductDetails(product.product);
        if (data.error) {
          return console.log(data.error);
        } else {
          return productNames.concat(",", "data");
        }
      } catch (error) {
        return console.log(error);
      }
    });

    console.log("typeof productNames", typeof productNames);
    console.log("productNames", productNames);
    return productNames;
  };

  return (
    <section className="userBoard-right-section accounts-section">
      <h1 className="userBoard-right-header">Orders</h1>
      <div className="userBoard-right-subSec">
        <table className="userBoard-right-customer-order-table">
          <thead className="userBoard-right-customer-order-table-head-sec">
            <tr>
              <th className="userBoard-right-customer-order-table-head-value">
                Products
              </th>
              <th className="userBoard-right-customer-order-table-head-value">
                Order ID
              </th>
              <th className="userBoard-right-customer-order-table-head-value">
                Status
              </th>
              <th className="userBoard-right-customer-order-table-head-value">
                Total
              </th>
              <th className="userBoard-right-customer-order-table-head-value">
                Payment Mode
              </th>
              <th className="userBoard-right-customer-order-table-head-value">
                Delivery Boy
              </th>
              <th className="userBoard-right-customer-order-table-head-value">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="userBoard-right-customer-order-table-body-sec">
            {orders &&
              orders.map((order, index) => {
                return (
                  <tr
                    key={index}
                    onClick={() => navigate("/")}
                    className="userBoard-right-customer-order-table-body-tr"
                  >
                    <td className="userBoard-right-customer-order-table-body-value">
                      {getProductsToString(order.Oproducts)}
                    </td>
                    <td className="userBoard-right-customer-order-table-body-value">
                      {order._id}
                    </td>
                    <td className="userBoard-right-customer-order-table-body-value">
                      {order.Ostatus}
                    </td>
                    <td className="userBoard-right-customer-order-table-body-value">
                      {order.OtotalPrice}
                    </td>
                    <td className="userBoard-right-customer-order-table-body-value">
                      {order.OpaymentMode}
                    </td>
                    <td className="userBoard-right-customer-order-table-body-value">
                      {order.OemployeeId}
                    </td>
                    <td className="userBoard-right-customer-order-table-head-value">
                      <button>Preview</button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Orders;
