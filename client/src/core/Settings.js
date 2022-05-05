import React from "react";

const Settings = ({userValues}) => {

  const {name, email, phoneNumber, houseName, streetName} = userValues;

  return (
    <section className="userBoard-right-section accounts-section">
      <h1 className="userBoard-right-header">Settings</h1>
      <div className="userBoard-right-subSec">
        <div className="userBoard-right-subHead">
          <h2 className="userBoard-subHeader">Change Password</h2>
        </div>
        <div className="userBoard-right-subInner">
          <div className="userBoard-right-single-group">
            <div className="userBoard-right-group">
              <label className="userBoard-right-label">Old Password</label>
             <input type="password" className="userBoard-right-input" />
            </div>
          </div>
          <div className="userBoard-right-single-group">
            <div className="userBoard-right-group">
              <label className="userBoard-right-label">New Password</label>
             <input type="password" className="userBoard-right-input" />
            </div>
          </div>
          <div className="userBoard-right-single-group">
            <div className="userBoard-right-group">
              <label className="userBoard-right-label">Confirm Password</label>
             <input type="password" className="userBoard-right-input" />
            </div>
          </div>
          <button className="userBoard-right-btn">Change</button>
        </div>
      </div>
    </section>
  );
};

export default Settings;
