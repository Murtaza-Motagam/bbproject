import React from "react";
import Postfilter from "./PostFilter";

const Blogs = ({ theme }) => {
  return (
    <div className={`${theme === 'dark' ? 'dark' : 'light'}`}>
      <div className="mt-[80px]  bg-gray-100 ">
        <div className="flex justify-between container mx-auto">
          <div className="w-full  ">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold text-gray-700 md:text-2xl">
                Posts
              </h1>
              <Postfilter />
            </div>

            <div className="mt-6 ">
              {" "}
              <div className="max-w-4xl px-10 py-6 bg-white rounded-lg shadow-md ">
                <div className="flex justify-between items-center">
                  <span className="font-light text-gray-600 ">Date</span>
                  <a
                    className="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500"
                    href="#"
                  >
                    Categories
                  </a>
                </div>
                <div className="mt-2">
                  <a
                    className="text-2xl text-gray-700 font-bold hover:underline"
                    href="#"
                  >
                    Title
                  </a>
                  <p className="mt-2 text-gray-600">Body</p>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <a className="text-blue-500 hover:underline">Read more</a>
                  <div>
                    <a className="flex items-center" href="#">
                      <img
                        className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
                        src="data.image"
                        alt="avatar"
                      />
                      <h1 className="text-gray-700 font-bold hover:underline">
                        UserNAme
                      </h1>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">pages</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
