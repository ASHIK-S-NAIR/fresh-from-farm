import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes as Router, Route } from "react-router-dom";
import { AuthContext, CartContext } from "./context/Context";

import Nav from "./core/Nav";
import ProductDetail from "./core/ProductDetail";
import Shop from "./core/Shop";
import AdminRoutes from "./auth/AdminRoutes";
import EmployeeRoutes from "./auth/EmployeeRoutes";
import CustomerRoutes from "./auth/CustomerRoutes";
import CustomerBoard from "./core/CustomerBoard";
import EmployeeBoard from "./core/EmployeeBoard.";
import AdminBoard from "./core/AdminBoard";
import Signup from "./user/Signup";
import Login from "./user/Login";

import Cart from "./core/Cart";
import { CartPayment } from "./core/CartPayment";
import ThankYou from "./core/ThankYou";
import AdminDashPanel from "./core/AdminDashPanel";
import Footer from "./core/Footer";
import ScrollToTop from "./ScrollToTop";
import { getUserCart } from "./user";
import { isAuthenticated } from "./auth";

const Routes = () => {
  const [authActive, setAuthActive] = useState(null);
  const [cart, setCart] = useState([]);

  const preLoadCart = async (userId, token) => {
    try {
      const data = await getUserCart(userId, token);
      return setCart(data.cart);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated() && isAuthenticated().user.role === 0) {
      preLoadCart(isAuthenticated().user._id, isAuthenticated().token);
    }
  }, []);

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ authActive, setAuthActive }}>
        <CartContext.Provider value={{ cart, setCart, preLoadCart }}>
          <ScrollToTop>
            <Nav />
            <Router>
              <Route path="/" element={<Shop />} />
              <Route path="/product/:productId" element={<ProductDetail />} />
              <Route path="*" element={<p>There is nothing here 404!</p>} />
              <Route
                path="/customerboard/:currentTab/:userId"
                element={
                  <CustomerRoutes>
                    <CustomerBoard />
                  </CustomerRoutes>
                }
              />
              <Route
                path="/cart/payment/:userId"
                element={
                  <CustomerRoutes>
                    <CartPayment />
                  </CustomerRoutes>
                }
              />
              <Route
                path="/employeeboard/:currentTab/:userId"
                element={
                  <EmployeeRoutes>
                    <EmployeeBoard />
                  </EmployeeRoutes>
                }
              />
              <Route
                path="/adminboard/:currentTab/:userId"
                element={
                  <AdminRoutes>
                    <AdminBoard />
                  </AdminRoutes>
                }
              />
              <Route
                path="/admindashpanel/:currentTab/:userId"
                element={
                  <AdminRoutes>
                    <AdminDashPanel />
                  </AdminRoutes>
                }
              />
              <Route
                path="/cart/:userId"
                element={
                  <CustomerRoutes>
                    <Cart />
                  </CustomerRoutes>
                }
              />
              <Route
                path="/thankyou/:orderId"
                element={
                  <CustomerRoutes>
                    <ThankYou />
                  </CustomerRoutes>
                }
              />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </Router>
            <Footer />
          </ScrollToTop>
        </CartContext.Provider>
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

export default Routes;
