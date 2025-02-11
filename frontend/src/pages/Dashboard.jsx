import { useEffect, useState } from "react"
import AppBar from "../components/AppBar"
import Balance from "../components/Balance"
import Users from "../components/Users"
import axios from "axios"

const Dashboard = () => {

    const [balance, setBalance] = useState();

    useEffect(() => {
        axios.get('http://localhost:3000/api/v1/account/balance', {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
            .then((response) => {
                setBalance(parseFloat(response.data.balance).toFixed(2));
            })
            .catch((err) => {
                console.log('couldnt find balance ' + err.message);
            })
    }, [])

    return (
        <div className="mx-auto sm:w-[80%] mt-16 ">
            <AppBar />
            <Balance value={balance} />
            <Users />
        </div>
    )
}

export default Dashboard