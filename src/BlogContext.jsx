import React, { createContext, useState } from 'react';
import axios, { formToJSON } from 'axios';
import { authUrl, blogUrl, userUrl } from "./utils/constant";

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
    const [info, setInfo] = useState([]);

    // other user states
    const [userBlogData, setUserBlogData] = useState([]);
    const [navDetails, setNavDetails] = useState([]);
    const [check, setCheck] = useState(false);
    const [following, setFollowing] = useState(false);


    const [secData, setSecData] = useState([]);
    const [terryData, setTerryData] = useState([])

    const [getUserId, setGetUserId ] = useState(null);

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
        setInfo([json.userInfo])
        setGetUserId(json.userInfo._id);
    }

    const getActiveUser = async () => {
        const response = await fetch(`${authUrl}/getuser`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'user-token': localStorage.getItem('user-token')
            }
        });

        const json = await response.json();
        setInfo([json.userInfo])
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


    const setOtherUserDetails = async (data) => {

        const { link, desc, location } = data;

        const response = await fetch(`${authUrl}/addfellowdetails`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'user-token': localStorage.getItem('user-token')
            },
            body: JSON.stringify({ link, desc, location })
        });

        const json = await response.json();
    }

    const getNavDetail = async () => {

        const response = await fetch(`${userUrl}/getnavdetails`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'user-token': localStorage.getItem('user-token')
            }
        });

        const json = await response.json();
        setSecData([json])
        // console.log(json)
    }

    const fetchSingleBlog = async (id) => {
        const response = await fetch(`${blogUrl}/getblog/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'user-token': localStorage.getItem('user-token')
            }
        });

        const json = await response.json();
        setBlogs([json.blogs])
        // console.log(json.blogs)
    }

    const fetchAllBlog = async () => {
        const response = await fetch(`${blogUrl}/fetchallblogs`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();
        setBlogs(json)
    }

    const getSearchedUserDetails = async (id) => {
        const response = await fetch(`${userUrl}/finduser/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'user-token': localStorage.getItem('user-token')
            }
        });

        const json = await response.json();
        setUserBlogData(json.searchedUserBlogs)
        setData([json.searchedUser])
    }

    const getSearchedUserNavdetails = async (id) => {
        const response = await fetch(`${userUrl}/finduser/navdetails/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'user-token': localStorage.getItem('user-token')
            }
        });

        const json = await response.json();
        setNavDetails([json])
    }

    const fetchAllUsers = async () => {
        const response = await fetch(`${authUrl}/getallusers`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'user-token': localStorage.getItem('user-token')
            }
        });

        const json = await response.json();
        setData(json.getAllUsers);

    }
    return (
        <BlogContext.Provider value={{ data, info, userBlogData, getUserId, secData, navDetails, blogs, terryData, check, following, uploadProfilePic, getUser, getUserBlogs, setOtherUserDetails, getNavDetail, fetchSingleBlog, fetchAllBlog, getSearchedUserDetails, getSearchedUserNavdetails, fetchAllUsers, getActiveUser }}>
            {children}
        </BlogContext.Provider>
    );
};

export { BlogContext, BlogProvider };
