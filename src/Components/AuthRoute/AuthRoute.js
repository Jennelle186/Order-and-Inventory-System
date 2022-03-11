import React from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../../Firebase/utils";
import { CircularProgress } from "@mui/material";

const PrivateRoute = ({ children }) => {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) {
    return <CircularProgress />; // or loading spinner, etc...
  }

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  return children;

  // let location = useLocation();

  // if (!currentUser) {
  //   console.log(currentUser);
  //   return <Navigate to="/" state={{ from: location }} replace />;
  // }
};

export default PrivateRoute;
