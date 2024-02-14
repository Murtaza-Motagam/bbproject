import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";


const Header = () => {

  const Navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(prevState => !prevState);
  };

  const handleLogout = () => {
    localStorage.removeItem('user-token');
    Navigate('/login')
    window.location.reload(false);
  }


  return (
    <nav className=" font-poppins w-full relative ">
      <div className=" mx-auto bg-gray-100 shadow-md shadow-gray-400 flex flex-wrap items-center justify-between p-4">
        <Link
          to="/"
          className="pl-3 flex items-center space-x-3 rtl:space-x-reverse hover:scale-105"
        >
          <img src={Logo} className="h-12" alt="Flowbite Logo" />
        </Link>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
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
              <div>
                <div onClick={openModal} className="md:block xl:block lg:block hidden relative py-3 px-3 rounded-full bg-gray-600 text-white cursor-pointer">
                  <i className="fa-solid fa-user-plus fa-lg text-center"></i>
                </div>
                {isModalOpen && (
                  <div id="authentication-modal" className="md:flex lg:flex xl:flex hidden absolute top-[4rem] w-[20vw] right-[1rem] z-50 items-center justify-center">
                    <div className="bg-white rounded-lg shadow-md dark:bg-gray-700 w-[15vw]">
                      <div className="flex items-center space-x-2 justify-start m-4 rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">User Profile</h3>
                      </div>
                      <hr />
                      <div className=" md:p-2 lg:p-2 w-full mt-2 ">
                        <div className="flex w-full flex-col items-start justify-between space-y-3">
                          <Link
                            to="/"
                            className="w-full hover:bg-gray-100 hover:rounded bold-500 font-roboto py-3 pl-4"
                          >
                            <div className="flex items-center justify-start space-x-4">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                              </svg>
                              <span>My Account</span>
                            </div>
                          </Link>
                          <Link to="/" className="w-full hover:bg-gray-100 hover:rounded bold-500 font-roboto py-3 pl-4">
                            <div className="flex items-center justify-start space-x-4">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                              </svg>

                              <span>My Profile</span>
                            </div>
                          </Link>
                          <Link to="/" className="w-full hover:bg-gray-100 hover:rounded bold-500 font-roboto py-3 pl-4">
                            <div className="flex items-center justify-start space-x-4">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 pl-0 ml-0">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                              </svg>
                              <span>Subscription Billing</span>
                            </div>
                          </Link>
                          <hr className="my-2 bg-gray-500 h-0.5 w-full" />

                          <button onClick={handleLogout} className="w-full bg-danger p-2 text-white rounded text-center hover:bg-red-500 font-semibold">
                            <div className="flex items-center justify-center space-x-4">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3" />
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
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-transparent md:space-x-10 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {
              !localStorage.getItem('user-token')
                ?
                <div></div>
                : <li className="md:hidden lg:hidden xl:hidden block">
                  <Link
                    to="/myprofile"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-700 md:p-0 md:dark:hover:text-gray-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 mb-2 md:mb-0 lg:mb-0 xl:mb-0"
                  >
                    <div className="flex items-center space-x-2">
                      <i className="fa-solid fa-duotone fa-user fa-md"></i>
                      <span>My Profile</span>
                    </div>
                  </Link>
                </li>
            }
            <li>
              <Link
                to="/explore"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-700 md:p-0 md:dark:hover:text-gray-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 mb-2 md:mb-0 lg:mb-0 xl:mb-0"
              >
                <div className="flex items-center space-x-2">
                  <i className="fas fa-light fa-compass fa-lg text-gray-700"></i>
                  <span>Explore</span>
                </div>
              </Link>
            </li>
            <li>
              <Link
                to="/blogs"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-700 md:p-0 md:dark:hover:text-gray-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 mb-2 md:mb-0 lg:mb-0 xl:mb-0"
              >
                <div className="flex items-center space-x-2">
                  <i className="fa-solid fa-light fa-pen-nib fa-lg text-gray-700"></i>
                  <span>Blogs</span>
                </div>
              </Link>
            </li>
            <li>
              <Link
                To="/category"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-700 md:p-0 md:dark:hover:text-gray-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 mb-2 md:mb-0 lg:mb-0 xl:mb-0"
              >
                <div className="flex items-center space-x-2">
                  <i className="fa-solid fa-list fa-lg text-gray-700"></i>
                  <span>Category</span>
                </div>
              </Link>
            </li>
            <li>
              <Link
                To="/authors"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-700 md:p-0 md:dark:hover:text-gray-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 mb-2 md:mb-0 lg:mb-0 xl:mb-0"
              >
                <div className="flex items-center space-x-2">
                  <i className="fa-solid fa-at fa-lg text-gray-700"></i>
                  <span>Author</span>
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
