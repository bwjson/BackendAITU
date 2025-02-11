import React from 'react'
import { Spinner } from "flowbite-react";

const Loader = () => {
    return (
        <div className='flex justify-center items-center'>
            <Spinner aria-label="Spinner button example" size="sm" />
            <span className="pl-3">Loading...</span>
        </div>
    )
}

export default Loader