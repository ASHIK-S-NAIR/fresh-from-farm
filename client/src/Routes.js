import React, { useState } from "react";
import { BrowserRouter, Routes as Router, Route } from "react-router-dom";
import { AuthContext } from "./context/Context";
// import API from "./backend";
import Nav from "./core/Nav";
import ProductDetail from "./core/ProductDetail";
import Shop from "./core/Shop";
import AdminRoutes from "./auth/AdminRoutes";
import EmployeeRoutes from "./auth/EmployeeRoutes";
import CustomerRoutes from "./auth/CustomerRoutes";
import CustomerBoard from "./core/CustomerBoard";
import EmployeeBoard from "./core/EmployeeBoard.";
import AdminBoard from "./core/AdminBoard";

import Cart from "./core/Cart";
import { CartPayment } from "./core/CartPayment";
import ThankYou from "./core/ThankYou";
import AdminDashPanel from "./core/AdminDashPanel";
import Footer from "./core/Footer";
import ScrollToTop from "./ScrollToTop";

const Routes = () => {
  const [authActive, setAuthActive] = useState(null);
  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ authActive, setAuthActive }}>
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
          </Router>
          <Footer />
        </ScrollToTop>
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

export default Routes;
