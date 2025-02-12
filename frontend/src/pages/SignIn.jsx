import { InputBox } from "../components/InputBox"
import { Heading } from "../components/Heading"
import { SubHeading } from '../components/SubHeading'
import { Button } from '../components/Button';
import { BottomWarning } from "../components/BottomWarning";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ToastNotification from "../components/ToastNotification";
import Loader from "../components/Loader";

const SignIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();


    const submitSignin = async () => {
        try {
            setLoading(true);
            const response = await axios.post('https://backendaitu.onrender.com/api/v1/user/signin', {
                username: email,
                password
            });

            if (response.data.token) {
                setSuccess(true);
                if (localStorage.getItem("token")) {
                    localStorage.removeItem("token");
                }
                localStorage.setItem("token", response.data.token);
                setTimeout(() => {
                    navigate('/dashboard');
                }, 1500)
            }
        } catch (err) {
            if (err.response && err.response.data) {
                console.log(err.response.data.message);
                setError(err.response.data.message);
            } else {
                setError('An error occurred. Please try again.');
            }
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex h-screen justify-center w-full items-center bg-gray-200 ">
            <div className="border bg-white flex flex-col rounded-lg lg:w-1/3 md:w-2/3 w-10/12">
                <div className="text-center">
                    <Heading label={"Sign In"} />
                    <SubHeading label={"Enter your credentials to access your account"} />
                </div>
                <div className="flex flex-col gap-2 md:px-12 px-6 md:py-6 py-4 border">

                    <InputBox onChange={e => setEmail(e.target.value)} type={"email"} placeholder={"khana65@gmail.com"} label={"Email"} className="w-full border rounded border-slate-200" />
                    <InputBox onChange={e => setPassword(e.target.value)} type={"password"} placeholder={"123456"} label={"Password"} className="w-full rounded" />

                    <Button onClick={submitSignin} className="w-full mt-4" >
                        {loading ? <Loader /> : "Sign In"}
                    </Button>

                    <BottomWarning label={"Sign Up"} disabled={loading} bottomText={"Don't have an account?"} to={"/signup"} />
                </div>
            </div>
            <div className="absolute bottom-5 right-5">
                {error ? (<ToastNotification variant={"error"} message={error} />) : ''}
                {success ? (<ToastNotification variant={"success"} message={"Signup Successful! "} />) : ''}
            </div>
        </div>
    )
}

export default SignIn