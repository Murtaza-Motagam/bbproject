import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { BlogContext } from '../BlogContext';
import Logo from "../assets/logo.png"
import { FaHeart, FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import moment from 'moment'
import { blogUrl } from '../utils/constant';

const Blog = ({ theme }) => {

  const { id } = useParams();
  const context = useContext(BlogContext);

  const { data, getUser, blogs, fetchSingleBlog } = context;

  function capitalizeFirstLetter(str) {
    return str.replace(/\b\w/g, (match) => match.toUpperCase());
  }


  const likeBlog = async (blogId) => {
    const response = await fetch(`${blogUrl}/like/${blogId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'user-token': localStorage.getItem('user-token')
      }
    });

    const json = await response.json();

    if (json.message === "You liked the blog") {
      toast.success(json.message);
    }
    else if (json.message === "You unliked the blog") {
      toast.success(json.message);
    }
    fetchSingleBlog(blogId);
  }

  useEffect(() => {

    fetchSingleBlog(id);
    getUser();

  }, [])


  return (
    <div className={`${theme === 'dark' ? 'dark' : 'light'} font-inter pt-10`}>
      <Toaster position="top-right" />

      <div className="flex flex-col space-y-5 h-[300px] bg-gray-100 xl:px-20 lg:px-20 md:px-5 px-5 pt-20 dark:bg-darkSecondary">
        <h1 className="flex items-center space-x-3 xl:text-5xl lg:text-5xl md:text-2xl text-blue-500 font-extrabold">
          <img src={Logo} className={`w-32 ${theme === "dark" ? "invert" : ""}`} alt="" />
        </h1>
        <p className="xl:text-xl lg:text-xl md:text-xl text-black font-medium dark:text-gray-200">The latest tips and news from the Blogin team.</p>
      </div>
      <div className="max-w-[1500px] mx-auto mt-10 px-5 py-5 mb-20">
        {
          data.map(u => (
            blogs.map((b, index) => {
              const isLiked = b?.likes && b?.likes?.includes(u._id);
              return (

                <div className="flex flex-col items-start justify-center" key={index}>
                  <h1 className="w-full flex justify-between items-center text-gray-800  xl:text-4xl lg:text-4xl md:text-3xl text-2xl xl:text-center lg:text-center text-left dark:text-white" style={{ lineHeight: "60px" }}>
                    {capitalizeFirstLetter(b.title)}
                    <div className="flex items-center justify-start space-x-3">
                      <div className="text-gray-700 hover:text-black cursor-pointer dark:text-gray-300 dark:hover:text-white" onClick={() => likeBlog(b._id)}>
                        {
                          isLiked ? (
                            <FaThumbsUp size={25} />
                          ) : (
                            <FaRegThumbsUp size={25} />
                          )
                        }
                      </div>
                      <p className="text-sm text-red-500 font-medium flex items-center gap-x-1"><FaHeart size={20} />  <span className="text-gray-800 dark:text-white">{b.likes ? b.likes.length : 0}</span></p>

                    </div>
                  </h1>

                  <h1 className="text-gray-800 xl:text-2xl lg:text-2xl md:text-2xl text-xl xl:text-center lg:text-center text-left dark:text-gray-200" style={{ lineHeight: "60px" }}> {moment(b.createdAt).format('MMMM Do, YYYY')}</h1>

                  <p
                    style={{ whiteSpace: 'pre-wrap', lineHeight: '40px', fontFamily: 'Arial' }}
                    className="text-black w-5/6 lg:my-20 xl:my-20 md:my-5 my-5 font-medium xl:text-xl lg:text-xl md:text-lg text-sm dark:text-gray-300"
                    dangerouslySetInnerHTML={{ __html: b.description }}
                  />
                </div>

              )
            })
          ))
        }
      </div>
    </div>
  )
}

export default Blog