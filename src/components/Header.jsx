import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";
import AOS from "aos";
import "aos/dist/aos.css";

const Header = ({ theme, handleTheme }) => {
  const Navigate = useNavigate();
  const location = useLocation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [profile, setProfile] = useState([]);
  const [defaultLang, setDefaultLang] = useState("ENG - USA");

  const dropdownRef = useRef(null);

  const openModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const openDropDown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("user-token");
    Navigate("/login");
    window.location.reload(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropDownOpen(false);
    }
  };

  const fetchUser = async () => {
    const response = await fetch("http://localhost:5000/api/auth/getuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "user-token": localStorage.getItem("user-token"),
      },
    });

    const json = await response.json();
    setProfile([json.userInfo]);
  };

  useEffect(() => {
    AOS.init();
    fetchUser();
    if (theme === "light") {
      document.getElementById("logo").classList.remove("color-set");
    } else {
      document.getElementById("logo").classList.add("color-set");
    }
  }, [theme, isModalOpen]);

  return (
    <nav
      className={`font-poppins w-full relative  ${theme === "dark" ? "dark" : "light"
        }`}
    >
      <div className=" mx-auto bg-gray-100 shadow-md shadow-gray-400 flex flex-wrap items-center justify-between p-4 dark:bg-gray-800 dark:shadow-sm dark:shadow-gray-500">
        <Link
          to="/"
          className="px-3 pb-2 flex items-center space-x-3 rtl:space-x-reverse hover:scale-105  rounded-full"
        >
          <img src={Logo} id="logo" className="h-12 " alt="Flowbite Logo" />
        </Link>

        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <div className="flex items-center justify-center mr-4">
            <div
              id="toggleTheme"
              className="flex items-center justify-center ml-4 mr-2 cursor-pointer text-gray-500 font-bold hover:text-gray-900 dark:text-gray-200 dark:hover:text-white"
              onClick={handleTheme}
              data-aos={handleTheme ? "zoom-out" : "zoom-in"}
              data-aos-duration="1000"
            >
              {theme === "dark" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 transition duration-400 ease-in"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 transition duration-400 ease-in"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                  />
                </svg>
              )}
            </div>
          </div>
          {
            !localStorage.getItem('user-token')
              ?
              <Link
                to="/register"
                className="text-white mr-2 bg-gray-900 hover:scale-105 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-3xl text-sm px-4 py-2 text-center dark:bg-gray-50 dark:text-gray-900"
              >
                Signup
              </Link>
              :
              <div onClick={openModal}>
                <div className="md:block xl:block lg:block hidden relative py-3 px-3 rounded-full bg-gray-600 text-white hover:bg-black cursor-pointer">
                  <i className="fa-solid fa-user-plus fa-lg text-center"></i>
                </div>
                {isModalOpen && (
                  <div id="authentication-modal" className="md:flex lg:flex xl:flex hidden absolute top-[4rem] w-[20vw] right-[1rem] z-50 items-center justify-center">
                    <div className="bg-white rounded-lg shadow-md dark:bg-gray-700 w-[15vw]">
                      <div className="flex items-center space-x-2 justify-start m-4 rounded-t dark:border-gray-600">
                        {profile.map((e={}) => {
                          return (
                            <div key={e?._id}>
                              <h3 className="flex justify-between w-full items-center text-xl font-semibold text-gray-900 dark:text-white">
                                <i className="fa-solid fa-user-plus text-center mr-3"></i>
                                <span>{e?.username}</span>
                              </h3>
                            </div>
                          )
                        })}
                      </div>
                      <hr />
                      <div className=" md:p-2 lg:p-2 w-full mt-2 ">
                        <div className="flex w-full flex-col items-start justify-between space-y-3">
                          <Link
                            to="/myprofile"
                            className="w-full hover:bg-gray-100 hover:rounded bold-500 font-roboto py-3 pl-4 
                          dark:text-white dark:hover:bg-darkTerritiary
                          "
                          >
                            <div className="flex items-center justify-start space-x-4 ">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                                />
                              </svg>

                              <span>My Profile</span>
                            </div>
                          </Link>
                          
                          <button
                            onClick={handleLogout}
                            className="w-full bg-danger p-2 text-white rounded text-center hover:bg-red-500 font-semibold"
                          >
                            <div className="flex items-center justify-center space-x-4">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                                />
                              </svg>
                              <span>Logout</span>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
          }

          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-transparent md:space-x-10 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
            {!localStorage.getItem("user-token") ? (
              <div></div>
            ) : (
              <li className="md:hidden lg:hidden xl:hidden block">
                <Link
                  to="/myprofile"
                  className="block py-2 px-3 text-gray-600 rounded hover:bg-gray-100 md:p-0 mb-2 md:mb-0 lg:mb-0 xl:mb-0 dark:text-gray-100"
                >
                  <div className="flex items-center space-x-2">
                    <i className="fa-solid fa-duotone fa-user fa-md"></i>
                    <span>My Profile</span>
                  </div>
                </Link>
              </li>
            )}
            <li>
              <Link
                to="/explore"
                className={`${location.pathname === "/explore"
                  ? "text-gray-900 font-semibold dark:text-white"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white"
                  } block py-2 px-3 rounded   hover:font-semibold md:p-0 mb-2 md:mb-0 lg:mb-0 xl:mb-0`}
              >
                <div className="flex items-center space-x-2">
                  <i className="fas fa-light fa-compass fa-lg"></i>
                  <span>Explore</span>
                </div>
              </Link>
            </li>
            <li>
              <Link
                to="/blogs"
                className={`${location.pathname === "/blogs"
                  ? "text-gray-900 font-semibold dark:text-white"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white"
                  } block py-2 px-3 rounded   hover:font-semibold md:p-0 mb-2 md:mb-0 lg:mb-0 xl:mb-0`}
              >
                <div className="flex items-center space-x-2">
                  {/* <i className="fa-solid fa-list fa-lg"></i> */}
                  <i className="fa-solid fa-pencil fa-lg"></i>
                  <span>Create a post</span>
                </div>
              </Link>
            </li>
            <li>
              <Link
                to="/category"
                className={`${location.pathname === "/category"
                  ? "text-gray-900 font-semibold dark:text-white"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white"
                  } block py-2 px-3 rounded   hover:font-semibold md:p-0 mb-2 md:mb-0 lg:mb-0 xl:mb-0`}
              >
                <div className="flex items-center space-x-2">
                  <i className="fa-solid fa-list fa-lg"></i>
                  <span>Category</span>
                </div>
              </Link>
            </li>
            <li>
              <Link
                to="/authors"
                className={`${location.pathname === "/authors"
                  ? "text-gray-900 font-semibold dark:text-white"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white"
                  } block py-2 px-3 rounded   hover:font-semibold md:p-0 mb-2 md:mb-0 lg:mb-0 xl:mb-0`}
              >
                <div className="flex items-center space-x-2">
                  <i className="fa-solid fa-at fa-lg"></i>
                  <span>Author</span>
                </div>
              </Link>
            </li>
            <li>
              <Link
                to="/myblogs"
                className={`${location.pathname === "/myblogs"
                  ? "text-gray-900 font-semibold dark:text-white"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white"
                  } block py-2 px-3 rounded   hover:font-semibold md:p-0 mb-2 md:mb-0 lg:mb-0 xl:mb-0`}
              >
                <div className="flex items-center space-x-2">
                <i className="fa-solid fa-pencil fa-lg"></i>
                  <span>My Blogs</span>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
