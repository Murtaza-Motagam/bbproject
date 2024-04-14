import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const BlogDetails = ({ blog }) => {

    const [viewActive, setViewActive] = useState(false);

    function capitalizeFirstLetter(str) {
        return str.replace(/\b\w/g, (match) => match.toUpperCase());
    }

    function dateString(date){
        return date.toDateString();
    }

    const toggleView = () => {
        setViewActive(!viewActive);
    };

    const { _id, title, category, description, createdAt } = blog;
    return (
        <div className="blog bg-white py-5 flex gap-x-3 justify-center items-center  overflow-hidden  dark:bg-transparent  dark:rounded-lg mb-5">
            <div className=" bg-black p-2  flex justify-start gap-x-5 items-start flex-col space-y-5">
                <div className="space-y-2">
                    <h1 className="Mainheading p-0 text-lg lg:text-xl xl:text-xl font-semibold text-gray-900 dark:text-white">{title}</h1>
                    <h1 className="shortInfo p-0 text-sm font-semibold text-blue-500">{capitalizeFirstLetter(category)}</h1>
                </div>
                <p className="desc text-sm lg:text-md xl:text-md font-medium text-gray-800 dark:text-gray-300">{!viewActive ? (description.slice(0, 220)) : (description)}...
                    <button onClick={toggleView} className="text-sm font-medium hover:underline ml-2">{!viewActive ? "View more" : "View less"}</button>
                </p>
                <p className="desc text-sm lg:text-md xl:text-md font-medium text-gray-800 dark:text-gray-300"><strong>Posted: </strong> {dateString(new Date(createdAt))}</p> 
            </div>
        </div>
    )
}

export default BlogDetails