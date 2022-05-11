import React from "react";
import {Navigate} from "react-router-dom";
import {isAuthenticated} from "./index";

const EmployeeRoutes = ({children}) => {
  if(!(isAuthenticated() && isAuthenticated().user.role === 1)){
      return <Navigate to= "/login" />
  }

  return children
}

export default EmployeeRoutes