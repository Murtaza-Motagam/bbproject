import React from "react";
import sideImg from "../assets/experience-img.png"

const Blogs = ({ theme }) => {
  return (
    <div className={`${theme === 'dark' ? 'dark' : 'light'}`}>
      <div className="max-w-[1500px] border border-gray-900 flex items-center justify-center mx-auto pt-20 roboto">
        <div className="w-1/2  flex items-center justify-center my-20 mx-auto">
          <img src={sideImg} alt="" />
        </div>
        <div className="w-1/2">
            <form className="flex flex-col items-start justify-start">
              <div className="mb-3 h-32 flex flex-col items-start justify-start w-full text-lg space-y-3">
              <label>Blog title</label>
              <input type="text" className="w-full px-3 py-3 bg-blue-100 border-none focus:outline-none focus:border-none rounded-md text-gray-700" />
              </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
