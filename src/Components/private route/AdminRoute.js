import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Context/authContext';
import axios from 'axios';
import Spinner from '../Spinner/Spinner';
import AdminDashboard from '../../Pages/Admin/AdminDashboard';
const AdminRoute = () => {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();
    useEffect(() => {
        const authCheck = async () => {
            const res = await axios.get("https://techheaven-backend.onrender.com/api/v1/auth/admin-auth");
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


    return ok ? <AdminDashboard /> : <Spinner />

}

export default AdminRoute