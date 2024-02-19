import React, { useContext, useEffect, useState } from 'react';
import { BlogContext } from '../BlogContext';
import pic from "../assets/random.jpeg";
import blog from "../assets/random2.jpeg";
import banner from "../assets/banner.jpeg";
import profile from "../assets/admin-person.png";
import { Link } from 'react-router-dom';

const Profile = ({ theme }) => {
    const [file, setFile] = useState(null);
    const [post, setPost] = useState(false);
    const [followers, setFollowers] = useState(false);
    const [following, setFollowing] = useState(false);
    const [likes, setLikes] = useState(false);

    const context = useContext(BlogContext);
    const { blogs, uploadProfilePic } = context;


    const upload = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', file);

        uploadProfilePic(formData)


    };

    const onClickPost = () => {
        setFollowers(false);
        setFollowing(false);
        setLikes(false);
        setPost(true);
    }
    const onClickfollowers = () => {
        setFollowing(false);
        setLikes(false);
        setPost(false);
        setFollowers(true);
    }
    const onClickFollowing = () => {
        setFollowers(false);
        setLikes(false);
        setPost(false);
        setFollowing(true);
    }
    const onClickLikes = () => {
        setFollowers(false);
        setFollowing(false);
        setPost(false);
        setLikes(true);
    }




    return (
        <div className={`${theme === 'dark' ? 'dark' : 'light'} font-poppins max-w-[2000px] mx-auto dark:bg-darkPrimary`}>
            <img src={banner} className="lg:w-[2000px] lg:h-[400px] xl:w-[2000px] xl:h-[400px] lg:block xl:block hidden object-contain " />

            <div className="bg-white h-[100px] lg:flex lg:justify-between xl:flex xl:justify-between w-full space-y-6 flex-col xl:flex-row xl:space-y-0 lg:flex-row lg:space-y-0 items-center hidden dark:bg-darkSecondary dark:text-gray-50">

                <div className="flex flex-1  md:ml-80 lg:ml-80 xl:ml-80 items-center w-full ">
                    <div className="flex flex-col items-start justify-between  h-[100px] ml-3 cursor-pointer" onClick={onClickPost}>
                        <div className="flex flex-col items-center justify-center mt-5 gap-y-2 px-5">
                            <h1 className="text-md font-semibold">Total Posts</h1>
                            <h2 className="text-xl font-bold text-blue-500">340</h2>
                        </div>
                        {post && (
                            <div className="w-full h-[4px] bg-blue-500"></div>
                        )}
                    </div>
                    <div className="flex flex-col items-start justify-between  h-[100px] ml-3 cursor-pointer" onClick={onClickfollowers}>
                        <div className="flex flex-col items-center justify-center mt-5 gap-y-2 px-5">
                            <h1 className="text-md font-semibold">Followers</h1>
                            <h2 className="text-xl font-bold text-blue-500">2090</h2>
                        </div>
                        {followers && (
                            <div className="w-full h-[4px] bg-blue-500"></div>
                        )}
                    </div>
                    <div className="flex flex-col items-start justify-between  h-[100px] ml- cursor-pointer" onClick={onClickFollowing}>
                        <div className="flex flex-col items-center justify-center mt-5 gap-y-2 px-5">
                            <h1 className="text-md font-semibold">Following</h1>
                            <h2 className="text-xl font-bold text-blue-500">3400</h2>
                        </div>
                        {following && (
                            <div className="w-full h-[4px] bg-blue-500"></div>
                        )}
                    </div>
                    <div className="flex flex-col items-start justify-between  h-[100px] ml-3 cursor-pointer" onClick={onClickLikes}>
                        <div className="flex flex-col items-center justify-center mt-5 gap-y-2 px-5">
                            <h1 className="text-md font-semibold">Total Likes</h1>
                            <h2 className="text-xl font-bold text-blue-500">140</h2>
                        </div>
                        {likes && (
                            <div className="w-full h-[4px] bg-blue-500"></div>
                        )}
                    </div>
                </div>

                <div className="flex flex-2 ml-10 md:mr-48 lg:mr-48 xl:mr-48 items-center justify-center">
                    <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Follow</button>
                </div>
            </div>


            {/* Main Profile Section starts here */}

            <main className="flex justify-between flex-col md:flex-col lg:flex-row xl:flex-row  items-center w-full mx-auto mt-0 dark:bg-darkPrimary dark:text-gray-300">

                {/*  Left Menu */}
                <div className="left lg:w-2/6 xl:w-2/6 w-full mt-5 lg:h-[1000px] xl:h-[1000px]  lg:-mt-0 xl:-mt-0">

                    <div className="flex items-center ml-10 ">
                        <img src={profile} className="h-36 w-36 p-2 object-contain bg-gray-100 rounded-full " alt="" />
                    </div>

                    <div className="username flex flex-col justify-center items-start ml-10 space-y-2 mt-10">
                        <h1 className="text-gray-700 dark:text-gray-50 text-2xl font-extrabold">DavidBek90</h1>
                        <h1 className="text-gray-500 dark:text-gray-200 text-md font-roboto">davidbek90@gmail.com</h1>
                        <p className="mt-3">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab alias harum, neque accusamus in reiciendis praesentium, magnam beatae fugiat eaque quas tempore eius pariatur?</p>
                    </div>

                    <div className="flex flex-col justify-center text-gray-700 space-y-5 items-start ml-10 mt-10 dark:text-gray-300">
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
                            <span>Joined Nov 7, 2023.</span>
                        </h1>
                        <h1 className="flex items-center gap-x-3 font-semibold">
                            <i className="fa-solid fa-image fa-lg"></i>
                            <span>7 photos posted</span>
                        </h1>
                    </div>

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

                        <Link to="/" className="blog bg-white hover:bg-gray-100 mr-10 ml-5 200 py-5 flex justify-between items-center px-5 overflow-hidden  dark:bg-transparent dark:border-b-4 dark:rounded-lg dark:hover:bg-gray-700 mb-5">
                            <div className="left hidden md:block lg:block xl:block md:w-1/4 lg:w-1/4 xl:w-1/4">
                                <img src={blog} className="w-[64] h-full object-contain" alt="" />
                            </div>
                            <div className="right w-full md:w-3/4 lg:w-3/4 xl:w-3/4 ml-5 flex items-start flex-col space-y-5">
                                <div className="space-y-2">
                                    <h1 className="shortInfo p-0 text-lg lg:text-xl xl:text-xl font-semibold text-blue-500">Information War</h1>
                                    <h1 className="Mainheading p-0 text-xl lg:text-2xl xl:text-2xl font-bold text-gray-900 dark:text-white">A man is innocent enough for eating <br /> chicken wings.</h1>
                                </div>
                                <p className="desc text-sm lg:text-md xl:text-md font-medium text-gray-800 dark:text-gray-300">Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus aperiam optio suscipit minima cupiditate id expedita quod quam minus libero.</p>
                                <p className="author text-sm font-medium text-gray-600 dark:text-gray-400">Dispatch: Davidbek90</p>
                            </div>
                        </Link>


                        <Link to="/" className="blog bg-white hover:bg-gray-100 mr-10 ml-5 200 py-5 flex justify-between items-center px-5 overflow-hidden  dark:bg-transparent dark:border-b-4 dark:rounded-lg dark:hover:bg-gray-700 mb-5">
                            <div className="left hidden md:block lg:block xl:block md:w-1/4 lg:w-1/4 xl:w-1/4">
                                <img src={blog} className="w-[64] h-full object-contain" alt="" />
                            </div>
                            <div className="right w-full md:w-3/4 lg:w-3/4 xl:w-3/4 ml-5 flex items-start flex-col space-y-5">
                                <div className="space-y-2">
                                    <h1 className="shortInfo p-0 text-lg lg:text-xl xl:text-xl font-semibold text-blue-500">Information War</h1>
                                    <h1 className="Mainheading p-0 text-xl lg:text-2xl xl:text-2xl font-bold text-gray-900 dark:text-white">A man is innocent enough for eating <br /> chicken wings.</h1>
                                </div>
                                <p className="desc text-sm lg:text-md xl:text-md font-medium text-gray-800 dark:text-gray-300">Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus aperiam optio suscipit minima cupiditate id expedita quod quam minus libero.</p>
                                <p className="author text-sm font-medium text-gray-600 dark:text-gray-400">Dispatch: Davidbek90</p>
                            </div>
                        </Link>


                        <Link to="/" className="blog bg-white hover:bg-gray-100 mr-10 ml-5 200 py-5 flex justify-between items-center px-5 overflow-hidden  dark:bg-transparent dark:border-b-4 dark:rounded-lg dark:hover:bg-gray-700 mb-5">
                            <div className="left hidden md:block lg:block xl:block md:w-1/4 lg:w-1/4 xl:w-1/4">
                                <img src={blog} className="w-[64] h-full object-contain" alt="" />
                            </div>
                            <div className="right w-full md:w-3/4 lg:w-3/4 xl:w-3/4 ml-5 flex items-start flex-col space-y-5">
                                <div className="space-y-2">
                                    <h1 className="shortInfo p-0 text-lg lg:text-xl xl:text-xl font-semibold text-blue-500">Information War</h1>
                                    <h1 className="Mainheading p-0 text-xl lg:text-2xl xl:text-2xl font-bold text-gray-900 dark:text-white">A man is innocent enough for eating <br /> chicken wings.</h1>
                                </div>
                                <p className="desc text-sm lg:text-md xl:text-md font-medium text-gray-800 dark:text-gray-300">Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus aperiam optio suscipit minima cupiditate id expedita quod quam minus libero.</p>
                                <p className="author text-sm font-medium text-gray-600 dark:text-gray-400">Dispatch: Davidbek90</p>
                            </div>
                        </Link>


                        <Link to="/" className="blog bg-white hover:bg-gray-100 mr-10 ml-5 200 py-5 flex justify-between items-center px-5 overflow-hidden  dark:bg-transparent dark:border-b-4 dark:rounded-lg dark:hover:bg-gray-700 mb-5">
                            <div className="left hidden md:block lg:block xl:block md:w-1/4 lg:w-1/4 xl:w-1/4">
                                <img src={blog} className="w-[64] h-full object-contain" alt="" />
                            </div>
                            <div className="right w-full md:w-3/4 lg:w-3/4 xl:w-3/4 ml-5 flex items-start flex-col space-y-5">
                                <div className="space-y-2">
                                    <h1 className="shortInfo p-0 text-lg lg:text-xl xl:text-xl font-semibold text-blue-500">Information War</h1>
                                    <h1 className="Mainheading p-0 text-xl lg:text-2xl xl:text-2xl font-bold text-gray-900 dark:text-white">A man is innocent enough for eating <br /> chicken wings.</h1>
                                </div>
                                <p className="desc text-sm lg:text-md xl:text-md font-medium text-gray-800 dark:text-gray-300">Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus aperiam optio suscipit minima cupiditate id expedita quod quam minus libero.</p>
                                <p className="author text-sm font-medium text-gray-600 dark:text-gray-400">Dispatch: Davidbek90</p>
                            </div>
                        </Link>
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
