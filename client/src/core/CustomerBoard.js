import React, {useState, useEffect} from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Accounts from "./Accounts";

const CustomerBoard = () => {
    // const [tabActive, setTabActive] = useState(null);



    useEffect(() => {
        setTabActive(currentTab)
    }, [])

  return (
    <section className="userBoard-section">
      <div className="userBoard-left">
        <div className="userBoard-user-detail"></div>
        <ul className="userBoard-left-ul">
          <li className="userBoard-left-li">My Orders</li>
          <li className="userBoard-left-li">My Account</li>
          <li className="userBoard-left-li">My Settings</li>
        </ul>
      </div>
      <div className="userBoard-right">
        {tabActive= "Account" && <Accounts />}
      </div>
    </section>
  );
};

export default CustomerBoard;
