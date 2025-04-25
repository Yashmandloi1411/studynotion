import React from "react";

import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home.jsx";

import Navbar from "./components/common/Navbar.jsx";

import Login from "./Pages/Login.jsx";

import Signup from "./Pages/Signup.jsx";
import ForgotPassword from "./Pages/ForgotPassword.jsx";
import UpdatePassword from "./Pages/UpdatePassword.jsx";

function App() {
  return (
    <div className="w-screen min-h-screen bg-[#000916] flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/update-password/:id" element={<UpdatePassword />} />
      </Routes>
    </div>
  );
}

export default App;
