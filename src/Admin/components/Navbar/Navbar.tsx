import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.scss";

const Navbar = () => {

  const Navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('admin-token');
    Navigate('/login');
    window.location.reload();
  }



  return (
      <div className="navbar">
        <div className="logo">
          <span className="font-roboto text-2xl text-gray-50">BLOGIN Admin</span>
        </div>
        <div className="icons">
          <button onClick={handleLogout} className="flex items-center gap-x-2 bg-red-600 hover:scale-105 duration-300 rounded-full px-4 py-2  cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
            </svg>
            Logout
          </button>
        </div>
    </div>
  );
};

export default Navbar;
