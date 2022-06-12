import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { getUser } from "../user";
import DashboardIcon from "../icons/dashboard.svg";
import DashboardActiveIcon from "../icons/dashboardActive.svg";
import CartIcon from "../icons/cart.svg";
import CartActiveIcon from "../icons/cart-active.svg";
import ProductIcon from "../icons/product.svg";
import ProductActiveIcon from "../icons/productActive.svg";
import EmployerIcon from "../icons/employer.svg";
import EmployerActiveIcon from "../icons/employerActive.svg";
import CustomerIcon from "../icons/customer.svg";
import CustomerActiveIcon from "../icons/customerActive.svg";
import Dashboard from "../admin/Dashboard";
import Order from "../admin/Order";
import Product from "../admin/Product";
import Employee from "../admin/Employee";
import Customer from "../admin/Customer";

const AdminDashPanel = () => {
  const { currentTab, userId } = useParams();
  const [tabActive, setTabActive] = useState(currentTab);
  const [name, setName] = useState("");

  const { user, token } = isAuthenticated();

  const preload = async (userId, token) => {
    try {
      const data = await getUser(userId, token);
      if (data.error) {
        return console.log(data.error);
      } else {
        return setName(data.name);
      }
    } catch (error) {
      return console.log(error);
    }
  };

  useEffect(() => {
    setTabActive(currentTab);
    preload(userId, token);
  }, [currentTab]);

  return (
    <section className="adminDashPanel-section">
      <div className="wrap adminDashPanel-wrap">
        <div className="adminDashPanel-left">
          <ul className="adminDashPanel-left-ul">
            <li className="adminDashPanel-left-li">
              <Link
                to={`/admindashpanel/dashboard/${user._id}`}
                className="adminDashPanel-left-link"
              >
                <div
                  className={`adminDashPanel-left-tag ${
                    tabActive === "dashboard" ? "active" : ""
                  }`}
                >
                  {" "}
                  <img
                    src={
                      tabActive === "dashboard" ? DashboardActiveIcon : DashboardIcon
                    }
                    alt=""
                    className="adminDashPanel-left-img"
                  />
                  Dashboard
                </div>
              </Link>
            </li>
            <li className="adminDashPanel-left-li">
              <Link
                to={`/admindashpanel/order/${user._id}`}
                className="adminDashPanel-left-link "
              >
                <div
                  className={`adminDashPanel-left-tag ${
                    tabActive === "order" ? "active" : ""
                  }`}
                >
                  <img
                    src={tabActive === "order" ? CartActiveIcon : CartIcon}
                    alt=""
                    className="adminDashPanel-left-img"
                  />
                  Order
                </div>
              </Link>
            </li>
            <li className="adminDashPanel-left-li">
              <Link
                to={`/admindashpanel/product/${user._id}`}
                className="adminDashPanel-left-link"
              >
                <div
                  className={`adminDashPanel-left-tag ${
                    tabActive === "product" ? "active" : ""
                  }`}
                >
                  <img
                    src={tabActive === "product" ? ProductActiveIcon : ProductIcon}
                    alt=""
                    className="adminDashPanel-left-img"
                  />
                  Product
                </div>
              </Link>
            </li>
            <li className="adminDashPanel-left-li">
              <Link
                to={`/admindashpanel/employee/${user._id}`}
                className="adminDashPanel-left-link"
              >
                <div
                  className={`adminDashPanel-left-tag ${
                    tabActive === "employee" ? "active" : ""
                  }`}
                >
                  <img
                    src={tabActive === "employee" ? EmployerActiveIcon : EmployerIcon}
                    alt=""
                    className="adminDashPanel-left-img"
                  />
                  Employee
                </div>
              </Link>
            </li>
            <li className="adminDashPanel-left-li">
              <Link
                to={`/admindashpanel/customer/${user._id}`}
                className="adminDashPanel-left-link"
              >
                <div
                  className={`adminDashPanel-left-tag ${
                    tabActive === "customer" ? "active" : ""
                  }`}
                >
                  <img
                    src={tabActive === "customer" ? CustomerActiveIcon : CustomerIcon}
                    alt=""
                    className="adminDashPanel-left-img"
                  />
                  Customer
                </div>
              </Link>
            </li>
          </ul>
        </div>
        <div className="adminDashPanel-right">
          {tabActive === 'dashboard' && <Dashboard />}
          {tabActive === 'order' && <Order />}
          {tabActive === 'product' && <Product />}
          {tabActive === 'employee' && <Employee />}
          {tabActive === 'customer' && <Customer />}
        </div>
      </div>
    </section>
  );
};

export default AdminDashPanel;
