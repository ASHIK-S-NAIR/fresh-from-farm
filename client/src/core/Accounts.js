import React, { useState } from "react";
import { AccountsContext } from "../context/Context";
import EditIcon from "../icons/Edit.svg";
import EditPersonalInformation from "./EditPersonalInformation";
import EditAddress from "./EditAddress";

const Accounts = ({userValues}) => {
  const [accountsActive, setAccountsActive] = useState(null);

  const {name, email, phoneNumber, houseName, streetName} = userValues;

  return (
    <section className="userBoard-right-section accounts-section">
      <AccountsContext.Provider value={{ accountsActive, setAccountsActive }}>
        <h1 className="userBoard-right-header">Account</h1>
        <div className="userBoard-right-subSec">
          <div className="userBoard-right-subHead">
            <h2 className="userBoard-subHeader">Personal Information</h2>
            <img src={EditIcon} alt="" className="userBoard-icon" onClick={() => setAccountsActive("editpersonalinformation")} />
          </div>
          <div className="userBoard-right-subInner">
            <div className="userBoard-right-single-group">
              <div className="userBoard-right-group">
                <label className="userBoard-right-label">Name</label>
                <p className="userBoard-right-value">{name}</p>
              </div>
            </div>
            <div className="userBoard-right-double-group">
              <div className="userBoard-right-group">
                <label className="userBoard-right-label">Email</label>
                <p className="userBoard-right-value">{email}</p>
              </div>
              <div className="userBoard-right-group">
                <label className="userBoard-right-label">Phone</label>
                <p className="userBoard-right-value">{phoneNumber}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="userBoard-right-subSec">
          <div className="userBoard-right-subHead">
            <div className="userBoard-subHeader">Address</div>
            <img src={EditIcon} alt="" className="userBoard-icon" onClick={() => setAccountsActive("editaddress")}/>
          </div>
          <div className="userBoard-right-subInner">
            <div className="userBoard-right-double-group">
              <div className="userBoard-right-group">
                <label className="userBoard-right-label">House Name</label>
                <p className="userBoard-right-value">{houseName}</p>
              </div>
              <div className="userBoard-right-group">
                <label className="userBoard-right-label">Street</label>
                <p className="userBoard-right-value">{streetName}</p>
              </div>
            </div>
          </div>
        </div>

        {accountsActive === "editpersonalinformation" && <EditPersonalInformation userValues= {userValues} />}
        {accountsActive === "editaddress" && <EditAddress userValues= {userValues} />}
      </AccountsContext.Provider>
    </section>
  );
};

export default Accounts;
