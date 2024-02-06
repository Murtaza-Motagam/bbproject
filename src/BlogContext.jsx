import React, { createContext, useState } from 'react';
import axios from 'axios';

// Create a new context
const BlogContext = createContext();

// Create a provider component
const BlogProvider = ({ children }) => {
    // Define your state or any other data here
    const [blogs, setBlogs] = useState([]);

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

    return (
        <BlogContext.Provider value={{ blogs, uploadProfilePic }}>
            {children}
        </BlogContext.Provider>
    );
};

export { BlogContext, BlogProvider };
