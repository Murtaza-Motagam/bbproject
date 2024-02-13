import React from 'react'
import "./loader.scss";
import { ClipLoader } from 'react-spinners';

const Loader = (props) => {
    return (
        <div>
            <div className="flex flex-col items-center justify-center mt-[30vh] gap-y-4">
                <span className="loader"></span>
                <h1 className="text-2xl flex flex-col items-center gap-y-1">
                    <span className="text-2xl">{props.message}</span>
                    <span className="text-lg">Please wait....</span>
                </h1>
            </div>
        </div>
    )
}

export default Loader