import React from 'react'
import { AiOutlineUsergroupAdd } from 'react-icons/ai'
import UserImg from "../assets/user-vector.jpg";
import { Link } from 'react-router-dom'

const ProfileCard = ({ user }) => {

    const { _id, username, desc } = user;


    return (
        <div className="MainProfileComponent text-gray-900 bg-gray-100 px-5 py-5 rounded-lg  z-9 shadow-md shadow-gray-400 dark:bg-darkTerritiary dark:shadow-gray-600 dark:border-2 dark:border-gray-600">
            <div className="flex flex-col justify-start items-center">
                <img src={UserImg} className="my-3 h-28 w-28 object-cover shadow-md shadow-gray-400 rounded-full" alt="" />
                <div className="flex flex-col space-y-4 text-center items-center justify-end ">
                    <h1 className="font-bold text-gray-700 lg:text-2xl xl:text-2xl md:text-xl text-md dark:text-white">{username}</h1>
                    {/* <h1 className="lg:text-lg xl:text-lg text-sm text-gray-600 font-roboto dark:text-gray-200">{emailId}</h1> */}
                    <h1 className="lg:text-lg xl:text-lg text-sm px-5 font-roboto text-gray-600 dark:text-gray-200">{desc ? desc.substring(0, 70) : <span className="text-gray-400 dark:text-gray-500">Does not contain any description to view more about user click on checkout</span>}</h1>
                    <Link to={`/profile/${_id}`} className="py-2 px-10 text-white bg-indigo-500 hover:scale-105 rounded-full border-none focus:outline-none ">Checkout</Link>
                </div>
            </div>
        </div>
    )
}

export default ProfileCard