import React, { useEffect, useState } from 'react';
import { useWishList } from '../../Context/wishListContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import emptycartimage from "../../Assets/emptycartimg.png";
import { Link, json } from "react-router-dom";
import "./WishList.css";
import ProductImages from '../../Components/ProductImage';


const Wishlist = () => {
    const [productDetails, setProductDetails] = useState([]);
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    const [wishList, setWishList,] = useWishList();


    useEffect(() => {
        fetchWishListItems();
        localStorage.setItem("wishlist", JSON.stringify(wishList))
    }, []);

    const fetchWishListItems = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.error("User is not authenticated");
                return;
            }
            const response = await axios.get(`${process.env.BACKEND_URL}/api/v1/auth/wish-list-items`, {
                headers: {
                    Authorization: token
                }
            });
            if (response.data.success) {
                setWishList(response.data.wishListItems);
                const productIds = response.data.wishListItems.map(item => item.productId);
                fetchProductDetails(productIds);
            } else {
                toast.error(response.data.message);
            }
        } catch (err) {
            console.error("Error fetching wish list items:", err);
            toast.error("Failed to fetch wish list items");
        }
    };
    const fetchProductDetails = async (productIds) => {
        try {
            const productResponses = await Promise.all(
                productIds.map(id =>
                    axios.get(`${process.env.BACKEND_URL}/api/v1/products/single-product/${id._id}`)));


            const products = productResponses.map(response => {
                if (response.data.success) {
                    return response.data.product;
                }
                return null;
            }).filter(product => product !== null);

            setProductDetails(products);
        } catch (err) {
            console.error("Error fetching product details:", err);
            toast.error("Failed to fetch product details");
        }
    };



    const handleRemoveItem = async (productId) => {

        const response = await axios.delete(
            `${process.env.BACKEND_URL}/api/v1/auth/remove-wish-list-item`,
            {
                headers: { Authorization: token },
                data: { userId, productId }
            }
        );
        if (response.data.success) {
            setWishList(response.data.wishListItems);
            fetchWishListItems();
            toast.success("Item removed from wish list");
            localStorage.setItem("wishlist", JSON.stringify(response.data.wishListItems));
        } else {
            toast.error(response.data.message);
        }
    }
    return productDetails.length === 0 ? (
        <div className="emptycart-container">
            <img src={emptycartimage} alt="empty cart" />
            <h2>WISH LIST IS EMPTY</h2>
            <Link to="/products">
                <button>SHOP NOW</button>
            </Link>
        </div>
    ) : (
        <div className="cart-container">
            <div className="cart-item-display">
                {productDetails.map(item => {
                    return (

                        <div key={item._id} className="item-container">
                            <div className="wishlist-component-container">
                                <div className="items">
                                    <div className="item-image">
                                        <ProductImages productId={item._id} index={0} />
                                    </div>
                                    <div className="item-details">
                                        <div className="item-nameandtype">
                                            <p id="item-title">{item.title}</p>
                                            <p id="item-type">{item.category}</p>
                                        </div>
                                        <div className="item-price">
                                            <p id="discountedprice">₹{item.price - ((item.price * item.discount) / 100)}</p>
                                            <p id="actualprice">₹{item.price}</p>
                                            <p id="discount">{item.discount}% off</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="remove-button">
                                    <button
                                        onClick={() => { handleRemoveItem(item._id) }}
                                    >        <DeleteIcon />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}



export default Wishlist;
