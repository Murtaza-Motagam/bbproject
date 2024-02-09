import React from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <img src="logo.svg" alt="" />
        <span>BLOGIN ADMIN</span>
      </div>
      <div className="icons">
        <Link to="/users">
          <img src="/search.svg" alt="" className="icon" />
        </Link>
        <Link to="/">
          <img src="/app.svg" alt="" className="icon" />
        </Link>
        <Link to="/">
          <img src="/expand.svg" alt="" className="icon" />
        </Link>
        <div className="notification">
          <img src="/notifications.svg" alt="" />
          <span>1</span>
        </div>
        <img src="/settings.svg" alt="" className="icon" />
      </div>
    </div>
  );
};

export default Navbar;
