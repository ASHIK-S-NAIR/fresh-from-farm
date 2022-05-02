import React, {useContext} from "react";
import {useNavigate, Navigate} from "react-router-dom";

import { AuthContext } from "../context/Context";
import {isAuthenticated} from "./index";

const CustomerRoutes = ({children}) => {

    const navigate = useNavigate();

  const { authActive, setAuthActive } = useContext(AuthContext);

  if(!(isAuthenticated() && isAuthenticated().user.role === 0)){
    return <Navigate to={-1} />
  }

  return children
}

export default CustomerRoutes