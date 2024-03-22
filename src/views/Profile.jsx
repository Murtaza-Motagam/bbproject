import React, { useContext, useEffect, useState } from 'react';
import { BlogContext } from "../BlogContext.jsx";
import pic from "../assets/random.jpeg";
import blogImage from "../assets/random2.jpeg";
import banner from "../assets/banner.jpeg";
import profile from "../assets/admin-person.png";
import BlogDetails from "../components/BlogDetails.jsx"
import { Link } from 'react-router-dom';
import { authUrl } from '../utils/constant.js';

const Profile = ({ theme }) => {

    const [file, setFile] = useState(null);
    const [post, setPost] = useState(false);
    const [followers, setFollowers] = useState(false);
    const [following, setFollowing] = useState(false);

    const context = useContext(BlogContext);
    const { data, getUser, getUserBlogs, blogs } = context;



    const upload = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', file);

        uploadProfilePic(formData)


    };


    useEffect(() => {
        getUser();
        getUserBlogs();
    }, [])


    return (
        <div className={`${theme === 'dark' ? 'dark' : 'light'} font-poppins max-w-[2000px] mx-auto dark:bg-darkPrimary`}>
            <img src={banner} className="lg:w-[2000px] lg:h-[400px] xl:w-[2000px] xl:h-[400px] lg:block xl:block hidden object-contain " />

            <div className="bg-white h-[100px] lg:flex lg:justify-between xl:flex xl:justify-between w-full space-y-6 flex-col xl:flex-row xl:space-y-0 lg:flex-row lg:space-y-0 items-center hidden dark:bg-darkSecondary dark:text-gray-50">

                <div className="flex flex-1  md:ml-80 lg:ml-80 xl:ml-80 items-center w-full ">
                    <div className="flex flex-col items-start justify-between  h-[100px] ml-3 cursor-pointer" onClick={onClickPost}>
                        <div className="flex flex-col items-center justify-center mt-5 gap-y-2 px-5">
                            <h1 className="text-md font-semibold">Total Posts</h1>
                            <h2 className="text-xl font-bold text-blue-500">0</h2>
                        </div>
                    </div>
                    <div className="flex flex-col items-start justify-between  h-[100px] ml-3 cursor-pointer" onClick={onClickfollowers}>
                        <div className="flex flex-col items-center justify-center mt-5 gap-y-2 px-5">
                            <h1 className="text-md font-semibold">Followers</h1>
                            <h2 className="text-xl font-bold text-blue-500">0</h2>
                        </div>
                    </div>
                    <div className="flex flex-col items-start justify-between  h-[100px] ml- cursor-pointer" onClick={onClickFollowing}>
                        <div className="flex flex-col items-center justify-center mt-5 gap-y-2 px-5">
                            <h1 className="text-md font-semibold">Following</h1>
                            <h2 className="text-xl font-bold text-blue-500">0</h2>
                        </div>
                    </div>
                </div>

                <div className="flex flex-2 ml-10 md:mr-48 lg:mr-48 xl:mr-48 items-center justify-center">
                    <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Follow</button>
                </div>
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

                            <div className="username flex flex-col justify-center items-start ml-10 space-y-2 mt-10" key={index}>
                                <h1 className="text-gray-700 dark:text-gray-50 text-2xl font-extrabold">{d.username}</h1>
                                <h1 className="text-gray-500 dark:text-gray-200 text-md font-roboto">{d.emailId}</h1>
                                <p className="mt-3">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab alias harum, neque accusamus in reiciendis praesentium, magnam beatae fugiat eaque quas tempore eius pariatur?</p>
                            </div>
                        )
                    })}

                    {data.map((d, index) => {
                        return (
                            <div className="flex flex-col justify-center text-gray-700 space-y-5 items-start ml-10 mt-10 dark:text-gray-300" key={index}>

                                <h1 className="flex items-center gap-x-3 font-semibold">
                                    <i className="fa-solid fa-location-dot fa-lg"></i>
                                    <span>New Jersey - Texas, USA</span>
                                </h1>
                                <h1 className="flex items-center gap-x-3 font-semibold">
                                    <i className="fa-solid fa-link fa-lg"></i>
                                    <span>www.davidbek.com</span>
                                </h1>
                                <h1 className="flex items-center gap-x-3 font-semibold">
                                    <i className="fa-solid fa-calendar-days fa-lg"></i>
                                    <span>Joined: {new Date(d.datacreated.slice(0, 10)).toDateString()}</span>
                                </h1>
                                <h1 className="flex items-center gap-x-3 font-semibold">
                                    <i className="fa-solid fa-image fa-lg"></i>
                                    <span>7 photos posted</span>
                                </h1>
                            </div>
                        )
                    })}

                    <div className="flex px-10 mt-5 gap-2">
                        <div className="flex flex-col gap-1 ">
                            <img src={pic} className="h-32 w-32 object-contain opacity-80 rounded-md" />
                            <img src={pic} className="h-32 w-32 object-contain opacity-80 rounded-md" />
                        </div>
                        <div className="flex gap-1 flex-col">
                            <img src={pic} className="h-32 w-32 object-contain opacity-80 rounded-md" />
                            <img src={pic} className="h-32 w-32 object-contain opacity-80 rounded-md" />
                        </div>
                    </div>
                </div>

                {/*  Right Menu */}
                <div className="right bg-gray-100 max-w-full text-gray-900 lg:w-4/6 xl:w-4/6 mt-[6rem] dark:bg-darkSecondary dark:text-gray-50">

                    <div className="flex items-center bg-gray-100 h-[70px] justify-start dark:bg-darkSecondary">
                        <Link to="/" className="flex flex-col items-start justify-between h-[70px] hover:bg-white ml-5 dark:hover:bg-gray-600 ">
                            <div className="flex flex-col items-center justify-center mt-5 gap-y-2 px-5">
                                <h1 className="text-md font-semibold">Your Blogs</h1>
                            </div>
                            <div className="w-full h-[4px] bg-blue-500"></div>
                        </Link>
                        <Link to="/" className="flex flex-col items-start justify-between h-[70px] hover:bg-white dark:hover:bg-gray-600 ">
                            <div className="flex flex-col items-center justify-center mt-5 gap-y-2 px-5">
                                <h1 className="text-md font-semibold">Your Images</h1>
                            </div>
                            {/* <div className="w-full h-[4px] bg-blue-500"></div> */}
                        </Link>
                        <Link to="/" className="flex flex-col items-start justify-between h-[70px] hover:bg-white dark:hover:bg-gray-600 ">
                            <div className="flex flex-col items-center justify-center mt-5 gap-y-2 px-5">
                                <h1 className="text-md font-semibold">Your Videos</h1>
                            </div>
                            {/* <div className="w-full h-[4px] bg-blue-500"></div> */}
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

        </div>
    );
};

export default Profile;


{/* <form>
    <input type="file" name="file" onChange={(e) => setFile(e.target.files[0])} />
    <button type="submit" className="bg-gray-800 p-4 rounded text-lg text-white" onClick={upload}>Upload image</button>
</form> */}
