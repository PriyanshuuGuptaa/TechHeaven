import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Context/authContext';
import axios from 'axios';
import Spinner from '../Spinner/Spinner';
import UserDashboard from '../../Pages/User/userDashboard';
function UserRoute() {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();
    useEffect(() => {
        const authCheck = async () => {
            const res = await axios.get("https://techheaven-backend.onrender.com/api/v1/auth/user-auth");
            if (res.data.ok) {
                setOk(true);
            }
            else {
                setOk(false)
            }
        }
        if (auth?.token) authCheck();
    }, [auth?.token]

    )



    return ok ? <UserDashboard /> : <Spinner />

}

export default UserRoute;