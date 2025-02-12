import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "../components/AppBar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import axios from "axios";

const Dashboard = () => {
    const navigate = useNavigate();
    const [balance, setBalance] = useState();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            // If token is missing, redirect to sign-in page
            navigate("/signin");
            return;
        }

        axios.get('http://localhost:3000/api/v1/account/balance', {
            headers: {
                Authorization: "Bearer " + token
            }
        })
            .then((response) => {
                setBalance(parseFloat(response.data.balance).toFixed(2));
            })
            .catch((err) => {
                console.log('Couldn’t find balance ' + err.message);
                // Redirect to sign-in if token is invalid or any other error occurs
                navigate("/signin");
            });
    }, [navigate]);

    return (
        <div className="mx-auto sm:w-[80%] mt-16">
            <AppBar />
            <Balance value={balance} />
            <Users />
        </div>
    );
};

export default Dashboard;
