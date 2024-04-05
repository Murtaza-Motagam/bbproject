import React, { useContext, useEffect } from 'react'
import { Link } from "react-router-dom"
import { BlogContext } from "../BlogContext";

const Explore = ({ theme }) => {

  const context = useContext(BlogContext)

  const { blogs, fetchAllBlog } = context;

  useEffect(() => {
    fetchAllBlog();
  }, [])


  return (
    <div className={`${theme === 'dark' ? 'dark' : 'light'} py-10 max-w-[1600px] mx-auto my-5 rounded-md font-poppins dark:bg-darkPrimary `}>
      <div className="flex flex-col space-y-7 items-center justify-center mb-10">
        <h1 className="w-full text-center xl:text-3xl lg:text-3xl md:text-2xl text-xl text-gray-900 font-bold dark:text-white">Trending blogs of the day.</h1>
        <hr className="h-1 w-[60%] hidden xl:block lg:block md:block mx-auto bg-gray-400 rounded-xl dark:bg-dark-800 " />
      </div>
      {blogs.map((b) => {
        return (
          <Link to={`/blogs/${b._id}`} className="hover:bg-gray-100 200 border-b-4  border-gray-200 py-5 flex justify-center items-center overflow-hidden  dark:bg-transparent dark:border-none dark:rounded-lg dark:hover:bg-gray-900  mb-5" key={b._id}>
            <div className="right w-full md:w-3/4 lg:w-3/4 xl:w-3/4 ml-5 flex items-start flex-col space-y-5">
              <div className="space-y-2">
                <h1 className="shortInfo p-0 text-lg lg:text-xl xl:text-xl font-semibold text-blue-500">{b.category}</h1>
                <h1 className="Mainheading p-0 text-xl lg:text-2xl xl:text-2xl font-bold text-gray-900 dark:text-white">{b.title}</h1>
              </div>
              <p className="desc text-sm lg:text-md xl:text-md font-medium text-gray-800 dark:text-gray-300">{b.description}</p>
            </div>
          </Link>
        )
      })}

    </div>
  )
}

export default Explore