import React, { useContext, useEffect, useState } from 'react';
import { BlogContext } from "../../BlogContext.jsx";
import banner from "../../assets/banner.jpeg";
import person from "../../assets/person.png"
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { FaHeart } from 'react-icons/fa';
import { FaThumbsUp } from "react-icons/fa";
import { FaRegThumbsUp } from "react-icons/fa6";
import { blogUrl } from '../../utils/constant.js';

const otherProfile = ({ theme }) => {

    const context = useContext(BlogContext);

    const { id } = useParams();


    const {
        data,
        info,
        navDetails,
        getActiveUser,
        userBlogData,
        getSearchedUserDetails,
        getSearchedUserNavdetails,
    } = context;

    const [expandedBlogs, setExpandedBlogs] = useState({});
    const [likes, setLikes] = useState(false);

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
            getSearchedUserDetails(id)
            toast.success(json.message);
        }
        else if (json.message === "You unliked the blog") {
            getSearchedUserDetails(id)
            toast.success(json.message);
        }
    }


    useEffect(() => {
        getSearchedUserDetails(id)
        getSearchedUserNavdetails(id)
        getActiveUser();
    }, [id]);



    return (
        <div className={`${theme === 'dark' ? 'dark' : 'light'} font-poppins max-w-[2000px] mx-auto dark:bg-darkPrimary`}>
            <Toaster
                position="top-right"
            />
            <img src={banner} className="lg:w-[2000px] lg:h-[400px] xl:w-[2000px] xl:h-[400px] lg:block xl:block hidden object-contain " />

            {/* Main Profile Section starts here */}

            <main className="flex justify-between flex-col md:flex-col lg:flex-row xl:flex-row  items-start w-full mx-auto mt-10 dark:bg-darkPrimary dark:text-gray-300 mb-32">

                {/*  Left Menu */}
                <div className="left lg:w-2/6 xl:w-2/6 w-full mt-5 lg:h-[1000px] xl:h-[5 00px]  lg:-mt-0 xl:-mt-0">

                    <div className="flex flex-col space-y-4 items-start justify-center ml-10">
                        <img src={person} className="h-36 w-36 p-2 object-contain bg-gray-100 rounded-full " alt="" />
                        <div className="flex gap-x-4 items-center justify-center ml-2">
                            {navDetails.map((e) => {
                                return (
                                    <div className="flex items-center gap-x-3" key={e.totalPostsLength}>
                                        <h1 className="text-lg font-semibold">Total Posts: </h1>
                                        <h2 className="text-xl font-bold text-blue-500">{e.totalPostsLength}</h2>
                                    </div>
                                )
                            })}

                        </div>
                    </div>

                    {data.map((u => {
                        return (
                            <div className="username flex justify-between items-start ml-10 mr-3 space-x-2 mt-10" key={u._id}>
                                <div className="flex justify-center flex-col w-full items-start space-y-2">
                                    <h1 className="text-gray-700 dark:text-gray-50 text-2xl font-extrabold">{u.username}</h1>
                                    <h1 className="text-gray-500 dark:text-gray-200 text-md font-roboto">{u.emailId}</h1>
                                    <p className="mt-3">{u.desc}</p>
                                </div>
                            </div>
                        )
                    }))}


                    <div className="flex justify-between text-gray-700 space-x-3 items-start mt-10 mr-3 dark:text-gray-300">
                        {data.map(d => {
                            return (
                                <div className="flex flex-col justify-center text-gray-700 space-y-5 items-start ml-10  mt-10 dark:text-gray-300" key={d._id}>
                                    <h1 className="flex items-center gap-x-3 font-semibold">
                                        <i className="fa-solid fa-location-dot fa-lg"></i>
                                        <span>{d.location ? d.location : d.location.concat(" location not set")}</span>
                                    </h1>
                                    <h1 className={`flex items-center gap-x-3 font-semibold`}>
                                        <i className="fa-solid fa-link fa-lg"></i>
                                        <span>{d.link ? d.link : d.username.concat(" does not have any link attached")}</span>
                                    </h1>
                                    <h1 className="flex items-center gap-x-3 font-semibold">
                                        <i className="fa-solid fa-calendar-days fa-lg"></i>
                                        <span>Joined: {new Date(d.datacreated.slice(0, 10)).toDateString()}</span>
                                    </h1>
                                </div>
                            )
                        })}
                    </div>

                </div>

                {/*  Right Menu */}
                <div className="w-full flex justify-center items-center flex-col space-y-3 font-roboto">
                    <h1 className="text-center w-full xl:text-2xl lg:text-2xl md:text-lg text-md font-poppins text-blue-700 font-semibold border-b-2 border-gray-500 pb-3 mb-4 overflow-hidden px-2 dark:text-white">Blogs</h1>
                    <div className="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 grid-cols-1 xl:px-5 lg:px-5 w-full gap-3 px-5">
                    {
                        info.map(u => (

                            userBlogData.length > 0 ? (
                                userBlogData
                                .filter(b => b.active)
                                .map((b = {}) => {
                                    const isExpanded = expandedBlogs[b._id];
                                    const isLiked = b?.likes && b?.likes?.includes(u._id);

                                    return (

                                        <div className="mainBlog py-5 px-5 w-full flex-col justify-start  items-start rounded-lg shadow-md shadow-gray-400 mb-3" key={b._id}>
                                            <h1 className="xl:text-xl lg:text-xl md:text-lg md:text-lg text-lg text-blue-500 font-semibold mt-0 mb-4 dark:text-white" style={{ lineHeight: "35px" }}>
                                                {capitalizeFirstLetter(b.title)}
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

                                            <p className={`w-full xl:text-lg h-[200px] ${isExpanded ? "overflow-y-scroll" : null} lg:text-lg md:text-sm text-sm text-justify mb-5 dark:text-gray-200`} style={{ lineHeight: "40px" }}>
                                                {!isExpanded ? (b.description.slice(0, 220)) : (b.description)}...
                                                <button onClick={() => toggleView(b._id)} className="text-sm font-medium hover:underline ml-2">{!isExpanded ? "View more" : "View less"}</button>
                                            </p>
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


            </main>

        </div>
    );
};

export default otherProfile;