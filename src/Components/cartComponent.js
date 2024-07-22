import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ProductImages from "./ProductImage";

const CartComponent = ({ productId, title, price, category, discount, qty, img, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(qty);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const handleIncrement = async () => {
    try {

      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/increment-cart-item",
        { userId, productId },
        {
          headers: { Authorization: token }
        }
      );

      if (response.data.success) {
        const updatedItems = response.data.cartItems;
        const updatedItem = updatedItems.find(item => item.productId === productId);
        const newQuantity = updatedItem ? updatedItem.quantity : quantity + 1;
        setQuantity(newQuantity);
        onQuantityChange(productId, updatedItems);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error incrementing quantity:", error);
      toast.error("Failed to increase quantity");
    }
  };


  const handleDecrement = async () => {
    try {

      const newQuantity = quantity - 1;

      if (newQuantity <= 0) {
        const response = await axios.delete(
          "http://localhost:8080/api/v1/auth/remove-cart-item",
          {
            headers: { Authorization: token },
            data: { userId, productId }
          }
        );

        if (response.data.success) {
          // Update local state to reflect the removal
          setQuantity(0); // Set quantity to 0 or remove from state if appropriate
          onQuantityChange(productId, response.data.cartItems); // Notify parent component if needed
          toast.success("Item removed from cart");
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(
          "http://localhost:8080/api/v1/auth/decrement-cart-item",
          { userId, productId },
          {
            headers: { Authorization: token }
          }
        );

        if (response.data.success) {
          const updatedItems = response.data.cartItems;
          const updatedItem = updatedItems.find(item => item.productId === productId);
          setQuantity(newQuantity); // Update local quantity state
          onQuantityChange(productId, updatedItems); // Notify parent component if needed
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error("Error decrementing quantity:", error);
      toast.error("Failed to decrease quantity");
    }
  };

  const handleRemoveItem = async () => {

    const response = await axios.delete(
      "http://localhost:8080/api/v1/auth/remove-cart-item",
      {
        headers: { Authorization: token },
        data: { userId, productId }
      }
    );

    if (response.data.success) {
      // Update local state to reflect the removal
      setQuantity(0); // Set quantity to 0 or remove from state if appropriate
      onQuantityChange(productId, response.data.cartItems); // Notify parent component if needed
      toast.success("Item removed from cart");
    } else {
      toast.error(response.data.message);
    }
  }

  return (


    <div>
      <div className="items">
        <div className="item-image">
          <ProductImages productId={productId} index={0} />
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
      <div className="item-addremove">
        <div className="quantity-button">
          <button
            id="decrease-button"
            onClick={handleDecrement}
          >
            -
          </button>
          <span>{quantity}</span>
          <button id="increase-button"
            onClick={handleIncrement}
          >
            +
          </button>
        </div>
        <div className="remove-button">
          <button
            onClick={handleRemoveItem}
          >REMOVE</button>
        </div>
      </div>
    </div>
  );
};

export default CartComponent;
