import React,{useState} from "react";
import EditIcon from "../icons/Edit.svg";
import EditPersonalInformation from "./EditPersonalInformation";

const Accounts = () => {
  return (
    <section className="userBoard-right accounts-section">
      <h1 className="userBoard-right-header">Account</h1>
      <div className="userBoard-right-subSec">
        <div className="userBoard-right-subHead">
          <h2 className="userBoard-subHeader">Personal Information</h2>
          <img src={EditIcon} alt="" className="userBoard-icon" />
        </div>
        <div className="userBoard-right-subInner">
          <div className="userBoard-right-single-group">
            <div className="userBoard-right-group">
              <label className="userBoard-right-label">Name</label>
             <p className="userBoard-right-value">UserName</p>
            </div>
          </div>
          <div className="userBoard-right-double-group">
            <div className="userBoard-right-group">
              <label className="userBoard-right-label">Email</label>
             <p className="userBoard-right-value">user@email.com</p>
            </div>
            <div className="userBoard-right-group">
              <label className="userBoard-right-label">Phone</label>
             <p className="userBoard-right-value">9999988888</p>
            </div>
          </div>
        </div>
      </div>
      <div className="userBoard-right-subSec">
        <div className="userBoard-right-subHead">
          <div className="userBoard-subHeader">Address</div>
          <img src={EditIcon} alt="" className="userBoard-icon" />
        </div>
        <div className="userBoard-right-subInner">
          <div className="userBoard-right-double-group">
            <div className="userBoard-right-group">
              <label className="userBoard-right-label">House Name</label>
             <p className="userBoard-right-value">House Name</p>
            </div>
            <div className="userBoard-right-group">
              <label className="userBoard-right-label">Street</label>
             <p className="userBoard-right-value">Street Name</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Accounts;
