import React from "react";
import LoginImage from "../../assets/login_image.jpg";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="flex h-screen ">
      <div className="div_left lg:w-1/2  w-full md:mx-auto sm:mx-auto">
        <div class="bg-grey-lighter min-h-screen flex flex-col">
          <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div class="bg-gray-50 px-6 py-8 rounded-xl shadow-md shadow-gray-500 text-black w-full font-poppins">
              <h1 class="mb-8 text-3xl text-center font-semibold">Signup</h1>
              <input
                type="text"
                class="block border border-grey-light w-full p-3 rounded mb-4"
                name="fullname"
                placeholder="Full Name"
                autoComplete="off"
              />

              <input
                type="text"
                class="block border border-grey-light w-full p-3 rounded mb-4"
                name="email"
                placeholder="Email"
                autoComplete="off"
              />

              <input
                type="password"
                class="block border border-grey-light w-full p-3 rounded mb-4"
                name="password"
                placeholder="Password"
                autoComplete="off"
              />
              <input
                type="password"
                class="block border border-grey-light w-full p-3 rounded mb-4"
                name="confirm_password"
                autoComplete="off"
                placeholder="Confirm Password"
              />

              <button
                type="submit"
                class="w-full text-center py-3 rounded bg-gray-900 bold-700 text-white hover:bg-gray-800  hover:text-white "
              >
                Create Account
              </button>

              <div class="text-center text-sm text-grey-dark mt-4">
                By signing up, you agree to the
                <a
                  class="no-underline border-b border-grey-dark text-grey-dark"
                  href="#"
                >
                  Terms of Service
                </a>{" "}
                and
                <a
                  class="no-underline border-b border-grey-dark text-grey-dark"
                  href="#"
                >
                  Privacy Policy
                </a>
              </div>
            </div>

            <div class="text-grey-dark mt-6 font-roboto text-lg">
              Already have an account?
              <Link to="/login" className="ml-2 text-indigo-800 underline hover:font-bold">
                <a
                  class="no-underline border-b border-blue text-blue"
                  href="../login/"
                >
                  Log in
                </a>
              </Link>
              .
            </div>
          </div>
        </div>
      </div>
      <div className="div_right w-1/2 hidden lg:block xl:block mt-[110px] pr-20">
        <img src={LoginImage} className="object-cover my-auto w-[60vw] rounded-xl"  />
      </div>
    </div>
  );
};

export default Register;
