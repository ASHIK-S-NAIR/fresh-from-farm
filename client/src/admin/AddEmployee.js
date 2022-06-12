import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import CrossIcon from "../icons/cross-black.svg";
import { createEmployee } from "../user";

const AddEmployee = ({ setAddEmployeeActive }) => {
  const [email, setEmail] = useState("");

  const { user, token } = isAuthenticated();

  const onSubmit = async () => {
    try {
        const data = await createEmployee(user._id, token, email)
        if(data.error){
            return console.log(data.error)
        }else{
            return setAddEmployeeActive(null)
        }
    } catch (error) {
      return console.log(error);
    }
  };
  return (
    <section className="addEmployee-section">
      <div className="black-background">
        <div className="popup-small-sec">
          <div className="popup-group">
            <div className="popup-head-sec">
              <h1 className="popup-header">Add Product</h1>
              <div
                className="cross-sec"
                onClick={() => setAddEmployeeActive(null)}
              >
                <img src={CrossIcon} alt="" className="cross-img" />
              </div>
            </div>

            <form className="popup-form" encType="multipart/form-data">
              <div className="popup-form-single-group">
                <div className="popup-form-group">
                  <label className="popup-form-label">Email</label>
                  <input
                    type="email"
                    className="popup-form-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
            </form>
            <button className="popup-form-btn" onClick={onSubmit}>
              Add Employee
            </button>
          </div>
        </div>
      </div>
      {/* {error && errorMessage()} */}
    </section>
  );
};

export default AddEmployee;
