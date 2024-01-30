import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./views/authentication/Register";
import Login from "./views/authentication/Login";
import Footer from "./components/Footer";
import ForgotPassword from "./views/authentication/ForgotPassword";

const App = () => {

  return (
    <Router>
      <Routes>
        <Route Component={() => <div>Home jaimin</div>} path="/" />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
};

export default App;
