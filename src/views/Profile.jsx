import React, { useContext, useEffect, useState } from 'react';
import { BlogContext } from "../BlogContext.jsx";
import banner from "../assets/banner.jpeg";
import person from "../assets/person.png";
import { MdEdit } from "react-icons/md";
import { authUrl, blogUrl } from '../utils/constant.js';
import { FaHeart, FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Profile = ({ theme }) => {

    const [editDesc, setEditDesc] = useState(false);
    const [showRestDetails, setShowRestDetails] = useState(false);
    const [expandedBlogs, setExpandedBlogs] = useState({});

    const context = useContext(BlogContext);

    const {
        data,
        secData,
        getUser,
        getUserBlogs,
        blogs,
        setOtherUserDetails,
        getNavDetail,
    } = context;

    const [otherDetails, setOtherDetails] = useState({ link: "", desc: "", location: "" });

    const handleChange = (e) => {
        setOtherDetails({ ...otherDetails, [e.target.name]: e.target.value });
    }

    const handleDescriptionSubmit = async (e) => {
        e.preventDefault();

        setOtherUserDetails(otherDetails);

        setEditDesc(false);
        setShowRestDetails(false);
        toast.success("Profile successfully updated.")


        getUser();
    }

    const prefillData = async () => {
        try {

            const response = await fetch(`${authUrl}/getuser`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "User-token": localStorage.getItem('user-token')
                }
            });
            const data = await response.json();
            const setData = data.userInfo;
            setOtherDetails({
                link: setData.link || "",
                desc: setData.desc || "",
                location: setData.location || ""
            });
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };


    function capitalizeFirstLetter(str) {
        return str.replace(/\b\w/g, (match) => match.toUpperCase());
    }

    function dateString(date) {
        return date.toDateString();
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
            getUserBlogs()
            toast.success(json.message);
        }
        else if (json.message === "You unliked the blog") {
            getUserBlogs()
            toast.success(json.message);
        }
    }

    useEffect(() => {
        prefillData();
    }, [editDesc])



    useEffect(() => {
        getUser();
        getUserBlogs();
        getNavDetail();
    }, [editDesc])


    return (
        <div className={`${theme === 'dark' ? 'dark' : 'light'} font-poppins max-w-[2000px] mx-auto dark:bg-darkPrimary`}>
            <Toaster
                position="top-right"
            />
            <img src={banner} className="lg:w-[2000px] lg:h-[400px] xl:w-[2000px] xl:h-[400px] lg:block xl:block hidden object-contain " />


            {/* Main Profile Section starts here */}

            <main className="flex justify-between flex-col md:flex-col lg:flex-row xl:flex-row  items-start w-full mx-auto mt-10 dark:bg-darkPrimary dark:text-gray-300 mb-32">

                {/*  Left Menu */}
                <div className="left lg:w-2/6 xl:w-2/6 w-full mt-5 lg:h-[500px] xl:h-[1000px]  lg:-mt-0 xl:-mt-0">

                    <div className="flex flex-col space-y-4 items-start justify-center ml-10">
                        <img src={person} className="h-36 w-36 p-2 object-contain bg-gray-100 rounded-full " alt="" />
                        <div className="flex gap-x-4 items-center justify-center ml-2">
                            {secData.map((e) => {
                                return (
                                    <div className="flex items-center gap-x-3" key={e.totalPostsLength}>
                                        <h1 className="text-lg font-semibold">Total Posts: </h1>
                                        <h2 className="text-xl font-bold text-blue-500">{e.totalPostsLength}</h2>
                                    </div>
                                )
                            })}

                        </div>
                    </div>

                    {data.map((d, index) => {
                        return (

                            <div className="username flex justify-between items-start ml-10 mr-3 space-x-2 mt-10" key={index}>
                                {!editDesc ? (
                                    <div className="flex justify-center flex-col w-full items-start space-y-2">
                                        <h1 className="text-gray-700 dark:text-gray-50 text-2xl font-extrabold">{d.username}</h1>
                                        <h1 className="text-gray-500 dark:text-gray-200 text-md font-roboto">{d.emailId}</h1>
                                        <p className="mt-3">{d.desc ? d.desc : <span className='text-gray-500 cursor-not-allowed'>Add Description</span>}</p>
                                    </div>) : (
                                    <form onSubmit={handleDescriptionSubmit} className="flex justify-center flex-col w-full items-start space-y-2">
                                        <h1 className="text-gray-700 dark:text-gray-50 text-2xl font-extrabold">{d.username}</h1>
                                        <h1 className="text-gray-500 dark:text-gray-200 text-md font-roboto">{d.emailId}</h1>
                                        <textarea onChange={handleChange} value={otherDetails.desc} name="desc" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your description here"></textarea>
                                        <button type="submit" className="rounded-md bg-blue-500 hover:bg-blue-600 text-white py-2 px-5">Submit</button>
                                    </form>
                                )}
                                <div onClick={() => setEditDesc(!editDesc)} className="flex p-3 transition duration-400 ease-in rounded-full hover:bg-gray-900 hover:text-white cursor-pointer items-center justify-center">
                                    <MdEdit size={20} />
                                </div>
                            </div>
                        )
                    })}


                    {data.map((d, index) => {
                        return (
                            <div className="flex justify-between text-gray-700 space-x-3 items-start mt-10 mr-3 dark:text-gray-300" key={index}>
                                {!showRestDetails ? (
                                    <div className="flex flex-col justify-center text-gray-700 space-y-5 items-start ml-10 mt-10 dark:text-gray-300">
                                        <h1 className="flex items-center gap-x-3 font-semibold">
                                            <i className="fa-solid fa-location-dot fa-lg"></i>
                                            <span>{d.location ? d.location : "Add Location"}</span>
                                        </h1>
                                        <h1 className="flex items-center gap-x-3 font-semibold">
                                            <i className="fa-solid fa-link fa-lg"></i>
                                            <span>{d.link ? d.link : "Add website link"}</span>
                                        </h1>
                                        <h1 className="flex items-center gap-x-3 font-semibold">
                                            <i className="fa-solid fa-calendar-days fa-lg"></i>
                                            <span>Joined: {new Date(d.datacreated.slice(0, 10)).toDateString()}</span>
                                        </h1>
                                    </div>
                                ) : (
                                    <form onSubmit={handleDescriptionSubmit} className="w-full px-10">
                                        <div className="mb-6">
                                            <input type="text" name="location" value={otherDetails.location} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " placeholder="Enter your location" />
                                        </div>
                                        <div className="mb-6">
                                            <input type="text" name="link" value={otherDetails.link} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " placeholder="Enter your social link" />
                                        </div>
                                        <button type="submit" className="rounded-md bg-blue-500 hover:bg-blue-600 text-white py-2 px-5">Submit</button>
                                    </form>
                                )}

                                <div onClick={() => setShowRestDetails(!showRestDetails)} className="flex p-3 transition duration-400 ease-in rounded-full hover:bg-gray-900 hover:text-white cursor-pointer items-center justify-center">
                                    <MdEdit size={20} />
                                </div>
                            </div>
                        )
                    })}

                </div>

                <div className="w-full flex justify-center items-center flex-col space-y-3 font-roboto">
                    <h1 className="text-center w-full xl:text-2xl lg:text-2xl md:text-lg text-md font-poppins text-blue-700 font-semibold border-b-2 border-gray-500 pb-3 mt-10  mb-4 overflow-hidden px-2 dark:text-white dark:border-none">My Blogs</h1>
                    <div className="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 grid-cols-1 xl:px-5 lg:px-5 w-full gap-3 px-5">
                        {
                            blogs
                                .filter(b => b.active)
                                .map((b = {}, index) => {
                                    const isLiked = b.likes && b.likes.includes(b.user);
                                    return (

                                        <div className="mainBlog py-5 px-5 w-full flex-col justify-start  items-start rounded-lg shadow-md shadow-gray-400 mb-3" key={index}>
                                            <h1 className="xl:text-xl lg:text-xl md:text-lg md:text-lg text-lg text-blue-500 font-semibold mt-0 mb-4 dark:text-white" style={{ lineHeight: "35px" }}>{capitalizeFirstLetter(b.title.substring(0, 30))}...</h1>
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
                                                    dangerouslySetInnerHTML={{ __html: b.description.substring(0, 220) }}
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

            </main>


        </div>
    );
};

export default Profile;
