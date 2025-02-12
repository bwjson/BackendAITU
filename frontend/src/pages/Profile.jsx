import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [newData, setNewData] = useState({
        username: '',
        firstName: '',
        lastName: ''
    });
    const [isEditing, setIsEditing] = useState({
        username: false,
        firstName: false,
        lastName: false
    });

    useEffect(() => {
        axios.get('http://localhost:3000/api/v1/user/profile', {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then((response) => {
            setProfile(response.data);
            setNewData({
                username: response.data.username,
                firstName: response.data.firstName,
                lastName: response.data.lastName,
            });
        })
        .catch((err) => {
            console.log("Couldn't fetch profile", err);
            navigate("/signin"); // Redirect to login if token is invalid
        });
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSave = () => {
        axios.put('http://localhost:3000/api/v1/user/profile', newData, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then((response) => {
            setProfile((prevProfile) => ({
                ...prevProfile,
                ...newData
            }));
            setIsEditing({
                username: false,
                firstName: false,
                lastName: false
            }); // Stop editing once changes are saved
        })
        .catch((err) => {
            console.log("Couldn't update profile", err);
        });
    };

    const handleEdit = (field) => {
        setIsEditing((prevEditing) => ({
            ...prevEditing,
            [field]: true
        }));
    };

    if (!profile) return <div className="text-center">Loading...</div>;

    return (
        <div className="max-w-3xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-xl border border-gray-200">
            {/* Profile Picture Section */}
            <div className="flex items-center justify-center mb-6">
                <div className="w-32 h-32 rounded-full overflow-hidden">
                    <img 
                        src={profile.avatar || "/default_avatar.png"} // Use default avatar from the public folder
                        alt="Profile Avatar"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* Profile Info Section */}
            <h1 className="text-3xl font-semibold text-center text-gray-800">
                {isEditing.username ? (
                    <input 
                        type="text" 
                        name="username" 
                        value={newData.username} 
                        onChange={handleChange} 
                        className="border-b-2 border-gray-300 px-2 py-1 w-full text-center"
                    />
                ) : (
                    <>
                        {profile.username}
                        <button onClick={() => handleEdit('username')} className="ml-2 text-gray-500">
                        ✎
                        </button>
                    </>
                )}
            </h1>
            
            <div className="text-xl text-gray-600 mt-2 text-center">
                {/* First Name */}
                <div className="mb-4">
                    {isEditing.firstName ? (
                        <input 
                            type="text" 
                            name="firstName" 
                            value={newData.firstName} 
                            onChange={handleChange} 
                            className="border-b-2 border-gray-300 px-2 py-1 w-full text-center"
                        />
                    ) : (
                        <>
                            {profile.firstName}
                            <button onClick={() => handleEdit('firstName')} className="ml-2 text-gray-500">
                                ✎  
                            </button>
                        </>
                    )}
                </div>

                {/* Last Name */}
                <div className="mb-4">
                    {isEditing.lastName ? (
                        <input 
                            type="text" 
                            name="lastName" 
                            value={newData.lastName} 
                            onChange={handleChange} 
                            className="border-b-2 border-gray-300 px-2 py-1 w-full text-center"
                        />
                    ) : (
                        <>
                            {profile.lastName}
                            <button onClick={() => handleEdit('lastName')} className="ml-2 text-gray-500">
                                ✎
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Join Date Section */}
            <div className="mt-6">
                <div className="flex flex-col items-center justify-center text-center">
                    <p className="text-lg text-gray-700">Joined: <span className="font-semibold">12.03.2023</span></p>
                </div>
            </div>

            {/* Save Button */}
            {(isEditing.username || isEditing.firstName || isEditing.lastName) && (
                <div className="text-center mt-4">
                    <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-full">Save Changes</button>
                </div>
            )}
        </div>
    );
};

export default Profile;
