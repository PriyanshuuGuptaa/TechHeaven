import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./WishListComponent.css";
import DeleteIcon from '@mui/icons-material/Delete';
import { useWishList } from "../Context/wishListContext";


const WishListComponent = ({ productId, title, price, category, discount, img, onQuantityChange, qty }) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const [quantity, setQuantity] = useState(qty);
    const [isInWishlist, setIsInWishlist] = useWishList();


    const handleRemoveItem = async () => {

        const response = await axios.delete(
            "http://localhost:8080/api/v1/auth/remove-wish-list-item",
            {
                headers: { Authorization: token },
                data: { userId, productId }
            }
        );
        if (response.data.success) {
            console.log(response.data.wishListItems)
            setQuantity(0); // Set quantity to 0 or remove from state if appropriate
            onQuantityChange(productId, response.data.wishListItems); // Notify parent component if needed
            // Update local state to reflect the removal
            // localStorage.setItem("wishlist", response.data.wishListItems);
            toast.success("Item removed from wish list");
        } else {
            toast.error(response.data.message);
        }
    }

    return (


        <div className="wishlist-component-container">
            <div className="items">
                <div className="item-image">
                    <img src={img} alt="productimage" />
                </div>
                <div className="item-details">
                    <div className="item-nameandtype">
                        <p id="item-title">{title}</p>
                        <p id="item-type">{category}</p>
                    </div>
                    <div className="item-price">
                        <p id="discountedprice">₹{price - ((price * discount) / 100)}</p>
                        <p id="actualprice">₹{price}</p>
                        <p id="discount">{discount}% off</p>
                    </div>
                </div>
            </div>

            <div className="remove-button">
                <button
                    onClick={handleRemoveItem}
                >        <DeleteIcon />
                </button>
            </div>
        </div>
    );
};

export default WishListComponent;
