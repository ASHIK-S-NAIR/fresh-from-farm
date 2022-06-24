import React from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "./index";

const EmployeeRoutes = ({ children }) => {
  const navigate = useNavigate();

  if (!(isAuthenticated() && isAuthenticated().user.role === 1)) {
    return navigate("/");
  }

  return children;
};

export default EmployeeRoutes;
