import React, { useContext, useEffect, useState } from 'react';
import { BlogContext } from "../BlogContext.jsx";
import pic from "../assets/random.jpeg";
import banner from "../assets/banner.jpeg";
import profile from "../assets/admin-person.png";
import BlogDetails from "../components/BlogDetails.jsx"
import { Link } from 'react-router-dom';
import { MdEdit } from "react-icons/md";
import { authUrl } from '../utils/constant.js';
import toast, { Toaster } from 'react-hot-toast';
import Modal from '../components/Modal.jsx';

const Profile = ({ theme }) => {

    const [file, setFile] = useState(null);
    const [editDesc, setEditDesc] = useState(false);
    const [followerModal, setFollowerModal] = useState(false);
    const [followingModal, setFollowingModal] = useState(false);
    const [showRestDetails, setShowRestDetails] = useState(false);


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

        console.log(otherDetails)

        setOtherUserDetails(otherDetails);

        setEditDesc(false);
        setShowRestDetails(false);
        toast.success("Profile successfully updated.")


        getUser();
    }

    const showFollowersModal = () => {
        setFollowerModal(true);
    }

    const showFollowingModal = () => {
        setFollowingModal(true)
    }





    const upload = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', file);

        uploadProfilePic(formData)


    };

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

            <div className="bg-white h-[100px] lg:flex lg:justify-between xl:flex xl:justify-between w-full space-y-6 flex-col xl:flex-row xl:space-y-0 lg:flex-row lg:space-y-0 items-center hidden dark:bg-darkSecondary dark:text-gray-50">

                {secData.map((s, index) => {
                    return (

                        <div className="flex flex-1  md:ml-80 lg:ml-80 xl:ml-80 items-center w-full " key={index}>
                            <div className="flex flex-col items-start justify-between  h-[100px] ml-3 cursor-pointer" >
                                <div className="flex flex-col items-center justify-center mt-5 gap-y-2 px-5">
                                    <h1 className="text-md font-semibold">Total Posts</h1>
                                    <h2 className="text-xl font-bold text-blue-500">{s.totalPostsLength}</h2>
                                </div>
                            </div>
                            <div className="flex flex-col items-start justify-between  h-[100px] ml-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700" onClick={showFollowersModal}>
                                <div className="flex flex-col items-center justify-center mt-5 gap-y-2 px-5">
                                    <h1 className="text-md font-semibold">Followers</h1>
                                    <h2 className="text-xl font-bold text-blue-500">{s.totalFollowers}</h2>
                                </div>
                            </div>
                            <div className="flex flex-col items-start justify-between  h-[100px] ml- cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700" onClick={showFollowingModal}>
                                <div className="flex flex-col items-center justify-center mt-5 gap-y-2 px-5">
                                    <h1 className="text-md font-semibold">Following</h1>
                                    <h2 className="text-xl font-bold text-blue-500">{s.totalFollowing}</h2>
                                </div>
                            </div>
                        </div>

                    )
                })}
            </div>


            {/* Main Profile Section starts here */}

            <main className="flex justify-between flex-col md:flex-col lg:flex-row xl:flex-row  items-start w-full mx-auto mt-0 dark:bg-darkPrimary dark:text-gray-300 mb-32">

                {/*  Left Menu */}
                <div className="left lg:w-2/6 xl:w-2/6 w-full mt-5 lg:h-[1000px] xl:h-[1000px]  lg:-mt-0 xl:-mt-0">

                    <div className="flex items-center ml-10 ">
                        <img src={profile} className="h-36 w-36 p-2 object-contain bg-gray-100 rounded-full " alt="" />
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

                {/*  Right Menu */}
                <div className="right  max-w-full text-gray-900 lg:w-4/6 xl:w-4/6 mt-[6rem] dark:bg-darkSecondary dark:text-gray-50">

                    <div className="flex items-center h-[70px] justify-start dark:bg-darkSecondary">
                        <Link to="/myprofile" className="flex flex-col items-start justify-between h-[70px] hover:bg-white ml-5 dark:hover:bg-gray-600 ">
                            <div className="flex flex-col items-center justify-center mt-5 gap-y-2 px-5">
                                <h1 className="text-md font-semibold">Your Blogs</h1>
                            </div>
                            <div className="w-full h-[4px] bg-blue-500"></div>
                        </Link>
                    </div>

                    <div className="mt-10 space-y-2 w-full">
                        {blogs.length > 0 ? (
                            blogs.map(blog => {
                                return (
                                    data.map(d => (
                                        <BlogDetails
                                            blog={blog}
                                            user={d.username}
                                            key={`${blog._id}-${d.username}`} // Ensuring key is unique
                                        />
                                    ))
                                );
                            })
                        ) : (
                            <div className="h-[520px] w-full flex items-center justify-center">
                                <h1 className="text-3xl font-semibold text-blue-500">No Blogs Yet!</h1>
                            </div>
                        )}
                    </div>

                </div>



            </main>

            {followingModal && (
                <Modal
                    title="Your Followings"
                    isOpen={true}
                    isClose={() => setFollowingModal(false)}
                    
                />
            )}
            {followerModal && (
                <Modal
                    title="Your Followers"
                    isOpen={true}
                    isClose={() => setFollowerModal(false)}
                    
                />
            )}

        </div>
    );
};

export default Profile;


{/* <form>
    <input type="file" name="file" onChange={(e) => setFile(e.target.files[0])} />
    <button type="submit" className="bg-gray-800 p-4 rounded text-lg text-white" onClick={upload}>Upload image</button>
</form> */}
