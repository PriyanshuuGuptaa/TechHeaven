import React from "react";
import "./Home.css";
import { useAuth } from "../../Context/authContext";
import phonebanner from "../../Assets/phonebanner.gif";
import laptopbanner from "../../Assets/laptopbanner.gif";
import watchbanner from "../../Assets/watchbanner.gif";
import headsetbanner from "../../Assets/headsetbanner.gif"
import vid from "../../Assets/vid.mp4";
import ReactPlayer from "react-player";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import ProductImages from "../../Components/ProductImage";
function Home({ state, dipatch }) {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 3000,
    cssEase: "linear",
    arrows: false,



    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  const openProductPage = (id) => {
    navigate(`/single-product/${id}`);
  }

  return (
    <div className="home-container">
      <div className="banner1">
        <ReactPlayer
          url={vid} // Replace with the path to your video
          playing={true} // Start playing automatically
          muted={true}
          loop={true} // Loop the video endlessly
          controls={false} // Show controls like play, pause, etc.
          width="100%" // Adjust the width as needed
          height="100%" // Adjust the height as needed
          className="banner-vid"
        />

      </div>
      <div className="top-catergories-section">
        <div className="tc-heading">
          <p>TOP CATEGORIES</p>
        </div>
        <div class="top-categories">

          <div className="top-category-cards">
            <img src={laptopbanner} />
          </div>
          < div className="top-category-cards">
            <img src={watchbanner} />
          </div>
          <div className="top-category-cards">
            <img src={headsetbanner} />
          </div>
          <div className="top-category-cards">
            <img src={phonebanner} />
          </div>
        </div>
      </div>



      {/* CAROUSEL */}

      <div className="featured-products-section">

        <p id="fp-heading">TOP PRODUCTS</p>
        <div className="featured-products-carousel">
          <Slider {...settings}>

            {state.products.map((info) => {
              console.log(info)
              return info.featuredProduct ? (
                <div className="featured-product-card">
                  <ProductImages productId={info._id} index={0} />
                  <p className="card-discount">{info.discount}% Off</p>
                  <div className="featured-product-card-content">
                    <p className="fp-card-title">{info.title}</p>
                    <div className="prices">
                      <p className="card-price" style={{ margin: 0 }}>₹{(info.price - (info.price * (info.discount / 100)))}/-</p>
                      <p className="card-mrp">₹{info.price}</p>
                    </div>
                    <button className="fp-shop-btn" onClick={() => { openProductPage(info._id) }}>Shop Now</button>
                  </div>
                </div>
              ) : (
                ""
              );
            })}
          </Slider>
        </div>
      </div>

      {/* OUR SERVICES */}
      <div className="sevices-section">
        <div>
          <p id="services-heading">OUR SERVICES</p>
        </div>
        <div className="service-cards">
          <div className="card-single">
            <div className="icon-wrapper">
              <h3>Free Shipping and Express Delivery</h3>
            </div>
            <div className="service-desc">
              <p>Enjoy free standard shipping on all orders. Need it fast? Opt for our express delivery service to get your gadgets delivered at lightning speed, so you can start using them as soon as possible.</p>
            </div>
          </div>
          <div className="card-single">
            <div className="icon-wrapper">
              <h3>Extended Warranty and Protection Plans</h3>
            </div>
            <div className="service-desc">
              <p> Protect your investment with our extended warranty and comprehensive protection plans. Cover accidental damage, theft, and more, ensuring peace of mind and longevity for your devices.</p>
            </div>
          </div>
          <div className="card-single">
            <div className="icon-wrapper">
              <h3>Secure Payment Options</h3>
            </div>
            <div className="service-desc">
              <p>Shop confidently with our range of secure payment options. From credit cards to digital wallets and payment plans, we offer multiple ways to pay securely and conveniently for your purchases.</p>
            </div>
          </div>
          <div className="card-single">
            <div className="icon-wrapper">
              <h3>Admin Product Upload</h3>
            </div>
            <div className="service-desc">
              <p>As an admin, you have the power to expand our product range by uploading your own items. Easily add new products, set prices, manage inventory, and update listings directly on our platform, helping to keep our catalog fresh and diverse..</p>
            </div>
          </div>
          <div className="card-single">
            <div className="icon-wrapper">
              <h3>Exclusive Discount Codes and Promotions </h3>
            </div>
            <div className="service-desc">
              <p>Save more with our special discount codes and promotions! Keep an eye on our website for seasonal sales, exclusive coupon codes, and bundle deals that make your favorite electronics more affordable than ever.</p>
            </div>
          </div>
          <div className="card-single">
            <div className="icon-wrapper">
              <h3>Financing Options</h3>
            </div>
            <div className="service-desc">
              <p>Need a flexible way to pay? Take advantage of our financing options, which allow you to spread the cost of your purchase over manageable monthly payments. Get the devices you need without straining your budget.</p>
            </div>
          </div>

        </div>

      </div>
    </div>



  );
}
export default Home;
