import { Avatar } from "flowbite-react";

const AppBar = () => {
    return (
        <header className="border-b-2">
            <nav className="flex justify-between py-3 px-6 ">
                <div className="text-xl">Transaction App</div>
                <div className="flex items-center gap-4">
                    <div>Hello</div>
                    <Avatar placeholderInitials="U" rounded />
                </div>
            </nav>
        </header>
    )
}

export default AppBar