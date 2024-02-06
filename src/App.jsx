import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./views/authentication/Register";
import Login from "./views/authentication/Login";
import Home from "./views/Home";
import ForgotPassword from "./views/authentication/ForgotPassword";
import Terms from "./views/authentication/Terms";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Router>
      <Header />
      <div className="min-h-screen">
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/terms-and-conditions" element={<Terms />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
