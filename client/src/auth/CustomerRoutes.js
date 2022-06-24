import React, {useContext} from "react";
import {useNavigate} from "react-router-dom";

import { AuthContext } from "../context/Context";
import {isAuthenticated} from "./index";

const CustomerRoutes = ({children}) => {

    const navigate = useNavigate();

  const { authActive, setAuthActive } = useContext(AuthContext);

  if(!(isAuthenticated() && isAuthenticated().user.role === 0)){
    return navigate("/");
  }

  return children
}

export default CustomerRoutes