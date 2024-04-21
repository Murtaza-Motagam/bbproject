import React, { useContext, useEffect, useState } from 'react'
import { FaHeart, FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa';
import { blogUrl } from '../utils/constant';
import toast, { Toaster } from 'react-hot-toast';
import { BlogContext } from '../BlogContext';
import { Link } from 'react-router-dom';

const FeaturedBlogs = ({ theme, category }) => {

    const [info, setInfo] = useState([]);
    const context = useContext(BlogContext);
    const { data, getUser } = context;

    function capitalizeFirstLetter(str) {
        return str.replace(/\b\w/g, (match) => match.toUpperCase());
    }

    function dateString(date) {
        return date.toDateString();
    }



    //  Function to fetch by category

    const fetchByCategory = async () => {
        const response = await fetch(`${blogUrl}/fetchbycategory/${category}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'user-token': localStorage.getItem('user-token')
            }
        });

        const json = await response.json();
        setInfo(json.blogsWithUsernames);
    }

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
            fetchByCategory();
            toast.success(json.message);
        }
        else if (json.message === "You unliked the blog") {
            fetchByCategory();
            toast.success(json.message);
        }
    }

    useEffect(() => {
        fetchByCategory();
        getUser();
    }, [category])



    return (
        <div className={`${theme === "dark" ? "dark" : "light"}`}>
            <Toaster position="top-right" />
            <div className="w-full flex justify-center items-center flex-col space-y-3 font-roboto my-10">
                <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:px-5 lg:px-5 w-full gap-3 px-5">
                    {
                        data.map(u => (

                            info.length > 0 ? (info
                                .filter(b => b.active)
                                .map((b = {}) => {
                                    const isLiked = b?.likes && b?.likes?.includes(u._id);

                                    return (

                                        <div className="mainBlog py-5 px-5 w-full flex-col justify-start  items-start rounded-lg shadow-md shadow-gray-400 mb-3" key={b._id}>
                                            <h1 className="xl:text-xl lg:text-xl md:text-lg md:text-lg text-lg text-blue-500 font-semibold mt-0 mb-4 dark:text-white" style={{ lineHeight: "35px" }}>
                                                {capitalizeFirstLetter(b.title.slice(0, 70))}...
                                            </h1>

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
                                                <p className="text-sm text-gray-700 font-medium font-poppins dark:text-gray-300">
                                                    Posted - {dateString(new Date(b.createdAt))}
                                                </p>
                                                <p className="text-gray-700 dark:text-gray-200 text-md font-roboto"><strong>Author: </strong> {b.username}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            ) : (
                                <div className="w-full flex justify-center items-center ">
                                    <h1 className="xl:text-3xl lg:text-3xl md:text-2xl text-xl text-blue-500 font-poppins font-semibold">No Blogs Available</h1>
                                </div>
                            )
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default FeaturedBlogs