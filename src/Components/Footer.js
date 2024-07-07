import React from "react";
import "./Footer.css";
import logo from "../Assets/logo.png";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { IoMdMailOpen } from "react-icons/io";


import { Link } from "react-router-dom";


import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer-section">
      <div className="row">
        <div className="single-cta">
          <MdLocationPin className="single-cta-icon" />
          <div className="cta-text">
            <h4>Find Us</h4>
            <span>New Delhi, India</span>
          </div>
        </div>
        <div className="single-cta">
          <IoCall className="single-cta-icon" />
          <div className="cta-text">
            <h4>Call Us</h4>
            <span>9953791918</span>
          </div>
        </div>
        <div className="single-cta">
          <IoMdMailOpen className="single-cta-icon" />
          <div className="cta-text">
            <h4>Mail Us</h4>
            <span>priyans</span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="footer-widget">
          <div className="footer-logo">
            <img src={logo} />
          </div>
          <div className="footer-text">
            <p>Explore top electronic devices at techHaeaven.<br /> Quality, savings, and innovation.
            </p>
            <div className="footer-social-icon">
              <span>Follow us</span>
              <div>
                <a><FaLinkedin className="i linkedIn" /></a>
                <a> <FaGithub className="i github" /></a>
                <a> <FaInstagram className="i instagram" /></a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-widget">
          <div className="footer-widget-heading">
            <h3>Useful Links</h3>
          </div>

          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/products">Product</a></li>
            <li><a href="/Cart">Cart</a></li>
            <li><a href="/Wishlist">Wishlist</a></li>
            <li><a href="/Dashboard">Dashboard</a></li>



          </ul>
        </div>
        <div className="footer-widget">
          <div className="footer-widget-heading">
            <h3>Feedback</h3>
          </div>
          <div className="footer-text">
            <p>Please take a moment to mail us your feedback.</p>
          </div>
          <div className="subscribe-form">
            <form action="#">
              <input type="text" placeholder="Email Address" />
              <button><FaTelegramPlane className="i" /></button>
            </form>
          </div>
        </div>
      </div>
      <div className="copyright-area">
        <p>Made by PRIYANSHU GUPTA</p>
      </div>

    </div>
  );
};

export default Footer;
