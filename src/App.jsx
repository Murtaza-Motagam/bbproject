import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// client panel routes

import Home from "./views/Home.jsx";
import Register from "./views/authentication/Register";
import Login from "./views/authentication/Login";
import ForgotPassword from "./views/authentication/ForgotPassword";
import Terms from "./views/authentication/Terms";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Services from "./views/Services";
import BlogsCategory from "./views/BlogsCategory.jsx";
import Blogs from "./views/Blogs.jsx";
import Join from "./views/Join";
import Explore from "./views/Explore";
import Profile from "./views/Profile";
import { BlogProvider } from "./BlogContext.jsx";

// Admin Panel imports
import Dashboard from "./Admin/pages/Dashboard.jsx";

const App = () => {
  return (
    <>
      <BlogProvider>
        <Router>
          <Header />
          <div className="min-h-screen">
            <Routes>
              {/* Client Panel Routes */}

              <Route exact path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="/services" element={<Services />} />
              <Route path="/joinwithus" element={<Join />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs-category" element={<BlogsCategory />} />
              <Route path="/terms-and-conditions" element={<Terms />} />

              {/* User Personal Space Routes */}
              <Route path="/myprofile" element={<Profile />} />

              {/* Admin Panel Routes  */}

              <Route path="/admin/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </BlogProvider>
    </>
  );
};

export default App;
