import React, { useState } from "react";
import { createBrowserRouter, RouterProvider, Outlet, BrowserRouter as Router, Route, Routes } from "react-router-dom";

// client panel routes

import Home from "./views/Home.jsx";
import Register from "./views/authentication/Register";
import Login from "./views/authentication/Login";
import ForgotPassword from "./views/authentication/ForgotPassword";
import Terms from "./views/authentication/Terms";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Services from "./views/Services";
import Join from "./views/Join";
import Explore from "./views/Explore";
import Profile from "./views/Profile";
import Blogs from "./views/Blogs.jsx"
import BlogsCategory from "./views/BlogsCategory.jsx"
import { BlogProvider } from "./BlogContext.jsx";

// Admin Panel imports

import AdminNavbar from "./Admin/components/Navbar/Navbar.tsx";
import AdminMenu from "./Admin/components/Menu/Menu.tsx";
import AdminHome from "./Admin/pages/home/Home.tsx";
import AdminUser from "./Admin/pages/user/User.jsx";
import AdminUsers from "./Admin/pages/users/Users.jsx";
import "./Admin/styles/global.scss"
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";


const queryClient = new QueryClient();


const MainApplication = () => {
  return (

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


          </Routes>
        </div>
        <Footer />
      </Router>
    </BlogProvider>
  )
}

const AdminPanel = () => {

  const Layout = () => {
    return (
      <div className="main">
        <AdminNavbar />
        <div className="container">
          <div className="menuContainer">
            <AdminMenu />
          </div>
          <div className="contentContainer">
            <QueryClientProvider client={queryClient}>
              <Outlet />
            </QueryClientProvider>
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <AdminHome />,
        },
        {
          path: "/users",
          element: <AdminUsers />,
        },
        {
          path: "/users/:id",
          element: <AdminUser />,
        },
      ],
    }
    // {
    //   path: "/login",
    //   element: <Login />,
    // },
  ]);

  return <RouterProvider router={router} />;


}


const App = () => {
  return (
    <>
      {
        !localStorage.getItem('admin-token') ? <MainApplication /> : <AdminPanel />
      }
    </>
  );
};

export default App;
