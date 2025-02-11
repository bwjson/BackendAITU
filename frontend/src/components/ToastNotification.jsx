import { Toast } from "flowbite-react";
import React from "react";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";


const variantStyles = {
    success: {
        icon: <HiCheck className="h-5 w-5" />,
        bgColor: "bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200",
    },
    error: {
        icon: <HiX className="h-5 w-5" />,
        bgColor: "bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200",
    },
    warning: {
        icon: <HiExclamation className="h-5 w-5" />,
        bgColor: "bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200",
    },
};

const ToastNotification = ({ variant, message }) => {

    const { icon, bgColor } = variantStyles[variant] || variantStyles.success;

    return (
        <Toast>
            <div className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${bgColor}`}>
                {icon}
            </div>
            <div className="ml-3 text-sm font-normal">{message}</div>
            <Toast.Toggle />
        </Toast>
    );
}

export default ToastNotification