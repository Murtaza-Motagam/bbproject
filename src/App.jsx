import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider, Outlet, BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';

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
import Contact from "./views/Contact";
import Profile from "./views/Profile";
import Blogs from "./views/Blogs.jsx"
import Blog from "./views/Blog.jsx"
import BlogsCategory from "./views/BlogsCategory.jsx"
import OtherProfile from "./views/otherprofiles/otherProfiles.jsx"
import ErrorPage from "./views/ErrorPage.jsx"
import { BlogProvider } from "./BlogContext.jsx";
import toast, { Toaster } from "react-hot-toast";

// Admin Panel imports

import AdminNavbar from "./Admin/components/Navbar/Navbar.tsx";
import AdminMenu from "./Admin/components/Menu/Menu.jsx";
import AdminUsers from "./Admin/pages/AdminUsers.jsx";
import AdminUser from "./Admin/pages/AdminUser.jsx";
import AdminProfile from "./Admin/pages/AdminProfile.jsx";
import Error404 from "./Admin/components/ErrorPage/Error404.jsx";
import "./Admin/styles/global.scss"
import AdminAlert from "./Admin/components/alert/AdminAlert.jsx";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Authors from "./views/Authors.jsx";
import MyBlogs from "./views/MyBlogs.jsx";


const queryClient = new QueryClient();


const MainApplication = () => {

  AOS.init();

  const adminLoggedIn = localStorage.getItem('admin-token')
  const userLoggedIn = localStorage.getItem('user-token')

  const initialTheme = localStorage.getItem('theme') || 'light';
  const [theme, setTheme] = useState(initialTheme);
  const [light, setLight] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {

    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.body.style.backgroundColor = "#15202B";
      setLight(false);
      setDark(true);
    }
    else {
      document.documentElement.classList.remove("dark");
      document.body.style.backgroundColor = "#fff";
      setDark(false);
      setLight(true);
    }
  }, [theme])

  const handleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    // setTheme(theme === "dark" ? "light" : "dark");
    setTheme(newTheme);
    // Store theme preference in localStorage
    localStorage.setItem('theme', newTheme);
  }


  return (

    <BlogProvider>
      <Router>
        <Header handleTheme={handleTheme} theme={theme} />
        <div className="min-h-screen">
         
          <Routes>

            {/* Client Panel Routes */}

            <Route exact path="/" element={<Home theme={theme} />} />
            <Route path="/login" element={!adminLoggedIn && !userLoggedIn ? <Login theme={theme} /> : <Navigate to="/" />} />
            <Route path="/register" element={!adminLoggedIn && !userLoggedIn ? <Register theme={theme} /> : <Navigate to="/" />} />
            <Route path="/forgotpassword" element={<ForgotPassword theme={theme} />} />
            <Route path="/services" element={!userLoggedIn ? <Login theme={theme} /> : <Services theme={theme} />} />
            <Route path="/joinwithus" element={!userLoggedIn ? <Login theme={theme} /> : <Join theme={theme} />} />
            <Route path="/explore" element={!userLoggedIn ? <Login theme={theme} /> : <Explore theme={theme} />} />
            <Route path="/authors" element={!userLoggedIn ? <Login theme={theme} /> : <Authors theme={theme} />} />
            <Route path="/blogs" element={!userLoggedIn ? <Login theme={theme} /> : <Blogs theme={theme} /> } />
            <Route path="/myblogs" element={!userLoggedIn ? <Login theme={theme} /> : <MyBlogs theme={theme} /> } />
            <Route path="/blogs/:id" element={!userLoggedIn ? <Login theme={theme} /> : <Blog theme={theme} />} />
            <Route path="/category" element={!userLoggedIn ? <Login theme={theme} /> : <BlogsCategory theme={theme} category="Entertainment"/>} />
            <Route path="/contact" element={!userLoggedIn ? <Login theme={theme} /> : <Contact theme={theme} />} />
            <Route path="/terms-and-conditions" element={<Terms theme={theme} />} />

            {/* Fetch blogs by category */}

            <Route exact path="/category/science" element={!userLoggedIn ? <Login theme={theme} /> : <BlogsCategory category="Science" theme={theme} />} />
            <Route exact path="/category/entertainment" element={!userLoggedIn ? <Login theme={theme} /> : <BlogsCategory category="Entertainment" theme={theme} />} />
            <Route exact path="/category/education" element={!userLoggedIn ? <Login theme={theme} /> : <BlogsCategory category="Education" theme={theme} />} />
            <Route exact path="/category/foodndrinks" element={!userLoggedIn ? <Login theme={theme} /> : <BlogsCategory category="Food & Drinks" theme={theme} />} />
            <Route exact path="/category/coding" element={!userLoggedIn ? <Login theme={theme} /> : <BlogsCategory category="Coding" theme={theme} />} />
            <Route exact path="/category/technology" element={!userLoggedIn ? <Login theme={theme} /> : <BlogsCategory category="Technology" theme={theme} />} />


            {/* User Personal Space Routes */}
            <Route path="/myprofile" element={!userLoggedIn ? <Login theme={theme} /> : <Profile />} />
            {/* Other User Profile */}
            <Route path="/profile/:id" element={!userLoggedIn ? <Login theme={theme} /> : <OtherProfile />} />


            {/* Error Page  */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
        <Footer theme={theme} />
      </Router>
    </BlogProvider>
  )
}

const AdminPanel = () => {

  const [alert, setAlert] = useState(null);


  const showAlert = (heading, message, textColor) => {
    setAlert({
      heading: heading,
      msg: message,
      text: textColor
    });

    setTimeout((showAlert) => {
      setAlert(null);
    }, 3000);
  };

  const Layout = () => {
    return (
      <div className="main relative">
        <AdminNavbar />
        <AdminAlert alert={alert} />
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
        // {
        //   path: "/",
        //   element: <AdminHome />,
        // },
        {
          path: "/users",
          element: <AdminUsers showAlert={showAlert} />,
        },
        {
          path: "/users/:id",
          element: <AdminUser showAlert={showAlert} />,
        },
        {
          path: "/",
          element: <AdminProfile />,
        },
        {
          path: "*",
          element: <Error404 />,
        },
      ],
    }
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
