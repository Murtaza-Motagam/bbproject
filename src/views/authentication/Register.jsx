import React, { useState } from "react";
import blogVector from "../../assets/writing.png";
import { Link } from "react-router-dom";

const Register = () => {

  const [credentials, setCredentials] = useState({ username: "", emailId: "", password: "", cpassword: "" });

  const handleChange = (e) => {
    setCredentials(prevCredentials => ({
      ...prevCredentials,
      [e.target.name]: e.target.value
    }));
  }

  const handleSignup = async (e) => {
    e.preventDefault();

    const { username, emailId, password, cpassword } = credentials

    if (password === cpassword) {


      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, emailId, password, cpassword })
      });

      const json = await response.json();

      if (json.success) {
        // Saving the auth token in the local storge of the user

        localStorage.setItem('token', json.authtoken);
        alert("Account created successfully");
        setCredentials({ username: "", emailId: "", password: "", cpassword: "" })
        Navigate('/');
        window.location.reload(false);

      }
      else {
        document.getElementById('errorHandle').style.display = "block";
      }
    }
    else {
      document.getElementById('passwordMatch').style.display = "block";
      setCredentials({ password: "", cpassword: "" })

    }
  }




  return (
    <div className="flex justify-center items-center bg-set">
      <div className="div_left lg:w-1/2  w-full md:mx-auto sm:mx-auto">
        <div className="bg-grey-lighter min-h-screen flex flex-col">
          <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <form className="bg-gray-50 px-6 py-8 rounded-xl shadow-md shadow-gray-500 text-black w-full font-poppins " onSubmit={handleSignup}>
              <h1 className="mb-3 text-3xl text-center font-semibold">Signup</h1>
              <h1 id="passwordMatch" className="hidden mb-4 text-md text-center text-red-500"><strong>Oops! </strong>Please Login with correct credentials</h1>
              <h1 id="errorHandle" className="hidden mb-4 text-md text-center text-red-500"><strong>Oops! </strong>Something went wrong try again.</h1>
              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="username"
                placeholder="Full Name"
                onChange={handleChange}
                value={credentials.username}
                autoComplete="off"
                required
              />

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
              <input
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="cpassword"
                autoComplete="off"
                placeholder="Confirm Password"
                onChange={handleChange}
                value={credentials.cpassword}
                minLength="8"
                required
              />

              <button
                type="submit"
                className="w-full text-center py-3 rounded bg-gray-900 bold-700 text-white hover:bg-gray-800  hover:text-white"
              >
                Create Account
              </button>

              <div className="text-center text-sm text-grey-dark mt-4">
                <span>By signing up, you agree to the </span>
                <Link
                  className="no-underline text-blue-800 hover:underline"
                  to="/terms-and-conditions"
                >
                  Terms & Service with Privacy Policy
                </Link>
              </div>

              <div className="text-grey-dark mt-3 ml-8 font-roboto text-md">
                Already have an account?
                <Link to="/login" className="ml-1 text-indigo-800 underline hover:text-indigo-900">
                  Login
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

export default Register;
