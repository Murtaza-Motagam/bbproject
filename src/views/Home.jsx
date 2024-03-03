import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "../assets/slider-img.png";
import About from "../assets/about.jpg";
import icon from "../assets/icon.png";
import freelance from "../assets/freelance.jpg";

const Home = ({ theme }) => {
  useEffect(() => {
    document.title = "BLOGIN - Exclusive Blog Content Service Media Platform.";
  }, []);

  const compoData = [
    {
      heading: "Paid to Freelancers",
      subheading: "250$ Dollars",
    },
    {
      heading: "Paid Invoices",
      subheading: "200$ Dollars",
    },
    {
      heading: "Worldwide Freelancer",
      subheading: "300$ Dollars",
    },
    {
      heading: "Customer Satisfaction Rate",
      subheading: "320$ Dollars",
    },
  ];

  return (
    <div
      className={`${
        theme === "dark" ? "dark" : "light"
      } max-w-[1500px] mx-auto font-poppins`}
    >
      <div className=" flex lg:flex-row bg-gray-100 dark:bg-transparent  xl:flex-row flex-col-reverse items-center rounded-lg xl:mx-auto lg:mx-auto mb-20 mx-5 mt-20 shadow-md shadow-gray-400">
        <div className="left w-full lg:w-1/2 xl:w-1/2  flex items-center py-20 overflow-hidden">
          <div className="flex flex-col space-y-10 px-10 py-5  dark:text-white dark:bg-transparent">
            <h1 className="lg:text-4xl xl:text-4xl md:text-2xl text-2xl">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit
            </h1>
            <p className="lg:text-xl xl:text-xl md:text-lg text-md dark:text-gray-300">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
              blanditiis iste ipsum.
            </p>
            <div className="flex items-center justify-start gap-x-3 w-full">
              <button
                type="button"
                className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900"
              >
                Yellow
              </button>
              <button
                type="button"
                className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
              >
                Purple
              </button>
            </div>
          </div>
        </div>
        <div className="Right w-1/2 flex items-center">
          <div className="flex items-center">
            <img src={Slider} className="h-auto object-cover" alt="" />
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col items-center justify-center space-y-10 mb-20 px-6 dark:text-white">
        <div className="upper">
          <img src={About} alt="" className="h-auto object-cover" />
        </div>
        <div className="lower flex flex-col space-y-5 text-center">
          <h1 className="lg:text-4xl xl:text-4xl md:text-3xl text-xl font-bold ">
            Lorem ipsum dolor sit
          </h1>
          <p className="lg:text-xl xl:text-xl md:text-lg text-md dark:text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
            blanditiis iste ipsum Lorem ipsum dolor, sit amet consectetur
            adipisicing elit. Fugit accusantium magnam, adipisci, culpa rerum
            voluptate laborum aspernatur eveniet, excepturi odit iusto odio
            voluptates.
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col items-start mb-32 rounded-lg overflow-hidden py-10 px-5">
        <h1 className="mb-10 lg:text-3xl xl:text-2xl md:text-xl text-lg font-semibold text-center mx-auto w-full my-5 dark:text-white">
          Lorem ipsum dolor sit amet.
        </h1>

        <div className="flex xl:flex-row flex-col-reverse items-center justify-center gap-x-2 w-full">
          {/* Particular component */}
          <div className="left xl:w-1/2 lg:w-1/2 w-full space-y-10 mb-10 px-10">
            {compoData.map((e, index) => {
              return (
                <div className="flex flex-col lg:flex-row xl:flex-row items-center justify-start gap-x-10 px-5 w-full">
                  <img
                    src={icon}
                    className={`${theme === "dark" ? "" : "invert"}`}
                    alt=""
                  />
                  <div className="flex flex-col items-start space-y-2">
                    <h1 className="lg:text-2xl xl:text-2xl md:text-lg text-md font-extrabold text-orange-500">
                      {e.subheading}
                    </h1>
                    <p className="font-extrabold lg:text-2xl xl:text-2xl md:text-lg text-md text-gray-900 dark:text-gray-50">
                      {e.heading}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="right xl:w-1/2 lg:w1/2 w-full mb-10">
            <img
              src={freelance}
              className="h-auto object-cover w-[800px] mx-auto"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
