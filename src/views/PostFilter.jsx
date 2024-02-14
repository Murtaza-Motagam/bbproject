import React from "react";

const Postfilter = () => {
  return (
    <div>
      <div>
        <select className="block bg-gray-300 mt-3 text-gray-700 py-2 px-2 rounded-lg focus:outline-none md:py-3">
          <option>Latest</option>
          <option>Last Week</option>
        </select>
      </div>
    </div>
  );
};

export default Postfilter;
