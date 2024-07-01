import React from "react";
import "./Home.css";
import bestcollection from "../../Assets/TechHaven images/bestcollection.png";
import bgimg from "../../Assets/TechHaven images/background.jpg";
import { Link } from "react-router-dom";
import mobiletype from "../../Assets/TechHaven images/mobiletype.png";
import laptoptype from "../../Assets/TechHaven images/laptoptype.png";
import watchtype from "../../Assets/TechHaven images/watchtype.png";
import headsettype from "../../Assets/TechHaven images/headsettype.png";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { CiPercent } from "react-icons/ci";
import { FaHeadphonesAlt } from "react-icons/fa";
import ProductCard from "../../Components/ProductCard";
import bannerimage from "../../Assets/TechHaven images/bannerimage.png";
import { useAuth } from "../../Context/authContext";
function Home({ state, dipatch }) {
  const [auth, setAuth] = useAuth();

  return (
    <div className="home-container">


      <div className="bestcollection">
        <img src={bgimg} className="fade-in-top" />
        {/* <p className="focus-in-expand">Best collection of <br />technical products </p> */}

      </div>

      <div className="featuredproducts">
        <h3>TOP PRODUCTS</h3>
        <div className="product">

          {state.products.map((info) => {

            return info.featuredProduct ? (
              <div className="product-card-div">
                <ProductCard
                  key={info._id}
                  id={info._id}
                  img={`http://localhost:8080/api/v1/products/product-photo/${info._id}`}
                  category={info.category}
                  title={info.title}
                  price={info.price}
                  discount={info.discount}
                  rating={info.rating}
                  discountedPrice={(info.price - (((info.price) * (10)) / 100))}
                />
              </div>
            ) : (
              ""
            );
          })}
        </div>
      </div>

      <div className="producttype">
        <div className="type">
          <Link to="/products" className="link">
            <img src={mobiletype} alt="mobile" />
            <p>MOBILE PHONES</p>
          </Link>
        </div>
        <div className="type">
          <Link to="/products" className="link">
            <img src={laptoptype} alt="laptop" />
            <p>LAPTOPS</p>
          </Link>
        </div>
        <div className="type">
          <Link to="/products" className="link">
            <img src={headsettype} alt="headset" />
            <p>HEADSETS</p>
          </Link>
        </div>
        <div className="type">
          <Link to="/products" className="link">
            <img src={watchtype} alt="watch" />
            <p>SMART WATCHES</p>
          </Link>
        </div>
      </div>
      <div className="services">
        <div className="servicesinfo">
          <div className="servicesinfoicon">
            <CiDeliveryTruck />
          </div>
          <div className="servicesinfodetails">
            <h3>Free Shipping</h3>
            <p>Order Above ₹500</p>
          </div>
        </div>
        <div className="servicesinfo">
          <div className="servicesinfoicon">
            <FaIndianRupeeSign />
          </div>
          <div className="servicesinfodetails">
            <h3>Return And Refund</h3>
            <p>Money back gaurantee</p>
          </div>
        </div>
        <div className="servicesinfo">
          <div className="servicesinfoicon">
            <CiPercent />
          </div>
          <div className="servicesinfodetails">
            <h3>Member Discount</h3>
            <p>On every order</p>
          </div>
        </div>
        <div className="servicesinfo">
          <div className="servicesinfoicon">
            <FaHeadphonesAlt />
          </div>
          <div className="servicesinfodetails">
            <h3>Customer Support</h3>
            <p>24x7 customer support</p>
          </div>
        </div>
      </div>




      <div className="banner">
        <div className="bannerinfo">
          <h3>Great deals on all Apple Products</h3>
          <p>STARTING FROM ₹19,999/-</p>
          <div className="bannerbtn">
            <Link to="/products" className="link">
              <button>Shop now</button>
            </Link>
          </div>
        </div>
        <div className="bannerimage">
          <img src={bannerimage} alt="bannerimg"></img>
        </div>
      </div>
    </div>
  );
}
export default Home;
