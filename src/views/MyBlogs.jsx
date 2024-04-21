import React, { useContext, useEffect, useState } from 'react'
import { BlogContext } from '../BlogContext'
import BlogDetails from '../components/BlogDetails';
import { FaHeart, FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { blogUrl } from '../utils/constant';
import toast, { Toaster } from 'react-hot-toast';

const MyBlogs = ({ theme }) => {

    const context = useContext(BlogContext);
    const [expandedBlogs, setExpandedBlogs] = useState({});
    const [likedBlogs, setLikedBlogs] = useState(false);

    const { blogs, getUserBlogs } = context;

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

    const likeBlog = async (id) => {
        const response = await fetch(`${blogUrl}/like/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'user-token': localStorage.getItem('user-token')
            }
        });

        const json = await response.json();

        if (json.message === "You liked the blog") {
            getUserBlogs()
            toast.success(json.message);
        }
        else if (json.message === "You unliked the blog") {
            getUserBlogs()
            toast.success(json.message);
        }
    }


    useEffect(() => {
        getUserBlogs()
    }, [])

    return (
        <div className={`${theme === 'dark' ? 'dark' : 'light'}  font-poppins max-w-[2000px]  dark:bg-darkPrimary mx-auto`}>
            <Toaster position="top-right" />
            <h1 className="xl:text-4xl lg:text-4xl mx-auto xl:ml-10 lg:ml-10 ml-0 mt-10 pb-5 md:text-4xl text-2xl  lg:text-left xl:text-left text-center font-extrabold py-5 text-gray-800 dark:text-white">My Blogs</h1>
            <hr className="hidden xl:block lg:block h-1  w-full bg-gray-900" />

            {/* Blogs  */}
            <div className="w-full flex justify-center items-center flex-col space-y-3 mt-10 font-roboto">
                <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:px-5 lg:px-5 w-full gap-3 px-5">
                    {
                        blogs
                            .filter(b => b.active)
                            .map((b) => {
                                const isLiked = b.likes && b.likes.includes(b.user);
                                return (

                                    <div className="mainBlog py-5 px-5 w-full flex-col justify-start  items-start rounded-lg shadow-md shadow-gray-400 mb-3" key={b._id}>
                                        <Link to={`/myprofile`} className="cursor-pointer hover:text-blue-600  xl:text-xl lg:text-xl md:text-lg md:text-lg text-lg text-blue-500 font-semibold mt-0 mb-4 dark:text-white" style={{ lineHeight: "35px" }}>{capitalizeFirstLetter(b.title.slice(0, 70))}...</Link>
                                        <div className="flex items-center gap-x-3 w-full justify-start">
                                            <div className="hover:text-black text-gray-700 cursor-pointer dark:text-gray-300 dark:hover:text-white" onClick={() => likeBlog(b._id)}>
                                                {
                                                    isLiked ? (
                                                        <FaThumbsUp size={25} />
                                                    ) : (
                                                        <FaRegThumbsUp size={25} />
                                                    )
                                                }
                                            </div>
                                            <p className="text-md text-red-500 font-semibold my-3 flex items-center gap-x-1"><FaHeart size={20} />  <span className="text-gray-800 dark:text-white">{b.likes ? b.likes.length : 0}</span></p>
                                        </div>
                                        <div className="w-full xl:text-lg  lg:text-lg md:text-sm text-sm text-justify mb-5 dark:text-gray-200">
                                            <p
                                                dangerouslySetInnerHTML={{ __html: b.description.slice(0, 220) }}
                                                style={{ lineHeight: "40px" }}
                                            />
                                            <Link to={`/blogs/${b._id}`} className="text-sm font-medium hover:underline">View more</Link>
                                        </div>
                                        <div className="w-full flex justify-between">
                                            <p className="text-sm text-gray-700 font-semibold dark:text-gray-300">{capitalizeFirstLetter(b.category)}</p>
                                            <p className="text-sm text-gray-700 font-medium font-poppins dark:text-gray-300">Posted - {dateString(new Date(b.createdAt))}</p>
                                        </div>
                                    </div>
                                )
                            })
                    }
                </div>
            </div>
        </div>
    )
}

export default MyBlogs