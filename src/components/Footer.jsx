import React from "react";
import { Link } from "react-router-dom";

const Footer = ({ theme }) => {

  return (
    <div className={`${theme === 'dark' ? 'dark' : 'light'}`}>
      <footer className="bg-gray-300 font-poppins w-full shadow dark:bg-gray-800">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-md text-gray-900 font-semibold sm:text-center dark:text-gray-400">
            © 2023{" "}
            <Link to="/" className="hover:text-gray-500">
              BlogIn
            </Link>
            . All Rights Reserved.
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-900 dark:text-gray-400 sm:mt-0">
            <li>
              <Link to="/terms-and-conditions" className="hover:text-gray-700 me-4 md:me-6">
                Terms and conditions.
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
