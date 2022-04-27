import React, { useState, useContext } from "react";
import { login, authenticate} from "../auth";
import { AuthContext } from "../context/Context";

const Login = () => {
  const { setAuthActive } = useContext(AuthContext);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const { email, password } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = async () => {
    console.log(`email : ${email}`);
    console.log(`password : ${password}`);

    try {
      const data = await login({email, password});
      if(data.error){
        console.log(data.error);
      }else{
        console.log(data);
        authenticate(data);
        setAuthActive(null);
      }
    } catch (error) {
      
    }
  }
  return (
    <section className="login-section">
      <div className="black-background">
        <div className="popup-big-sec">
          <div className="popup-group">
            <div className="popup-head-sec">
              <h1 className="popup-header">Log In</h1>
              <div className="cross-sec" onClick={() => setAuthActive(null)}>
                <div className="cross-one"></div>
                <div className="cross-two"></div>
              </div>
            </div>

            <div className="popup-form">
              <div className="popup-form-single-group">
                <div className="popup-form-group">
                  <label className="popup-form-label">Email</label>
                  <input
                    type="email"
                    className="popup-form-input"
                    onChange={handleChange("email")}
                    value={email}
                  />
                </div>
              </div>
              <div className="popup-form-single-group">
                <div className="popup-form-group">
                  <label className="popup-form-label">Password</label>
                  <input
                    type="password"
                    className="popup-form-input"
                    onChange={handleChange("password")}
                    value={password}
                  />
                </div>
              </div>
              <button className="popup-form-btn" onClick={() => handleSubmit()}>Log In</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
