import React, { createContext, useState } from 'react';
import axios from 'axios';
import { authUrl, blogUrl } from "./utils/constant";

// Create a new context
const BlogContext = createContext();

// port defined

const portAdmin = "http://localhost:5000/api/admin";
const portUser = "http://localhost:5000/api/auth";
const portBlogs = "http://localhost:5000/api/blogs";

// Create a provider component
const BlogProvider = ({ children }) => {
    // Define your state or any other data here
    const [blogs, setBlogs] = useState([]);
    const [data, setData] = useState([]);
    const [admin, setAdmin] = useState([]);

    // Route-1: Add a profile picture

    const uploadProfilePic = async (file) => {
        try {
            const response = await axios.post("http://localhost:5000/api/auth/upload", file, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Set correct content type
                }
            });

            setBlogs(response);

        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const getUser = async () => {
        const response = await fetch(`${authUrl}/getuser`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'user-token': localStorage.getItem('user-token')
            }
        });

        const json = await response.json();
        setData([json.userInfo])
        // console.log([json.userInfo])
    }

    const getUserBlogs = async () => {
        const response = await fetch(`${blogUrl}/fetchuserblogs`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'user-token': localStorage.getItem('user-token')
            }
        });

        const json = await response.json();
        setBlogs(json)
        // console.log(json)
    }





    return (
        <BlogContext.Provider value={{ admin, data, blogs, uploadProfilePic, getUser, getUserBlogs }}>
            {children}
        </BlogContext.Provider>
    );
};

export { BlogContext, BlogProvider };
