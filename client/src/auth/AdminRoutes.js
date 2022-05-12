import React from "react";
import {Navigate} from "react-router-dom";
import {isAuthenticated} from "./index";

const AdminRoutes = ({children}) => {
  if(!(isAuthenticated() && isAuthenticated().user.role === 2)){
      return <Navigate to= {-1} />
  }

  return children
}

export default AdminRoutes