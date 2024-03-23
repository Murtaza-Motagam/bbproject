import React, { useContext, useEffect, useState } from 'react';
import { BlogContext } from "../../BlogContext.jsx";
import banner from "../../assets/banner.jpeg";
import profile from "../../assets/admin-person.png";
import BlogDetails from "../../components/BlogDetails.jsx"
import { Link, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Modal from '../../components/Modal.jsx';

const otherProfile = ({ theme }) => {

    const context = useContext(BlogContext);

    const [followerModal, setFollowerModal] = useState(false);
    const [followingModal, setFollowingModal] = useState(false);

    const { id } = useParams();


    const showFollowersModal = () => {
        setFollowerModal(true);
    }

    const showFollowingModal = () => {
        setFollowingModal(true)
    }



    const {
        data,
        navDetails,
        check,
        userBlogData,
        getSearchedUserDetails,
        getSearchedUserNavdetails,
        checkIfUserAlreadyFollowing
    } = context;

    useEffect(() => {
        getSearchedUserDetails(id);
        getSearchedUserNavdetails(id);
        checkIfUserAlreadyFollowing(id)
    }, [])


    return (
        <div className={`${theme === 'dark' ? 'dark' : 'light'} font-poppins max-w-[2000px] mx-auto dark:bg-darkPrimary`}>
            <Toaster
                position="top-right"
            />
            <img src={banner} className="lg:w-[2000px] lg:h-[400px] xl:w-[2000px] xl:h-[400px] lg:block xl:block hidden object-contain " />

            {navDetails.map((d, index) => {
                return (
                    <div className="bg-white h-[100px] lg:flex lg:justify-between xl:flex xl:justify-between w-full space-y-6 flex-col xl:flex-row xl:space-y-0 lg:flex-row lg:space-y-0 items-center hidden dark:bg-darkSecondary dark:text-gray-50" key={index}>


                        <div className="flex flex-1  md:ml-80 lg:ml-80 xl:ml-80 items-center w-full" key={index}>
                            <div className="flex flex-col items-start justify-between  h-[100px] ml-3 cursor-pointer" >
                                <div className="flex flex-col items-center justify-center mt-5 gap-y-2 px-5">
                                    <h1 className="text-md font-semibold">Total Posts</h1>
                                    <h2 className="text-xl font-bold text-blue-500">{d.totalPostsLength}</h2>
                                </div>
                            </div>
                            <div className="flex flex-col items-start justify-between  h-[100px] ml-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800" onClick={showFollowersModal}>
                                <div className="flex flex-col items-center justify-center mt-5 gap-y-2 px-5">
                                    <h1 className="text-md font-semibold">Followers</h1>
                                    <h2 className="text-xl font-bold text-blue-500">{d.totalFollowers}</h2>
                                </div>
                            </div>
                            <div className="flex flex-col items-start justify-between  h-[100px] ml- cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800" onClick={showFollowingModal}>
                                <div className="flex flex-col items-center justify-center mt-5 gap-y-2 px-5">
                                    <h1 className="text-md font-semibold">Following</h1>
                                    <h2 className="text-xl font-bold text-blue-500">{d.totalFollowing}</h2>
                                </div>
                            </div>
                        </div>
                        {check === true ? (
                            <div className="flex flex-2 ml-10 md:mr-48 lg:mr-48 xl:mr-48 items-center justify-center">
                                <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Following</button>
                            </div>
                        ) : (

                            <div className="flex flex-2 ml-10 md:mr-48 lg:mr-48 xl:mr-48 items-center justify-center">
                                <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Follow</button>
                            </div>

                        )}
                    </div>
                )
            })}


            {/* Main Profile Section starts here */}

            <main className="flex justify-between flex-col md:flex-col lg:flex-row xl:flex-row  items-start w-full mx-auto mt-0 dark:bg-darkPrimary dark:text-gray-300 mb-32">

                {/*  Left Menu */}
                <div className="left lg:w-2/6 xl:w-2/6 w-full mt-5 lg:h-[1000px] xl:h-[1000px]  lg:-mt-0 xl:-mt-0">

                    <div className="flex items-center ml-10 ">
                        <img src={profile} className="h-36 w-36 p-2 object-contain bg-gray-100 rounded-full " alt="" />
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
                <div className="right  max-w-full text-gray-900 lg:w-4/6 xl:w-4/6 mt-[6rem] dark:bg-darkSecondary dark:text-gray-50">

                    <div className="flex items-center h-[70px] justify-start dark:bg-darkSecondary">
                        <Link to="/" className="flex flex-col items-start justify-between h-[70px] hover:bg-white ml-5 dark:hover:bg-gray-600 ">
                            <div className="flex flex-col items-center justify-center mt-5 gap-y-2 px-5">
                                <h1 className="text-md font-semibold">Your Blogs</h1>
                            </div>
                            <div className="w-full h-[4px] bg-blue-500"></div>
                        </Link>
                    </div>

                    <div className="mt-10 space-y-2 w-full">
                        {userBlogData && userBlogData.length > 0 ? (
                            userBlogData.map(blog => {
                                return (
                                    <Link to={`/blogs/${blog._id}`} className="blog bg-white hover:bg-gray-100 mr-10 ml-5 200 py-5 flex justify-between items-center px-5 overflow-hidden  dark:bg-transparent dark:border-b-4 dark:rounded-lg dark:hover:bg-gray-700 mb-5" key={blog._id}>
                                        <div className="right w-full md:w-3/4 lg:w-3/4 xl:w-3/4 ml-5 flex items-start flex-col space-y-5 pb-5">
                                            <div className="space-y-2">
                                                <h1 className="shortInfo p-0 text-lg lg:text-xl xl:text-xl font-semibold text-blue-500">{blog.category}</h1>
                                                <h1 className="Mainheading p-0 text-xl lg:text-2xl xl:text-2xl font-bold text-gray-900 dark:text-white">{blog.title}</h1>
                                            </div>
                                            <p className="desc text-sm lg:text-md xl:text-md font-medium text-gray-800 dark:text-gray-300">{blog.description}</p>
                                        </div>
                                    </Link>
                                );
                            })
                        ) : (
                            <div className="h-[520px] w-full flex items-center justify-center">
                                <h1 className="text-3xl font-semibold text-blue-500">No Blogs Yet!</h1>
                            </div>
                        )}
                    </div>

                </div>

                {followingModal && (
                    <Modal
                        title="Followings"
                        isOpen={true}
                        isClose={() => setFollowingModal(false)}

                    />
                )}
                {followerModal && (
                    <Modal
                        title="Followers"
                        isOpen={true}
                        isClose={() => setFollowerModal(false)}

                    />
                )}

            </main>

        </div>
    );
};

export default otherProfile;