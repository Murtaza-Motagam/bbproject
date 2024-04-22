import React, { useState } from 'react'
import { MdFormatBold, MdFormatItalic } from "react-icons/md"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TextArea = ({ name, placeholder, value, onChange, errors, touched, theme, reference }) => {

    const [richTextValue, setRichTextValue] = useState(value[name]);

    const modules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ 'size': [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' },
            { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image', 'video'],
            ['clean']
        ],
    };

    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video'
    ];

    const handleTextChange = (value) => {
        setRichTextValue(value);
        onChange({ target: { name, value } });
    };

    const containerClasses = `text-gray-800 border-0 ${theme === "dark" ? 'bg-darkPrimary text-white' : ''}`;

    return (
        <div className="w-full mb-4 rounded-lg overflow-hidden font-arial">
            <div className="py-2 bg-white overflow-hidden dark:bg-darkPrimary">
                <ReactQuill
                    id={name}
                    value={richTextValue}
                    onChange={handleTextChange}
                    placeholder={placeholder}
                    modules={modules}
                    formats={formats}
                    className={containerClasses}
                    ref={reference}
                />
            </div>
            {errors[name] && touched[name] ? <p className="text-md text-white px-5 bg-red-500  rounded-b-lg py-4">{errors[name]}</p> : null}
        </div>
    )
}

export default TextArea