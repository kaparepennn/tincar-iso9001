import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import ISO9001 from "./pages/ISO9001";
import ISO27001 from "./pages/ISO27001";

function Private({ children }) {
  const token = localStorage.getItem('tincar_token');
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Private><Welcome /></Private>} />
      <Route path="/iso9001" element={<Private><ISO9001 /></Private>} />
      <Route path="/iso27001" element={<Private><ISO27001 /></Private>} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
