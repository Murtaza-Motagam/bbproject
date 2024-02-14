import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const Navigate = useNavigate();

  // State Rendering

  const [credentials, setCredentials] = useState({
    username: "",
    emailId: "",
    password: "",
    cpassword: "",
  });
  const [rpass, setRPass] = useState(false);
  const [rcpass, setRCPass] = useState(false);

  // HandleChange functionality

  const handleChange = (e) => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [e.target.name]: e.target.value,
    }));
    // setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Signup functionality

  const handleSignup = async (e) => {
    e.preventDefault();
    setRPass(false);
    setRCPass(false);
    const { username, emailId, password, cpassword } = credentials;

    if (password === cpassword) {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, emailId, password, cpassword }),
      });

      const json = await response.json();

      if (json.success) {
        // Saving the auth token in the local storge of the user

        localStorage.setItem("user-token", json.authtoken);
        alert("Account created successfully");
        setCredentials({
          username: "",
          emailId: "",
          password: "",
          cpassword: "",
        });
        Navigate("/");
        window.location.reload(false);
      } else {
        // document.getElementById("passwordMatch").style.display = "hidden";
        document.getElementById("passwordMatch").style.display = "none";
        document.getElementById("errorHandle").style.display = "block";
        setCredentials({ password: "", cpassword: "" });
      }
    } else {
      // document.getElementById("errorHandle").style.display = "hidden";
      document.getElementById("errorHandle").style.display = "none";
      document.getElementById("passwordMatch").style.display = "block";
      setCredentials((prevCredentials) => ({
        ...prevCredentials,
        password: "",
        cpassword: "",
      }));
    }
  };

  // Password reveal

  const revealPassword = () => {
    setRPass((prevState) => !prevState);
  };
  const revealCPassword = () => {
    setRCPass((prevState) => !prevState);
  };

  return (
    <>
      <section className="bg-set min-h-screen flex items-center justify-center font-roboto">
        {/* <!-- login container --> */}
        <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
          {/* <!-- form --> */}
          <div className="md:w-1/2 px-8 md:px-16">
            <h2 className="font-bold text-2xl text-[#002D74]">
              Signup in{" "}
              <span className="text-secondary font-extrabold font-poppins">
                BLOGIN
              </span>
            </h2>

            <div className="mt-3 text-sm flex justify-start gap-x-2 items-center text-[#002D74]">
              <p>Already have an account?</p>
              <Link
                to="/login"
                className=" text-md hover:underline font-semibold"
              >
                Login
              </Link>
            </div>

            <form
              action=""
              className="flex flex-col gap-4"
              onSubmit={handleSignup}
            >
              <input
                className="p-2 mt-8 rounded border"
                type="text"
                name="username"
                placeholder="Create a username"
                onChange={handleChange}
                value={credentials.username}
                autoComplete="off"
                required
              />

              <input
                className="p-2 rounded border"
                type="email"
                name="emailId"
                placeholder="Enter your Email-ID"
                onChange={handleChange}
                value={credentials.emailId}
                autoComplete="off"
                required
              />

              <div className="relative">
                <input
                  className="p-2 rounded border w-full"
                  type={rpass ? "text" : "password"}
                  name="password"
                  placeholder="Create a strong password"
                  onChange={handleChange}
                  value={credentials.password}
                  minLength="8"
                  autoComplete="off"
                  required
                />

                <div
                  onClick={revealPassword}
                  className="cursor-pointer text-gray-700 hover:text-black"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                  </svg>
                </div>
              </div>

              <div className="relative">
                <input
                  className="p-2 rounded border w-full"
                  type={rcpass ? "text" : "password"}
                  name="cpassword"
                  autoComplete="off"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  value={credentials.cpassword}
                  minLength="8"
                  required
                />
                <div
                  onClick={revealCPassword}
                  className="cursor-pointer text-gray-700 hover:text-black"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                  </svg>
                </div>
              </div>
              <button
                type="submit"
                className="bg-[#002D74] rounded-md text-white py-2 hover:scale-105 duration-300"
              >
                Register
              </button>
            </form>

            <h1
              id="passwordMatch"
              className="hidden mt-3 font-semibold font-roboto text-sm text-red-500"
            >
              <strong>Oops! </strong>Please with correct credentials
            </h1>
            <h1
              id="errorHandle"
              className="hidden mt-3 font-semibold font-roboto text-sm text-red-500"
            >
              <strong>Oops! </strong>Something went wrong try again.
            </h1>

            <div className="text-center text-xs text-grey-dark mt-4">
              <span>By signing up, you agree to the </span>
              <Link
                className="no-underline text-blue-800 hover:underline"
                to="/terms-and-conditions"
              >
                Terms & service with privacy policy
              </Link>
            </div>

            <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
              <hr className="border-gray-400" />
              <p className="text-center text-md">OR</p>
              <hr className="border-gray-400" />
            </div>

            <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74] shadow-md shadow-gray-500">
              <svg
                className="mr-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="25px"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                />
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                />
              </svg>
              Signup with google
            </button>
          </div>

          <div className="md:block hidden w-1/2">
            <img className="rounded-2xl" src="loginNregister2.jpg" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
