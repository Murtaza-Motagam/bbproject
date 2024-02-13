import React from "react";

const Postfilter = () => {
  return (
    <div>
      <div>
        <select class="block bg-gray-300 text-gray-700 py-2 px-2 rounded-lg focus:outline-none md:py-3">
          <option>Latest</option>
          <option>Last Week</option>
        </select>
      </div>
    </div>
  );
};

export default Postfilter;
