import React from 'react'
import { Navigate } from 'react-router-dom';

const PrivateRoutes = ({ children }) => {
  const token = sessionStorage.getItem("jwtToken");
  return token ? <>{children}</> : <Navigate to="/user/signIn" />;
}

export default PrivateRoutes;