import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Accounts from "./Accounts";
import Orders from "./Orders";
import Settings from "./Settings";

const CustomerBoard = () => {
  const { currentTab } = useParams();
  const [tabActive, setTabActive] = useState(currentTab);

  useEffect(() => {
    setTabActive(currentTab);
  }, [currentTab]);

  return (
    <section className="userBoard-section">
      <div className="wrap userBoard-wrap">
        <div className="userBoard-left">
          <div className="userBoard-user-detail">
            <h1 className="userBoard-user-detail-icon">Image</h1>
            <div className="userBoard-user-detail-info">
              <p className="userBoard-user-detail-greetings">Hello</p>
              <h3 className="userBoard-user-detail-name">Ashik</h3>
            </div>
          </div>
          <ul className="userBoard-left-ul">
            <li className="userBoard-left-li">
              <Link to="/customerboard/orders" className="userBoard-left-link">
                {" "}
                <div className={`userBoard-left-tag ${tabActive === 'orders' ? 'active' : ""}`}>My Orders</div>{" "}
              </Link>
            </li>
            <li className="userBoard-left-li">
              <Link
                to="/customerboard/accounts"
                className="userBoard-left-link"
              >
                <div className={`userBoard-left-tag ${tabActive === 'accounts' ? 'active' : ""}`}>My Accounts</div>
              </Link>
            </li>
            <li className="userBoard-left-li">
              <Link
                to="/customerboard/settings"
                className="userBoard-left-link"
              >
                <div className={`userBoard-left-tag ${tabActive === 'settings' ? 'active' : ""}`}>My Settings</div>
              </Link>
            </li>
          </ul>
        </div>
        <div className="userBoard-right">
          {tabActive == "accounts" && <Accounts />}
          {tabActive == "orders" && <Orders />}
          {tabActive == "settings" && <Settings />}
        </div>
      </div>
    </section>
  );
};

export default CustomerBoard;
