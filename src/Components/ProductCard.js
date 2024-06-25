import React, { useState, useEffect } from "react";
import "../Components/ProductCard.css";
import { FaStar } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { useWishList } from "../Context/wishListContext";
import { useNavigate } from "react-router-dom";

const ProductCard = (info) => {
  const [wishList, setWishList] = useWishList();
  const navigate = useNavigate();
  const [isInWishlist, setIsInWishlist] = useState(false);

  let updatedWishlist = [];

  // Initialize wishlist from local storage
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishList(storedWishlist);

  }, []);

  // Check if the product is in the wishlist
  useEffect(() => {
    setIsInWishlist(wishList.some(item => item.productId === info.id));
  }, [wishList, info.id]);


  const handleWishlist = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      //checking user
      if (!token) {
        toast.error("You need to log in first.");
        return;
      }
      //request body 
      const wishlistItem = { productId: productId };
      const requestBody = {
        token,
        wishListItems: [wishlistItem]
      };


      if (isInWishlist === false) {
        console.log(isInWishlist)

        //request for adding item to wishlist
        const response = await axios.post(
          "http://localhost:8080/api/v1/auth/add-to-wishlist",
          requestBody,
          { headers: { Authorization: token } }
        );
        //checking success and adding
        if (response.data.success) {
          setWishList(response.data.wishListItems);
          setIsInWishlist(true);
          localStorage.setItem("wishlist", JSON.stringify(response.data.wishListItems))
          toast.success("Product added to wishlist.");
        } else {
          toast.error(response.data.message || "Failed to update wishlist.");
        }

      }
      else {
        try {
          console.log(isInWishlist)

          const res = await axios.delete("http://localhost:8080/api/v1/auth/remove-wish-list-item", {
            headers: { Authorization: token },
            data: { userId, productId },
          });

          if (res.data.success) {
            setWishList(res.data.wishListItems);
            localStorage.setItem("wishlist", JSON.stringify(res.data.wishListItems));
            toast.success("Product removed from wishlist.");
          } else {
            toast.error("Failed to remove product from wishlist.");
          }
        } catch (error) {
          console.error("Error removing item from wishlist:", error);
        }
      }


    }

    catch (error) {
      console.error("Error updating wishlist:", error);
      toast.error("Failed to update wishlist.");
    }
  };

  const openProductPage = (id) => {
    navigate(`/single-product/${id}`);
  }
  return (
    <div className="card-div">

      <button
        onClick={() => handleWishlist(info.id)}
        className={`like-button ${wishList.some(item => item.productId === info.id) ? 'liked' : ''}`}
        disabled={info.needWishListBtn ? false : true}
      >
        <FaHeart />
      </button>

      <div className="card-container" onClick={() => { openProductPage(info.id) }}>
        <div className="card-img">
          <img src={info.img} alt={info.title} />
        </div>
        <div className="card-details">
          <div className="card-category">
            <p>{info.category}</p>
          </div>
          <div className="card-rating">
            {info.rating} <FaStar className="star" />
          </div>
        </div>
        <div>
          <div className="card-title">
            <p>{info.title}</p>
          </div>
          <div className="card-price">
            <p id="discountedprice">₹ {info.discountedPrice}</p>
            <p id="actualprice">₹{info.price}</p>
            <p id="discount">{info.discount}% off</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
