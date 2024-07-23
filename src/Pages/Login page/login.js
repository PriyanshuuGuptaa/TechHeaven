import React, { useState } from 'react';
import "./login.css";
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/authContext';


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`https://techheaven-backend.onrender.com/api/v1/auth/login`,
                { email, password })
            if (res.data.success) {
                toast.success(res.data.message);

                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                });
                const { token, user } = res.data;
                localStorage.setItem("token", token);
                localStorage.setItem("email", user.email);
                localStorage.setItem("userId", user._id);
                localStorage.setItem("name", user.name);

                localStorage.setItem("auth", JSON.stringify(res.data));
                navigate("/");

            }

            else {
                toast.error(res.data.message);
            }
        } catch (error) {

            toast.error("Something went wrong!");
        }
    }
    return (
        <div>
            <form className='login-container' onSubmit={handleSubmit}>
                <label>LOGIN</label>
                <input type='textbox' placeholder='Email address' required='true' value={email} onChange={(e) => {
                    setEmail(e.target.value);
                }} className='login-input'></input>
                <input type='password' placeholder='Password' required='true' value={password} onChange={(e) => {
                    setPassword(e.target.value);
                }} className='login-input'></input>
                <button type="submit">Login</button>
                <button type="button" onClick={() => { navigate("/forgotPassword") }}>Forgot Password ?</button>
            </form>
        </div>
    )
}

export default Login;