import React from 'react'

const Input = ({ labelName, name, placeholder, value, type, onChange, errors, touched }) => {
    return (
        <div className="mb-3 h-32 flex flex-col items-start justify-start w-full text-lg space-y-4 dark:text-gray-200">
            <label>{labelName}</label>
            <input
                type={type}
                value={value[name]}
                name={name}
                onChange={onChange}
                autoComplete="off"
                className="w-full px-3 py-4 bg-blue-50 border-none focus:outline-none focus:border-none rounded-md text-gray-900 dark:text-gray-900"
                placeholder={placeholder}
            />

            {errors[name] && touched[name]? <p className="text-md text-red-500 ml-2">{errors[name]}</p> : null }
        </div>
    )
}

export default Input