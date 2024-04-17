import React, { useEffect } from "react";
import Swiper from "swiper";
import "swiper/swiper-bundle.css";
import { Link } from "react-router-dom";
import SliderImg from "../assets/slider-img.png";
const Carousel = () => {
  useEffect(() => {
    const mySwiper = new Swiper(".swiper-container", {
      // Optional parameters
      loop: true,
      slidesPerView: 1,
      // If we need pagination
      pagination: {
        el: ".swiper-pagination",
      },
      // Navigation arrows
      //   navigation: {
      //     nextEl: ".swiper-button-next",
      //     prevEl: ".swiper-button-prev",
      //   },
    });

    return () => {
      // Cleanup Swiper instance when component unmounts
      mySwiper.destroy();
    };
  }, []);

  return (
    <div className="swiper-container">
      <div className="swiper-wrapper">
        {/* Slide 1 */}
        <div className="swiper-slide">
          <div className="left w-full lg:w-full xl:w-full flex items-center py-20 overflow-hidden">
            <div className=" flex lg:flex-row bg-gray-100 dark:bg-darkSecondary  xl:flex-row flex-col-reverse items-center rounded-lg xl:mx-auto lg:mx-auto mb-20 mx-5 mt-20 shadow-md shadow-gray-400 dark:shadow-gray-700">
              <div className="left w-full lg:w-1/2 xl:w-1/2  flex items-center py-20 overflow-hidden">
                <div className="flex flex-col space-y-10 px-10 py-5  dark:text-white dark:bg-transparent">
                  <h1 className="lg:text-xl xl:text-5xl md:text-2xl text-2xl">
                    Express Your Thoughts, Believes And Ideas Here
                  </h1>
                  <p className="lg:text-xl xl:text-xl md:text-lg text-md dark:text-gray-300">
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page
                  </p>
                  <div className="flex items-center justify-start gap-x-3 w-full">
                    <Link
                      to="/blogs"
                      className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none  font-medium rounded-full text-sm px-10 py-3 text-center me-2 mb-2 "
                    >
                      Blogs
                    </Link>
                    {!localStorage.getItem("user-token") ? (
                      <Link
                        to="/register"
                        className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none  font-medium rounded-full text-sm px-10 py-3 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700"
                      >
                        SignUp
                      </Link>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="Right w-1/2 flex items-center">
                <div className="flex items-center">
                  <img src={SliderImg} className="h-auto object-cover" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Slide 2 */}
        <div className="swiper-slide">
          <div className="left w-full lg:w-full xl:w-full flex items-center py-20 overflow-hidden">
            <div className=" flex lg:flex-row bg-gray-100 dark:bg-darkSecondary  xl:flex-row flex-col-reverse items-center rounded-lg xl:mx-auto lg:mx-auto mb-20 mx-5 mt-20 shadow-md shadow-gray-400 dark:shadow-gray-700">
              <div className="left w-full lg:w-1/2 xl:w-1/2  flex items-center py-20 overflow-hidden">
                <div className="flex flex-col space-y-10 px-10 py-5  dark:text-white dark:bg-transparent">
                  <h1 className="lg:text-xl xl:text-5xl md:text-2xl text-2xl">
                    Express Your Thoughts, Believes And Ideas Here
                  </h1>
                  <p className="lg:text-xl xl:text-xl md:text-lg text-md dark:text-gray-300">
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page
                  </p>
                  <div className="flex items-center justify-start gap-x-3 w-full">
                    <Link
                      to="/blogs"
                      className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none  font-medium rounded-full text-sm px-10 py-3 text-center me-2 mb-2 "
                    >
                      Blogs
                    </Link>
                    {!localStorage.getItem("user-token") ? (
                      <Link
                        to="/register"
                        className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none  font-medium rounded-full text-sm px-10 py-3 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700"
                      >
                        SignUp
                      </Link>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="Right w-1/2 flex items-center">
                <div className="flex items-center">
                  <img src={SliderImg} className="h-auto object-cover" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Slide 3 */}
        <div className="swiper-slide">
          <div className="left w-full lg:w-full xl:w-full flex items-center py-20 overflow-hidden">
            <div className=" flex lg:flex-row bg-gray-100 dark:bg-darkSecondary  xl:flex-row flex-col-reverse items-center rounded-lg xl:mx-auto lg:mx-auto mb-20 mx-5 mt-20 shadow-md shadow-gray-400 dark:shadow-gray-700">
              <div className="left w-full lg:w-1/2 xl:w-1/2  flex items-center py-20 overflow-hidden">
                <div className="flex flex-col space-y-10 px-10 py-5  dark:text-white dark:bg-transparent">
                  <h1 className="lg:text-xl xl:text-5xl md:text-2xl text-2xl">
                    Express Your Thoughts, Believes And Ideas Here
                  </h1>
                  <p className="lg:text-xl xl:text-xl md:text-lg text-md dark:text-gray-300">
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page
                  </p>
                  <div className="flex items-center justify-start gap-x-3 w-full">
                    <Link
                      to="/blogs"
                      className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none  font-medium rounded-full text-sm px-10 py-3 text-center me-2 mb-2 "
                    >
                      Blogs
                    </Link>
                    {!localStorage.getItem("user-token") ? (
                      <Link
                        to="/register"
                        className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none  font-medium rounded-full text-sm px-10 py-3 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700"
                      >
                        SignUp
                      </Link>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="Right w-1/2 flex items-center">
                <div className="flex items-center">
                  <img src={SliderImg} className="h-auto object-cover" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* If we need pagination */}
      <div className="swiper-pagination"></div>
      {/* If we need navigation buttons */}
      <div className="swiper-button-prev"></div>
      <div className="swiper-button-next"></div>
    </div>
  );
};

export default Carousel;
