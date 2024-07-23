import React, { useState } from 'react'
import "./register.css";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Button } from "@mui/material";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const [role, setRole] = useState("");
  const [roleBtn, setRoleBtn] = useState("You are :");
  const navigate = useNavigate();


  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`https://techheaven-backend.onrender.com/api/v1/auth/register`,
        { username, email, password, number, address, answer, role })
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

    <form className='register-container' onSubmit={handleSubmit}>
      <label>REGISTER</label>
      <input type='textbox' placeholder='Username' required='true' value={username} onChange={(e) => {
        setUsername(e.target.value);
      }} className='register-input'></input>
      <input type='textbox' placeholder='Email address' required='true' value={email} onChange={(e) => {
        setEmail(e.target.value);
      }} className='register-input'></input>
      <input type='password' placeholder='Password' required='true' value={password} onChange={(e) => {
        setPassword(e.target.value);
      }} className='register-input'></input>
      <input type='textbox' placeholder='Phone number' required='true' value={number} onChange={(e) => {
        setNumber(e.target.value);
      }} className='register-input'></input>
      <input type='textbox' placeholder='Address' required='true' value={address} onChange={(e) => {
        setAddress(e.target.value);
      }} className='register-input'></input>
      <input type='textbox' placeholder='What is your favorite sport' required='true' value={answer} onChange={(e) => {
        setAnswer(e.target.value);
      }} className='register-input'></input>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {roleBtn}

      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>
          <Button id="basic-button" onClick={() => { setRole("admin"); setRoleBtn("Admin") }}>
            Admin
          </Button>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Button id="basic-button" onClick={() => { setRole("user"); setRoleBtn("User") }}>
            User
          </Button>
        </MenuItem>
      </Menu>

      <button>Register</button>
    </form>
  )
}

export default Register;