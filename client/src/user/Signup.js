import React, { useState, useContext } from "react";
import { AuthContext } from "../context/Context";
import { signup, login, authenticate } from "../auth";

const Signup = () => {
  const { setAuthActive } = useContext(AuthContext);

  const [values, setValues] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    houseName: "",
    streetName: "",
  });

  const {
    name,
    email,
    phoneNumber,
    password,
    confirmPassword,
    houseName,
    streetName,
  } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const onSubmit = async () => {
    if (
      !(
        name &&
        email &&
        phoneNumber &&
        password &&
        confirmPassword &&
        houseName &&
        streetName
      )
    ) {
      return console.log("Please fill all the fields")
    }

    if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
      return console.log("Please enter an email address")
    }

    if(phoneNumber.length !== 10){
      return console.log("Please enter a valid phone Number");
    }

    if(password.length < 6){
      return console.log("Password must have atleast 8 characters")
    }

    if (!(password === confirmPassword)) {
      return console.log("Password does not match");
    }

    const address = {
      houseName,
      streetName,
    };

    try {
      var data = await signup({ name, email, phoneNumber, password, address });

      if (data.error) {
        return console.log(data.error);
      }
      data = await login({ email, password });
      if (data.error) {
        return console.log(data.error);
      }
      authenticate(data);
      setAuthActive(null);
    } catch (error) {
      console.log(error);
    }
  };

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
                  <input
                    type="text"
                    className="popup-form-input"
                    value={name}
                    onChange={handleChange("name")}
                  />
                </div>
              </div>
              <div className="popup-form-double-group">
                <div className="popup-form-group">
                  <label className="popup-form-label">Email</label>
                  <input
                    type="email"
                    className="popup-form-input"
                    value={email}
                    onChange={handleChange("email")}
                  />
                </div>
                <div className="popup-form-group">
                  <label className="popup-form-label">Phone</label>
                  <input
                    type="text"
                    className="popup-form-input"
                    value={phoneNumber}
                    onChange={handleChange("phoneNumber")}
                  />
                </div>
              </div>
              <div className="popup-form-double-group">
                <div className="popup-form-group">
                  <label className="popup-form-label">Password</label>
                  <input
                    type="password"
                    className="popup-form-input"
                    value={password}
                    onChange={handleChange("password")}
                  />
                </div>
                <div className="popup-form-group">
                  <label className="popup-form-label">Confirm Password</label>
                  <input
                    type="password"
                    className="popup-form-input"
                    value={confirmPassword}
                    onChange={handleChange("confirmPassword")}
                  />
                </div>
              </div>
              <div className="popup-form-sec-group">
                <h3 className="popup-form-sec-group-header">Address</h3>
                <div className="popup-form-double-group">
                  <div className="popup-form-group">
                    <label className="popup-form-label">House Name</label>
                    <input
                      type="text"
                      className="popup-form-input"
                      value={houseName}
                      onChange={handleChange("houseName")}
                    />
                  </div>
                  <div className="popup-form-group">
                    <label className="popup-form-label">Street Name</label>
                    <input
                      type="text"
                      className="popup-form-input"
                      value={streetName}
                      onChange={handleChange("streetName")}
                    />
                  </div>
                </div>
              </div>
              <button className="popup-form-btn" onClick={() => onSubmit()}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
