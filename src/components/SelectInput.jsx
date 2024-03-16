import React, { useState } from 'react';

const SelectInput = ({ name, value, onChange, labelName }) => {
    const [open, setOpen] = useState(false);

    const handleItemClick = (item) => {
        onChange(item);
        setOpen(false);
    };

    return (
        <div className="mb-5 w-full space-y-3">

            <label className="text-lg space-y-4 dark:text-gray-200 text-md mb-3">{labelName}</label>

            <button onClick={() => setOpen(!open)} className="text-gray-900 bg-gray-100 hover:bg-gray-200 w-full focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-700 dark:text-gray-200" type="button">
                {value[name] || 'Dropdown button'}
                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
            </button>

            {open && (
                <div className="z-99 mt-3 bg-white divide-y divide-gray-100 rounded-lg shadow w-full dark:bg-gray-700">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                        <li onClick={() => handleItemClick('Education')} className="hover:bg-gray-100 cursor-pointer">
                            <span className="block px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Education</span>
                        </li>
                        <li onClick={() => handleItemClick('Entertainment')} className="hover:bg-gray-100 cursor-pointer">
                            <span className="block px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Entertainment</span>
                        </li>
                        <li onClick={() => handleItemClick('Science')} className="hover:bg-gray-100 cursor-pointer">
                            <span className="block px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Science</span>
                        </li>
                        <li onClick={() => handleItemClick('Coding')} className="hover:bg-gray-100 cursor-pointer">
                            <span className="block px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Coding</span>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SelectInput;
