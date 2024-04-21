import React from 'react'

const Input = ({ labelName, name, placeholder, value, type, onChange, errors, touched }) => {
    return (
        <div className="h-28 flex flex-col items-start justify-start w-full text-lg space-y-4 dark:text-gray-200">
            <input
                type={type}
                value={value[name]}
                name={name}
                onChange={onChange}
                autoComplete="off"
                className="w-full px-3 py-4 bg-none border-b-2 border-gray-700 focus:outline-none focus:border-black  text-gray-900 dark:text-gray-100 dark:bg-darkPrimary dark:border-gray-200"
                placeholder={placeholder}
            />

            {errors[name] && touched[name]? <p className="text-md text-red-500 ml-2">{errors[name]}</p> : null }
        </div>
    )
}

export default Input