import React, { useState } from 'react'
import "./login.css";
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setnewPassword] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`http://localhost:8080/api/v1/auth/forgotPassword`,
                { email, newPassword, answer })
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/login");
            }

            else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong!");
        }
    }
    return (
        <div>
            <form className='login-container' onSubmit={handleSubmit}>
                <label>FORGOT PASSWORD</label>
                <input type='textbox' placeholder='Email address' required='true' value={email} onChange={(e) => {
                    setEmail(e.target.value);
                }}></input>
                <input type='textbox' placeholder='Enter your favorite sport' required='true' value={answer} onChange={(e) => {
                    setAnswer(e.target.value);
                }}></input>
                <input type='password' placeholder='Enter New Password' required='true' value={newPassword} onChange={(e) => {
                    setnewPassword(e.target.value);
                }}></input>
                <button type="submit">Change password</button>
            </form>
        </div>
    )
}

export default ForgotPassword;