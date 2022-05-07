import React, { useState } from "react";
import { BrowserRouter, Routes as Router, Route } from "react-router-dom";
import { AuthContext } from "./context/Context";
import API from "./backend";
import Nav from "./core/Nav";
import ProductDetail from "./core/ProductDetail";
import Shop from "./core/Shop";
import AdminRoutes from "./auth/AdminRoutes";
import EmployeeRoutes from "./auth/EmployeeRoutes";
import CustomerRoutes from "./auth/CustomerRoutes";
import CustomerBoard from "./core/CustomerBoard";

const Routes = () => {
  const [authActive, setAuthActive] = useState(null);
  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ authActive, setAuthActive }}>
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
        </Router>
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

export default Routes;
