import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import FileUpload from "./components/FileUpload";
import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";
import Pricing from "./components/Pricing";
import AdminComponent from "./Admin/AdminComponent";
import {
  AdminProtectedRoute,
  ProtectedRoute,
} from "./components/ProtectedRoute";
import Review from "./components/Review";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/review" element={<Review />} />
        <Route path="*" element={<PageNotFound />} />

        <Route
          path="/admin-panel"
          element={
            <AdminProtectedRoute>
              <AdminComponent />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <FileUpload />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
