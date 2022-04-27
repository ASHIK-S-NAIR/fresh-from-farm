import React from "react";
import { BrowserRouter, Routes as Router, Route } from "react-router-dom";
import API from "./backend";
import Nav from "./core/Nav";
import ProductDetail from "./core/ProductDetail";
import Shop from "./core/Shop";

const Routes = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Router>
        <Route path="/" element={<Shop />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
      </Router>
    </BrowserRouter>
  );
};

export default Routes;
