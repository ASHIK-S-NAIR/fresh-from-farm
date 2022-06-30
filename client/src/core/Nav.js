import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "../auth/index";
import { CartContext } from "../context/Context";
import CartIcon from "../icons/cart.svg";
import { getEmployeeStatus, updateEmployeeStatus } from "../user/index";

const Nav = () => {
  const [active, setActive] = useState(false);
  const [toggled, setToggled] = useState(false);
  // const [cartCount, setCartCount] = useState();

  const [employeeStatus, setEmployeeStatus] = useState();

  const { cart, setCart } = useContext(CartContext);

  const navigate = useNavigate();

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

  const loadEmployeeStatus = async () => {
    try {
      const data = await getEmployeeStatus(
        isAuthenticated().user._id,
        isAuthenticated().token
      );
      if (data.error) {
        return console.log(data.error);
      } else {
        return setEmployeeStatus(data);
      }
    } catch (error) {
      return console.log(error);
    }
  };

  const handleEmployeeStatus = async (employeeUserId, token, Estatus) => {
    try {
      const data = await updateEmployeeStatus(employeeUserId, token, Estatus);
      if (data.error) {
        return console.log(data.error);
      } else {
        return loadEmployeeStatus();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated() && isAuthenticated().user.role === 1) {
      loadEmployeeStatus(isAuthenticated().user._id, isAuthenticated().token);
    }
  }, []);

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
                <Link to="/signup">
                  <button className="nav-btn">Sign Up</button>
                </Link>
              </li>
              <li className="nav-li">
                <Link to="/login">
                  <button className="nav-btn">Log In</button>
                </Link>
              </li>
            </ul>
          )}

          {isAuthenticated() && isAuthenticated().user.role === 0 && (
            <ul className="nav-ul">
              <li className="nav-li">
                <Link to={`/cart/${user._id}`}>
                  <div className="nav-cart-icon-sec">
                    <div className="nav-cart-icon-value">{cart.length}</div>
                    <img src={CartIcon} alt="" className="nav-cart-icon" />
                  </div>
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
                        <div className="nav-drop-li-div">My Orders</div>
                      </Link>
                    </li>
                    <li className="nav-drop-li">
                      <Link to={`/customerboard/accounts/${user._id}`}>
                        {" "}
                        <div className="nav-drop-li-div">My Account</div>
                      </Link>
                    </li>
                    <li className="nav-drop-li">
                      <Link to={`/customerboard/settings/${user._id}`}>
                        <div className="nav-drop-li-div">My Settings</div>
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
                    <li className="nav-drop-li">
                      <Link to={`/employeeboard/dashboard/${user._id}`}>
                        <div className="nav-drop-li-div">Dashboard</div>
                      </Link>
                    </li>
                    <li className="nav-drop-li">
                      <Link to={`/employeeboard/deliveries/${user._id}`}>
                        <div className="nav-drop-li-div">Deliveries</div>
                      </Link>
                    </li>
                    <li className="nav-drop-li">
                      <Link to={`/employeeboard/accounts/${user._id}`}>
                        <div className="nav-drop-li-div">Account</div>
                      </Link>
                    </li>
                    <li className="nav-drop-li">
                      <Link to={`/employeeboard/settings/${user._id}`}>
                        <div className="nav-drop-li-div">Settings</div>
                      </Link>
                    </li>
                    <li className="nav-drop-li">
                      {employeeStatus === "Available" && (
                        <button
                          className="nav-drop-btn"
                          onClick={() =>
                            handleEmployeeStatus(
                              isAuthenticated().user._id,
                              isAuthenticated().token,
                              "NotAvailable"
                            )
                          }
                        >
                          Make Not Available
                        </button>
                      )}
                      {employeeStatus === "NotAvailable" && (
                        <button
                          className="nav-drop-btn"
                          onClick={() =>
                            handleEmployeeStatus(
                              isAuthenticated().user._id,
                              isAuthenticated().token,
                              "Available"
                            )
                          }
                        >
                          Make Available
                        </button>
                      )}
                      {employeeStatus === "OnDuty" && (
                        <button className="nav-drop-btn button-unclickable">
                          On Duty
                        </button>
                      )}
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
                    <li className="nav-drop-li">
                      <Link to={`/admindashpanel/dashboard/${user._id}`}>
                        <div className="nav-drop-li-div">Admin Panel</div>
                      </Link>
                    </li>
                    <li className="nav-drop-li">
                      <Link to={`/adminboard/accounts/${user._id}`}>
                        <div className="nav-drop-li-div">Account</div>
                      </Link>
                    </li>
                    <li className="nav-drop-li">
                      <Link to={`/adminboard/settings/${user._id}`}>
                        <div className="nav-drop-li-div">Settings</div>
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
                <Link to="/signup">
                  <button className="nav-btn">Sign Up</button>
                </Link>
              </li>
              <li className="nav-li nav-border">
                <Link to="/login">
                  <button className="nav-btn">Log In</button>
                </Link>
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
                  <li className="nav-drop-li">
                    <Link to={`/employeeboard/dashboard/${user._id}`}>
                      {" "}
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-drop-li">
                    {" "}
                    <Link to={`/employeeboard/deliveries/${user._id}`}>
                      {" "}
                      Deliveries
                    </Link>
                  </li>
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
                    {employeeStatus === "Available" && (
                      <button
                        className="nav-drop-btn"
                        onClick={() =>
                          handleEmployeeStatus(
                            isAuthenticated().user._id,
                            isAuthenticated().token,
                            "NotAvailable"
                          )
                        }
                      >
                        Make Not Available
                      </button>
                    )}
                    {employeeStatus === "NotAvailable" && (
                      <button
                        className="nav-drop-btn"
                        onClick={() =>
                          handleEmployeeStatus(
                            isAuthenticated().user._id,
                            isAuthenticated().token,
                            "Available"
                          )
                        }
                      >
                        Make Available
                      </button>
                    )}
                    {employeeStatus === "OnDuty" && (
                      <button className="nav-drop-btn button-unclickable">
                        On Duty
                      </button>
                    )}
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
                  <li className="nav-drop-li">
                    <Link to={`/admindashpanel/dashboard/${user._id}`}>
                      Admin Panel
                    </Link>
                  </li>
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
        </div>
      </div>

      {/* nav-mobile section ends */}
    </section>
  );
};

export default Nav;
