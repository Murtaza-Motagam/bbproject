import React from 'react'
import { Link, useLocation } from "react-router-dom";
const CategoryNav = ({ theme }) => {

    const location = useLocation();

    return (
        <div className={`${theme === "dark" ? "dark" : "light"} font-poppins max-w-[2000px] mx-auto`}>
            <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-200 dark:border-gray-700 flex items-center justify-center mt-10">
                <ul className="flex flex-wrap -mb-px">
                    <li className="me-2">
                        <Link to="/category/entertainment" className={`inline-block p-4 ${location.pathname === "/category/entertainment" || location.pathname === "/category" ? "text-blue-500 border-b-2 border-blue-600  dark:text-blue-100 dark:border-blue-100" : "text-gray-900 dark:text-gray-50 dark:border-none"} rounded-t-lg active`} >Entertainment</Link>
                    </li>
                    <li className="me-2">
                        <Link to="/category/education" className={`inline-block p-4 ${location.pathname === "/category/education" ? "text-blue-500 border-b-2 border-blue-600  dark:text-blue-100 dark:border-blue-100" : "text-gray-900 dark:text-gray-50 dark:border-none"} rounded-t-lg active`} >Education</Link>
                    </li>
                    <li className="me-2">
                        <Link to="/category/science" className={`inline-block p-4 ${location.pathname === "/category/science" ? "text-blue-500 border-b-2 border-blue-600  dark:text-blue-100 dark:border-blue-100" : "text-gray-900 dark:text-gray-50 dark:border-none"} rounded-t-lg active`} >Science</Link>
                    </li>
                    <li className="me-2">
                        <Link to="/category/foodndrinks" className={`inline-block p-4 ${location.pathname === "/category/foodndrinks" ? "text-blue-500 border-b-2 border-blue-600  dark:text-blue-100 dark:border-blue-100" : "text-gray-900 dark:text-gray-50 dark:border-none"} rounded-t-lg active`} >Food & Drinks</Link>
                    </li>
                    <li className="me-2">
                        <Link to="/category/technology" className={`inline-block p-4 ${location.pathname === "/category/technology" ? "text-blue-500 border-b-2 border-blue-600  dark:text-blue-100 dark:border-blue-100" : "text-gray-900 dark:text-gray-50 dark:border-none"} rounded-t-lg active`} >Technology</Link>
                    </li>
                    <li className="me-2">
                        <Link to="/category/coding" className={`inline-block p-4 ${location.pathname === "/category/coding" ? "text-blue-500 border-b-2 border-blue-600  dark:text-blue-100 dark:border-blue-100" : "text-gray-900 dark:text-gray-50 dark:border-none"} rounded-t-lg active`} >Coding</Link>
                    </li>
                </ul>
            </div>

        </div>
    )
}

export default CategoryNav