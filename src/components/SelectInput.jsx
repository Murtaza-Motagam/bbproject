import React from 'react';

const SelectInput = ({ name, value, onChange, labelName }) => {
    return (
        <div className="mb-5 w-full space-y-3">

            <label className="text-lg space-y-4 dark:text-gray-200 text-md mb-3">{labelName}</label>
            <select onChange={onChange} name={name} value={value[name]} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option defaultValue="education">Education</option>
                <option value="enterntainment">Enterntainment</option>
                <option value="science">Science</option>
                <option value="food_drinks">Food & Drinks</option>
                <option value="technology">Technology</option>
                <option value="coding">Coding</option>
            </select>


        </div>
    );
};

export default SelectInput;
