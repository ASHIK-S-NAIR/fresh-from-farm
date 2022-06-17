import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import Dashboard from "../employee/Dashboard";
import Deliveries from "../employee/Deliveries";
import { getUser } from "../user";
import Profile from "../icons/profile.svg";
import Accounts from "./Accounts";
// import Orders from "./Orders";
import Settings from "./Settings";

const EmployeeBoard = () => {
  const { currentTab, userId } = useParams();
  const [tabActive, setTabActive] = useState(currentTab);
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    houseName: "",
    streetName: "",
  });

  const { name } = values;
  const { token, user } = isAuthenticated();

  const preLoad = async (userId, token) => {
    try {
      const userDetails = await getUser(userId, token);

      return setValues({
        ...values,
        name: userDetails.name,
        email: userDetails.email,
        phoneNumber: userDetails.phoneNumber,
        houseName: userDetails.address.houseName,
        streetName: userDetails.address.streetName,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTabActive(currentTab);
    preLoad(userId, token);
  }, [currentTab]);

  return (
    <section className="userBoard-section">
      <div className="wrap userBoard-wrap">
        <div className="userBoard-left">
          <div className="userBoard-user-detail">
          <img className="userBoard-user-detail-image" src={Profile} alt="" />
            <div className="userBoard-user-detail-info">
              <p className="userBoard-user-detail-greetings">Hello</p>
              <h3 className="userBoard-user-detail-name">
                {name.length > 6 ? name.substring(0, 6) : name}
              </h3>
            </div>
          </div>
          <ul className="userBoard-left-ul">
            <li className="userBoard-left-li">
              <Link
                to={`/employeeboard/dashboard/${user._id}`}
                className="userBoard-left-link"
              >
                {" "}
                <div
                  className={`userBoard-left-tag ${
                    tabActive === "dashboard" ? "active" : ""
                  }`}
                >
                  Dashboard
                </div>{" "}
              </Link>
            </li>
            <li className="userBoard-left-li">
              <Link
                to={`/employeeboard/deliveries/${user._id}`}
                className="userBoard-left-link"
              >
                {" "}
                <div
                  className={`userBoard-left-tag ${
                    tabActive === "deliveries" ? "active" : ""
                  }`}
                >
                  Deliveries
                </div>{" "}
              </Link>
            </li>
            <li className="userBoard-left-li">
              <Link
                to={`/employeeboard/accounts/${user._id}`}
                className="userBoard-left-link"
              >
                <div
                  className={`userBoard-left-tag ${
                    tabActive === "accounts" ? "active" : ""
                  }`}
                >
                  My Accounts
                </div>
              </Link>
            </li>
            <li className="userBoard-left-li">
              <Link
                to={`/employeeboard/settings/${user._id}`}
                className="userBoard-left-link"
              >
                <div
                  className={`userBoard-left-tag ${
                    tabActive === "settings" ? "active" : ""
                  }`}
                >
                  My Settings
                </div>
              </Link>
            </li>
          </ul>
        </div>
        <div className="userBoard-right">
          {tabActive === "dashboard" && <Dashboard />}
          {tabActive === "deliveries" && <Deliveries />}
          {tabActive === "accounts" && <Accounts userValues={values} />}
          {tabActive === "settings" && <Settings userValues={values} />}
        </div>
      </div>
    </section>
  );
};

export default EmployeeBoard;
