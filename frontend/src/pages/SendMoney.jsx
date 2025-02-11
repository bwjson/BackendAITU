import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/Button';
import { Heading } from '../components/Heading'
import { InputBox } from '../components/InputBox'
import { Avatar } from "flowbite-react";
import axios from 'axios';
import { useState } from 'react';
import ToastNotification from '../components/ToastNotification';
import Loader from '../components/Loader';

const SendMoney = () => {

    const { id, name } = useParams();
    const [amount, setAmount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const fundTransfer = async () => {
        try {
            setLoading(true);

            const response = await axios.post('http://localhost:3000/api/v1/account/transfer', {
                to: id,
                amount: amount
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
            setSuccess(response.data.message);
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);
        }
        catch (err) {
            if (err.response && err.response.data) {
                console.log(err.response.data.message);
                setError(err.response.data.message);
            }
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className="relative h-screen w-full bg-gray-100 flex justify-center items-center">
            <div className="border shadow-lg lg:w-1/3 md:w-[50%] w-[80%] px-16 py-4 bg-white">
                <div className='text-center mb-7'>
                    <Heading label={"Send Money"} />
                </div>
                <div className='flex items-center gap-4'>
                    <Avatar placeholderInitials={name[0].toUpperCase()} rounded size={"md"} />
                    <p className='text-md font-medium'>{name}</p>
                </div>
                <div className='my-4'>
                    <InputBox onChange={(e) => { setAmount(e.target.value) }} placeholder={"Enter amount"} label={"Amount (in Rs)"} className={"w-full rounded-md border-slate-300"} />

                    <Button onClick={fundTransfer} disabled={loading} className={"bg-green-400 hover:bg-green-500 w-full rounded-md my-4"} >
                        {loading ? <Loader /> : "Intiate Transfer"}
                    </Button>
                </div>
            </div>
            <div className='absolute top-5 right-5'>
                {error ? (<ToastNotification variant={"error"} message={error} />) : ''}
                {success ? (<ToastNotification variant={"success"} message={success} />) : ''}
            </div>
        </div>
    )
}

export default SendMoney