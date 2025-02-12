import { Avatar } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const AppBar = () => {
    const navigate = useNavigate();

    return (
        <header className="border-b-2">
            <nav className="flex justify-between py-3 px-6">
                <div className="text-xl">Transaction App</div>
                <div className="flex items-center gap-4">
                    <div>Hello</div>
                    <Avatar 
                        placeholderInitials="U" 
                        rounded 
                        className="cursor-pointer"
                        onClick={() => navigate("/profile")}
                    />
                </div>
            </nav>
        </header>
    );
};

export default AppBar;
