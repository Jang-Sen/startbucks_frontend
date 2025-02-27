import React from "react";
import { useAuth } from "../context/authContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectRoute = () => {
  const { user } = useAuth();

  return user ? <Outlet /> : <Navigate to={"/login"} replace />;
};

export default ProtectRoute;
