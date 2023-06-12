import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "./Dashboard/Assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Dashboard/Assets/scss/argon-dashboard-react.scss";

import AdminLayout from "./Dashboard/Layouts/Admin.js";
import AuthLayout from "./Dashboard/Layouts/Auth.js";
import Home from "Website/Pages/HomePage/HomePage";
import { Authentication } from "Context/Authentication ";
import ForgetPssword from "Dashboard/Components/Forgot/ForgetPassword";
import Login from "Dashboard/Pages/Login/Login";

const root = ReactDOM.createRoot(document.getElementById("root"));
const jwt = localStorage.getItem("jwt");

root.render(
  <BrowserRouter>
  <Authentication>
  <Routes>
      <Route path="/admin/*" element={<AdminLayout />} />
      <Route path="/auth/*" element={<AuthLayout />} />
      <Route path="/home" element={<Home/>} />
      <Route path="/login/*" element={<Login/>} />
      <Route path="/ForgetPssword/*" element={<ForgetPssword/>} />
      <Route path="*" element={<Navigate to="/admin/index" replace />} />
    </Routes>
  </Authentication>   
  </BrowserRouter>
);
