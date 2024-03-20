import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import SliderImg from "../assets/slider-img.png";
import ExpImg from "../assets/experience-img.png";
import About from "../assets/about.png";
import freelance from "../assets/freelance.png";
import f4 from "../assets/f4.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaQuoteLeft } from "react-icons/fa";



import { carouselData, compoData } from "../data.ts";

const Home = ({ theme }) => {

  useEffect(() => {
    document.title = "BLOGIN - Exclusive Blog Content Service Media Platform.";
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // Medium devices (tablets, small desktops)
        settings: {
          slidesToShow: 2,

        },
      },
      {
        breakpoint: 768, // Small devices (landscape phones)
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };


  return (
    <div
      className={`${theme === "dark" ? "dark" : "light"
        } max-w-[1500px] mx-auto font-poppins`}
    >
      <div className=" flex lg:flex-row bg-gray-100 dark:bg-darkSecondary  xl:flex-row flex-col-reverse items-center rounded-lg xl:mx-auto lg:mx-auto mb-20 mx-5 mt-20 shadow-md shadow-gray-400 dark:shadow-gray-700">
        <div className="left w-full lg:w-1/2 xl:w-1/2  flex items-center py-20 overflow-hidden">
          <div className="flex flex-col space-y-10 px-10 py-5  dark:text-white dark:bg-transparent">
            <h1 className="lg:text-xl xl:text-5xl md:text-2xl text-2xl">
              Express Your Thoughts, Believes And Ideas Here
            </h1>
            <p className="lg:text-xl xl:text-xl md:text-lg text-md dark:text-gray-300">
              It is a long established fact that a reader will be distracted by
              the readable content of a page
            </p>
            <div className="flex items-center justify-start gap-x-3 w-full">
              <Link to="/blogs" className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none  font-medium rounded-full text-sm px-10 py-3 text-center me-2 mb-2 ">
                Blogs
              </Link>
              {!localStorage.getItem('user-token') ? (
                <Link to="/register"
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
      <div className=" flex lg:flex-row bg-white dark:bg-transparent  xl:flex-row flex-col-reverse items-center rounded-lg xl:mx-auto lg:mx-auto mb-20 mx-5 mt-20  ">
        <div className="Right w-1/2 flex items-center">
          <div className="flex items-center">
            <img src={ExpImg} className="h-auto object-cover" alt="" />
          </div>
        </div>
        <div className="left w-full lg:w-1/2 xl:w-1/2  flex items-center py-20 overflow-hidden">
          <div className="flex flex-col space-y-10 px-10 py-5  dark:text-white dark:bg-transparent">
            <h1 className="lg:text-l xl:text-4xl md:text-xl text-xl font-bold uppercase">
              Best Experienced blogs here{" "}
            </h1>
            <p className="lg:text-xl xl:text-xl md:text-lg text-md dark:text-gray-300">
              It is a long established fact that a reader will be distracted by
              the readable content of a page
            </p>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col items-center justify-center space-y-10 mb-20 px-6 dark:text-white">
        <div className="upper">
          <img src={About} alt="" className="h-auto object-cover" />
        </div>
        <div className="lower flex flex-col space-y-5 text-center">
          <h1 className="lg:text-4xl xl:text-4xl md:text-3xl text-xl font-bold ">
            About BlogIn
          </h1>
          <p className="lg:text-xl xl:text-xl md:text-lg text-md dark:text-gray-300">
            At BlogIn, we believe in the power of words to inspire change,
            foster understanding, and build communities. Our team of passionate
            writers, thinkers, and creatives collaborate to curate a collection
            of articles that span a wide range of topics. From thought-provoking
            essays on current affairs to practical guides for everyday life, we
            strive to provide content that both stimulates the mind and enriches
            the soul.
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col items-start mb-32 rounded-lg overflow-hidden py-10 px-5">
        <h1 className="mb-10 lg:text-3xl xl:text-2xl md:text-xl text-lg font-semibold text-center mx-auto w-full my-5 dark:text-white">
          Flourish Your Ideas With Blogs:
        </h1>

        <div className="flex xl:flex-row flex-col-reverse items-center justify-center gap-x-2 w-full">
          {/* Particular component */}
          <div className="left xl:w-1/2 lg:w-1/2 w-full space-y-10 mb-10 px-10">
            {compoData.map((e, index) => {
              return (
                <div className="flex flex-col lg:flex-row xl:flex-row items-center justify-start gap-x-10 px-5 w-full" key={index}>
                  <img
                    src={f4}
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

      <div className="w-full mb-48">
        <div>
          <Slider {...settings}>
            {carouselData.map((d, index) => {
              return (
                <div className="bg-white pb-10 text-black dark:bg-darkPrimary dark:text-gray-200" key={index}>
                  <div className=" text-4xl rounded-t-xl text-gray-800 bg-white flex justify-center items-center dark:bg-darkPrimary dark:text-white">
                    <FaQuoteLeft />
                  </div>

                  <div className="flex flex-col text-center w-full justify-center items-center gap-4 p-4">
                    <p className="lg:tex-xl xl:text-xl md:text-lg text-lg font-semibold text-center dark:text-white">{d.name}</p>
                    <p className="lg:tex-lg xl:text-lg md:text-md text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium pariatur eligendi neque distinctio dolorum accusamus soluta hic voluptates quo quam, corporis voluptatem, placeat iusto veritatis veniam sit ea repellat fuga?.</p>
                    <div className="flex items-center w-full justify-start gap-x-7 bg-gray-100 py-3 px-5 rounded-md dark:bg-darkSecondary">
                      <img src={d.img} className="w-12 h-12 object-cover rounded-full border-2 border-gray-600" alt="" />
                      <div className="flex flex-col items-start justify-start">
                        <h1 className="text-md font-semibold text-indigo-500">{d.name}</h1>
                        <h1 className="text-md font-semibold text-gray-600 dark:text-gray-100">Trending Author</h1>
                      </div>
                    </div>
                  </div>

                </div>
              )
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Home;
