import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {

  return (
    <div>
      <footer className="bg-gray-900 font-poppins w-full shadow dark:bg-gray-800">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-md text-gray-300 sm:text-center dark:text-gray-400">
            © 2023{" "}
            <Link to="/" className="hover:text-gray-50">
              BlogIn
            </Link>
            . All Rights Reserved.
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-300 dark:text-gray-400 sm:mt-0">
            <li>
              <Link to="/" className="hover:text-gray-50 me-4 md:me-6">
                About
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-gray-50 me-4 md:me-6">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-gray-50 me-4 md:me-6">
                Licensing
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-gray-50 :">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
