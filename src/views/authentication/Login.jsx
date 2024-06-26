import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterNlogin from "../../assets/loginNregister2.jpg";
import { adminDetails } from "../../AdminData";

const Login = ({ theme }) => {

  useEffect(()=>{
    document.title = 'Get Loggedin into Blogin | Get access to all features.';
  },[])

  const Navigate = useNavigate();
  const [credentials, setCredentials] = useState({ emailId: "", password: "" });
  const [rpass, setRPass] = useState(false);

  // Handle change function

  const handleChange = (e) => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [e.target.name]: e.target.value,
    }));
  };

  // Login Functionality

  const handleLogin = async (e) => {
    e.preventDefault();

    setRPass(false);

    // Check if the entered email and password match any admin credentials
    const isAdmin = adminDetails.some(
      (admin) =>
        admin.adminEmail === credentials.emailId &&
        admin.password === credentials.password
    );

    if (isAdmin) {
      // console.log("Admin Entered in website")

      const { emailId, password } = credentials;

      const response = await fetch("http://localhost:5000/api/admin/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emailId, password }),
      });

      const json = await response.json();

      if (json.success) {
        localStorage.setItem("admin-token", json.adminToken);
        setCredentials((prevCredentials) => ({
          ...prevCredentials,
          emailId: "",
          password: "",
        }));
        Navigate("/dashboard");
        window.location.reload();
      }
    } else {
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

        localStorage.setItem("user-token", json.authtoken);
        document.getElementById("emailInput").style.borderColor =
          "rgb(34 197 94)";
        document.getElementById("passwordInput").style.borderColor =
          "rgb(34 197 94)";
        document.getElementById("loginCredentials").style.display = "none";

        setCredentials((prevCredentials) => ({
          ...prevCredentials,
          emailId: "",
          password: "",
        }));
        Navigate("/");
        window.location.reload();
      } else {
        document.getElementById("loginCredentials").style.display = "block";
        setCredentials((prevCredentials) => ({
          ...prevCredentials,
          password: "",
        }));
        document.getElementById("emailInput").style.borderColor =
          "rgb(185 28 28)";
        document.getElementById("passwordInput").style.borderColor =
          "rgb(185 28 28)";
      }
    }
  };

  // Password reveal Functionality

  const revealPassword = () => {
    setRPass((prevState) => !prevState);
  };


  return (
    <>
      <div className={`${theme === 'dark' ? 'dark' : 'light'}`}>
        <section className={` min-h-screen flex items-center justify-center font-roboto ${theme === 'dark' ? 'dark:bg-darkPrimary' : 'bg-gradient-to-r from-pink-100 to-blue-900'}`}>
          {/* <!-- login container --> */}
          <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center
          dark:bg-darkSecondary">
            {/* <!-- form --> */}
            <div className="md:w-1/2 px-8 md:px-16">
              <h2 className="font-bold text-2xl text-[#002D74] dark:text-white">Login</h2>
              <p className="text-sm mt-4 text-[#002D74] dark:text-gray-100">
                If you are already a member, get logged in by giving your
                credentials.
              </p>

              <form
                action=""
                className="-mt-3 flex flex-col gap-4"
                onSubmit={handleLogin}
              >
                <input
                  id="emailInput"
                  className="p-2 mt-8 rounded border"
                  type="email"
                  name="emailId"
                  placeholder="Email"
                  onChange={handleChange}
                  value={credentials.emailId}
                  autoComplete="off"
                  required
                />

                <div className="relative">
                  <input
                    id="passwordInput"
                    className="p-2 rounded border w-full"
                    type={rpass ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    value={credentials.password}
                    minLength="8"
                    autoComplete="off"
                    required
                  />

                  {/* Password reveal icon */}

                  <div
                    onClick={revealPassword}
                    className="cursor-pointer text-gray-700 hover:text-black"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="gray"
                      className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                    </svg>
                  </div>
                </div>
                <button className="bg-[#002D74] rounded-md font-semibold text-white py-2 hover:scale-105 duration-300
                dark:bg-blue-600">
                  Login
                </button>
                <h1
                  id="loginCredentials"
                  className="hidden text-sm font-semibold text-center text-red-500"
                >
                  <strong>Oops! </strong>Please Login with correct credentials
                </h1>

                <div className=" text-sm text-center hover:underline py-4 text-[#002D74] dark:text-gray-50">
                  <Link to="/forgotpassword">Forgot your password?</Link>
                </div>
              </form>
              <div className="mt-5 text-center text-sm flex gap-x-2 justify-center  items-center text-[#002D74] dark:text-gray-50">
                <p>Don't have an account?</p>
                <Link
                  to="/register"
                  className="shadow-sm hover:underline font-bold"
                >
                  Register
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

export default Login;
