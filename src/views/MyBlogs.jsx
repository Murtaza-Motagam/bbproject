import React, { useContext, useEffect, useState } from 'react'
import { BlogContext } from '../BlogContext'
import BlogDetails from '../components/BlogDetails';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const MyBlogs = ({ theme }) => {

    const context = useContext(BlogContext);
    const [expandedBlogs, setExpandedBlogs] = useState({});
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

    useEffect(() => {
        getUserBlogs()
    }, [])

    return (
        <div className={`${theme === 'dark' ? 'dark' : 'light'}  font-poppins max-w-[2000px]  dark:bg-darkPrimary mx-auto`}>
            <h1 className="xl:text-4xl lg:text-4xl mx-auto xl:ml-10 lg:ml-10 ml-0 mt-10 pb-5 md:text-4xl text-2xl  lg:text-left xl:text-left text-center font-extrabold py-5 text-gray-800 dark:text-white">My Blogs</h1>
            <hr className="hidden xl:block lg:block h-1 ml-10 w-full bg-gray-900" />

            {/* Blogs  */}
            <div className="w-full flex justify-center items-center flex-col space-y-3 mt-10 font-roboto">
                <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:px-5 lg:px-5 w-full gap-3 px-5">
                    {
                        blogs
                        .filter(b => b.active)
                        .map((b) => {
                            const isExpanded = expandedBlogs[b._id];
                            return (

                                <div className="mainBlog py-5 px-5 w-full flex-col justify-start  items-start rounded-lg shadow-md shadow-gray-400 mb-3">
                                    <Link to={`/myprofile`} className="cursor-pointer hover:text-blue-600  xl:text-xl lg:text-xl md:text-lg md:text-lg text-lg text-blue-500 font-semibold mt-0 mb-4 dark:text-white" style={{ lineHeight: "35px" }}>{capitalizeFirstLetter(b.title)}</Link>
                                    <p className="text-md text-red-500 font-semibold my-3 flex items-center gap-x-1"><FaHeart />  <span className="text-gray-800 dark:text-white">{b.likes}</span></p>
                                    <p className={`w-full xl:text-lg h-[200px] ${b.description.length > 400 ? "overflow-y-scroll" : null} lg:text-lg md:text-sm text-sm text-justify mb-5 dark:text-gray-300`}>
                                        {!isExpanded ? (b.description.slice(0, 220)) : (b.description)}...
                                        <button onClick={() => toggleView(b._id)} className="text-sm font-medium hover:underline ml-2">{!isExpanded ? "View more" : "View less"}</button>
                                    </p>
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