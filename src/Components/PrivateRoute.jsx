// Imports from React
import React from "react";

// Imports from react router dom
import { Navigate } from "react-router-dom";

// Importing custom hook
import { useAuthStatus } from "../hooks/useAuthStatus";

// Importing Spinner component
import Spinner from "../Components/Spinner";
import Home from "../Pages/Home";

function PrivateRoute() {
  // Getting it from custom hook
  const { loggedin, checkingStatus } = useAuthStatus();
  // If checkingStatus is true returns a spinner
  if (checkingStatus) {
    return <Spinner />;
  }
  // If loggedin is true then render home otherwise navigate to Main
  return loggedin ? <Home /> : <Navigate to="/" />;
}

export default PrivateRoute;
