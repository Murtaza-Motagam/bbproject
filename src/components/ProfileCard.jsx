import React from 'react'
import { AiOutlineUsergroupAdd } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const ProfileCard = ({ user }) => {

    const { _id, username, emailId, desc, followers, following } = user;

    return (
        <div className="MainProfileComponent text-gray-900 bg-gray-100 px-5 py-5 rounded-lg h-[630px] z-9 shadow-md shadow-gray-400 dark:bg-darkTerritiary dark:shadow-gray-600 dark:border-2 dark:border-gray-600">
            <div className="flex flex-col justify-start items-center">
                <img src="./students/John_Morgan.jpg" className="my-3 h-28 w-28 object-cover shadow-md shadow-gray-400 rounded-full" alt="" />
                <div className="flex flex-col space-y-4 text-center items-center justify-end ">
                    <h1 className="font-bold text-gray-700 lg:text-2xl xl:text-2xl md:text-xl text-md dark:text-white">{username.substring(0, 14)}...</h1>
                    <h1 className="lg:text-lg xl:text-lg text-sm text-gray-600 font-roboto dark:text-gray-200">{emailId}</h1>
                    <h1 className="lg:text-lg xl:text-lg text-sm px-5 font-roboto text-gray-600 dark:text-gray-200">{desc ? desc.substring(0, 70) : <span className="text-gray-400 dark:text-gray-500">Does not contain any description to view more about user click on follow</span>}</h1>
                    <Link to={`/profile/${_id}`} className="py-2 px-10 text-white bg-indigo-500 hover:scale-105 rounded-full border-none focus:outline-none ">Follow</Link>
                </div>

                <hr className="w-full h-1 bg-gray-300 mt-5 mb-2" />

                <div className="flex items-center text-center justify-evenly my-3   w-full py-2 dark:text-gray-200">
                    <div className="flex flex-col space-y-2 items-center">
                        <AiOutlineUsergroupAdd size={80} className="bg-slate-700 rounded-full text-white p-5" />
                        <h1 className="xl:text-xl lg:text-xl md:text-xl text-md font-extrabold">12.3k</h1>
                        <h1 className="xl:text-lg lg:text-lg md:text-lg text-sm text-gray-600 font-medium dark:text-gray-200">Followers</h1>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <AiOutlineUsergroupAdd size={80} className="bg-slate-700 rounded-full text-white p-5" />
                        <h1 className="xl:text-xl lg:text-xl md:text-xl text-md font-extrabold dark:text-gray-200">12.3k</h1>
                        <h1 className="xl:text-lg lg:text-lg md:text-lg text-sm text-gray-600 font-medium dark:text-gray-200">Followings</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileCard