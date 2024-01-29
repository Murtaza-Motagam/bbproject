import React from "react";
import LoginImage from "../../assets/login_image.jpg";
import { NavLink } from "react-router-dom";
const Login = () => {
  return (
    <div className={"flex h-screen"}>
      <div className="w-1/2">
        <div className="flex justify-center h-full items-center flex-col">
          <div class="w-full max-w-xs">
            <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="flex flex-col justify-center items-center mb-5 ">
                <h3 class="mb-8 text-xl text-center flex flex-col">
                  <span>Welcome To The</span>
                  <span className="font-bold">NoteItAll</span>
                </h3>
              </div>
              <div class="mb-4">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="username"
                >
                  Username
                </label>
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Username"
                />
              </div>
              <div class="mb-6">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="password"
                >
                  Password
                </label>
                <input
                  class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="******************"
                />
                <p class="text-red-500 text-xs italic">
                  Please choose a password.
                </p>
              </div>
              <div class="flex items-center justify-between">
                <button
                  class="bg-black hover:bg-white hover:text-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Sign In
                </button>
                <NavLink to="/forget">
                  <a class="inline-block align-baseline font-bold text-sm text-black-500 hover:text-gray-600">
                    Forgot Password?
                  </a>
                </NavLink>
              </div>
              <div className="mt-3">
                Don't Have An Account?{" "}
                <NavLink to="/register">
                  <a class="inline-block align-baseline font-bold  text-black-500 hover:text-gray-600">
                    signUp
                  </a>
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="w-1/2">
        <img src={LoginImage} className={"object-cover h-full"} />
      </div>
    </div>
  );
};

export default Login;
