import logo from "../Assets/logo.png";
import "./Navbars.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Badge from '@mui/material/Badge';
import { useAuth } from "../Context/authContext";
import { toast } from "react-toastify";
import { useCart } from "../Context/cartContext";
import { useWishList } from "../Context/wishListContext";
import SearchInput from "./SearchInput";
import { motion } from "framer-motion"





function Navbars({ state, dispatch }) {
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

  const [mobileNavOpen, setMobileNavOpen] = useState(false);


  const hideNavItemsVariant = {
    opened: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    },
    closed: {
      opacity: 1,
      y: "0%",
      transition: {
        delay: 1.1,
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  }

  const mobileMenuVariant = {
    opened: {
      y: "0%",
      transition: {
        delay: 0.15,
        duration: 1.1,
        ease: [0.74, 0, 0.19, 1.02]
      }
    },
    closed: {
      y: "-100%",
      transition: {
        delay: 0.35,
        duration: 0.63,
        ease: [0.74, 0, 0.19, 1.02]
      }
    }
  }

  const fadeInVariant = {
    opened: {
      opacity: 1,
      transition: {
        delay: 1.2
      }
    },
    closed: { opacity: 0 }
  }

  const ulVariant = {
    opened: {
      transition: {
        delayChildren: 1,
        staggerChildren: 0.18
      }
    },
    closed: {
      transition: {
        staggerChildren: 0.06,
        staggerDirection: -1
      }
    }
  }

  const liVariant = {
    opened: {
      opacity: 1,
      y: "0%",
      transition: {
        duration: 0.65,
        ease: "easeOut"
      }
    },
    closed: {
      opacity: 0,
      y: "100%",
      transition: {
        duration: 0.25,
        ease: "easeInOut"
      }
    }
  }

  const fadeInStart = { opacity: 0 }
  const fadeInEnd = { opacity: 1 }
  const fadeInTransition = { duration: 1 }


  return (
    <div className="navbar-container">
      <div className="nav-menu">
        <motion.nav
          initial="closed"
          animate={mobileNavOpen ? "opened" : "closed"}
        >

          <div className="menu-container">
            <motion.div
              variants={hideNavItemsVariant}
              onClick={() => setMobileNavOpen(true)}
            >
              <p> Menu </p>
            </motion.div>
          </div>
          <motion.div variants={mobileMenuVariant} className="mobile-menu">
            <motion.button
              variants={fadeInVariant}
              onClick={() => setMobileNavOpen(false)}
              id="close-btn"
            >
              X
            </motion.button>
            <motion.ul variants={ulVariant}>
              <motion.li whileTap={{ scale: 0.95 }} >
                <motion.div variants={liVariant}>
                  <Link to="/" className="link">
                    <button onClick={() => setMobileNavOpen(false)} >
                      Home
                    </button>
                  </Link>
                </motion.div>
              </motion.li>
              <motion.li whileTap={{ scale: 0.95 }}>
                <motion.div variants={liVariant}>
                  <Link to="/products" className="link">
                    <button onClick={() => {
                      dispatch({ type: "CLEAR_ALL_FILTERS", payload: state.products });
                      setMobileNavOpen(false)
                    }}>
                      Products
                    </button>
                  </Link>
                </motion.div>
              </motion.li>

              {!auth.user ? (
                <>
                  <motion.li whileTap={{ scale: 0.95 }}>

                    <motion.div variants={liVariant}>
                      <Link to="/register">
                        <button onClick={() => { setMobileNavOpen(false) }
                        }>
                          Register
                        </button>
                      </Link>
                    </motion.div>
                  </motion.li>

                  <motion.li whileTap={{ scale: 0.95 }}>
                    <motion.div variants={liVariant}>
                      <Link to="/login">
                        <button onClick={() => {
                          setMobileNavOpen(false)
                        }}>
                          Login
                        </button>
                      </Link>
                    </motion.div>
                  </motion.li>
                </>
              ) : (<>
                <motion.li whileTap={{ scale: 0.95 }}>
                  <motion.div variants={liVariant}>
                    <Link to="/Cart">
                      <button onClick={() => {
                        setMobileNavOpen(false);
                      }}>
                        Cart
                      </button>
                    </Link>
                  </motion.div>
                </motion.li>
                <motion.li whileTap={{ scale: 0.95 }}>
                  <motion.div variants={liVariant}>
                    <Link to="/Wishlist">
                      <button onClick={() => {
                        setMobileNavOpen(false);
                      }}>
                        Wishlist
                      </button>
                    </Link>
                  </motion.div>
                </motion.li>
                <motion.li whileTap={{ scale: 0.95 }}>
                  <motion.div variants={liVariant}>
                    <Link to={`/dashboard/${auth?.user?.role === "admin" ? "admin" : "user"}`} >
                      <button onClick={() => {
                        setMobileNavOpen(false)
                      }}>
                        Dashboard
                      </button>
                    </Link>
                  </motion.div>
                </motion.li>

                <motion.li whileTap={{ scale: 0.95 }}>
                  <motion.div variants={liVariant}>
                    <Link to="/">
                      <button onClick={() => {
                        setMobileNavOpen(false);
                        handleLogOut();
                      }}>
                        Logout
                      </button>
                    </Link>
                  </motion.div>
                </motion.li>
              </>
              )}

            </motion.ul>
          </motion.div>
        </motion.nav>

        <motion.div
          initial={fadeInStart}
          animate={fadeInEnd}
          transition={fadeInTransition}
          className="img-container"
        >
        </motion.div>
      </div>
      <div className="logo">
        <Link to="/" className="link">
          <img src={logo} alt="logo"></img>

        </Link>
      </div>



      <div className="userwishlistcart">
        <div>
          <SearchInput state={state} dispatch={dispatch} />
        </div>

        <div className="icon">
          <Link to="/WishList" >
            <Badge badgeContent={wishList?.length} color="white" sx={{ margin: 0 }}>
              <p><FavoriteBorderOutlinedIcon className="i" sx={{ height: 20, color: "black" }} /></p>
            </Badge>
          </Link>
        </div>
        <div className="icon">
          <Link to="/Cart" >
            <Badge badgeContent={cart?.length} color="white" sx={{ margin: 0, zIndex: 2 }}>
              <p> <ShoppingCartOutlinedIcon className="i" sx={{ height: 20, color: "black" }} /></p>
            </Badge>
          </Link>
        </div>

      </div>

    </div >
  );
}
export default Navbars;
