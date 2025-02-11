import { InputBox } from './InputBox'
import { Avatar } from "flowbite-react";
import { Button } from './Button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useDebonceValue from '../hooks/useDebonceValue';

const Users = () => {

    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState('');
    const debounceFilter = useDebonceValue(filter, 500);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/api/v1/user/bulk?filter=' + debounceFilter)
            .then((response) => {
                setUsers(response.data.user);
            })
    }, [debounceFilter])

    return (
        <div className="mt-5 px-6">
            <div>
                <div className="text-md font-medium">Users</div>
                <InputBox onChange={(e) => setFilter(e.target.value)} placeholder={"Search users..."} className={"rounded-md w-full"} />

            </div>
            <div className='mt-5'>

                {/* mapping users to the frontend */}
                {users.map(user => (
                    <div className='flex justify-between items-center' key={user['_id']}>
                        <div className='flex items-center gap-4 py-4'>
                            <Avatar placeholderInitials={user['firstName'][0].toUpperCase()} rounded />
                            <p className='text-md font-medium'>{user['firstName'] + ' ' + user['lastName']}</p>
                        </div>
                        <Button onClick={() => { navigate(`/send/${user['_id']}/${user['firstName']}`) }} className={"rounded-md hover:bg-gray-900"} >{"Send Money"}</Button>
                    </div>
                ))}


            </div>
        </div>
    )
}

export default Users