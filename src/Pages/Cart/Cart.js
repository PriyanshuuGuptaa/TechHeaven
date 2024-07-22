import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./Cart.css";
import emptycartimage from "../../Assets/emptycartimg.png";
import CartComponent from "../../Components/cartComponent";
import { toast } from "react-toastify";
import axios from "axios";
import { useCart } from "../../Context/cartContext";
import SkeletonProductCard from "../../Components/SkeletonLoaderCard";

const Cart = () => {
  const [productDetails, setProductDetails] = useState([]);
  const [qty, setQty] = useState(1);
  const [cart, setCart] = useCart();
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchCartItems();
    setLoading(false);
  }, []);

  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("User is not authenticated");
        return;
      }
      const response = await axios.get("http://localhost:8080/api/v1/auth/cart-items", {
        headers: {
          Authorization: token
        }
      });
      console.log(response.data.cartItems)
      if (response.data.success) {
        setCart(response.data.cartItems);
        const productIds = response.data.cartItems.map(item => item.productId);
        fetchProductDetails(productIds);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error("Error fetching cart items:", err);
      toast.error("Failed to fetch cart items");
    }
  };


  const fetchProductDetails = async (productIds) => {
    try {
      const productResponses = await Promise.all(
        productIds.map(id => axios.get(`http://localhost:8080/api/v1/products/single-product/${id._id}`))
      );


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

  const onQuantityChange = (productId, updatedCartItems) => {
    setCart(updatedCartItems);
    // Update the total amounts whenever the quantity changes
    calculateTotalAmounts(updatedCartItems);
    fetchCartItems();
  };


  const calculateTotalAmounts = (items) => {
    let mrpPrice = 0;
    let totalDiscount = 0;
    let totalAmount = 0;
    let totalQty = 0;

    items.forEach(item => {
      const product = productDetails.find(product => product._id === item.productId._id);
      if (product) {
        totalQty += item.quantity;
        mrpPrice += item.quantity * product.price;
        totalDiscount += item.quantity * ((product.price * product.discount) / 100);
      }
    });

    totalAmount = mrpPrice - totalDiscount + 50; // Add delivery charge
    return { mrpPrice, totalDiscount, totalAmount, totalQty };
  };

  const totals = useMemo(() => calculateTotalAmounts(cart), [cart, productDetails]);

  const { mrpPrice, totalDiscount, totalAmount, totalQty } = totals;

  return productDetails.length === 0 ? (
    <div className="emptycart-container">
      <img src={emptycartimage} alt="empty cart" />
      <h2>CART IS EMPTY</h2>
      <Link to="/products">
        <button>SHOP NOW</button>
      </Link>
    </div>
  ) : (
    <div className="cart-container">
      {loading ? ((Array.from({ length: 6 }).map((_, index) => (
        <SkeletonProductCard key={index} />
      )))) : (
        <div className="cart-item-display">
          {productDetails.map(item => {
            cart.find((e) => {
              if (e._id === item._id) {
                setQty(e.quantity);
                console.log(qty)
              }
            })
            return (
              <div key={item._id} className="item-container">
                <CartComponent
                  productId={item._id}
                  title={item.title}
                  price={item.price}
                  category={item.category}
                  discount={item.discount}
                  quantity={item.quantity}
                  img={`http://localhost:8080/api/v1/products/product-photo/${item._id}`}
                  qty={qty}
                  onQuantityChange={onQuantityChange}

                />
              </div>
            )
          })}
        </div>)}


      <div className="cart-item-bill">
        <div className="bill-heading">
          <p>PRICE DETAILS</p>
        </div>
        <div className="bill-list">
          <div className="bill-list-component">
            <p>Price ({totalQty} items) </p>
            <p>₹{mrpPrice}</p>
          </div>
          <div className="bill-list-component">
            <p>Total Discount </p>
            <p id="discounttobereduced">- ₹{totalDiscount.toFixed(2)}</p>
          </div>
          <div className="bill-list-component">
            <p>Delivery Charge </p>
            <p>₹50</p>
          </div>
        </div>
        <div className="totalamount">
          <p>Total Amount</p>
          <p>₹{totalAmount.toFixed(2)}</p>
        </div>
        <div className="totalamountsaved">
          <p>You will save ₹{totalDiscount.toFixed(2)} on this order!</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
