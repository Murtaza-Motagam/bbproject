import React, { useState } from "react";
import blogVector from "../../assets/writing.png";
import { Link } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({ emailId: "", password: "" });

  const handleChange = (e) => {
    // setCredentials(prevCredentials => ({
    //   ...prevCredentials,
    //   [e.target.name]: e.target.value
    // }));
    setCredentials({ ...credentials, [e.target.name]: e.target.value});
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    const { emailId, password } = credentials;

    const response = await fetch("http://localhost:5000/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ emailId, password }),
    });

    const json = await response.json();

    if (json.success) {
      // Saving the auth token in the local storge of the user

      localStorage.setItem("token", json.authtoken);
      alert("Welcome back user");
      setCredentials({ emailId: "", password: "" });
      // Navigate('/');
    } else {
      document.getElementById("loginCredentials").style.display = "block";
      setCredentials({ password: "" });
    }
  };

  return (
    <div className="flex justify-center items-center bg-set">
      <div className="div_left lg:w-1/2 w-full md:mx-auto sm:mx-auto">
        <div className="bg-grey-lighter min-h-screen flex flex-col">
          <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <form
              className="bg-gray-50 px-6 py-8 rounded-xl shadow-md shadow-gray-500 text-black w-full font-poppins"
              onSubmit={handleLogin}
            >
              <h1 className="mb-3 text-3xl text-center font-semibold">Login</h1>
              <h1
                id="loginCredentials"
                className="hidden mb-4 text-md text-center text-red-500"
              >
                <strong>Oops! </strong>Please Login with correct credentials
              </h1>
              <input
                type="email"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="emailId"
                placeholder="Email"
                onChange={handleChange}
                value={credentials.emailId}
                autoComplete="off"
                required
              />

              <input
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={credentials.password}
                minLength="8"
                autoComplete="off"
                required
              />

              <Link
                to="/forgotpassword"
                className="text-center text-purple-800 w-full ml-24 hover:underline font-roboto"
              >
                Forgot Password?
              </Link>

              <button
                type="submit"
                className="w-full text-center py-3 mt-5 rounded bg-gray-900 bold-700 text-white hover:bg-gray-800  hover:text-white"
              >
                Sign in
              </button>

              <div className="text-grey-dark flex items-center mt-6 font-roboto text-sm w-full">
                Doesn't have an account yet? &nbsp;
                <Link
                  to="/register"
                  className=" text-indigo-800 hover:underline"
                >
                  create an account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="div_right hidden lg:flex xl:flex  pr-20 justify-center items-center">
        <img src={blogVector} className=" w-[700px] rounded-xl" />
      </div>
    </div>
  );
};

export default Login;
