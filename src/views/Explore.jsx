import React, { useContext, useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { BlogContext } from "../BlogContext";
import { FaHeart, FaRegThumbsUp } from 'react-icons/fa';

const Explore = ({ theme }) => {

  const [expandedBlogs, setExpandedBlogs] = useState({});

  function capitalizeFirstLetter(str) {
    return str.replace(/\b\w/g, (match) => match.toUpperCase());
  }

  function dateString(date) {
    return date.toDateString();
  }

  const toggleView = (blogId) => {
    setExpandedBlogs(prevState => ({
      ...prevState,
      [blogId]: !prevState[blogId]
    }));
  };

  const context = useContext(BlogContext)

  const { blogs, fetchAllBlog } = context;

  useEffect(() => {
    fetchAllBlog();
  }, [])


  return (
    <div className={`${theme === 'dark' ? 'dark' : 'light'} py-10 max-w-[1600px] mx-auto my-5 rounded-md font-poppins dark:bg-darkPrimary `}>
      <div className="flex flex-col space-y-7 items-center justify-center mb-10">
        <h1 className="w-full text-center xl:text-3xl lg:text-3xl md:text-2xl text-xl text-gray-900 font-bold dark:text-white">Explore Blogin's Diverse Blogosphere</h1>
        <hr className="h-1 w-[60%] hidden xl:block lg:block md:block mx-auto bg-gray-400 rounded-xl dark:bg-dark-800 " />
      </div>
      <div className="w-full flex justify-center items-center flex-col space-y-3 font-roboto my-10">
        <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:px-5 lg:px-5 w-full gap-3 px-5">
          {
            blogs.length > 0 ? (
              blogs
                .filter(b => b.active) // Filter out blogs where active is true
                .map((b) => {
                  const isExpanded = expandedBlogs[b._id];
                  return (
                    <div className="mainBlog py-5 px-5 w-full flex-col justify-start items-start rounded-lg shadow-md shadow-gray-400 mb-3" key={b._id}>
                      <h1 className="xl:text-xl lg:text-xl md:text-lg md:text-lg text-lg text-blue-500 font-semibold mt-0 mb-4 dark:text-white" style={{ lineHeight: "35px" }}>
                        {capitalizeFirstLetter(b.title)}
                      </h1>
                      <div className="text-md font-semibold my-5 flex items-center">
                        <div className="like text-gray-600 cursor-pointer hover:text-black text-2xl mr-3 dark:text-gray-200">
                          <FaRegThumbsUp />
                        </div>
                        <div className="heart flex items-center space-x-2 text-red-500 text-xl">
                          <FaHeart />
                          <span className="text-gray-800 dark:text-white">
                            {b.likes}
                          </span>
                        </div>
                      </div>
                      <p className={`w-full xl:text-lg h-[200px] ${b.description.length > 400 ? "overflow-y-scroll" : null} lg:text-lg md:text-sm text-sm text-justify mb-5 dark:text-gray-200`}>
                        {!isExpanded ? (b.description.slice(0, 220)) : (b.description)}...
                        <button onClick={() => toggleView(b._id)} className="text-sm font-medium hover:underline ml-2">{!isExpanded ? "View more" : "View less"}</button>
                      </p>
                      <div className="w-full flex justify-between">
                        <p className="text-md text-gray-700 dark:text-gray-300">{capitalizeFirstLetter("Entertainment")}</p>
                        <p className="text-md text-gray-700 font-medium font-poppins dark:text-gray-300">
                          Posted - {dateString(new Date(b.createdAt))}
                        </p>
                      </div>
                      <p className="text-gray-700 dark:text-gray-200 text-md font-roboto my-2"><strong>Author: </strong>{b.username}</p>
                    </div>
                  );
                })
            ) : (
              <div className="w-full flex justify-center items-center ">
                <h1 className="xl:text-3xl lg:text-3xl md:text-2xl text-xl text-blue-500 font-poppins font-semibold">No Blogs Available</h1>
              </div>
            )
          }
        </div>
      </div>

    </div>
  )
}

export default Explore