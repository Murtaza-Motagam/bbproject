import React from "react";

const BlogsCategory = ({ theme }) => {
  return (
    <div className={`${theme === "dark" ? "dark" : "light"}`}>
      <div>
        <nav class="bg-white border-gray-200 dark:bg-gray-900">
          <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <div class="flex md:order-2">
              <div class="relative hidden md:block">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"></div>
                <input
                  type="text"
                  id="search-navbar"
                  class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search category"
                />
              </div>
              <button
                data-collapse-toggle="navbar-search"
                type="button"
                class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-search"
                aria-expanded="false"
              ></button>
            </div>
            <div
              class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
              id="navbar-search"
            >
              <div class="relative mt-3 md:hidden">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    class="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="search-navbar"
                  class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search..."
                />
              </div>
              <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <a
                    href="#"
                    class="block py-2 px-3 text-white bg-gray-700 rounded md:bg-transparent md:text-gray-700 md:p-0 md:dark:text-gray-500"
                    aria-current="page"
                  >
                    Entertainment
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="block py-2 px-3 text-white bg-gray-700 rounded md:bg-transparent md:text-gray-700 md:p-0 md:dark:text-gray-500"
                  >
                    Technology
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="block py-2 px-3 text-white bg-gray-700 rounded md:bg-transparent md:text-gray-700 md:p-0 md:dark:text-gray-500"
                  >
                    Travel
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div>
        <div class="flex flex-col bg-white px-8 py-6 max-w-sm mx-auto rounded-lg shadow-md">
          <div class="flex justify-center items-center">
            <a
              class="px-2 py-1 bg-gray-600 text-sm text-green-100 rounded hover:bg-gray-500"
              href="#"
            >
              Laravel
            </a>
          </div>
          <div class="mt-4">
            <a
              class="text-lg text-gray-700 font-medium hover:underline"
              href="#"
            >
              Build Your New Idea with Laravel Freamwork.
            </a>
          </div>
          <div class="flex justify-between items-center mt-4">
            <div class="flex items-center">
              <img
                src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=731&q=80"
                class="w-8 h-8 object-cover rounded-full"
                alt="avatar"
              />
              <a class="text-gray-700 text-sm mx-3 hover:underline" href="#">
                Alex John
              </a>
            </div>
            <span class="font-light text-sm text-gray-600">Jun 1, 2020</span>
          </div>
        </div>
      </div>{" "}
      <div>
        <div class="flex flex-col bg-white px-8 py-6 max-w-sm mx-auto rounded-lg shadow-md mt-5">
          <div class="flex justify-center items-center">
            <a
              class="px-2 py-1 bg-gray-600 text-sm text-green-100 rounded hover:bg-gray-500"
              href="#"
            >
              Laravel
            </a>
          </div>
          <div class="mt-4">
            <a
              class="text-lg text-gray-700 font-medium hover:underline"
              href="#"
            >
              Build Your New Idea with Laravel Freamwork.
            </a>
          </div>
          <div class="flex justify-between items-center mt-4">
            <div class="flex items-center">
              <img
                src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=731&q=80"
                class="w-8 h-8 object-cover rounded-full"
                alt="avatar"
              />
              <a class="text-gray-700 text-sm mx-3 hover:underline" href="#">
                Alex John
              </a>
            </div>
            <span class="font-light text-sm text-gray-600">Jun 1, 2020</span>
          </div>
        </div>
      </div>{" "}
      <div></div>
    </div>
  );
};

export default BlogsCategory;
