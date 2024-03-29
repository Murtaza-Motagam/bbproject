import React, { useContext } from 'react'
import { FaUserCircle } from "react-icons/fa";
import { Link, useParams } from 'react-router-dom';
import { BlogContext } from '../BlogContext';
import { useEffect } from 'react';

const Modal = ({ title, isOpen, isClose }) => {


    const context = useContext(BlogContext);

    const { id } = useParams();

    const { terryData, getUserFollowingList, getUserFollowersList, getOtherUserFollowersList, getOtherUserFollowingList } = context;

    useEffect(() => {
        if (title === "Your Followings") {
            getUserFollowingList();
        }
        if (title === "Your Followers") {
            getUserFollowersList();
        }
        if (title === "Followers") {
            getOtherUserFollowersList(id);
        }
        if (title === "Following") {
            getOtherUserFollowingList(id);
        }

    }, [isOpen, isClose])


    if (!isOpen) return null;

    return (
        <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 dark:text-gray-100">
            <div className="relative p-4 w-full max-w-md max-h-full">

                <div className="relative bg-white md:p-5 rounded-lg shadow dark:bg-gray-700">

                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {title}
                        </h3>
                        <button onClick={isClose} type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>

                    <div className="my-2">
                        {/* Content */}
                        {terryData && terryData.length > 0 ? terryData.map(main => (

                            <Link to={`/profile/${main._id}`} className="flex py-4 px-3 rounded-md items-start justify-between gap-x-3 hover:bg-gray-100 dark:hover:bg-darkTerritiary" key={main._id}>
                                <div className="flex items-center justify-center gap-x-4">
                                    <div className="xl:text-3xl lg:text-3xl text-2xl">
                                        <FaUserCircle />
                                    </div>
                                    <h1 className="xl:text-lg lg:text-lg font-roboto font-medium">{main.username}</h1>
                                </div>
                                <button className="hover:font-semibold text-danger dark:text-white">remove</button>
                            </Link>

                        )) : (
                            <h1 className="w-full">No Followers</h1>
                        )}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Modal