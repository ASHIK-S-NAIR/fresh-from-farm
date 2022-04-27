import React, { useState, useContext } from "react";
import { AuthContext } from "../context/Context";

const Signup = () => {
  const { setAuthActive } = useContext(AuthContext);
  return (
    <section className="signup-section">
      <div className="black-background">
        <div className="popup-big-sec">
          <div className="popup-group">
            <div className="popup-head-sec">
              <h1 className="popup-header">Sign Up</h1>
              <div className="cross-sec" onClick={() => setAuthActive(null)}>
                <div className="cross-one"></div>
                <div className="cross-two"></div>
              </div>
            </div>

            <div className="popup-form">
              <div className="popup-form-single-group">
                <div className="popup-form-group">
                  <label className="popup-form-label">Name</label>
                  <input type="text" className="popup-form-input" />
                </div>
              </div>
              <div className="popup-form-double-group">
                <div className="popup-form-group">
                  <label className="popup-form-label">Email</label>
                  <input type="email" className="popup-form-input" />
                </div>
                <div className="popup-form-group">
                  <label className="popup-form-label">Phone</label>
                  <input type="text" className="popup-form-input" />
                </div>
              </div>
              <div className="popup-form-double-group">
                <div className="popup-form-group">
                  <label className="popup-form-label">Password</label>
                  <input type="epassword" className="popup-form-input" />
                </div>
                <div className="popup-form-group">
                  <label className="popup-form-label">Confirm Password</label>
                  <input type="password" className="popup-form-input" />
                </div>
              </div>
              <div className="popup-form-sec-group">
                <h3 className="popup-form-sec-group-header">Address</h3>
                <div className="popup-form-double-group">
                  <div className="popup-form-group">
                    <label className="popup-form-label">House Name</label>
                    <input type="text" className="popup-form-input" />
                  </div>
                  <div className="popup-form-group">
                    <label className="popup-form-label">Street Name</label>
                    <input type="text" className="popup-form-input" />
                  </div>
                </div>
              </div>
              <button className="popup-form-btn">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
