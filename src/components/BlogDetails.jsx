import React from 'react'
import { Link } from 'react-router-dom'

const BlogDetails = ({ blog, image,  user}) => {

    const { _id, title, category, description } = blog;
    return (
        <Link to={`/blogs/${_id}`} className="blog bg-white hover:bg-gray-100 mr-10 ml-5 200 py-5 flex justify-between items-center px-5 overflow-hidden  dark:bg-transparent dark:border-b-4 dark:rounded-lg dark:hover:bg-gray-700 mb-5">
            <div className="right w-full md:w-3/4 lg:w-3/4 xl:w-3/4 ml-5 flex items-start flex-col space-y-5">
                <div className="space-y-2">
                    <h1 className="shortInfo p-0 text-lg lg:text-xl xl:text-xl font-semibold text-blue-500">{category}</h1>
                    <h1 className="Mainheading p-0 text-xl lg:text-2xl xl:text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
                </div>
                <p className="desc text-sm lg:text-md xl:text-md font-medium text-gray-800 dark:text-gray-300">{description}</p>
                <p className="author text-sm font-medium text-gray-600 dark:text-gray-400">Author:  {user}</p>
            </div>
        </Link>
    )
}

export default BlogDetails