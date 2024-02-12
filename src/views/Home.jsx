import React from "react";
import Postfilter from "./PostFilter";

const Home = () => {
  return (
    <div className="mt-[80px]  bg-gray-100 ">
      <div className="flex justify-between container mx-auto">
        <div class="w-full lg:w-8/12">
          <div class="flex items-center justify-between">
            <h1 class="text-xl font-bold text-gray-700 md:text-2xl">Post</h1>
            <Postfilter />
          </div>
          <div class="mt-6">
            <post></post>
          </div>
          <div class="mt-8">pages</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
