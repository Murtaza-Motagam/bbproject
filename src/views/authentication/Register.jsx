import React, { useState, useEffect } from "react";
import RegisterNlogin from "../../assets/loginNregister2.jpg";
import { Link, useNavigate } from "react-router-dom";

const Register = ({ theme }) => {

  useEffect(()=>{
    document.title = 'Signup in Blogin | Get access to all features.';
  },[])

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
      <div className={`${theme === 'dark' ? 'dark' : 'light'}`}>
        <section className={` min-h-screen flex items-center justify-center font-roboto ${theme === 'dark' ? 'dark:bg-darkPrimary' : 'bg-gradient-to-r from-pink-100 to-blue-900'}`}
        >
          {/* <!-- login container --> */}
          <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center dark:bg-darkSecondary">
            {/* <!-- form --> */}
            <div className="md:w-1/2 px-8 md:px-16">
              <h2 className="font-bold text-2xl text-[#002D74] dark:text-white">
                Signup in{" "}
                <span className="text-secondary font-extrabold font-poppins dark:text-gray-100">
                  BLOGIN
                </span>
              </h2>

              <div className="mt-3 text-sm flex justify-start gap-x-2 items-center text-[#002D74] dark:text-gray-100">
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
                  placeholder="Enter your email-id"
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
                  className="bg-[#002D74] rounded-md text-white py-2 hover:scale-105 duration-300 dark:bg-blue-600"
                >
                  Register
                </button>
              </form>

              <h1
                id="passwordMatch"
                className="hidden mt-3 font-semibold font-roboto text-sm text-red-500 "
              >
                <strong>Oops! </strong>Please with correct credentials
              </h1>
              <h1
                id="errorHandle"
                className="hidden mt-3 font-semibold font-roboto text-sm text-red-500"
              >
                <strong>Oops! </strong>Something went wrong try again.
              </h1>

              <div className="text-center text-xs text-grey-dark mt-4 dark:text-gray-50">
                <span>By signing up, you agree to the </span>
                <Link
                  className="no-underline text-blue-800 hover:underline dark:text-gray-50"
                  to="/terms-and-conditions"
                >
                  Terms & service with privacy policy
                </Link>
              </div>
            </div>

            <div className="md:block hidden w-1/2">
              <img className="rounded-2xl" src={RegisterNlogin} />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Register;
