import React, { useContext, useEffect, useState } from 'react';
import { BlogContext } from '../BlogContext';

const Profile = () => {
    const [file, setFile] = useState(null);
    
    const context = useContext(BlogContext);
    const { blogs, uploadProfilePic } = context;
    

    const upload = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', file);

        uploadProfilePic(formData)


    };



    return (
        <div>
            {/* <form>
                <input type="file" name="file" onChange={(e) => setFile(e.target.files[0])} />
                <button type="submit" className="bg-gray-800 p-4 rounded text-lg text-white" onClick={upload}>Upload image</button>
            </form> */}
        </div>
    );
};

export default Profile;
