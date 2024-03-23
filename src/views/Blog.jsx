import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { BlogContext } from '../BlogContext';
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { TbMessageReport } from "react-icons/tb";

const Blog = ({ theme }) => {

  const { id } = useParams();
  const context = useContext(BlogContext);

  const { blogs, fetchSingleBlog } = context;

  useEffect(() => {

    fetchSingleBlog(id);

  }, [])


  return (
    <div className={`${theme === 'dark' ? 'dark' : 'light'} font-poppins pt-20`}>
      <div className="max-w-[1500px] mx-auto mt-10 px-5 py-5 mb-20">
        {blogs.map((b, index) => {
          return (

            <div className="flex flex-col items-start justify-center" key={index}>
              <h1 className="text-gray-800 font-semibold xl:text-4xl lg:text-4xl md:text-3xl text-2xl xl:text-center lg:text-center text-left dark:text-gray-200" style={{ lineHeight: "60px" }}>{b.title}</h1>

              <h1 className="text-gray-800 lg:my-20 xl:my-20 md:my-5 my-5 font-medium xl:text-2xl lg:text-2xl md:text-xl text-lg dark:text-gray-300" style={{ lineHeight: "40px" }}>
                {b.description}
              </h1>

              <div className="w-full lg:px-5 xl:px-5 px-0 flex justify-between items-center">
                <div className="flex items-center gap-x-5 justify-center">
                  <div className="hover:text-black text-gray-700 cursor-pointer dark:text-gray-400 dark:hover:text-white xl:text-3xl lg:text-3xl text-2xl flex items-center justify-center">
                    <AiOutlineLike  />
                  </div>
                  <div className="hover:text-black text-gray-700 cursor-pointer dark:text-gray-400 dark:hover:text-white xl:text-3xl lg:text-3xl text-2xl flex items-center justify-center">
                    <AiOutlineDislike  />
                  </div>
                </div>
                <div className="hover:text-black text-gray-700 cursor-pointer dark:text-gray-400 dark:hover:text-white xl:text-3xl lg:text-3xl text-2xl">
                  <TbMessageReport  />
                </div>
              </div>
            </div>

          )
        })}
      </div>
    </div>
  )
}

export default Blog