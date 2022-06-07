import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { getUser } from "../user";
import Dashboard from "../icons/dashboard.svg";
import DashboardActive from "../icons/dashboardActive.svg";
import Cart from "../icons/cart.svg";
import CartActive from "../icons/cart-active.svg";
import Product from "../icons/product.svg";
import ProductActive from "../icons/productActive.svg";
import Employer from "../icons/employer.svg";
import EmployerActive from "../icons/employerActive.svg";
import Customer from "../icons/customer.svg";
import CustomerActive from "../icons/customerActive.svg";

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
        console.log("Name", data.name);
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
                      tabActive === "dashboard" ? DashboardActive : Dashboard
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
                    src={tabActive === "order" ? CartActive : Cart}
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
                    src={tabActive === "product" ? ProductActive : Product}
                    alt=""
                    className="adminDashPanel-left-img"
                  />
                  Product
                </div>
              </Link>
            </li>
            <li className="adminDashPanel-left-li">
              <Link
                to={`/admindashpanel/employer/${user._id}`}
                className="adminDashPanel-left-link"
              >
                <div
                  className={`adminDashPanel-left-tag ${
                    tabActive === "employer" ? "active" : ""
                  }`}
                >
                  <img
                    src={tabActive === "employer" ? EmployerActive : Employer}
                    alt=""
                    className="adminDashPanel-left-img"
                  />
                  Employer
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
                    src={tabActive === "customer" ? CustomerActive : Customer}
                    alt=""
                    className="adminDashPanel-left-img"
                  />
                  Customer
                </div>
              </Link>
            </li>
          </ul>
        </div>
        <div className="adminDashPanel-right"></div>
      </div>
    </section>
  );
};

export default AdminDashPanel;
