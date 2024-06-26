import logo from "../Assets/TechHaven images/logo.png";
import "./Navbars.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { FaRegUser } from "react-icons/fa";
import Badge from '@mui/material/Badge';
import { useAuth } from "../Context/authContext";
import { toast } from "react-toastify";
import { useCart } from "../Context/cartContext";
import { useWishList } from "../Context/wishListContext";
import SearchInput from "./SearchInput";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Button } from "@mui/material";


function Navbars({ searchbtn, state, dispatch }) {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const [wishList] = useWishList();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const handleLogOut = () => {
    setAuth({
      ...auth,
      user: null,
      token: ""
    })
    localStorage.removeItem("auth");
    toast.success("Logout successful");
  }
  const name = localStorage.getItem("name");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="navbar-container">
      <div className="logo">
        <Link to="/" className="link">
          <img src={logo} alt="logo"></img>
        </Link>
      </div>

      <div className="navlink-container">

        <Link to="/" className="link">
          <Button id="basic-button">
            Home
          </Button>
        </Link>

        <Link to="/products" className="link">
          <Button id="basic-button">
            Products
          </Button>
        </Link>

        {!auth.user ? (
          <>
            <Link to="/register">
              <Button id="basic-button">
                Register
              </Button>
            </Link>
            <Link to="/login">
              <Button id="basic-button">
                Login
              </Button>
            </Link>
          </>
        ) : (

          <div className="dropdowncategories">

            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              Dashboard
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
                <Link to={`/dashboard/${auth?.user?.role === "admin" ? "admin" : "user"}`} >
                  <Button id="basic-button">
                    Dashboard
                  </Button></Link>
              </MenuItem>
              <MenuItem onClick={handleClose}><Link to="/" onClick={handleLogOut}>
                <Button id="basic-button">
                  Logout
                </Button>
              </Link></MenuItem>
            </Menu>
          </div>

        )}
      </div>


      <div className="searchbox">
        <SearchInput state={state} dispatch={dispatch} />
      </div>

      <div className="userwishlistcart">
        <Link to="/Dashboard" className="link usericons">
          <p> <PersonOutlineOutlinedIcon sx={{ height: 24 }} /></p>
        </Link>

        <Link to="/WishList" className="link icon">
          <Badge badgeContent={wishList?.length} color="primary" sx={{ margin: 0 }}>
            <p><FavoriteBorderOutlinedIcon sx={{ height: 22 }} /></p>
          </Badge>

        </Link>
        <Link to="/Cart" className="link icon">
          <Badge badgeContent={cart?.length} color="primary" sx={{ margin: 0 }}>
            <p> <ShoppingCartOutlinedIcon sx={{ height: 20 }} /></p>
          </Badge>
        </Link>

      </div>
    </div >
  );
}
export default Navbars;
