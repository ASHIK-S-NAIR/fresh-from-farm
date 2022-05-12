import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "../auth/index";
import { AuthContext } from "../context/Context";
import Signup from "../user/Signup";
import Login from "../user/Login";

const Nav = () => {
  const [active, setActive] = useState(false);
  const [toggled, setToggled] = useState(false);

  const { authActive, setAuthActive } = useContext(AuthContext);

  const { user, token } = isAuthenticated();

  const showDropDown = () => {
    setActive(true);
  };

  const hideDropDown = () => {
    setActive(false);
  };

  const toggle = () => {
    setToggled(!toggled);
  };

  const navigate = useNavigate();

  return (
    <section className="nav-section">
      <div className="wrap nav-wrap">
        <div className="nav-left-sec">
          <ul className="nav-ul">
            <li className="nav-li">
              <Link className="nav-link" to="/">
                Shop
              </Link>
            </li>
            <li className="nav-li">
              <Link className="nav-link" to="/">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        <div className="nav-logo-sec">
          <Link className="nav-logo" to="/">
            fresh from farm
          </Link>
        </div>
        <div className="nav-right-sec">
          {!isAuthenticated() && (
            <ul className="nav-ul">
              <li className="nav-li">
                <button
                  className="nav-btn"
                  onClick={() => setAuthActive("signup")}
                >
                  Sign Up
                </button>
              </li>
              <li className="nav-li nav-border">
                <button
                  className="nav-btn"
                  onClick={() => setAuthActive("login")}
                >
                  Log In
                </button>
              </li>
            </ul>
          )}

          {isAuthenticated() && isAuthenticated().user.role === 0 && (
            <ul className="nav-ul">
              <li className="nav-li">
                <Link to={`/cart/${user._id}`}>
                  <button className="nav-btn">Cart</button>
                </Link>
              </li>
              <li
                className="nav-li nav-border"
                onMouseOver={showDropDown}
                onMouseLeave={hideDropDown}
              >
                <button className="nav-btn">
                  {isAuthenticated().user.name.length > 6
                    ? isAuthenticated().user.name.substring(0, 6)
                    : isAuthenticated().user.name}
                </button>
                {active && (
                  <ul className="nav-drop-ul" onMouseOver={showDropDown}>
                    <li className="nav-drop-li">
                      <Link to={`/customerboard/orders/${user._id}`}>
                        {" "}
                        My Orders
                      </Link>
                    </li>
                    <li className="nav-drop-li">
                      <Link to={`/customerboard/accounts/${user._id}`}>
                        {" "}
                        My Account
                      </Link>
                    </li>
                    <li className="nav-drop-li">
                      <Link to={`/customerboard/settings/${user._id}`}>
                        {" "}
                        My Settings
                      </Link>
                    </li>
                    <li className="nav-drop-li">
                      <button
                        className="nav-drop-btn"
                        onClick={() => {
                          logout(() => navigate("/"));
                        }}
                      >
                        Log Out
                      </button>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          )}

          {isAuthenticated() && isAuthenticated().user.role === 2 && (
            <ul className="nav-ul">
              <li
                className="nav-li nav-border"
                onMouseOver={showDropDown}
                onMouseLeave={hideDropDown}
              >
                <button className="nav-btn">
                  {isAuthenticated().user.name.length > 6
                    ? isAuthenticated().user.name.substring(0, 6)
                    : isAuthenticated().user.name}
                </button>
                {active && (
                  <ul className="nav-drop-ul" onMouseOver={showDropDown}>
                    <li className="nav-drop-li">Admin Panel</li>
                    <li className="nav-drop-li">
                      <Link to={`/adminboard/accounts/${user._id}`}>
                        {" "}
                        Account
                      </Link>
                    </li>
                    <li className="nav-drop-li">
                      <Link to={`/adminboard/settings/${user._id}`}>
                        {" "}
                        Settings
                      </Link>
                    </li>
                    <li className="nav-drop-li">
                      <button
                        className="nav-drop-btn"
                        onClick={() => {
                          logout(() => navigate("/"));
                        }}
                      >
                        Log Out
                      </button>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          )}

          {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <ul className="nav-ul">
              <li
                className="nav-li nav-border"
                onMouseOver={showDropDown}
                onMouseLeave={hideDropDown}
              >
                <button className="nav-btn">
                  {isAuthenticated().user.name.length > 6
                    ? isAuthenticated().user.name.substring(0, 6)
                    : isAuthenticated().user.name}
                </button>
                {active && (
                  <ul className="nav-drop-ul" onMouseOver={showDropDown}>
                    <li className="nav-drop-li">Dashboard</li>
                    <li className="nav-drop-li">Deliveries</li>
                    <li className="nav-drop-li">
                      <Link to={`/employeeboard/accounts/${user._id}`}>
                        {" "}
                        Account
                      </Link>
                    </li>
                    <li className="nav-drop-li">
                      <Link to={`/employeeboard/settings/${user._id}`}>
                        {" "}
                        Settings
                      </Link>
                    </li>
                    <li className="nav-drop-li">
                      <button className="nav-drop-btn">Make Available</button>
                    </li>
                    <li className="nav-drop-li">
                      <button
                        className="nav-drop-btn"
                        onClick={() => {
                          logout(() => navigate("/"));
                        }}
                      >
                        Log Out
                      </button>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* nav-mobile section starts */}

      <div className="wrap nav-wrap-mobile">
        <Link className="nav-logo" to="/">
          fresh from farm
        </Link>
        <div className="nav-right-sec-mobile">
          {!isAuthenticated() && (
            <ul className="nav-ul">
              <li className="nav-li">
                <button
                  className="nav-btn"
                  onClick={() => setAuthActive("signup")}
                >
                  Sign Up
                </button>
              </li>
              <li className="nav-li nav-border">
                <button
                  className="nav-btn"
                  onClick={() => setAuthActive("login")}
                >
                  Log In
                </button>
              </li>
              <li className="nav-li">
                <div
                  className={`nav-handburger-section ${
                    toggled ? "active" : ""
                  } `}
                  onClick={toggle}
                >
                  <div className="nav-handburger-sec-one"></div>
                  <div className="nav-handburger-sec-two"></div>
                  <div className="nav-handburger-sec-three"></div>
                </div>
                <ul className={`nav-drop-ul ${toggled ? "active" : ""}`}>
                  <li className="nav-drop-li">Shop</li>
                  <li className="nav-drop-li">Contact Us</li>
                </ul>
              </li>
            </ul>
          )}
          {isAuthenticated() && isAuthenticated().user.role === 0 && (
            <ul className="nav-ul">
              <li className="nav-li">
                <div
                  className={`nav-handburger-section ${
                    toggled ? "active" : ""
                  } `}
                  onClick={toggle}
                >
                  <div className="nav-handburger-sec-one"></div>
                  <div className="nav-handburger-sec-two"></div>
                  <div className="nav-handburger-sec-three"></div>
                </div>
                <ul className={`nav-drop-ul ${toggled ? "active" : ""}`}>
                  <li className="nav-drop-li">Shop</li>
                  <li className="nav-drop-li">Contact Us</li>
                  <li className="nav-drop-li">
                    <Link to={`/cart/${user._id}`}>
                      <button className="nav-btn">Cart</button>
                    </Link>
                  </li>

                  <li className="nav-drop-li">
                    <Link to={`/customerboard/orders/${user._id}`}>
                      {" "}
                      My Orders
                    </Link>
                  </li>
                  <li className="nav-drop-li">
                    <Link to={`/customerboard/accounts/${user._id}`}>
                      {" "}
                      My Account
                    </Link>
                  </li>
                  <li className="nav-drop-li">
                    <Link to={`/customerboard/settings/${user._id}`}>
                      {" "}
                      My Settings
                    </Link>
                  </li>
                  <li className="nav-drop-li">
                    <button
                      className="nav-drop-btn"
                      onClick={() => {
                        logout(() => navigate("/"));
                        toggle();
                      }}
                    >
                      Log Out
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          )}
          {isAuthenticated() && isAuthenticated().user.role === 2 && (
            <ul className="nav-ul">
              <li className="nav-li">
                <div
                  className={`nav-handburger-section ${
                    toggled ? "active" : ""
                  } `}
                  onClick={toggle}
                >
                  <div className="nav-handburger-sec-one"></div>
                  <div className="nav-handburger-sec-two"></div>
                  <div className="nav-handburger-sec-three"></div>
                </div>
                <ul className={`nav-drop-ul ${toggled ? "active" : ""}`}>
                  <li className="nav-drop-li">Shop</li>
                  <li className="nav-drop-li">Contact Us</li>
                  <li className="nav-drop-li">Admin Panel</li>
                  <li className="nav-drop-li">
                    <Link to={`/adminboard/accounts/${user._id}`}>
                      {" "}
                      Account
                    </Link>
                  </li>
                  <li className="nav-drop-li">
                    <Link to={`/adminboard/settings/${user._id}`}>
                      {" "}
                      Settings
                    </Link>
                  </li>
                  <li className="nav-drop-li">
                    <button
                      className="nav-drop-btn"
                      onClick={() => {
                        toggle();
                        logout(() => navigate("/"));
                      }}
                    >
                      Log Out
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          )}
          {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <ul className="nav-ul">
              <li className="nav-li">
                <div
                  className={`nav-handburger-section ${
                    toggled ? "active" : ""
                  } `}
                  onClick={toggle}
                >
                  <div className="nav-handburger-sec-one"></div>
                  <div className="nav-handburger-sec-two"></div>
                  <div className="nav-handburger-sec-three"></div>
                </div>
                <ul className={`nav-drop-ul ${toggled ? "active" : ""}`}>
                  <li className="nav-drop-li">Shop</li>
                  <li className="nav-drop-li">Contact Us</li>
                  <li className="nav-drop-li">Dashboard</li>
                  <li className="nav-drop-li">Deliveries</li>
                  <li className="nav-drop-li">
                    <Link to={`/employeeboard/accounts/${user._id}`}>
                      {" "}
                      Account
                    </Link>
                  </li>
                  <li className="nav-drop-li">
                    <Link to={`/employeeboard/settings/${user._id}`}>
                      {" "}
                      Settings
                    </Link>
                  </li>
                  <li className="nav-drop-li">
                    <button className="nav-drop-btn">Make Available</button>
                  </li>
                  <li className="nav-drop-li">
                    <button
                      className="nav-drop-btn"
                      onClick={() => {
                        logout(() => navigate("/"));
                      }}
                    >
                      Log Out
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* nav-mobile section ends */}

      {authActive === "signup" && <Signup />}
      {authActive === "login" && <Login />}
    </section>
  );
};

export default Nav;
