import React from "react";
import { Navigate } from "react-router-dom";
import { getUserInfo } from "../utils/getUserInfo";

export const ProtectedRoute = ({ children }) => {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  if (!userDetails || !userDetails.token) {
    return <Navigate to="/login" />;
  }

  return children;
};

// Protected Route for the admin role_id-1 getUserInfo("role_id") will give the role_id 
export const AdminProtectedRoute = ({ children }) => {
  const roleId = getUserInfo("role_id"); // Fetch role ID
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  
  console.log("Role ID:", roleId); // Debugging log

  // Ensure only users with roleId === 1 can access
  if (roleId !== 1) {
    return <Navigate to="/login" replace />;
  }

  return children;
};