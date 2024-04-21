import React, { useContext, useEffect } from "react";
import ExpImg from "../assets/experience-img.png";
import About from "../assets/about.png";
import freelance from "../assets/freelance.png";
import person from "../assets/person.png";
import community from "../assets/community.png";
import { Link } from "react-router-dom";
import influence from "../assets/influence.png";
import global from "../assets/global.png";
import { compoData } from "../data.ts";
import { IoMdTrendingUp } from "react-icons/io";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import banner1 from "../assets/banner1.jpg"
import banner2 from "../assets/banner2.jpg"
import banner3 from "../assets/banner3.jpg"
import banner4 from "../assets/banner4.jpg"
import banner5 from "../assets/banner5.jpg"
import banner6 from "../assets/banner6.jpg"
import banner7 from "../assets/banner7.jpg"
import { BlogContext } from "../BlogContext.jsx";


const Home = ({ theme }) => {

  const context = useContext(BlogContext);
  const { data, trendingBlogs } = context;

  const settings = {
    dots: true,
    infinite: false,
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

  function capitalizeFirstLetter(str) {
    return str.replace(/\b\w/g, (match) => match.toUpperCase());
  }

  function dateString(date) {
    return date.toDateString();
  }


  const imageMap = {
    person: person,
    global: global,
    community: community,
    influence: influence
  };


  useEffect(() => {
    document.title = "BLOGIN - Exclusive Blog Content Service Media Platform.";
    trendingBlogs();
  }, []);


  return (
    <div
      className={`${theme === "dark" ? "dark" : "light"
        } max-w-[1500px] mx-auto font-poppins`}
    >

      <div className="relative overflow-hidden bg-white mt-10 dark:bg-darkPrimary mb-20 xl:mb-0 lg:mb-0">
        <div className="pt-16 sm:pb-40 lg:pb-48 lg:pt-40">
          <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
            <div className="sm:max-w-full mx-auto xl:mx-0 lg:mx-0">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-white">
                Welcome to Blogin
              </h1>
              <p className="mt-4 text-xl text-gray-500 dark:text-gray-200">
                Discover the vibrant world of BLOGIN, where words come alive and stories unfold. Dive into a realm of endless possibilities, where every page holds the promise of inspiration, knowledge, and boundless creativity.
              </p>
            </div>
            <div>
              <div className="mt-10">
                {/* Decorative image grid */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                >
                  <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8 hidden xl:block">
                    <div className="flex items-center space-x-6 lg:space-x-8 ">
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100 ">
                          <img
                            src={banner1}
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src={banner2}
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src={banner3}
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src={banner4}
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src={banner5}
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src={banner6}
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src={banner7}
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Link
                  to={!localStorage.getItem('user-token') ? "/login" : "/blogs"}
                  className="inline-block rounded-md border border-transparent bg-blue-500 px-8 py-3 text-center font-medium text-white hover:bg-blue-700"
                >
                  Create your own blog
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" w-full flex lg:flex-row bg-white dark:bg-transparent  xl:flex-row flex-col items-center rounded-lg xl:mx-auto lg:mx-auto mb-20 mx-5 mt-15 ">
        <div className="Right xl:w-1/2 lg:w-1/2 w-full flex items-center">
          <div className="flex items-center">
            <img src={ExpImg} className="h-auto object-cover" alt="" />
          </div>
        </div>
        <div className="left w-full lg:w-1/2 xl:w-1/2  flex items-center py-20 overflow-hidden">
          <div className="flex flex-col space-y-10 px-10 py-5  dark:text-white dark:bg-transparent">
            <h1 className="lg:text-l xl:text-4xl md:text-xl text-xl font-bold ">
              Best Experienced Blogs Here{" "}
            </h1>
            <p className="lg:text-xl xl:text-xl md:text-lg text-md dark:text-gray-300" style={{ lineHeight: "40px" }}>
              Offering an extensive collection of well-curated blogs, meticulously crafted to captivate and inform readers. Our platform prides itself on delivering distraction-free content that keeps users engaged from start to finish.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col items-center justify-center space-y-10 mb-20 px-6 dark:text-white">
        <div className="upper">
          <img src={About} alt="" className="h-auto object-cover" />
        </div>
        <div className="lower flex flex-col space-y-5 text-center">
          <h1 className="lg:text-4xl xl:text-4xl md:text-3xl text-xl font-bold font-poppins">
            About BlogIn
          </h1>
          <p className="lg:text-xl xl:text-xl md:text-lg text-md dark:text-gray-300" style={{ lineHeight: "40px" }}>
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
        <h1 className="mb-10 lg:text-3xl xl:text-4xl md:text-4xl text-2xl font-semibold text-center mx-auto w-full my-5 dark:text-white">
          Flourish Your Ideas With Blogs
        </h1>

        <div className="flex xl:flex-row flex-col-reverse items-center justify-center gap-x-2 w-full">
          {/* Particular component */}
          <div className="left xl:w-1/2 lg:w-1/2 w-full  space-y-10 mb-10 px-10">
            {compoData.map((e, index) => {
              return (
                <div
                  className="flex flex-col lg:flex-row xl:flex-row items-center xl:justify-start lg:justify-start justify-center text-center gap-x-10 px-5 w-full"
                  key={index}
                >
                  <img
                    src={imageMap[e.img]}
                    className={`${theme === "dark" ? "invert" : ""
                      } w-12 mb-10 xl:mb-0 lg:mb-0`}
                    alt=""
                  />
                  <div className="flex flex-col xl:items-start lg:items-start space-y-2 w-full items-center justify-center">
                    <h1 className="lg:text-2xl text-center xl:text-left lg:text-left xl:text-2xl md:text-lg text-md font-extrabold text-orange-500">
                      {e.subheading}
                    </h1>
                    <p className="font-medium w-full text-center xl:text-left lg:text-left lg:text-2xl xl:text-2xl md:text-lg text-md text-gray-900 dark:text-gray-50">
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

      <div className="lg:text-center mb-5 px-10">
        <h2 className="xl:text-3xl lg:text-3xl flex justify-center items-center gap-x-3 font-extrabold text-gray-900 dark:text-white text-2xl">
          <IoMdTrendingUp size={50} /> Trending & Most liked blogs.
        </h2>
        <p className="mt-4 xl:text-lg lg:text-lg text-md text-center leading-6 text-gray-700 dark:text-gray-300">
          Explore the latest articles and stay updated with our blog.
        </p>
      </div>
      <div className="w-full py-20 ">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mt-10 ">
            <div className=" w-full">
              <div className="mainBlog bg-white py-10 px-10 w-full flex-col justify-start  items-start rounded-lg shadow-md shadow-gray-400 mb-3 dark:bg-darkPrimary dark:shadow-none" >
                <Slider {...settings}>

                  {data.map((d = {}) => {
                    return (
                      <div className="w-full px-5 py-2 dark:border-2 dark:border-gray-700 rounded-lg xl:h-[500px] lg:h-[500px] h-[600px]" key={d._id}>
                        <h1 className="xl:text-xl lg:text-xl md:text-lg font-bold text-md text-center text-gray-900 my-5 dark:text-white " style={{ lineHeight: "40px" }}>{d.title.slice(0, 30)}...</h1>
                        <div className="w-full xl:text-lg  lg:text-lg md:text-sm text-sm text-justify mb-5 dark:text-gray-200">
                          <p
                            dangerouslySetInnerHTML={{ __html: d?.description && d?.description?.slice(0, 200) }}
                            style={{ lineHeight: "40px" }}
                          />
                          <Link to={`/blogs/${d._id}`} className="text-sm font-medium hover:underline">View more</Link>
                        </div>


                        <div className="flex justify-between w-full my-10 items-center">
                          <p className="text-md text-gray-900 font-roboto dark:text-gray-200"><strong>Category:-</strong> <span>{d.category}</span></p>
                          <p className="text-md text-gray-900 dark:text-gray-200 font-roboto"><span className="text-blue-500 font-bold">Author:</span> {d.user.username}</p>
                        </div>
                        <div className="flex justify-between w-full my-10 items-center">
                          <p className="text-md dark:text-gray-200"><strong>Posted on:</strong> {dateString(new Date(d.createdAt))}</p>
                          <p className="text-xl text-red-500 space-x-3 "><span className="text-gray-900 font-bold dark:text-gray-200">Total Likes:</span><span className="font-bold">{d.likes ? d.likes.length : "0"}</span></p>
                        </div>
                      </div>
                    )
                  })}



                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>


      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default Home;
