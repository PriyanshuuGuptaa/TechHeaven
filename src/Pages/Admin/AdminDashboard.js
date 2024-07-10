import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../Context/authContext'
import "./Dashboard.css";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';



const AdminDashboard = () => {
    const [auth, setAuth] = useAuth();
    const buttons = [
        <Button key="one" sx={{ borderColor: 'black' }}>
            <Link to="/dashboard/admin/create-category" style={{ textDecoration: "none", color: 'black' }} >Create Category</Link>
        </Button>,
        <Button key="two" sx={{ borderColor: 'black' }}>

            <Link to="/dashboard/admin/create-product" style={{ textDecoration: "none", color: 'black' }}>Create Product</Link>
        </Button>,
        <Button key="three" sx={{ borderColor: 'black' }}>

            <Link to="/dashboard/admin/products" style={{ textDecoration: "none", color: 'black' }}>Products</Link>
        </Button>,
        <Button key="four" sx={{ borderColor: 'black' }}>
            <Link to="/dashboard/admin/users" style={{ textDecoration: "none", color: 'black' }}>Users</Link>
        </Button>


    ];

    return (
        <div className='admin-dashboard-container'>
            <h1>ADMIN DASHBOARD</h1>
            <div >
                <div className='admin-menu'>
                    <ButtonGroup size="large" aria-label="Large button group" >
                        {buttons}
                    </ButtonGroup>

                </div>
                <div className='admin-details'>
                    <h3>Username = {auth?.user?.name}</h3>
                    <h3>Email address = {auth?.user?.email}</h3>
                    <h3>Address = {auth?.user?.address}</h3>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard;