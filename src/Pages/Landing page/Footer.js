import React from "react";
import "./Footer.css";
import logo from "../../Assets/TechHaven images/logo.png";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="left">
        <div className="logoandname">
          <img src={logo} alt="logo"></img>

          <h2>TechHeaven</h2>
        </div>
        <p>Made by PRIYANSHU GUPTA</p>
        <div className="contacticons">
          <ul>
            <li>
              <a href="https://www.linkedin.com/in/priyanshu-gupta-4a649a230/" target="/">
                <FaLinkedin />
              </a>

            </li>
            <li>
              <a href="https://github.com/PriyanshuuGuptaa" target="/">
                <FaGithub />
              </a>
            </li>

            <li>
              <a href="https://www.instagram.com/priynshuguptaa/" target="/">
                <FaInstagram />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="middle">
        <p>My Account</p>
        <div className="myaccountlist">
          <ul>
            <li>
              <Link to="/dashboard" className="link">
                Dashboard
              </Link>
            </li>

            <li>
              <Link to="/Cart" className="link">
                Cart
              </Link>
            </li>
            <li>
              <Link to="/wishlist" className="link">
                Wishlist
              </Link>
            </li>

          </ul>
        </div>
      </div>
      <div className="right">
        <p>Pages</p>
        <div className="pageslist">
          <ul>
            <li>
              <Link to="/" className="link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="link">
                Products
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
