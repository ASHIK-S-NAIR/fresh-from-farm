import React, { useState, useContext } from "react";
import { signup, login, authenticate } from "../auth";
import { AccountsContext } from "../context/Context";

const EditPersonalInformation = ({userValues}) => {
  const { setAccountsActive } = useContext(AccountsContext);

  const [values, setValues] = useState({
    houseName: userValues.houseName,
    streetName: userValues.streetName,
    error: "",
    loading: "",
    success: false,
  });

  const {
    houseName,
    streetName,
    error,
    loading,
    success,
  } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setValues({ ...values, loading: "loading" });

    if (
      !(
        houseName &&
        streetName
      )
    ) {
      console.log("Please fill all the fields");
      return setValues({
        ...values,
        loading: "",
        success: false,
        error: "Fill all the fields",
      });
    }

    // if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    //   console.log("Please enter a valid email address");
    //   return setValues({
    //     ...values,
    //     loading: "",
    //     success: false,
    //     error: "Enter valid email",
    //   });
    // }

    // if (phoneNumber.length !== 10) {
    //   console.log("Please enter a valid phone Number");
    //   return setValues({
    //     ...values,
    //     loading: "",
    //     success: false,
    //     error: "Enter valid phone Number",
    //   });
    // }

    // if (password.length < 6) {
    //   console.log("Password must have atleast 6 characters");
    //   return setValues({
    //     ...values,
    //     loading: "",
    //     success: false,
    //     error: "password must be at least 6 characters",
    //   });
    // }

    // if (!(password === confirmPassword)) {
    //   console.log("Password confirmation does not match");
    //   return setValues({
    //     ...values,
    //     loading: "",
    //     success: false,
    //     error: "Password confirmation does not match",
    //   });
    // }

    // const address = {
    //   houseName,
    //   streetName,
    // };

    try {
      var data = await signup({ houseName, streetName });

      if (data.error) {
        console.log(data.error);
        return setValues({
          ...values,
          loading: "",
          success: false,
          error: data.error,
        });
      }
      // data = await login({ email, password });
      // if (data.error) {
      //   console.log(data.error);
      //   return setValues({
      //     ...values,
      //     loading: "",
      //     success: false,
      //     error: data.error,
      //   });
      // }
      authenticate(data);
      // setAuthActive(null);
      console.log("success");
      return setValues({
        houseName,
        streetName,
        success: true,
        error: "",
        loading: "",
      });
    } catch (error) {
      console.log(error);
      return setValues({
        ...values,
        loading: "",
        success: false,
        error: error,
      });
    }
  };

  const errorMessage = () => {
    return (
      <div className="errorMessage-sec">
        <div
          className="errorMessage-cross-sec"
          onClick={() => setValues({ ...values, error: "" })}
        >
          <div className="errorMessage-cross-one"></div>
          <div className="errorMessage-cross-two"></div>
        </div>
        <div className="errorMessage-msg-sec">
          <p className="errorMessage-msg">{error}</p>
        </div>
      </div>
    );
  };

  return (
    <section className="signup-section">
      <div className="black-background">
        <div className="popup-big-sec">
          <div className="popup-group">
            <div className="popup-head-sec">
              <h1 className="popup-header">Edit Address</h1>
              <div className="cross-sec" onClick={() => setAccountsActive(null)}>
                <div className="cross-one"></div>
                <div className="cross-two"></div>
              </div>
            </div>

            <div className="popup-form">
              <div className="popup-form-single-group">
                <div className="popup-form-group">
                  <label className="popup-form-label">Email</label>
                  <p className="popup-form-value">customer@email.com</p>
                </div>
              </div>
              <div className="popup-form-single-group">
                <div className="popup-form-group">
                  <label className="popup-form-label">House Name</label>
                  <input
                    type="text"
                    className="popup-form-input"
                    value={houseName}
                    onChange={handleChange("houseName")}
                  />
                </div>
              </div>
              <div className="popup-form-single-group">
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
              <button className="popup-form-btn" onClick={onSubmit}>
                Update
              </button>
            </div>
          </div>
        </div>
        {error && errorMessage()}
      </div>
    </section>
  );
};

export default EditPersonalInformation;
