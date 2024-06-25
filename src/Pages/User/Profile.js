import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../Context/authContext'
import "./userDashboard.css";
import { Button, ButtonGroup } from '@mui/material';
const Profile = () => {
    const [auth, setAuth] = useAuth();
    const buttons = [
        <Button key="one" sx={{ borderColor: 'black' }}>
            <Link to="/dashboard/user/profile" style={{ textDecoration: "none", color: 'black' }} >Profile</Link>
        </Button>,
        <Button key="two" sx={{ borderColor: 'black' }}>

            <Link to="/dashboard/user/orders" style={{ textDecoration: "none", color: 'black' }}>Orders</Link>
        </Button>,

    ];
    return (
        <div>
            <h1>USER DASHBOARD</h1>
            <div className='user-dashboard-container'>
                <div className='user-menu'>
                    <ButtonGroup size="large" aria-label="Large button group" >
                        {buttons}
                    </ButtonGroup>

                </div>
                <div className='profile-details'>
                    <h3>Username = {auth?.user?.name}</h3>
                    <h3>Email = {auth?.user?.email}</h3>
                    <h3>Address = {auth?.user?.address}</h3>
                </div>
            </div>
        </div>
    )
}

export default Profile;