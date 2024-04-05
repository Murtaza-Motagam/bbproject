import React, { useContext, useEffect } from 'react'
import ProfileCard from '../components/ProfileCard';
import {BlogContext} from "../BlogContext"

const Authors = ({ theme }) => {

    const context = useContext(BlogContext);

    const { data, fetchAllUsers } = context;

    useEffect(() => {
      fetchAllUsers();
    }, [])

    
    return (
        <div className={`${theme === 'dark' ? 'dark' : 'light'} font-poppins`}>
            <h1 className="mt-20 max-w-[1600px] mx-auto xl:text-3xl lg:text-3xl md:text-2xl text-xl font-bold font-roboto text-blue-700 dark:text-white">Trending Authors - 2023-2024</h1>
            <hr className="w-full h-3 rounded-full bg-indigo-500 max-w-[1600px] mx-auto my-8 dark:bg-gray-200" />
            <div className="text-gray-900 my-20  max-w-[1600px] mx-auto grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 dark:text-white">
                {data.map(user => (
                    <ProfileCard key={user.username} user={user}/>
                ))}
            </div>
        </div>
    )
}

export default Authors