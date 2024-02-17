import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = ({ theme }) => {

  const [credentials, setCredentials] = useState({ emailId: "" });
  const [newPassword, setNewPassword] = useState({
    password: "",
    cpassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handlePasswordChange = (e) => {
    setNewPassword({ ...newPassword, [e.target.name]: e.target.value });
  };

  const handleRecoverPassword = async (e) => {
    e.preventDefault();

    const { emailId } = credentials;

    const response = await fetch(
      "http://localhost:5000/api/auth/forgotpassword/verifyemail",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emailId }),
      }
    );

    const json = await response.json();

    if (json.success) {
      // alert("email verified")

      document.getElementById("verified").style.display = "block";

      document.getElementById("notVerified").style.display = "none";

      document.getElementById("updatePassword").style.display = "block";

      document.getElementById("emailInput").readOnly = true;

      // invisibling verify button and displaying change password button

      document.getElementById("authorisedButton").style.display = "none";

      document.getElementById("changePassword").style.display = "block";
    } else {
      document.getElementById("verified").style.display = "none";

      document.getElementById("notVerified").style.display = "block";
    }
  };

  const handleChangepassword = async (e) => {
    e.preventDefault();

    const { password, cpassword } = newPassword;
    const { emailId } = credentials;

    if (password === cpassword) {
      const response = await fetch(
        "http://localhost:5000/api/auth/changepassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ emailId, password }),
        }
      );

      const json = await response.json();

      if (json.success) {
        document.getElementById("newPasswordN").style.display = "none";
        document.getElementById("newPasswordS").style.display = "block";

        setCredentials({ emailId: "" });
        setNewPassword({ password: "", cpassword: "" });

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } else {
      document.getElementById("newPasswordS").style.display = "none";
      document.getElementById("newPasswordN").style.display = "block";
    }
  };

  return (
    <div className={`${theme === 'dark' ? 'dark' : 'light'}`}>
      <div className={` ${theme === 'dark' ? 'dark:bg-darkPrimary' : 'bg-gradient-to-r from-pink-100 to-blue-900'} min-h-screen flex flex-col `}>
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <form className="bg-white px-6 py-8 shadow-md shadow-gray-500 rounded-xl text-black w-full font-poppins dark:bg-darkSecondary dark:shadow-sm dark:shadow-gray-400">
            <h1 className="mb-8 text-2xl text-center bold-700 font-roboto dark:text-white">
              Recover Your Password Easy and Efficiently
            </h1>

            <div className="hidden" id="verified">
              <h1 className=" text-green-500 font-roboto text-lg mb-3 font-bold flex items-center gap-x-1 dark:text-green-400">
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
                    d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                  />
                </svg>
                Email is verified
              </h1>
            </div>

            <div className="hidden" id="notVerified">
              <h1 className=" text-red-500 font-roboto text-lg mb-3 font-bold flex items-center gap-x-1">
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
                    d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                Please Enter Correct Credentials
              </h1>
            </div>

            <div className="hidden" id="newPasswordS">
              <h1 className=" text-green-500 font-roboto text-md mb-3 font-bold flex items-center gap-x-1 dark:text-green-400">
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
                    d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                  />
                </svg>
                Passwords Changed Successfully.
              </h1>
            </div>

            <div className="hidden" id="newPasswordN">
              <h1 className=" text-red-500 font-roboto text-md mb-3 font-bold flex items-center gap-x-1">
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
                    d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                Both password doesn't match.
              </h1>
            </div>

            <input
              type="email"
              id="emailInput"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="emailId"
              placeholder="Enter Your Email"
              value={credentials.emailId}
              onChange={handleChange}
              required
              autoComplete="off"
            />

            <div className="hidden" id="updatePassword">
              <input
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                placeholder="create a strong password"
                name="password"
                onChange={handlePasswordChange}
                value={newPassword.password}
                minLength="8"
                required
              />
              <input
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                placeholder="Confirm Password"
                name="cpassword"
                onChange={handlePasswordChange}
                value={newPassword.cpassword}
                minLength="8"
                required
              />
            </div>

            <div className="flex justify-between items-center gap-x-3">
              <button
                type="submit"
                id="authorisedButton"
                onClick={handleRecoverPassword}
                className="w-full text-center py-3 rounded bg-gray-900 hover:bg-gray-800 text-white "
              >
                Verify Email
              </button>
              <button
                type="submit"
                id="changePassword"
                onClick={handleChangepassword}
                className="hidden w-full text-center py-3 rounded bg-gray-900 hover:bg-gray-800 text-white "
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
