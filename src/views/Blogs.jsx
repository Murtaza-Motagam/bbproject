import React from "react";
import Postfilter from "./PostFilter";

const Blogs = () => {
  return (
    <div className="mt-[80px]  bg-gray-100 ">
      <div className="flex justify-between container mx-auto">
        <div className="w-full  ">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-700 md:text-2xl">
              Posts
            </h1>
            <Postfilter />
          </div>

          <div class="mt-6 ">
            {" "}
            <div class="max-w-4xl px-10 py-6 bg-white rounded-lg shadow-md ">
              <div class="flex justify-between items-center">
                <span class="font-light text-gray-600 ">Date</span>
                <a
                  class="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500"
                  href="#"
                >
                  Categories
                </a>
              </div>
              <div class="mt-2">
                <a
                  class="text-2xl text-gray-700 font-bold hover:underline"
                  href="#"
                >
                  Title
                </a>
                <p class="mt-2 text-gray-600">Body</p>
              </div>
              <div class="flex justify-between items-center mt-4">
                <a class="text-blue-500 hover:underline">Read more</a>
                <div>
                  <a class="flex items-center" href="#">
                    <img
                      class="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
                      src="data.image"
                      alt="avatar"
                    />
                    <h1 class="text-gray-700 font-bold hover:underline">
                      UserNAme
                    </h1>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-8">pages</div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
